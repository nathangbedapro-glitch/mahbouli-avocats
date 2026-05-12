// Cabinet MAHBOULI — Shared nav + footer
// Injects top bar, nav, and footer into pages with [data-shared="topnav"] / [data-shared="footer"]

(function() {
  const ACTIVE_PAGE = document.body.dataset.page || 'home';

  const topnav = `
<div class="topbar">
  <div class="topbar-left">
    <span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
      01.48.78.19.59
    </span>
    <span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      9h30 — 20h00 · Lun—Sam
    </span>
  </div>
  <div class="topbar-right">
    <span>Consultation vidéo disponible</span>
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
      <div class="dropdown-menu">
        <a href="notre-expertise.html#etrangers">Droit des Étrangers</a>
        <a href="notre-expertise.html#penal">Droit Pénal</a>
        <a href="notre-expertise.html#famille">Droit de la Famille</a>
        <a href="notre-expertise.html#peine">Aménagement de Peine</a>
      </div>
    </div>
    <a href="notre-cabinet.html" data-nav="cabinet">Notre cabinet</a>
    <a href="#" data-nav="droits">Calculez vos droits</a>
    <a href="index.html#articles" data-nav="articles">Articles</a>
    <a href="contact.html" data-nav="contact">Contact</a>
    <a href="contact.html" class="btn btn-primary btn-small">Prendre un RDV</a>
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
      <div class="footer-social">
        <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg></a>
        <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.55 9.88V14.9H8v-2.9h2.45V9.84a3.41 3.41 0 013.65-3.76 14.84 14.84 0 012.16.19v2.38H15.1c-1.19 0-1.56.74-1.56 1.5V12h2.66l-.43 2.9h-2.23v6.98A10 10 0 0022 12z"/></svg></a>
      </div>
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
        <li><a href="index.html#articles">Articles juridiques</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="f-contact">
      <h4>Contact</h4>
      <ul>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>11 Rue Rousselet, 75007 Paris</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>01.48.78.19.59</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"/><polyline points="22,6 12,13 2,6"/></svg>contact@avocat-mahbouli.com</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>9h30 — 20h00, Lun—Sam</li>
      </ul>
      <a href="contact.html" class="btn btn-primary btn-small" style="margin-top:18px;">Prendre un RDV</a>
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
})();
