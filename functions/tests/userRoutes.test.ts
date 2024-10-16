import request from 'supertest';
import express from 'express';
import router from '../routes/userRoutes';
import { registerUser, loginUser } from '../services/userService';

jest.mock('../services/userService');

const app = express();
app.use(express.json());
app.use('/api', router);

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const mockUserCredential = { user: { uid: '123' } };
      (registerUser as jest.Mock).mockResolvedValue(mockUserCredential);

      const response = await request(app)
        .post('/api/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockUserCredential.user);
      expect(registerUser).toHaveBeenCalledWith('test@example.com', 'password123');
    });



    it('should return 400 if email or password is missing', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ email: 'test@example.com' }); // Missing password

      expect(response.status).toBe(400);
      expect(response.text).toBe('Email and password are required');
    });

    it('should handle error when registering a new user', async () => {
      const mockError = new Error('Firebase Error');
      (registerUser as jest.Mock).mockRejectedValue(mockError);

      const response = await request(app)
        .post('/api/register')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      /* expect(response.text).toBe('Error Registering User: Firebase Error'); */
    });

  });

  describe('POST /login', () => {
    it('should login an existing user', async () => {
      const mockUserCredential = { user: { uid: '123' } };
      (loginUser as jest.Mock).mockResolvedValue(mockUserCredential);

      const response = await request(app)
        .post('/api/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserCredential.user);
      expect(loginUser).toHaveBeenCalledWith('test@example.com', 'password123');
    });

    it('should return 400 if email or password is missing', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ email: 'test@example.com' }); // Missing password

      expect(response.status).toBe(400);
      expect(response.text).toBe('Email and password are required');
    });

/*     it('should handle error when logging in an existing user', async () => {
      const mockError = new Error('Firebase Error');
      (loginUser as jest.Mock).mockRejectedValue(mockError);

      const response = await request(app)
        .post('/api/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(500);
      expect(response.text).toBe('Error Logging In User: Firebase Error');
    });
 */
  });
});