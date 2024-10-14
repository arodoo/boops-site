import * as dotenv from 'dotenv';
import { auth } from '../config/firebaseConfig';

dotenv.config();

describe('Firebase initialization', () => {
    beforeAll(() => {
        // Verificar que las variables de entorno están definidas
        expect(process.env.FIREBASE_API_KEY).toBeDefined();
        expect(process.env.FIREBASE_AUTH_DOMAIN).toBeDefined();
        expect(process.env.FIREBASE_PROJECT_ID).toBeDefined();
        expect(process.env.FIREBASE_STORAGE_BUCKET).toBeDefined();
        expect(process.env.FIREBASE_MESSAGING_SENDER_ID).toBeDefined();
        expect(process.env.FIREBASE_APP_ID).toBeDefined();
    });

    it('should init firebase app with the correct config', () => {
        expect(auth).toBeDefined();
        expect(auth.app).toBeDefined();
        expect(auth.app.options.apiKey).toBe(process.env.FIREBASE_API_KEY);
        expect(auth.app.options.authDomain).toBe(process.env.FIREBASE_AUTH_DOMAIN);
        expect(auth.app.options.projectId).toBe(process.env.FIREBASE_PROJECT_ID);
        expect(auth.app.options.storageBucket).toBe(process.env.FIREBASE_STORAGE_BUCKET);
        expect(auth.app.options.messagingSenderId).toBe(process.env.FIREBASE_MESSAGING_SENDER_ID);
        expect(auth.app.options.appId).toBe(process.env.FIREBASE_APP_ID);
    });
});
