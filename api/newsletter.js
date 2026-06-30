/**
 * POST /api/newsletter
 * Subscribes a visitor to the Brevo "Newsletter Mahbouli" list (ID: 3).
 * Body JSON: { email, prenom?, centres_interet? }
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { email, prenom, centres_interet } = req.body || {};

  if (!email || !EMAIL_RE.test(email)) {
    console.log('[newsletter] Invalid email:', email);
    return res.status(400).json({ success: false, error: 'Email invalide' });
  }

  const attributes = { OPT_IN: true };
  if (prenom) attributes.PRENOM = prenom;
  if (Array.isArray(centres_interet) && centres_interet.length) {
    attributes.CENTRES_INTERET = centres_interet.join(', ');
  }

  const payload = {
    email,
    attributes,
    listIds: [3],
    updateEnabled: true,
  };

  console.log('[newsletter] Subscribing:', email, '| prenom:', prenom);

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // 201 = created, 204 = already exists (no body)
    if (brevoRes.status === 201 || brevoRes.status === 204) {
      console.log('[newsletter] Success:', email);
      return res.status(200).json({ success: true });
    }

    const errData = await brevoRes.json().catch(() => ({}));
    console.error('[newsletter] Brevo error:', brevoRes.status, errData);
    return res.status(500).json({ success: false, error: 'Erreur Brevo', details: errData });

  } catch (err) {
    console.error('[newsletter] Fetch error:', err.message);
    return res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
};
