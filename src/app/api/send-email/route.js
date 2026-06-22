import { sendMail } from '@/services/mailer';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    if (rateLimit(`email:${ip}`, { limit: 3, windowMs: 60 * 60 * 1000 })) {
      return new Response(JSON.stringify({ message: 'Too many requests' }), { status: 429 });
    }

    const { name, phone, email, comment = '', subject } = await req.json();

    await sendMail({
      to: 'huellitasctgna@outlook.com',
      subject: `Web Huellitas - ${subject}`,
      text: `Nombre: ${name}\nTeléfono: ${phone}\nCorreo electrónico: ${email}\nConsulta: ${comment}`,
    });

    return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error sending email' }), { status: 500 });
  }
}
