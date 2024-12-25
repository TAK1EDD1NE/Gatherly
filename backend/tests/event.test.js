import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import pool from '../lib/db.js'
import {
  createEvent,
  get_all_events,
  getEventById,
  deleteEvent,
  addGuest,
  removeGuest,
  addProgramItem,
  deleteProgramItem
} from '../controllers/Event.js'

// Mock the database pool
vi.mock('../lib/db.js', () => ({
  default: {
    query: vi.fn()
  }
}))

describe('Events Controller', () => {
  // Mock request and response objects
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

  describe('createEvent', () => {
    it('should create a new event successfully', async () => {
      const mockCompound = { rows: [{ id: 1 }] }
      const mockEvent = { 
        rows: [{
          id: 1,
          name: 'Test Event',
          description: 'Test Description'
        }]
      }

      req.body = {
        name: 'Test Event',
        description: 'Test Description',
        start_date: '2024-01-01',
        end_date: '2024-01-02',
        compound_id: 1
      }

      pool.query
        .mockResolvedValueOnce(mockCompound)
        .mockResolvedValueOnce(mockEvent)

      await createEvent(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(2)
      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({ data: mockEvent.rows[0] })
    })

    it('should handle compound not found error', async () => {
      req.body = {
        name: 'Test Event',
        compound_id: 999
      }

      pool.query.mockResolvedValueOnce({ rows: [] })

      await createEvent(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('get_all_events', () => {
    it('should return all events for a compound', async () => {
      const mockEvents = {
        rows: [
          { id: 1, name: 'Event 1' },
          { id: 2, name: 'Event 2' }
        ]
      }

      req.body = { compound_id: 1 }
      pool.query.mockResolvedValueOnce(mockEvents)

      await get_all_events(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockEvents.rows
      })
    })
  })

  describe('getEventById', () => {
    it('should return event with guest list and program', async () => {
      const mockEvent = { rows: [{ id: 1, name: 'Test Event' }] }
      const mockGuests = { rows: [{ id: 1, guest_first_name: 'John' }] }
      const mockProgram = { rows: [{ id: 1, description: 'Opening' }] }

      req.params = { id: 1 }

      pool.query
        .mockResolvedValueOnce(mockEvent)
        .mockResolvedValueOnce(mockGuests)
        .mockResolvedValueOnce(mockProgram)

      await getEventById(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(3)
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: {
          event: mockEvent.rows[0],
          guestList: mockGuests.rows,
          program: mockProgram.rows
        }
      })
    })

    it('should handle event not found', async () => {
      req.params = { id: 999 }
      pool.query.mockResolvedValueOnce({ rows: [] })

      await getEventById(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Event not found'
      })
    })
  })

  describe('deleteEvent', () => {
    it('should delete an event successfully', async () => {
      const mockDeletedEvent = { rows: [{ id: 1 }] }
      req.params = { id: 1 }
      
      pool.query.mockResolvedValueOnce(mockDeletedEvent)

      await deleteEvent(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Event deleted successfully'
      })
    })
  })

  describe('addGuest', () => {
    it('should add a guest successfully', async () => {
      const mockNewGuest = {
        rows: [{
          id: 1,
          guest_first_name: 'John',
          guest_last_name: 'Doe'
        }]
      }

      req.body = {
        guest_first_name: 'John',
        guest_last_name: 'Doe',
        event_id: 1
      }

      pool.query.mockResolvedValueOnce(mockNewGuest)

      await addGuest(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        message: 'success',
        newGuest: mockNewGuest.rows[0]
      })
    })
  })

  describe('removeGuest', () => {
    it('should remove a guest successfully', async () => {
      req.params = { id: 1 }
      pool.query.mockResolvedValueOnce({ rowCount: 1 })

      await removeGuest(req, res, next)

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        message: 'Guest removed successfully'
      })
    })

    it('should handle guest not found', async () => {
      req.params = { id: 999 }
      pool.query.mockResolvedValueOnce({ rowCount: 0 })

      await removeGuest(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('addProgramItem', () => {
    it('should add a program item successfully', async () => {
      const mockProgramItem = {
        rows: [{
          id: 1,
          description: 'Opening Ceremony'
        }]
      }

      req.body = {
        description: 'Opening Ceremony',
        start_time: '10:00',
        end_time: '11:00',
        event_id: 1
      }

      pool.query.mockResolvedValueOnce(mockProgramItem)

      await addProgramItem(req, res, next)

      expect(res.status).toHaveBeenCalledWith(201)
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        id: mockProgramItem.rows[0].id
      })
    })

    it('should handle missing required fields', async () => {
      req.body = {
        description: 'Opening Ceremony'
        // Missing start_time and end_time
      }

      await addProgramItem(req, res, next)

      expect(res.status).toHaveBeenCalledWith(403)
      expect(next).toHaveBeenCalledWith(expect.any(Error))
    })
  })

  describe('deleteProgramItem', () => {
    it('should delete a program item successfully', async () => {
      const mockDeletedItem = { rows: [{ id: 1 }] }
      req.params = { id: 1 }
      
      pool.query.mockResolvedValueOnce(mockDeletedItem)

      await deleteProgramItem(req, res, next)

      expect(pool.query).toHaveBeenCalledTimes(1)
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Program item deleted successfully'
      })
    })

    it('should handle program item not found', async () => {
      req.params = { id: 999 }
      pool.query.mockResolvedValueOnce({ rows: [] })

      await deleteProgramItem(req, res, next)

      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'Program item not found'
      })
    })
  })
})