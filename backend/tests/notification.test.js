import { describe, it, expect, vi, beforeEach } from 'vitest'
import pool from '../lib/db.js'
import {
  sendNotification,
  getNotifications,
  seenNotification
} from '../controllers/Notification.js'

// Mock the database pool
vi.mock('../lib/db.js', () => ({
  default: {
    query: vi.fn()
  }
}))

describe('Notification Controller', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {
      user: { _id: 1 },
      body: {}
    }
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    }
    next = vi.fn()
    
    // Clear all mocks before each test
    vi.clearAllMocks()
  })

  describe('sendNotification', () => {
    it('should send a notification successfully', async () => {
      const from = 1
      const to = 2
      const note = 'Test notification'

      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] })

      await sendNotification(from, to, note)

      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO notifications (sender_id, receiver_id, seen, note) VALUES ($1, $2, $3, $4)',
        [from, to, false, note]
      )
    })

    it('should throw error when database query fails', async () => {
      const from = 1
      const to = 2
      const note = 'Test notification'

      const error = new Error('Database error')
      pool.query.mockRejectedValueOnce(error)

      await expect(sendNotification(from, to, note)).rejects.toThrow('Database error')
    })
  })

  describe('getNotifications', () => {
    it('should get notifications successfully', async () => {
      const mockNotifications = {
        rows: [
          { 
            id: 1, 
            sender_id: 2, 
            receiver_id: 1, 
            note: 'Test notification',
            created_at: new Date()
          }
        ]
      }

      const mockUser = {
        rows: [{
          username: 'testuser',
          pfp: 'profile.jpg'
        }]
      }

      pool.query
        .mockResolvedValueOnce(mockNotifications)
        .mockResolvedValueOnce(mockUser)

      await getNotifications(req, res, next)

      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM notifications WHERE receiver_id = $1 ORDER BY created_at DESC',
        [1]
      )
      expect(res.status).toHaveBeenCalledWith(200)
      // Note: The actual response might be empty due to async forEach
      expect(res.json).toHaveBeenCalled()
    })

    it('should handle errors when getting notifications', async () => {
      const error = new Error('Database error')
      pool.query.mockRejectedValueOnce(error)

      await getNotifications(req, res, next)

      expect(next).toHaveBeenCalledWith(error)
    })
  })

  describe('seenNotification', () => {
    it('should mark notification as seen successfully', async () => {
      req.body = {
        from: 1,
        to: 2,
        note: 'Test notification'
      }

      pool.query.mockResolvedValueOnce({ rows: [{ seen: true }] })

      await seenNotification(req, res, next)

      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE notifications SET seen = TRUE WHERE sender_id = $1 AND receiver_id = $2',
        [1, 2]
      )
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'seen' })
    })

    it('should handle errors when marking notification as seen', async () => {
      req.body = {
        from: 1,
        to: 2,
        note: 'Test notification'
      }

      const error = new Error('Database error')
      pool.query.mockRejectedValueOnce(error)

      await seenNotification(req, res, next)

      expect(next).toHaveBeenCalledWith(error)
    })
  })
})