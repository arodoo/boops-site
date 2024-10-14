import { Request, Response } from 'express'
import {registerUserController, loginUserController} from '../controllers/userController'
import {registerUser, loginUser} from '../services/userService'

jest.mock('../services/userService');

describe('User controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let sendMock: jest.Mock;

    beforeEach(() => {
        statusMock = jest.fn().mockReturnThis();
        sendMock = jest.fn().mockReturnThis();
        req = {body: {email: 'test@example.com', password: 'password123'}};
        res = {status: statusMock, send: sendMock};
    })

    it('should register a new user', async () => {
        const mockUserCredential = { user: { uid: '123' } };
        (registerUser as jest.Mock).mockResolvedValue(mockUserCredential);

        await registerUserController(req as Request, res as Response);

        expect(registerUser).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(sendMock).toHaveBeenCalledWith(mockUserCredential.user);
    })

    it('should login an existing user', async () => {
        const mockUserCredential = { user: { uid: '123' } };
        (loginUser as jest.Mock).mockResolvedValue(mockUserCredential);

        await loginUserController(req as Request, res as Response);

        expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(sendMock).toHaveBeenCalledWith(mockUserCredential.user);
    })
})