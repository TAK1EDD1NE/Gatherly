import app from '../app';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import request from 'supertest'
import express from 'express'
import userRoutes from '../routes/User.js'
import pool from '../lib/db.js'
import cloudinary from '../api/cloudinary.js'
import bcrypt from 'bcrypt'

describe('Event Controllers', () => {
  beforeEach(async () => {
    await pool.query('DELETE FROM events');
    await pool.query('DELETE FROM guest_lists');
    await pool.query('DELETE FROM event_program');
  });

  describe('POST /api/events', () => {
    it('should create a new event', async () => {
      const eventData = {
        name: 'Test Event',
        description: 'This is a test event',
        start_date: '2024-01-01',
        end_date: '2024-01-02',
        compound_id: 1
      };

      const response = await request(app).post('/api/events').send(eventData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('data');
    });
  });

  describe('GET /api/events', () => {
    it('should get all events', async () => {
      await pool.query('INSERT INTO events (name, description, start_date, end_date, compound_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', ['Test Event 1', 'This is a test event 1', '2024-01-01', '2024-01-02', 1]);
      await pool.query('INSERT INTO events (name, description, start_date, end_date, compound_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', ['Test Event 2', 'This is a test event 2', '2024-01-03', '2024-01-04', 1]);

      const response = await request(app).get('/api/events').send({ compound_id: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe('GET /api/events/:id', () => {
    it('should get an event by id', async () => {
      const event = await pool.query('INSERT INTO events (name, description, start_date, end_date, compound_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', ['Test Event', 'This is a test event', '2024-01-01', '2024-01-02', 1]);

      const response = await request(app).get(`/api/events/${event.rows[0].id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.event).toHaveProperty('id', event.rows[0].id);
    });

    it('should return 404 if event not found', async () => {
      const response = await request(app).get('/api/events/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'Event not found');
    });
  });

  describe('DELETE /api/events/:id', () => {
    it('should delete an event', async () => {
      const event = await pool.query('INSERT INTO events (name, description, start_date, end_date, compound_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', ['Test Event', 'This is a test event', '2024-01-01', '2024-01-02', 1]);

      const response = await request(app).delete(`/api/events/${event.rows[0].id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'success');
      expect(response.body).toHaveProperty('message', 'Event deleted successfully');
    });

    it('should return 404 if event not found', async () => {
      const response = await request(app).delete('/api/events/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('status', 'error');
      expect(response.body).toHaveProperty('message', 'Event not found');
    });
  });
})
//   describe('POST /api/events/:id/guests', () => {
//     it('should add a guest to an event', async () => {
//       const event = await pool.query('INSERT INTO events (name, description, start_date, end_date, compound_id) VALUES ($1, $2, $3, $4, $5) RETURNING *