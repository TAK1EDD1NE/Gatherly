import pool from '../lib/db.js'
import cloudinary from '../api/cloudinary.js'

// Create a compound
export const createCompound = async (req, res , next) => {
  try {
    const { name , location , gallery , features} = req.body
    const {id: admin_id} = req.user

    if (!name || !location.x || !location.y || gallery.length != 5){
        res.status(400)
        throw new Error('please fill in all required fields')
    }
    await pool.query('BEGIN');

    const result = await pool.query(
      'INSERT INTO compounds (name, admin_id) VALUES ($1, $2) RETURNING *',
      [name, admin_id]
    )
    const compound_id = result.rows[0].id;
    
    gallery.forEach(async element =>  {
        let avatar = ''
                if (!!element) {
                    const {secure_url: url} = await cloudinary.uploader.upload(element, {
                        folder: "gatherly",
                        width: 200,
                        height: 200,
                        crop: 'fill',
                        gravity: 'face'
                    })
                    avatar = url
                    await pool.query(
                        'INSERT INTO galleries (image_url, compound_id) VALUES ($1, $2) RETURNING *',
                        [avatar, compound_id]
                      )
                }
    });
    // if (features.length == 0 ){
        const features_const = ['Wi-Fi','Stage','Sound System','VIP','Parking','Security Personnel','CCTV','Terrace']
    // }
    // Add features to Features table and create relationships in Compound_Features table
    for (const feature of features_const) {
    // for (const feature of features) {
        const feature_id = (await pool.query('SELECT * FROM Features WHERE name = $1', [feature])).rows[0].id
        await pool.query('INSERT INTO Compound_Features (compound_id, feature_id) VALUES ($1, $2)', [compound_id, feature_id]);
      }

    await pool.query(
      'INSERT INTO locations (id, x, y) VALUES ($1, $2, $3) ',
      [compound_id, location.x, location.y]
    );
    await pool.query('COMMIT');

    res.status(201).json({message: 'compound created successfully.'})

  } catch (err) {
    await pool.query('ROLLBACK');
    next(err)
  }
};

