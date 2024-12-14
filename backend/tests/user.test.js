import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import pool from '../lib/db';  // Mocked database
import bcrypt from 'bcrypt'

// Mock the database
vi.mock('../lib/db');

describe('User Routes', () => {

  beforeEach(() => {
    vi.clearAllMocks();  // Clear mocks before each test
  });

  // Test Signup Route
  it('POST /signup ', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    const response = await request(app)
      .post('/api/user/signup')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
  });



  // Test Login Route
  it('POST /login - Success', async () => {
    const hashed_password = await bcrypt.hash('password123' , 10)
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, email: 'john.doe@example.com', password: hashed_password }]
    })

    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.text).toBe('success')
  });



  // Test Get User Route
  // it('GET /get-user-by-id/:user_id - User Found', async () => {
  //   const hashed_password = await bcrypt.hash('password123' , 10)

  //   pool.query
  //     .mockResolvedValueOnce({
  //     rows: [{ id: 2, first_name: 'John', last_name: 'Dog', password: hashed_password, email: 'john.dog@example.com'}]
  //   })
  //     .mockResolvedValueOnce({
  //     rows: [{ id: 1, first_name: 'John', last_name: 'Doe', password: hashed_password, email: 'john.doe@example.com'}]
  //   })

  //   const response = await request(app)
  //     .get('/api/user/get-user-by-id/1');

  //   expect(response.status).toBe(200);
  //   expect(response.body.first_name).toBe('John');
  //   expect(response.body.last_name).toBe('Doe');
  // });



  // it('GET /user/:user_id - User Not Found', async () => {
  //   pool.query.mockResolvedValueOnce({ rows: [] });

  //   const response = await request(app)
  //     .get('/user/999');

  //   expect(response.status).toBe(404);
  //   expect(response.body.message).toBe('user not found.');
  // });
});
