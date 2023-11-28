import * as jwt from 'jsonwebtoken';

const secretKey = ' my_secret_key';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, secretKey);
};
