import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import compoundRoutes from '../routes/Compound.js'
import pool from '../lib/db.js'
import cloudinary from '../api/cloudinary.js'
import jwt from 'jsonwebtoken'

// Mock dependencies
vi.mock('../lib/db.js', () => ({
  default: {
    query: vi.fn()
  }
}))

vi.mock('../api/cloudinary.js', () => ({
  default: {
    uploader: {
      upload: vi.fn()
    }
  }
}))

vi.mock('../middleware/auth.js', () => ({
  auth_token: (requiredRole) => (req, res, next) => {
    if (req.headers.authorization) {
      req.user = { id: 1, role: requiredRole }
      next()
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  }
}))

// Setup express app for testing
const app = express()
app.use(express.json())
app.use('/api/compounds', compoundRoutes)

describe('Compound Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/compounds/create', () => {
    it('should create a compound successfully', async () => {
      // Mock database responses
      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // compounds insert
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // galleries insert
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // locations insert

      // Mock cloudinary upload
      cloudinary.uploader.upload.mockResolvedValue({ secure_url: 'https://example.com/image.jpg' })

      const response = await request(app)
        .post('/api/compounds/create')
        .set('Authorization', 'Bearer fake-token')
        .send({
          name: 'Test Compound',
          location: { x: 10, y: 20 },
          gallery: ['image1', 'image2', 'image3', 'image4', 'image5']
        })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'compound created successfully.' })
      expect(pool.query).toHaveBeenCalledTimes(7)
      expect(cloudinary.uploader.upload).toHaveBeenCalled()
    })

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/compounds/create')
        .set('Authorization', 'Bearer fake-token')
        .send({
          name: 'Test Compound',
          location: { x: 10 }, // missing y
          gallery: ['image1'] // not enough images
        })

      expect(response.status).toBe(400)
    //   expect(response.body).toHaveProperty('error')
    })
  })

  describe('GET /api/compounds/search', () => {
    it('should search compounds by name', async () => {
      const mockResults = {
        rows: [
          {
            id: 1,
            name: 'Test Compound',
            x: 10,
            y: 20,
            images: ['image1.jpg']
          }
        ]
      }

      pool.query
        .mockResolvedValueOnce(mockResults)
        .mockResolvedValueOnce({ rows: [{ count: '1' }] })

      const response = await request(app)
        .get('/api/compounds/search')
        .query({ query: 'Test' })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('compounds')
      expect(response.body).toHaveProperty('pagination')
      expect(response.body.compounds).toHaveLength(1)
    })

    it('should search compounds by location', async () => {
      const mockResults = {
        rows: [
          {
            id: 1,
            name: 'Nearby Compound',
            x: 10.1,
            y: 20.1,
            distance: 0.5
          }
        ]
      }

      pool.query
        .mockResolvedValueOnce(mockResults)
        .mockResolvedValueOnce({ rows: [{ count: '1' }] })

      const response = await request(app)
        .get('/api/compounds/search')
        .query({ x: 10, y: 20, radius: 1 })

      expect(response.status).toBe(200)
      expect(response.body.compounds).toHaveLength(1)
      expect(response.body.search_metadata.location).toBeTruthy()
    })
  })

  describe('GET /api/compounds/get-by-id/:id', () => {
    it('should get compound by id successfully', async () => {
      const mockCompound = {
        rows: [{
          id: 1,
          name: 'Test Compound',
          admin_id: 1
        }]
      }

      pool.query.mockResolvedValue(mockCompound)

      const response = await request(app)
        .get('/api/compounds/get-by-id/1')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockCompound.rows[0])
    })

    it('should return 404 if compound not found', async () => {
      pool.query.mockResolvedValue({ rows: [] })

      const response = await request(app)
        .get('/api/compounds/get-by-id/999')

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: 'Compound not found' })
    })
  })

  
})