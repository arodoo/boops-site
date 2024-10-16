import { Request, Response, NextFunction } from 'express';

export const validateEmailAndPassword = (req: Request, res: Response): boolean => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Email and password are required');
        return false;
    }
    return true;
};

// For functions related to validate data
