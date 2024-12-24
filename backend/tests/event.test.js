import app from '../app';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import pool from '../lib/db.js'
import eventRoutes from '../routes/Event.js';
// Mock the database
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
  app.use('/api/events', eventRoutes)
  
  describe('Compound Routes', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })
  
    afterEach(() => {
      vi.clearAllMocks()
    })
    
describe('Event Controllers', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('POST /api/events', () => {
    it('should create a new event when compound exists', async () => {
      const eventData = {
        name: 'Test Event',
        description: 'This is a test event',
        start_date: '2024-12-24T15:30:00Z',
        end_date: '2024-12-25T15:30:00Z',
        compound_id: 1
      };

      // Mock compound check query
      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // Compound exists
        .mockResolvedValueOnce({ rows: [eventData] }); // Event creation

      const response = await request(app)
        .post('/api/events/create')
        .send(eventData);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        status: 'success',
        data: expect.objectContaining(eventData)
      });
    });

    it('should return error when compound does not exist', async () => {
      const eventData = {
        name: 'Test Event',
        description: 'This is a test event',
        start_date: '2024-01-01',
        end_date: '2024-01-02',
        compound_id: 999
      };

      // Mock compound check query to return empty
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app)
        .post('/api/events')
        .send(eventData);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        message: 'Compound not found'
      });
    });
  });

  describe('GET /api/events', () => {
    it('should get all events for a compound', async () => {
      const mockEvents = [
        { id: 1, name: 'Test Event 1', description: 'Description 1' },
        { id: 2, name: 'Test Event 2', description: 'Description 2' }
      ];

      // Mock the events query
      pool.query.mockResolvedValueOnce({ rows: mockEvents });

      const response = await request(app)
        .get('/api/events')
        .send({ compound_id: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'success',
        data: mockEvents
      });
      expect(pool.query).toHaveBeenCalledWith(
        expect.any(String),
        expect.arrayContaining([1])
      );
    });
  });

  describe('GET /api/events/:id', () => {
    it('should get an event by id with its details', async () => {
      const mockEvent = {
        id: 1,
        name: 'Test Event',
        description: 'Description'
      };

      // Mock queries for event, guest list, and program
      pool.query
        .mockResolvedValueOnce({ rows: [mockEvent] }) // Event details
        .mockResolvedValueOnce({ rows: [] }) // Guest list
        .mockResolvedValueOnce({ rows: [] }); // Program

      const response = await request(app)
        .get('/api/events/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'success',
        data: {
          event: mockEvent,
          guestList: [],
          program: []
        }
      });
    });

    it('should return 404 if event not found', async () => {
      // Mock event query to return empty
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app)
        .get('/api/events/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Event not found'
      });
    });
  });

  describe('DELETE /api/events/:id', () => {
    it('should delete an event successfully', async () => {
      // Mock event check and deletion
      pool.query
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // Event exists check
        .mockResolvedValueOnce({ rows: [{ id: 1 }] }); // Deletion query

      const response = await request(app)
        .delete('/api/events/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: 'success',
        message: 'Event deleted successfully'
      });
    });

    it('should return 404 if event to delete not found', async () => {
      // Mock event check to return empty
      pool.query.mockResolvedValueOnce({ rows: [] });

      const response = await request(app)
        .delete('/api/events/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Event not found'
      });
    });
  });
})})
