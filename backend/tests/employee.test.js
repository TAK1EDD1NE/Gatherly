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
import bcrypt from 'bcrypt'

// Mock the dependencies
jest.mock('../lib/db.js')
jest.mock('../api/cloudinary.js')
jest.mock('bcrypt')

describe('Employee Controller Tests', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Mock response object
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mock next function
        next = jest.fn();

        // Mock bcrypt hash
        bcrypt.hash.mockResolvedValue('hashedPassword123');
    });

    describe('createEmployee', () => {
        beforeEach(() => {
            req = {
                body: {
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                    pfp: 'base64image',
                    compound_id: 1
                }
            };

            // Mock cloudinary upload
            cloudinary.uploader.upload.mockResolvedValue({
                secure_url: 'https://cloudinary.com/image.jpg'
            });

            // Mock database queries
            pool.query
                .mockResolvedValueOnce({ rows: [] }) // BEGIN
                .mockResolvedValueOnce({ 
                    rows: [{
                        id: 1,
                        username: 'testuser',
                        email: 'test@example.com',
                        pfp: 'https://cloudinary.com/image.jpg',
                        role: 'Employee'
                    }]
                }) // INSERT user
                .mockResolvedValueOnce({ rows: [] }) // INSERT compound_employee
                .mockResolvedValueOnce({ rows: [] }); // COMMIT
        });

        it('should create an employee successfully with profile picture', async () => {
            await createEmployee(req, res, next);

            expect(cloudinary.uploader.upload).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
            expect(pool.query).toHaveBeenCalledTimes(4);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: expect.objectContaining({
                    id: 1,
                    username: 'testuser',
                    email: 'test@example.com'
                })
            });
        });

        it('should handle database errors properly', async () => {
            pool.query.mockRejectedValueOnce(new Error('Database error'));

            await createEmployee(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
            expect(pool.query).toHaveBeenCalledWith('BEGIN');
        });
    });

    describe('deleteEmployee', () => {
        beforeEach(() => {
            req = {
                params: { id: 1 }
            };
        });

        it('should delete an employee successfully', async () => {
            pool.query
                .mockResolvedValueOnce({ rows: [{ id: 1, role: 'Employee' }] })
                .mockResolvedValueOnce({ rows: [] });

            await deleteEmployee(req, res, next);

            expect(pool.query).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Employee deleted successfully'
            });
        });

        it('should handle non-existent employee', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            await deleteEmployee(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('assignToEvent', () => {
        beforeEach(() => {
            req = {
                body: {
                    event_id: 1,
                    employee_id: 1
                }
            };
        });

        it('should assign employee to event successfully', async () => {
            pool.query
                .mockResolvedValueOnce({ rows: [{ compound_id: 1 }] })
                .mockResolvedValueOnce({ rows: [{ id: 1 }] })
                .mockResolvedValueOnce({ rows: [{ id: 1 }] });

            await assignToEvent(req, res, next);

            expect(pool.query).toHaveBeenCalledTimes(3);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: expect.any(Object)
            });
        });

        it('should handle invalid compound assignment', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            await assignToEvent(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('getEmployeeEventTasks', () => {
        beforeEach(() => {
            req = {
                params: {
                    event_id: 1,
                    employee_id: 1
                }
            };
        });

        it('should get employee tasks successfully', async () => {
            const mockTasks = [{
                task_id: 1,
                task_description: 'Test task',
                event_id: 1,
                event_name: 'Test event',
                employee_id: 1
            }];

            pool.query
                .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // employee exists
                .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // event exists
                .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // assignment exists
                .mockResolvedValueOnce({ rows: mockTasks }); // tasks query

            await getEmployeeEventTasks(req, res, next);

            expect(pool.query).toHaveBeenCalledTimes(4);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                data: mockTasks
            });
        });

        it('should handle non-existent employee', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            await getEmployeeEventTasks(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('assignTask', () => {
        beforeEach(() => {
            req = {
                body: {
                    event_id: 1,
                    employee_id: 1,
                    description: 'Test task'
                }
            };
        });

        it('should assign task successfully', async () => {
            pool.query
                .mockResolvedValueOnce({ rows: [] }) // BEGIN
                .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT task
                .mockResolvedValueOnce({ rows: [{ id: 1 }] }) // INSERT event_employees_tasks
                .mockResolvedValueOnce({ rows: [] }); // COMMIT

            await assignTask(req, res, next);

            expect(pool.query).toHaveBeenCalledTimes(4);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    id: 1
                })
            });
        });

        it('should handle database errors', async () => {
            pool.query.mockRejectedValueOnce(new Error('Database error'));

            await assignTask(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('removeTask', () => {
        beforeEach(() => {
            req = {
                params: {
                    task_id: 1
                }
            };
        });

        it('should remove task successfully', async () => {
            pool.query
                .mockResolvedValueOnce({ rows: [{ id: 1 }] })
                .mockResolvedValueOnce({ rows: [{ id: 1 }] });

            await removeTask(req, res, next);

            expect(pool.query).toHaveBeenCalledTimes(2);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Task removed successfully'
            });
        });

        it('should handle non-existent task', async () => {
            pool.query.mockResolvedValueOnce({ rows: [] });

            await removeTask(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                status: 'error',
                message: 'Task assignment not found'
            });
        });
    });
});