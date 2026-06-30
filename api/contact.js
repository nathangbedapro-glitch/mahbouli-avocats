/**
 * POST /api/contact
 * Handles contact form submissions with two parallel calls:
 *   1. Web3Forms → notifies the cabinet by email
 *   2. Brevo SMTP → sends a confirmation email to the visitor
 * Body JSON: { name?, prenom?, nom?, email, phone?, domaine_juridique?, message?, botcheck? }
 */

const W3F_KEY = '377ea519-63ca-4260-8651-cb0057f3b1ff';

function buildConfirmationEmail(name, domaine, message) {
  const safeMessage = (message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background:#F7F5F0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F5F0;padding:40px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
  <tr>
    <td style="background:#1B2A4A;padding:28px 36px;text-align:center;">
      <div style="font-size:11px;letter-spacing:0.18em;color:#C9A84C;text-transform:uppercase;margin-bottom:4px;">CABINET D'AVOCATS</div>
      <div style="font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:0.08em;">MAHBOULI</div>
    </td>
  </tr>
  <tr><td style="background:#C9A84C;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>
  <tr>
    <td style="background:#FFFFFF;padding:40px 36px;">
      <h1 style="font-size:20px;color:#1B2A4A;margin:0 0 20px;font-weight:600;">Votre message a bien été reçu</h1>
      <p style="font-size:14px;color:#444;line-height:1.7;margin:0 0 16px;">Bonjour ${name},</p>
      <p style="font-size:14px;color:#444;line-height:1.7;margin:0 0 24px;">
        Nous accusons réception de votre message concernant <strong style="color:#1B2A4A;">${domaine}</strong>.<br/>
        Maître MAHBOULI ou un membre de son équipe vous répondra sous <strong>24 à 48h ouvrées</strong>.
      </p>
      <div style="background:#F7F5F0;border-left:3px solid #C9A84C;padding:16px 20px;margin-bottom:28px;">
        <div style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#C9A84C;margin-bottom:8px;">Votre message</div>
        <p style="font-size:13px;color:#555;line-height:1.65;margin:0;">${safeMessage}</p>
      </div>
      <p style="font-size:13px;color:#777;line-height:1.6;margin:0 0 6px;">En attendant, n'hésitez pas à nous contacter directement :</p>
      <p style="font-size:13px;font-weight:600;color:#1B2A4A;margin:0 0 4px;">
        <a href="tel:0148781959" style="color:#1B2A4A;text-decoration:none;">📞 01.48.78.19.59</a>
      </p>
      <p style="font-size:13px;color:#555;margin:0;">11 Rue Rousselet, 75007 Paris — Lun–Sam, 9h30–20h00</p>
    </td>
  </tr>
  <tr>
    <td style="background:#1B2A4A;padding:20px 36px;text-align:center;">
      <p style="font-size:11px;color:rgba(255,255,255,0.45);margin:0;line-height:1.7;">
        Ceci est un email automatique, merci de ne pas y répondre.<br/>
        © Cabinet MAHBOULI Avocats — 11 Rue Rousselet, 75007 Paris
      </p>
    </td>
  </tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, prenom, nom, email, phone, domaine_juridique, type_consultation, message, botcheck } = req.body || {};

  // Honeypot: bots fill hidden fields — silently succeed
  if (botcheck) {
    console.log('[contact] Honeypot triggered, ignoring submission');
    return res.status(200).json({ success: true });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Email invalide' });
  }

  const visitorName = name || [prenom, nom].filter(Boolean).join(' ') || 'Visiteur';
  const domaine = domaine_juridique || 'Non précisé';

  console.log('[contact] New submission from:', email, '| name:', visitorName, '| domaine:', domaine);

  // 1. Web3Forms: notify cabinet
  const w3fPromise = fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      access_key: W3F_KEY,
      subject: `Nouveau message de ${visitorName} — Cabinet Mahbouli`,
      from_name: 'Cabinet Mahbouli',
      name: visitorName,
      email,
      phone: phone || '',
      domaine_juridique: domaine,
      type_consultation: type_consultation || '',
      message: message || '',
    }),
  }).then(r => r.json()).catch(err => ({ success: false, error: err.message }));

  // 2. Brevo SMTP: confirm to visitor
  const brevoPromise = fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Cabinet Mahbouli', email: 'nathangbedapro@gmail.com' },
      to: [{ email, name: visitorName }],
      subject: 'Votre message a bien été reçu — Cabinet Mahbouli',
      htmlContent: buildConfirmationEmail(visitorName, domaine, message || ''),
    }),
  }).then(r => r.json()).catch(err => ({ error: err.message }));

  const [w3fResult, brevoResult] = await Promise.all([w3fPromise, brevoPromise]);

  console.log('[contact] Web3Forms result:', JSON.stringify(w3fResult));
  console.log('[contact] Brevo result:', JSON.stringify(brevoResult));

  const w3fOk = w3fResult?.success === true;
  const brevoOk = !!brevoResult?.messageId;

  if (!w3fOk && !brevoOk) {
    return res.status(500).json({ success: false, error: 'Erreur lors de l\'envoi. Merci de réessayer.' });
  }

  return res.status(200).json({ success: true, w3f: w3fOk, brevo: brevoOk });
};
