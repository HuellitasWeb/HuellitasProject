// Plantillas de correo de Huellitas Cartagena.

const BRAND_COLOR = '#6C5CE7';
const LOGO_URL = 'https://www.huellitasctgna.com/assets/Login/logo_login.png';
const PANEL_URL = 'https://www.huellitasctgna.com/auth';

// Correo de "nueva contraseña" para el flujo de recuperación.
export function passwordResetEmail({ nombre, password }) {
    const saludo = nombre ? `Hola ${nombre},` : 'Hola,';
    const subject = 'Huellitas Cartagena - Nueva contraseña de acceso';

    const text = `${saludo}

Recibimos una solicitud para restablecer la contraseña de tu cuenta del panel de Huellitas Cartagena.

Tu nueva contraseña temporal es: ${password}

Ingresa en ${PANEL_URL} con esta contraseña y, por seguridad, cámbiala desde el panel en la sección "MI CUENTA".

Si no solicitaste este cambio, ignora este correo.

— Huellitas Cartagena`;

    const html = `<!DOCTYPE html>
<html lang="es">
  <body style="margin:0;padding:0;background-color:#f4f4f7;font-family:Arial,Helvetica,sans-serif;color:#22202A;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td align="center" style="background-color:${BRAND_COLOR};padding:28px 24px;">
                <img src="${LOGO_URL}" alt="Huellitas Cartagena" width="120" style="display:block;max-width:120px;height:auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px;">
                <p style="margin:0 0 16px;font-size:16px;">${saludo}</p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
                  Recibimos una solicitud para restablecer la contraseña de tu cuenta del panel de
                  <strong>Huellitas Cartagena</strong>. Tu nueva contraseña temporal es:
                </p>
                <p style="margin:0 0 24px;text-align:center;">
                  <span style="display:inline-block;background-color:#f2f0fd;color:${BRAND_COLOR};font-size:22px;font-weight:bold;letter-spacing:2px;padding:14px 24px;border-radius:12px;">${password}</span>
                </p>
                <p style="margin:0 0 24px;text-align:center;">
                  <a href="${PANEL_URL}" style="display:inline-block;background-color:${BRAND_COLOR};color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 28px;border-radius:24px;">Ir al panel</a>
                </p>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;">
                  Por seguridad, cámbiala apenas ingreses desde la sección <strong>"MI CUENTA"</strong> del panel.
                </p>
                <p style="margin:0;font-size:12px;color:#6B6B6B;line-height:1.6;">
                  Si no solicitaste este cambio, ignora este correo; tu contraseña anterior dejará de funcionar solo si usas la nueva.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color:#f2f0fd;padding:16px 24px;font-size:12px;color:#6B6B6B;">
                Huellitas Cartagena
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

    return { subject, html, text };
}
