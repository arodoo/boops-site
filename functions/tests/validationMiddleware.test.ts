import { Request, Response } from 'express';
import { validateEmailAndPassword } from '../middlewares/validationMiddleware'; 

describe('Validation Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let sendMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        sendMock = jest.fn().mockReturnThis();
        req = { body: {} };
        res = { status: statusMock, send: sendMock };
    });

    it('should return false and 400 if email is missing', () => {
        req.body = { password: 'password123' };

        const result = validateEmailAndPassword(req as Request, res as Response);
        expect(result).toBe(false);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(sendMock).toHaveBeenCalledWith('Email and password are required');
    });

    it('should return false and 400 if password is missing', () => {
        req.body = { email: 'test@example.com' };

        const result = validateEmailAndPassword(req as Request, res as Response);
        expect(result).toBe(false);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(sendMock).toHaveBeenCalledWith('Email and password are required');
    });

    it('should return true if both email and password are present', () => {
        req.body = { email: 'test@example.com', password: 'password123' };

        const result = validateEmailAndPassword(req as Request, res as Response);
        expect(result).toBe(true);
        expect(statusMock).not.toHaveBeenCalled();
        expect(sendMock).not.toHaveBeenCalled();
    });
});