import { check } from "express-validator"

export const register_validation = () => {
    return [
        check("name").exists().withMessage("الأسم مطلوب").isLength({ min: 3, max: 60 }).withMessage("اقل عدد للحروف هي ثلاثة"),
        check("email").isEmail().withMessage("البريد الاكتروني مطلوب"),
        check("password").isString().withMessage("كلمة المرور مطلوبة").isLength({ min: 8 }),
        check("phone").isString().withMessage("رقم الهاتف مطلوب"),
    ];
}