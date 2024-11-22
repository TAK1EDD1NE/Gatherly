-- USER TABLE
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pfp VARCHAR(255) ,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Employee', 'User') NOT NULL
);

-- ADMIN TABLE (Inherits from Users)
CREATE TABLE admins (
    id INT PRIMARY KEY,
    stripe_id VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- compound TABLE
CREATE TABLE compounds (
    id SERIAL PRIMARY KEY,
    compound_name VARCHAR(255) NOT NULL,
    compound_location VARCHAR(255),
    capacity INT,
    admin_id INT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
);

-- HALL-EMPLOYEE (MANY-TO-MANY) TABLE
CREATE TABLE compound_employees (
    id SERIAL PRIMARY KEY,
    compound_id INT NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (compound_id, employee_id)
);

-- GALERIES 
CREATE TABLE galeries (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL, -- String to store the URL or path of the image
    compound_id INT NOT NULL, -- Foreign key to compounds table
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE
);


-- EVENT TABLE
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_description TEXT NOT NULL,
    event_start_date DATE NOT NULL,
    event_end_date DATE NOT NULL,
    compound_id INT NOT NULL,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE
);
CREATE TABLE  guest_lists(
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(255) NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- PROGRAM TABLE
CREATE TABLE event_program(
    id SERIAL PRIMARY KEY,
    program_description TEXT NOT NULL,
    start_program_date DATETIME NOT NULL,
    end_program_date DATETIME NOT NULL,
    event_id INT NOT NULL,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY, 
    task_description TEXT NOT NULL
);

-- EVENT-EMPLOYEE (MANY-TO-MANY-TO-MANY) TABLE
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


CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    compound_id INT UNIQUE,
    event_id INT UNIQUE,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    CONSTRAINT check_at_least_one_not_null CHECK (
        compound_id IS NOT NULL OR event_id IS NOT NULL
    )
);

-- STOCK ITEMS TABLE
CREATE TABLE stock_items (
    id SERIAL PRIMARY KEY,
    stock_id INT NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    item_description TEXT,
    quantity INT DEFAULT 0 NOT NULL,
    unitprice INT DEFAULT 0 NOT NULL,
    FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE CASCADE
);

-- RESERVATION TABLE
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

-- COMMENTS TABLE
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    compound_id INT NOT NULL,
    comment TEXT NOT NULL,
    serving_rating INT,
    Cleanliness_rating INT,
    comfort_rating INT,
    logistics_rating INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (compound_id) REFERENCES compounds(id) ON DELETE CASCADE
);


CREATE TABLE notifications(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    seen BOOLEAN DEFAULT FALSE,
    note TEXT DEFAULT '',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);