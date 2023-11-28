import { Request, Response } from "express";
import { UserEntity } from "../entities/user_entity";
import { hashPassword } from "../helpers/user_helper";
import { generateToken } from '../utils/jwtUtils';
import { sendResetPasswordEmail } from '../utils/emailUtils';
import { getRepository } from "typeorm";
import crypto from "crypto";
import { addDays } from 'date-fns';


export const s_user_register = async (req: Request, res: Response, callback: any) => {
    const { name, email, password, phone } = req.body;

    const hashedPassword = hashPassword(password);
    const newUser = UserEntity.create({
        name,
        email,
        password: hashedPassword,
        phone,
    });

    try {
        const user = await UserEntity.save(newUser);
        if (user) {
            callback({ message: 'تم تسجيل حساب جديد بنجاح', user });
            return;
        } else {
            callback({ message: 'تأكد من معلومات التسجيل ' });
            return;
        }
    } catch (error) {
        console.error('حدث خطأ أثناء تسجيل الحساب:', error);
        callback({ error: 'حدث خطأ أثناء تسجيل الحساب' });
    }

};

export const s_user_login = async (req: Request, res: Response, callback: any) => {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);


    try {
        const userRepository = getRepository(UserEntity);
        const user = await userRepository.findOne({ where: { email, password: hashedPassword } });
        if (user) {
            const salt = crypto.randomBytes(16).toString('hex');
            const token = generateToken({ email, salt });
            callback({ message: 'تم تسجيل الدخول بنجاح', user, token });
            return;

        } else {
            callback({ message: 'هناك مشكلة في البيانات' });
            return;
        }

    } catch (error) {
        console.error('حدث خطأ أثناء تسجيل الدخول:', error);
        callback({ error: 'حدث خطأ أثناء تسجيل الدخول' });
    }

}

export const s_user_forgot_password = async (req: Request, res: Response, callback: any) => {
    const { email } = req.body;

    try {
        const userRepository = getRepository(UserEntity);
        const user = await userRepository.findOne({ where: { email } });

        if (user) {
            const resetToken = crypto.randomBytes(20).toString('hex');

            const expirationTime = addDays(new Date(), 1);

            user.resetToken = resetToken;
            user.resetTokenExpiration = expirationTime;
            await userRepository.save(user);

            sendResetPasswordEmail(user.email, resetToken);

            callback({ message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني' });
            return;
        } else {
            callback({ message: 'المستخدم غير مسجل' });
            return;
        }
    } catch (error) {
        console.error('حدث خطأ أثناء إعادة تعيين كلمة المرور:', error);
        callback({ error: 'حدث خطأ أثناء إعادة تعيين كلمة المرور' });
    }
};

export const s_user_reset_password = async (req: Request, res: Response, callback: any) => {
    const { resetToken, newPassword } = req.body;

    try {
        const userRepository = getRepository(UserEntity);
        const user = await userRepository.findOne({ where: { resetToken } });

        if (user && user.resetTokenExpiration && user.resetTokenExpiration > new Date()) {
            const hashedPassword = hashPassword(newPassword);
            user.password = hashedPassword;
            
            user.resetToken = null;
            user.resetTokenExpiration = null;

            await userRepository.save(user);

            callback({ message: 'تم إعادة تعيين كلمة المرور بنجاح' });
            return;
        } else {
            callback({ message: 'رمز إعادة تعيين كلمة المرور غير صالح أو منتهي الصلاحية' });
            return;
        }
    } catch (error) {
        console.error('حدث خطأ أثناء إعادة تعيين كلمة المرور:', error);
        callback({ error: 'حدث خطأ أثناء إعادة تعيين كلمة المرور' });
    }
};



