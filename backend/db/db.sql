-- ENUM TYPE FOR USER ROLE
CREATE TYPE user_role AS ENUM ('Admin', 'Employee', 'User');

-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pfp VARCHAR(255),
    password TEXT NOT NULL,
    role user_role DEFAULT 'User' NOT NULL 
);

-- ADMIN TABLE (Inherits from Users)
CREATE TABLE admins (
    id INT PRIMARY KEY,
    stripe_id VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- COMPOUNDS TABLE
CREATE TABLE compounds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    admin_id INT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
);

-- LOCATION TABLE
CREATE TABLE locations (
    id INT PRIMARY KEY,      
    x NUMERIC NOT NULL,            
    y NUMERIC NOT NULL,            
    FOREIGN KEY (id) REFERENCES compounds(id) ON DELETE CASCADE
);



-- COMPOUND EMPLOYEES TABLE (MANY-TO-MANY)
CREATE TABLE compound_employees (
    id SERIAL PRIMARY KEY,
    compound_id INT NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (compound_id, employee_id)
);

-- GALERIES TABLE
CREATE TABLE galleries (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    compound_id INT NOT NULL,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE
);

-- EVENTS TABLE
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL CHECK (end_date > start_date),
    compound_id INT NOT NULL,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE
);

-- GUEST LISTS TABLE
CREATE TABLE guest_lists (
    id SERIAL PRIMARY KEY,
    guest_first_name VARCHAR(255) NOT NULL,
    guest_last_name VARCHAR(255) NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- EVENT PROGRAM TABLE
CREATE TABLE event_program (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL CHECK (end_time > start_time),
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- TASKS TABLE
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
);

-- EVENT-EMPLOYEES-TASKS TABLE (MANY-TO-MANY-TO-MANY)
CREATE TABLE event_employees_tasks (
    id SERIAL PRIMARY KEY,
    event_id INT NOT NULL,
    employee_id INT NOT NULL,
    task_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    UNIQUE (event_id, employee_id, task_id)
);


-- RESERVATIONS TABLE
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_intent_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- REVIEWS TABLE
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    compound_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE
);


-- ratings table
CREATE TABLE ratings(
    review_id INT PRIMARY KEY,
    serving_rating INT CHECK (serving_rating BETWEEN 1 AND 5),
    cleanliness_rating INT CHECK (cleanliness_rating BETWEEN 1 AND 5),
    comfort_rating INT CHECK (comfort_rating BETWEEN 1 AND 5),
    logistics_rating INT CHECK (logistics_rating BETWEEN 1 AND 5),
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    seen BOOLEAN DEFAULT FALSE,
    note TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);





-- the dbdiagram io code for the db


-- Table users {
--     id SERIAL [pk]
--     first_name VARCHAR(255)
--     last_name VARCHAR(255)
--     email VARCHAR(255)
--     pfp VARCHAR(255)
--     password VARCHAR(255)
--     role ENUM('Admin', 'Employee', 'User')
-- }

-- Table admins {
--     id INT [pk, ref: > users.id]
--     stripe_id VARCHAR(255)
-- }

-- Table compounds {
--     id SERIAL [pk]
--     name VARCHAR(255)
--     capacity INT
--     admin_id INT [ref: > users.id]
-- }

-- Table locations {
--     id INT [pk, ref: > compounds.id] // Same as compounds.id
--     x NUMERIC                       // X coordinate
--     y NUMERIC                       // Y coordinate
-- }

-- Table compound_employees {
--     id SERIAL [pk]
--     compound_id INT [ref: > compounds.id]
--     employee_id INT [ref: > users.id]
-- }

-- Table galleries {
--     id SERIAL [pk]
--     image_url TEXT
--     compound_id INT [ref: > compounds.id]
-- }

-- Table events {
--     id SERIAL [pk]
--     name VARCHAR(255)
--     description TEXT
--     start_date TIMESTAMP
--     end_date TIMESTAMP
--     compound_id INT [ref: > compounds.id]
-- }

-- Table guest_lists {
--     id SERIAL [pk]
--     guest_name VARCHAR(255)
--     event_id INT [ref: > events.id]
-- }

-- Table event_program {
--     id SERIAL [pk]
--     description TEXT
--     start_time TIMESTAMP
--     end_time TIMESTAMP
--     event_id INT [ref: > events.id]
-- }

-- Table tasks {
--     id SERIAL [pk]
--     description TEXT
-- }

-- Table event_employees_tasks {
--     id SERIAL [pk]
--     event_id INT [ref: > events.id]
--     employee_id INT [ref: > users.id]
--     task_id INT [ref: > tasks.id]
-- }

-- Table stocks {
--     id SERIAL [pk]
--     compound_id INT [ref: > compounds.id]
--     event_id INT [ref: > events.id]
-- }

-- Table stock_items {
--     id SERIAL [pk]
--     stock_id INT [ref: > stocks.id]
--     name VARCHAR(255)
--     description TEXT
--     quantity INT
--     unit_price INT
-- }

-- Table reservations {
--     id SERIAL [pk]
--     user_id INT [ref: > users.id]
--     event_id INT [ref: > events.id]
--     compound_id INT [ref: > compounds.id]
--     reserved_at TIMESTAMP
--     payment_intent_id TEXT
-- }

-- Table reviews {
--     id SERIAL [pk]
--     user_id INT [ref: > users.id]
--     compound_id INT [ref: > compounds.id]
--     comment TEXT
    
--     created_at TIMESTAMP
-- }

-- Table ratings{
--   id SERIAL [pk , ref: > reviews.id]
--   serving_rating INT    
--   cleanliness_rating INT
--   comfort_rating INT
--   logistics_rating INT
  
-- }

-- Table notifications {
--     id SERIAL [pk]
--     sender_id INT [ref: > users.id]
--     receiver_id INT [ref: > users.id]
--     seen BOOLEAN
--     note TEXT
--     created_at TIMESTAMP
-- }