export const searchCompounds = async (req, res, next) => {
    try {
        const {
            query,              // Text query for name search
            x, y,              // Location coordinates
            radius = 5,        // Default radius in kilometers
            sortBy = 'relevance', // Sort option: 'relevance', 'distance', 'name'
            limit = 20,        // Maximum results to return
            offset = 0         // Pagination offset
        } = req.query;

        let searchQuery = `
            WITH compound_data AS (
                SELECT 
                    c.id,
                    c.name,
                    l.x,
                    l.y,
                    CASE 
                        WHEN l.x IS NOT NULL AND l.y IS NOT NULL THEN 
                            SQRT(POWER(l.x - $1, 2) + POWER(l.y - $2, 2))
                        ELSE NULL
                    END as distance,
                    CASE 
                        WHEN $3::text IS NOT NULL THEN 
                            ts_rank(
                                to_tsvector('english', c.name),
                                to_tsquery('english', regexp_replace(trim($3), '\\s+', ':* & ', 'g') || ':*')
                            )
                        ELSE 0
                    END as name_rank
                FROM compounds c
                LEFT JOIN locations l ON c.id = l.id
                WHERE 1=1
            `;

        const params = [
            x || 0,
            y || 0,
            query
        ];

        let paramCount = params.length;

        // Add filters
        if (query) {
            searchQuery += `
                AND (
                    c.name ILIKE $${++paramCount}
                    OR to_tsvector('english', c.name) @@ to_tsquery('english', regexp_replace(trim($${paramCount}), '\\s+', ':* & ', 'g') || ':*')
                )
            `;
            params.push(`%${query}%`);
        }

        if (x && y) {
            searchQuery += `
                AND (l.x IS NOT NULL AND l.y IS NOT NULL)
                AND (SQRT(POWER(l.x - $1, 2) + POWER(l.y - $2, 2)) <= $${++paramCount})
            `;
            params.push(radius);
        }

        // Close the CTE and add sorting
        searchQuery += `
            )
            SELECT 
                cd.*,
                array_agg(g.image_url) as images,
                json_build_object(
                    'distance', ROUND(cd.distance::numeric, 2),
                    'name_rank', ROUND(cd.name_rank::numeric, 2)
                ) as search_metadata
            FROM compound_data cd
            LEFT JOIN galleries g ON cd.id = g.compound_id
            GROUP BY cd.id, cd.name, cd.x, cd.y, cd.distance, cd.name_rank
        `;

        // Add sorting logic
        switch (sortBy) {
            case 'distance':
                searchQuery += `
                    ORDER BY 
                        CASE WHEN cd.distance IS NULL THEN 1 ELSE 0 END,
                        cd.distance ASC
                `;
                break;
            case 'name':
                searchQuery += `
                    ORDER BY cd.name ASC
                `;
                break;
            case 'relevance':
            default:
                searchQuery += `
                    ORDER BY 
                        CASE 
                            WHEN $3::text IS NULL AND cd.distance IS NOT NULL THEN cd.distance
                            WHEN $3::text IS NOT NULL AND cd.distance IS NULL THEN -cd.name_rank
                            WHEN $3::text IS NOT NULL AND cd.distance IS NOT NULL 
                                THEN (cd.distance / $${++paramCount}) - cd.name_rank
                            ELSE 0
                        END ASC
                `;
                params.push(radius); // Normalization factor for combined scoring
        }

        // Add pagination
        searchQuery += `
            LIMIT $${++paramCount} OFFSET $${++paramCount}
        `;
        params.push(limit, offset);
        
        const result = await pool.query(searchQuery, params);

        // Calculate total count for pagination
        const countQuery = `
            SELECT COUNT(*) 
            FROM compounds c
            LEFT JOIN locations l ON c.id = l.id
            WHERE 1=1
            ${query ? `AND c.name ILIKE $1` : ''}
            ${x && y ? `AND SQRT(POWER(l.x - $2, 2) + POWER(l.y - $3, 2)) <= $4` : ''}
        `;

        const countParams = [];
        if (query) countParams.push(`%${query}%`);
        if (x && y) countParams.push(x, y, radius);

        const totalCount = await pool.query(countQuery, countParams);

        const response = {
            compounds: result.rows,
            pagination: {
                total: parseInt(totalCount.rows[0].count),
                limit: limit,
                offset: offset,
                has_more: result.rows.length === limit
            },
            search_metadata: {
                query: query || null,
                location: x && y ? { x, y, radius } : null,
                sort_by: sortBy
            }
        };

        res.json(response);
    } catch (error) {
        next(error)
    } 
};


// Get a compound by id
export const getCompoundById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
        `
        SELECT 
            c.name AS compound_name,
            l.x AS location_x,
            l.y AS location_y,
            ARRAY_AGG(DISTINCT g.image_url) AS gallery_links,  -- Aggregate gallery URLs
            ARRAY_AGG(DISTINCT f.name) AS features  -- Aggregate feature names
        FROM 
            Compounds c
        JOIN 
            locations l ON c.id = l.id
        LEFT JOIN 
            Compound_Features cf ON c.id = cf.compound_id
        LEFT JOIN 
            Features f ON cf.feature_id = f.id
        LEFT JOIN 
            galleries g ON c.id = g.compound_id  -- Ensure no duplication of galleries
        WHERE 
            c.id = $1
        GROUP BY 
            c.id, c.name, l.x, l.y;
        `,
        [id]
        );
        if (result.rows.length === 0) {
        res.status(404).json({ message: 'Compound not found' });
        } else {
        res.json(result.rows[0]);
        }
    } catch (err) {
        next(err)
    }
};
    

    
// Delete a compound
export const deleteCompound = async (req, res, next) => {
try {
    const { id } = req.params
    await pool.query('DELETE FROM compounds WHERE id = $1', [id]);
    return res.status(200).json({ message: 'Compound deleted successfully' });
} catch (err) {
    next(err)
}
};