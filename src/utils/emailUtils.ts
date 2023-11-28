export const sendResetPasswordEmail = (email: string, resetToken: string) => {
    console.log(`Sending reset password email to ${email} with token: ${resetToken}`);
};
