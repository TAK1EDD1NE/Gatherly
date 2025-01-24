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

-- Features Table
CREATE TABLE Features (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Compound_Features Table (Lookup Table)
CREATE TABLE Compound_Features (
    compound_id INT NOT NULL,
    feature_id INT NOT NULL,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE,
    FOREIGN KEY (feature_id) REFERENCES Features(id) ON DELETE CASCADE
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

-- ENUM TYPE FOR USER ROLE
CREATE TYPE status_states AS ENUM ('waiting-owner', 'rejected-owner', 'accepted-owner', 'waiting-client', 'rejected-client', 'payed');

-- EVENTS TABLE
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL CHECK (end_date > start_date),
    compound_id INT NOT NULL,
    client_id INT NOT NULL,
    status status_states DEFAULT 'waiting-owner' NOT NULL,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);


-- PAYMENT TABLE
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    event_id INT NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
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
    rating INT CHECK (serving_rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE
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




-- // ENUM TYPES
-- Enum user_role {
--     Admin
--     Employee
--     User
-- }

-- Enum status_states {
--     "waiting-owner"
--     "rejected-owner"
--     "waiting-client"
--     "rejected-client"
--     "payed"
-- }

-- // USERS TABLE
-- Table users {
--     id SERIAL [pk]
--     username VARCHAR(255) [not null]
--     email VARCHAR(255) [unique, not null]
--     pfp VARCHAR(255)
--     password TEXT [not null]
--     role user_role [default: 'User', not null]
-- }

-- // ADMINS TABLE
-- Table admins {
--     id INT [pk, ref: > users.id]
--     stripe_id VARCHAR(255) [unique, not null]
-- }

-- // COMPOUNDS TABLE
-- Table compounds {
--     id SERIAL [pk]
--     name VARCHAR(255) [not null]
--     admin_id INT [not null, ref: > users.id]
-- }

-- // FEATURES TABLE
-- Table Features {
--     id SERIAL [pk]
--     name VARCHAR(255) [not null]
-- }

-- // COMPOUND_FEATURES TABLE (Lookup)
-- Table Compound_Features {
--     compound_id INT [ref: > compounds.id]
--     feature_id INT [ref: > Features.id]
-- }

-- // LOCATIONS TABLE
-- Table locations {
--     id INT [pk, ref: > compounds.id]
--     x NUMERIC [not null]
--     y NUMERIC [not null]
-- }

-- // COMPOUND_EMPLOYEES TABLE (Many-to-Many)
-- Table compound_employees {
--     id SERIAL [pk]
--     compound_id INT [ref: > compounds.id]
--     employee_id INT [ref: > users.id]
-- }

-- // GALLERIES TABLE
-- Table galleries {
--     id SERIAL [pk]
--     image_url TEXT [not null]
--     compound_id INT [ref: > compounds.id]
-- }

-- // EVENTS TABLE
-- Table events {
--     id SERIAL [pk]
--     name VARCHAR(255) [not null]
--     description TEXT [not null]
--     start_date TIMESTAMP [not null]
--     end_date TIMESTAMP [not null]
--     compound_id INT [not null, ref: > compounds.id]
--     client_id INT [not null, ref: > users.id]
--     status status_states [default: 'waiting-owner', not null]
-- }

-- // PAYMENTS TABLE
-- Table payments {
--     id SERIAL [pk]
--     description TEXT [not null]
--     event_id INT [ref: > events.id]
--     price INT [not null]
-- }

-- // GUEST_LISTS TABLE
-- Table guest_lists {
--     id SERIAL [pk]
--     guest_first_name VARCHAR(255) [not null]
--     guest_last_name VARCHAR(255) [not null]
--     event_id INT [ref: > events.id]
-- }

-- // EVENT_PROGRAM TABLE
-- Table event_program {
--     id SERIAL [pk]
--     description TEXT [not null]
--     start_time TIMESTAMP [not null]
--     end_time TIMESTAMP [not null]
--     event_id INT [ref: > events.id]
-- }

-- // TASKS TABLE
-- Table tasks {
--     id SERIAL [pk]
--     description TEXT [not null]
--     employee_id INT [ref: > users.id]
-- }

-- // EVENT_EMPLOYEES_TASKS TABLE (Many-to-Many-to-Many)
-- Table event_employees_tasks {
--     id SERIAL [pk]
--     event_id INT [ref: > events.id]
--     employee_id INT [ref: > users.id]
--     task_id INT [ref: > tasks.id]
-- }

-- // RESERVATIONS TABLE
-- Table reservations {
--     id SERIAL [pk]
--     user_id INT [ref: > users.id]
--     event_id INT [ref: > events.id]
--     reserved_at TIMESTAMP 
--     payment_intent_id TEXT [not null]
-- }

-- // REVIEWS TABLE
-- Table reviews {
--     id SERIAL [pk]
--     user_id INT [ref: > users.id]
--     compound_id INT [ref: > compounds.id]
--     comment TEXT [not null]
--     created_at TIMESTAMP
-- }

-- // RATINGS TABLE
-- Table ratings {
--     review_id INT [pk, ref: > reviews.id]
--     serving_rating INT [note: 'Range: 1-5']
--     cleanliness_rating INT [note: 'Range: 1-5']
--     comfort_rating INT [note: 'Range: 1-5']
--     logistics_rating INT [note: 'Range: 1-5']
-- }

-- // NOTIFICATIONS TABLE
-- Table notifications {
--     id SERIAL [pk]
--     sender_id INT [ref: > users.id]
--     receiver_id INT [ref: > users.id]
--     seen BOOLEAN [default: false]
--     note TEXT [default: '']
--     created_at TIMESTAMP 
-- }


-- Ref: "guest_lists"."id" < "events"."start_date"