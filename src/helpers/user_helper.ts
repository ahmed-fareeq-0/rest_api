import * as crypto from 'crypto';

const hashPassword = (password: string): string => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
};

export { hashPassword };
