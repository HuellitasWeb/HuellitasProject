import { sendMail } from '@/services/mailer';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

// Rate limit en memoria por IP: 3 envíos por hora.
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hitsByIp = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recentHits = (hitsByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (recentHits.length >= RATE_LIMIT) {
    hitsByIp.set(ip, recentHits);
    return true;
  }

  recentHits.push(now);
  hitsByIp.set(ip, recentHits);
  return false;
}

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
