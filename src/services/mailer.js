import nodemailer from 'nodemailer';

// Transporter Gmail compartido. Lo usan el formulario de contacto (api/send-email)
// y el reseteo de contraseña (api/auth/restore). Credenciales server-only en EMAIL_*.
export async function sendMail({ to, subject, html, text }) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        text,
    });
}
