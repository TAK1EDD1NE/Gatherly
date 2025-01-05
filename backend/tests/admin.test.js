// adminControllers.test.js

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { join_as_admin, get_admin } from '../controllers/Admin.js'
import pool from '../lib/db.js';

// Mock dependencies
vi.mock('../lib/db.js', () => ({
  default: {
    query: vi.fn(),
  },
}));

const mockReq = (userData, bodyData) => ({
  user: userData,
  body: bodyData,
});

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  return res;
};

const mockNext = vi.fn();

describe('Admin Controllers', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('join_as_admin', () => {
    it('should successfully join as admin', async () => {
      const req = mockReq({ id: 1 }, { stripe_id: 'stripe123' });
      const res = mockRes();

      // Mock DB queries
      pool.query
        .mockResolvedValueOnce({ rowCount: 1 }) // For INSERT INTO admins
        .mockResolvedValueOnce({ rowCount: 1 }); // For UPDATE users

      await join_as_admin(req, res, mockNext);

      expect(pool.query).toHaveBeenCalledTimes(2);
      expect(res.status).not.toHaveBeenCalledWith(500);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Successfully joined as admin' });
    });

    it('should handle insertion failure', async () => {
      const req = mockReq({ id: 1 }, { stripe_id: 'stripe123' });
      const res = mockRes();

      pool.query.mockResolvedValueOnce({ rowCount: 0 });

      await join_as_admin(req, res, mockNext);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('get_admin', () => {
    it('should return admin information', async () => {
      const req = mockReq({ id: 1 }, {});
      const res = mockRes();

      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          username: 'adminUser',
          email: 'admin@example.com',
          pfp: 'profile.png',
          role: 'Admin',
          stripe_id: 'stripe123'
        }],
      });

      await get_admin(req, res, mockNext);

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        username: 'adminUser',
        email: 'admin@example.com',
        pfp: 'profile.png',
        role: 'Admin',
        stripe_id: 'stripe123',
      });
    });
  });
});
