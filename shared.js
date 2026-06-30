// Cabinet MAHBOULI — Shared nav + footer
// Injects top bar, nav, and footer into pages with [data-shared="topnav"] / [data-shared="footer"]

(function() {
  const ACTIVE_PAGE = document.body.dataset.page || 'home';
  const CV = 'https://consultation.avocat.fr/consultation-video/forms.php?hashid=b1ec912cce847dda3b84';
  const CE = 'https://consultation.avocat.fr/consultation-juridique/forms.php?hashid=49fddbea5ea8ebe6d154';
  const EXT = `<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.5 2H2v6h6V5.5M5.5 2H8m0 0v2.5M8 2 4.5 5.5"/></svg>`;

  const topnav = `
<div class="topbar">
  <div class="topbar-left">
    <span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
      <a href="tel:0148781959" style="color:inherit;">01.48.78.19.59</a>
    </span>
    <span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      9h30 — 20h00 · Lun—Sam
    </span>
  </div>
  <div class="topbar-right">
    <div class="consult-links">
      <a href="${CV}" target="_blank" rel="noopener" class="consult-link">Consultation vidéo ${EXT}</a>
      <a href="${CE}" target="_blank" rel="noopener" class="consult-link">Consultation écrite ${EXT}</a>
    </div>
    <span class="social">
      <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg></a>
      <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M22 12a10 10 0 10-11.55 9.88V14.9H8v-2.9h2.45V9.84a3.41 3.41 0 013.65-3.76 14.84 14.84 0 012.16.19v2.38H15.1c-1.19 0-1.56.74-1.56 1.5V12h2.66l-.43 2.9h-2.23v6.98A10 10 0 0022 12z"/></svg></a>
    </span>
  </div>
</div>
<nav class="nav">
  <a href="index.html" class="logo">
    <span class="logo-name">MAHBOULI</span>
    <span class="logo-tag">AVOCATS</span>
  </a>
  <div class="nav-links">
    <a href="index.html" data-nav="home">Accueil</a>
    <div class="dropdown">
      <a href="notre-expertise.html" data-nav="expertise">Notre expertise</a>
      <div class="dropdown-menu mega">
        <div class="dm-cols">
          <div class="dm-col">
            <a href="droit-etrangers.html">Droit des Étrangers</a>
            <a href="divorce.html">Divorce</a>
            <a href="droit-affaires.html">Droit des Affaires</a>
            <a href="droit-penal.html">Droit Pénal</a>
            <a href="droit-immobilier.html">Droit Immobilier</a>
          </div>
          <div class="dm-col">
            <a href="droit-famille.html">Droit de la Famille</a>
            <a href="droit-civil.html">Droit Civil</a>
            <a href="droit-travail.html">Droit du Travail</a>
            <a href="droit-international.html">Droit International</a>
          </div>
        </div>
        <div class="dm-sep"></div>
        <div class="dm-consult">
          <a href="${CV}" target="_blank" rel="noopener">Consultation vidéo ${EXT}</a>
          <a href="${CE}" target="_blank" rel="noopener">Consultation écrite ${EXT}</a>
        </div>
      </div>
    </div>
    <a href="notre-cabinet.html" data-nav="cabinet">Notre cabinet</a>
    <div class="dropdown">
      <a href="calculez-vos-droits.html" data-nav="droits">Calculez vos droits</a>
      <div class="dropdown-menu">
        <a href="calcul-licenciement.html">Indemnité de licenciement</a>
        <a href="calcul-pension.html">Pension alimentaire</a>
        <a href="calcul-prestation.html">Prestation compensatoire</a>
      </div>
    </div>
    <div class="dropdown">
      <button type="button" class="nav-trigger" data-nav="actualites" aria-haspopup="true" aria-expanded="false">Actualités</button>
      <div class="dropdown-menu actu">
        <a href="articles.html"><svg class="dm-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 3h12l4 4v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><polyline points="15 3 15 8 20 8"/><line x1="7" y1="12" x2="16" y2="12"/><line x1="7" y1="16" x2="13" y2="16"/></svg>Articles</a>
        <a href="newsletter.html"><svg class="dm-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="1.5"/><polyline points="3.5 6 12 13 20.5 6"/></svg>Newsletter</a>
      </div>
    </div>
    <a href="contact.html" data-nav="contact">Contact</a>
    <a href="contact.html" class="btn-nav-rdv">PRENDRE UN RDV <span class="rdv-arr">›</span></a>
  </div>
</nav>`;

  const footer = `
<footer class="footer">
  <div class="footer-grid">
    <div class="f-brand">
      <div class="logo">
        <span class="logo-name">MAHBOULI</span>
        <span class="logo-tag">AVOCATS</span>
      </div>
      <p class="f-desc">Cabinet d'avocats à Paris, spécialisé en droit des étrangers, droit pénal et droit de la famille.</p>
    </div>
    <div>
      <h4>Nos expertises</h4>
      <ul>
        <li><a href="notre-expertise.html#etrangers">Droit des étrangers</a></li>
        <li><a href="notre-expertise.html#penal">Droit pénal</a></li>
        <li><a href="notre-expertise.html#famille">Droit de la famille</a></li>
        <li><a href="notre-expertise.html#peine">Aménagement de peine</a></li>
      </ul>
    </div>
    <div>
      <h4>Le cabinet</h4>
      <ul>
        <li><a href="notre-cabinet.html">Notre cabinet</a></li>
        <li><a href="notre-cabinet.html">Maître MAHBOULI</a></li>
        <li><a href="#">Calculez vos droits</a></li>
        <li><a href="articles.html">Articles juridiques</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="f-contact">
      <h4>Contact</h4>
      <ul>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>11 Rue Rousselet, 75007 Paris</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg><a href="tel:0148781959" style="color:inherit;">01.48.78.19.59</a></li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><polyline points="22,6 12,13 2,6"/></svg>contact@avocat-mahbouli.com</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>9h30 — 20h00, Lun—Sam</li>
      </ul>
      <a href="contact.html" class="btn btn-primary btn-small" style="margin-top:18px;">Prendre un RDV</a>
      <div class="footer-follow">
        <div class="follow-label">Suivez le cabinet</div>
        <div class="follow-btns">
          <a href="https://www.linkedin.com" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg></a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.55 9.88V14.9H8v-2.9h2.45V9.84a3.41 3.41 0 013.65-3.76 14.84 14.84 0 012.16.19v2.38H15.1c-1.19 0-1.56.74-1.56 1.5V12h2.66l-.43 2.9h-2.23v6.98A10 10 0 0022 12z"/></svg></a>
        </div>
      </div>
      <div style="margin-top:14px;display:flex;flex-direction:column;gap:8px;">
        <a href="https://consultation.avocat.fr/consultation-video/forms.php?hashid=b1ec912cce847dda3b84" target="_blank" rel="noopener" style="font-size:12px;color:rgba(255,255,255,0.6);display:inline-flex;align-items:center;gap:4px;transition:color 0.2s ease;">Consultation vidéo <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" width="9" height="9"><path d="M4.5 2H2v6h6V5.5M5.5 2H8m0 0v2.5M8 2 4.5 5.5"/></svg></a>
        <a href="https://consultation.avocat.fr/consultation-juridique/forms.php?hashid=49fddbea5ea8ebe6d154" target="_blank" rel="noopener" style="font-size:12px;color:rgba(255,255,255,0.6);display:inline-flex;align-items:center;gap:4px;transition:color 0.2s ease;">Consultation écrite <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" width="9" height="9"><path d="M4.5 2H2v6h6V5.5M5.5 2H8m0 0v2.5M8 2 4.5 5.5"/></svg></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} Cabinet d'avocats MAHBOULI — Tous droits réservés</span>
    <div class="links">
      <a href="#">Mentions légales</a>
      <a href="#">Politique de confidentialité</a>
    </div>
  </div>
</footer>`;

  document.querySelectorAll('[data-shared="topnav"]').forEach(el => el.innerHTML = topnav);
  document.querySelectorAll('[data-shared="footer"]').forEach(el => el.innerHTML = footer);

  // Activate the right nav link
  document.querySelectorAll(`[data-nav="${ACTIVE_PAGE}"]`).forEach(a => a.classList.add('active'));

  // Dropdown triggers that are buttons (no navigation): toggle open on click
  document.querySelectorAll('.nav-links .dropdown > .nav-trigger').forEach(btn => {
    const dropdown = btn.parentElement;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
  // Close button-dropdowns on outside click or Escape
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-links .dropdown.open').forEach(d => {
      d.classList.remove('open');
      const t = d.querySelector('.nav-trigger');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-links .dropdown.open').forEach(d => {
        d.classList.remove('open');
        const t = d.querySelector('.nav-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.querySelectorAll('.field select').forEach(sel => {
    const setHasValue = () => sel.classList.toggle('has-value', !!sel.value);
    sel.addEventListener('change', setHasValue);
    setHasValue();
  });
})();

// Contact form handler — sends JSON to /api/contact (Web3Forms + Brevo via serverless)
window.attachContactForm = function(form) {
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const btnLabel = btn ? btn.innerHTML : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours…'; }
    form.querySelectorAll('.w3f-error').forEach(el => el.remove());

    // Collect fields via FormData → plain object
    const fd = new FormData(form);
    const data = {};
    for (const [key, value] of fd.entries()) data[key] = value;
    // Honeypot: botcheck only appears in FormData when checked (bot)
    data.botcheck = fd.has('botcheck') && fd.get('botcheck') === 'on';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        form.innerHTML = '<div class="w3f-success">✓ Votre message a bien été envoyé. Le cabinet vous répondra sous 24-48h.</div>';
      } else {
        throw new Error(json.error || 'Erreur');
      }
    } catch (err) {
      const errBox = document.createElement('div');
      errBox.className = 'w3f-error';
      errBox.textContent = 'Une erreur est survenue. Merci de réessayer ou de contacter le cabinet par téléphone.';
      form.prepend(errBox);
      if (btn) { btn.disabled = false; btn.innerHTML = btnLabel; }
    }
  });
};
