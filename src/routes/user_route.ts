import express from 'express';
import { user_login_controller, user_register_controller, user_forgot_password_controller,user_reset_password_controller } from '../controllers/user_controller';
import { register_validation } from '../validations/register_validation';
import { login_validation } from '../validations/login_validation';

export const user_route = express.Router();

user_route.post("/register", register_validation(), user_register_controller);
user_route.post("/login", login_validation(), user_login_controller);
user_route.post('/forgot_password', user_forgot_password_controller);
user_route.post('/reset_password', user_reset_password_controller);

