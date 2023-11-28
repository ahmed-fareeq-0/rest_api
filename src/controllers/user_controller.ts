import { Request, Response } from "express";
import { s_user_login, s_user_register, s_user_forgot_password, s_user_reset_password } from "../services/user_service"
import { validationResult } from "express-validator";


export const user_register_controller = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.json({
            error: true,
            errors: errors.array(),
            message: "تأكد من صحة البيانات"
        })

    } else {
        await s_user_register(req, res, (result: any) => {
            res.json(result);
        });
        
    }

}

export const user_login_controller = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        res.json({
            error: true,
            errors: errors.array(),
            message: "تأكد من صحة البيانات"
        })

    } else {
        await s_user_login(req, res, (result: any) => {
            res.json(result);
        });
        
    }

}

export const user_forgot_password_controller = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json({
            error: true,
            errors: errors.array(),
            message: "تأكد من صحة البيانات"
        });
    } else {
        await s_user_forgot_password(req, res, (result: any) => {
            res.json(result);
        });
    }
};

export const user_reset_password_controller = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.json({
            error: true,
            errors: errors.array(),
            message: "تأكد من صحة البيانات"
        });
    } else {
        await s_user_reset_password(req, res, (result: any) => {
            res.json(result);
        });
    }
};


