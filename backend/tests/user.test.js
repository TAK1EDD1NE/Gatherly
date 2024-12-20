import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import userRoutes from '../routes/User.js'
import pool from '../lib/db.js'
import cloudinary from '../api/cloudinary.js'
import bcrypt from 'bcrypt'
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

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn()
  },
  hash: vi.fn(),
  compare: vi.fn()
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
app.use('/api/users', userRoutes)

describe('User Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/users/signup', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        photo: 'base64-photo-data'
      }

      // Mock bcrypt hash
      bcrypt.hash.mockResolvedValue('hashedpassword123')

      // Mock cloudinary upload
      cloudinary.uploader.upload.mockResolvedValue({ secure_url: 'https://example.com/photo.jpg' })

      // Mock database query
      pool.query.mockResolvedValue({ rows: [{ id: 1 }] })

      const response = await request(app)
        .post('/api/users/signup')
        .send(userData)

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'user created successfully.' })
      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10)
      expect(cloudinary.uploader.upload).toHaveBeenCalled()
    })

    it('should return 400 if password is too short', async () => {
      const response = await request(app)
        .post('/api/users/signup')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123'
        })

      expect(response.status).toBe(400)
      expect(pool.query).not.toHaveBeenCalled()
    })
  })

  describe('POST /api/users/login', () => {
    it('should login successfully with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      }

      pool.query.mockResolvedValue({
        rows: [{
          id: 1,
          email: 'test@example.com',
          password: '$2a$10$QkmNoz0dgUkbHhbZjDhkVeTz7g3z3lc.mIkYhSL3HMnM.nhgjm5Ze'
        }]
      })

      bcrypt.compare.mockResolvedValue(true)
      const generateTokenMock = vi.fn();
      jwt.sign = generateTokenMock;

      const response = await request(app)
        .post('/api/users/login')
        .send(loginData)
      
      // console.log(response);
      
      // expect(response).toBe(201)
      // expect(response.status).toBe(201)

      expect(response.headers['set-cookie']).toBeDefined()
    })

    it('should return 404 for non-existent user', async () => {
      pool.query.mockResolvedValue({ rows: [] })

      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        })

      expect(response.status).toBe(404)
    })
  })

  describe('GET /api/users/get-user-by-id/:user_id', () => {
    it('should get user successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com'
      }

      pool.query.mockResolvedValue({ rows: [mockUser] })

      const response = await request(app)
        .get('/api/users/get-user-by-id/1')
        .set('Authorization', 'Bearer fake-token')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockUser)
    })

    it('should return 404 for non-existent user', async () => {
      pool.query.mockResolvedValue({ rows: [] })

      const response = await request(app)
        .get('/api/users/get-user-by-id/999')
        .set('Authorization', 'Bearer fake-token')

      expect(response.status).toBe(404)
    })
  })

  describe('PATCH /api/users/update-name', () => {
    it('should update username successfully', async () => {
      pool.query.mockResolvedValue({ rows: [{ id: 1 }] })

      const response = await request(app)
        .patch('/api/users/update-name')
        .set('Authorization', 'Bearer fake-token')
        .send({ new_username: 'newusername' })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'name has been updated' })
    })
  })

  describe('PATCH /api/users/update-photo', () => {
    it('should update profile photo successfully', async () => {
      cloudinary.uploader.upload.mockResolvedValue({ secure_url: 'https://example.com/newphoto.jpg' })
      pool.query.mockResolvedValue({ rows: [{ id: 1 }] })

      const response = await request(app)
        .patch('/api/users/update-photo')
        .set('Authorization', 'Bearer fake-token')
        .send({ photo: 'base64-photo-data' })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'photo has been updated' })
    })
  })

  describe('PATCH /api/users/update-password', () => {
    it('should update password successfully', async () => {
      bcrypt.hash.mockResolvedValue('newhashpassword123')
      pool.query.mockResolvedValue({ rows: [{ id: 1 }] })

      const response = await request(app)
        .patch('/api/users/update-password')
        .set('Authorization', 'Bearer fake-token')
        .send({ new_password: 'newpassword123' })

      expect(response.status).toBe(201)
      expect(response.body).toEqual({ message: 'pwd has been updated' })
    })

    it('should return 400 if new password is too short', async () => {
      const response = await request(app)
        .patch('/api/users/update-password')
        .set('Authorization', 'Bearer fake-token')
        .send({ new_password: '123' })

      expect(response.status).toBe(400)
    })
  })

  describe('GET /api/users/signout', () => {
    it('should sign out successfully', async () => {
      const response = await request(app)
        .get('/api/users/signout')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ message: 'successfuly logged out' })
      expect(response.headers['set-cookie']).toBeDefined()
    })
  })


})