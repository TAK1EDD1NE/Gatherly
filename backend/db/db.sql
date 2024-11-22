-- ENUM TYPE FOR USER ROLE
CREATE TYPE user_role AS ENUM ('Admin', 'Employee', 'User');

-- USERS TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pfp VARCHAR(255),
    password VARCHAR(255) NOT NULL,
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
    location VARCHAR(255),
    capacity INT CHECK (capacity > 0),
    admin_id INT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
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
    guest_name VARCHAR(255) NOT NULL,
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
    description TEXT NOT NULL
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

-- STOCKS TABLE
CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    compound_id INT UNIQUE,
    event_id INT UNIQUE,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    CONSTRAINT check_at_least_one_not_null CHECK (compound_id IS NOT NULL OR event_id IS NOT NULL)
);

-- STOCK ITEMS TABLE
CREATE TABLE stock_items (
    id SERIAL PRIMARY KEY,
    stock_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    quantity INT DEFAULT 0 NOT NULL CHECK (quantity >= 0),
    unit_price INT DEFAULT 0 NOT NULL CHECK (unit_price >= 0),
    FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE CASCADE
);

-- RESERVATIONS TABLE
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    compound_id INT NOT NULL,
    reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_intent_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE
);

-- REVIEWS TABLE
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    compound_id INT NOT NULL,
    comment TEXT NOT NULL,
    serving_rating INT CHECK (serving_rating BETWEEN 1 AND 5),
    cleanliness_rating INT CHECK (cleanliness_rating BETWEEN 1 AND 5),
    comfort_rating INT CHECK (comfort_rating BETWEEN 1 AND 5),
    logistics_rating INT CHECK (logistics_rating BETWEEN 1 AND 5),
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
