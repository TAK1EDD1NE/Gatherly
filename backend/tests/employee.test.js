import { describe, it, expect, vi, beforeEach } from 'vitest'
import bcrypt from 'bcrypt'
import pool from '../lib/db.js'
import cloudinary from '../api/cloudinary.js'
import {
  createEmployee,
  deleteEmployee,
  assignToEvent,
  assignTask,
  getEmployeeEventTasks,
  removeTask
} from '../controllers/Employee.js'

// Mock dependencies
vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn()
  }
}))

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

describe('Employee Controller', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {
      body: {},
      params: {}
    }
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }
    next = vi.fn()
    
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  describe('createEmployee', () => {
    it('should create an employee successfully', async () => {
      const mockUser = {
        rows: [{
          id: 1,
          username: 'testuser',
          email: 'test@test.com',
          pfp: 'avatar-url',
          role: 'Employee'
        }]
      }

      req.body = {
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123',
        pfp: 'base64-image-data',
        compound_id: 1
      }

      // Mock cloudinary upload
      cloudinary.uploader.upload.mockResolvedValue({
        secure_url: 'avatar-url'
      })

      // Mock bcrypt hash
      bcrypt.hash.mockResolvedValue('hashed_password')

      // Mock database queries
      pool.query
        .mockResolvedValueOnce() // BEGIN
        .mockResolvedValueOnce(mockUser) // INSERT INTO users
        .mockResolvedValueOnce() // INSERT INTO compound_employees
        .mockResolvedValueOnce() // COMMIT

      await createEmployee(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(4)
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
      expect(cloudinary.uploader.upload).toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockUser.rows[0]
      })
    })

    it('should handle database errors and rollback', async () => {
      req.body = {
        username: 'testuser',
        email: 'test@test.com',
        password: 'password123',
        compound_id: 1
      }

      bcrypt.hash.mockResolvedValue('hashed_password')
      pool.query.mockRejectedValueOnce(new Error('Database error'))

      await createEmployee(req, res, next)

      expect(pool.query).toHaveBeenCalledWith('ROLLBACK')
      expect(next).toHaveBeenCalled()
    })
  })

  describe('deleteEmployee', () => {
    it('should delete an employee successfully', async () => {
      req.params = { id: 1 }

      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1, role: 'Employee' }] })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })

      await deleteEmployee(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(2)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Employee deleted successfully'
      })
    })

    it('should handle employee not found', async () => {
      req.params = { id: 999 }
      pool.query.mockResolvedValueOnce({ rows: [] })

      await deleteEmployee(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('assignToEvent', () => {
    it('should assign employee to event successfully', async () => {
      const mockTask = { rows: [{ id: 1 }] }
      const mockAssignment = { rows: [{ id: 1, event_id: 1, employee_id: 1 }] }

      req.body = {
        event_id: 1,
        employee_id: 1
      }

      pool.query
        .mockResolvedValueOnce({ rows: [{ compound_id: 1 }] })
        .mockResolvedValueOnce(mockTask)
        .mockResolvedValueOnce(mockAssignment)

      await assignToEvent(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(3)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockAssignment.rows[0]
      })
    })

    it('should handle invalid compound assignment', async () => {
      req.body = {
        event_id: 1,
        employee_id: 1
      }

      pool.query.mockResolvedValueOnce({ rows: [] })

      await assignToEvent(req, res, next)

      expect(res.status).toHaveBeenCalledWith(400)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('getEmployeeEventTasks', () => {
    it('should get employee tasks successfully', async () => {
      const mockTasks = {
        rows: [{
          task_id: 1,
          task_description: 'Test task',
          event_id: 1,
          employee_id: 1
        }]
      }

      req.params = {
        event_id: 1,
        employee_id: 1
      }

      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // employee exists
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // event exists
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // assignment exists
        .mockResolvedValueOnce(mockTasks)

      await getEmployeeEventTasks(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(4)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        data: mockTasks.rows
      })
    })

    it('should handle employee not found', async () => {
      req.params = {
        event_id: 1,
        employee_id: 999
      }

      pool.query.mockResolvedValueOnce({ rows: [] })

      await getEmployeeEventTasks(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('removeTask', () => {
    it('should remove task successfully', async () => {
      req.params = { task_id: 1 }

      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })
        .mockResolvedValueOnce({ rows: [{ id: 1 }] })

      await removeTask(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(2)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Task removed successfully'
      })
    })

    it('should handle task not found', async () => {
      req.params = { task_id: 999 }

      pool.query.mockResolvedValueOnce({ rows: [] })

      await removeTask(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Task assignment not found'
      })
    })
  })

  describe('assignTask', () => {
    it('should assign task successfully', async () => {
      const mockTask = {
        rows: [{
          id: 1,
          description: 'Test task',
          employee_id: 1
        }]
      }

      req.body = {
        event_id: 1,
        employee_id: 1,
        description: 'Test task'
      }

      pool.query
        .mockResolvedValueOnce() // BEGIN
        .mockResolvedValueOnce(mockTask) // INSERT INTO tasks
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT INTO event_employees_tasks
        .mockResolvedValueOnce() // COMMIT

      await assignTask(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(4)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        data: mockTask.rows[0]
      })
    })

    it('should handle database errors', async () => {
      req.body = {
        event_id: 1,
        employee_id: 1,
        description: 'Test task'
      }

      pool.query.mockRejectedValueOnce(new Error('Database error'))

      await assignTask(req, res, next)

      expect(next).toHaveBeenCalled()
    })
  })
})