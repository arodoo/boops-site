import { registerUser, loginUser } from '../services/userService';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth');

describe('User Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should register a new user', async () => {
        const mockUserCredential = { user: { uid: '123' } };
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

        const result = await registerUser('test@example.com', 'password123');
        expect(result).toEqual(mockUserCredential);
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    });

    it('should throw an error when registering a user fails', async () => {
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('Firebase Error when registering user'));

        await expect(registerUser('test@example.com', 'password123')).rejects.toThrow('Firebase Error when registering user');
    });

    it('should login an existing user', async () => {
        const mockUserCredential = { user: { uid: '123' } };
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUserCredential);

        const result = await loginUser('test@example.com', 'password123');
        expect(result).toEqual(mockUserCredential);
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
    });

    it('should throw an error when logging in a user fails', async () => {
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('Firebase Error when logging in user'));

        await expect(loginUser('est@example.com', 'password123')).rejects.toThrow('Firebase Error when logging in user');
    });
});