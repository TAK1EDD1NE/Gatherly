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


})