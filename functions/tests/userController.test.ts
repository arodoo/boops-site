import { Request, Response, NextFunction } from 'express';
import { registerUserController, loginUserController } from '../controllers/userController';
import { registerUser, loginUser } from '../services/userService';
import { validateEmailAndPassword } from '../middlewares/validationMiddleware';

jest.mock('../services/userService');
jest.mock('../middlewares/validationMiddleware');

describe('User controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let statusMock: jest.Mock;
    let sendMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        sendMock = jest.fn().mockReturnThis();
        next = jest.fn();
        req = { body: { email: 'test@example.com', password: 'password123' } };
        res = { status: statusMock, send: sendMock };
    });

    it('should register a new user', async () => {
        const mockUserCredential = { user: { uid: '123' } };
        (registerUser as jest.Mock).mockResolvedValue(mockUserCredential);
        (validateEmailAndPassword as jest.Mock).mockReturnValue(true);

        await registerUserController(req as Request, res as Response, next);

        expect(registerUser).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(sendMock).toHaveBeenCalledWith(mockUserCredential.user);
    });

    it('should return 400 if email or password is missing during registration', async () => {
        req.body = { email: '' };  // Omitir email para provocar un error
        (validateEmailAndPassword as jest.Mock).mockImplementation(() => {
            if (res.status && res.send) {
                res.status(400).send('Email and password are required');
            }
            return false;
        });
        
        await registerUserController(req as Request, res as Response, next);

        expect(validateEmailAndPassword).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(sendMock).toHaveBeenCalledWith('Email and password are required');
    });

    it('should login an existing user', async () => {
        const mockUserCredential = { user: { uid: '123' } };
        (loginUser as jest.Mock).mockResolvedValue(mockUserCredential);
        (validateEmailAndPassword as jest.Mock).mockReturnValue(true);

        await loginUserController(req as Request, res as Response, next);

        expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith(mockUserCredential.user);
    });

    it('should return 400 if email or password is missing during login', async () => {
        req.body = { email: '' };  // Omitir email para provocar un error
        (validateEmailAndPassword as jest.Mock).mockImplementation(() => {
            if (res.status && res.send) {
                res.status(400).send('Email and password are required');
            }
            return false;
        });

        await loginUserController(req as Request, res as Response, next);

        expect(validateEmailAndPassword).toHaveBeenCalled();
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(sendMock).toHaveBeenCalledWith('Email and password are required');
    });

});
