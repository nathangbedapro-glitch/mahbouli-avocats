/**
 * cookie-modal.js — Modale custom de gestion des cookies
 * Cabinet MAHBOULI
 *
 * Remplace l'UI native Tarteaucitron par un design sur-mesure.
 * La logique de consentement reste 100% gérée par Tarteaucitron.
 *
 * API globale exposée : window.cookieModal.open() / .close()
 */
(function () {
  'use strict';

  /* ── HTML de la modale ── */
  var MODAL_HTML = [
    '<div class="cc-backdrop" id="cc-backdrop" role="dialog" aria-modal="true" aria-labelledby="cc-modal-title">',
    '  <div class="cc-modal">',

    '    <div class="cc-grip" aria-hidden="true"></div>',
    '    <button class="cc-close" id="cc-close-btn" aria-label="Fermer">&times;</button>',

    '    <div class="cc-header">',
    '      <div class="cc-eyebrow">Cabinet MAHBOULI</div>',
    '      <h2 class="cc-title" id="cc-modal-title">Gestion de vos préférences</h2>',
    '      <p class="cc-subtitle">Vos données.  Votre choix.</p>',
    '    </div>',

    '    <div class="cc-scroll">',

    '      <hr class="cc-rule">',

    '      <div class="cc-info">',
    '        <p>En autorisant ces services tiers, vous acceptez le dépôt et la lecture de cookies et l’utilisation de technologies de suivi nécessaires à leur bon fonctionnement.</p>',
    '        <a href="/politique-confidentialite.html" class="cc-policy-link">Consulter la politique de confidentialité →</a>',
    '      </div>',

    '      <div class="cc-global">',
    '        <span class="cc-global-label">Préférences globales</span>',
    '        <div class="cc-global-actions">',
    '          <button class="cc-btn cc-btn-primary" id="cc-accept-all">Tout accepter</button>',
    '          <button class="cc-btn cc-btn-secondary" id="cc-deny-all">Tout refuser</button>',
    '        </div>',
    '      </div>',

    '      <button class="cc-details-toggle" aria-expanded="false" aria-controls="cc-details">',
    '        <span>Personnaliser par service</span>',
    '        <span class="chev" aria-hidden="true">▼</span>',
    '      </button>',

    '      <div class="cc-details" id="cc-details">',

    '        <h3 class="cc-cat-title">Mesure d’audience</h3>',
    '        <hr class="cc-cat-rule">',

    '        <div class="cc-service">',
    '          <div class="cc-service-info">',
    '            <div class="cc-service-name">Google Analytics 4</div>',
    '            <p class="cc-service-desc">Mesure d’audience anonymisée pour améliorer votre expérience sur le site.</p>',
    '            <div class="cc-service-links">',
    '              <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer">En savoir plus</a>',
    '              <span class="sep">·</span>',
    '              <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">Site officiel ↗</a>',
    '            </div>',
    '          </div>',
    '          <div class="cc-service-actions">',
    '            <button class="cc-toggle cc-toggle-allow is-off" id="cc-gtag-allow">Autoriser</button>',
    '            <button class="cc-toggle cc-toggle-deny" id="cc-gtag-deny">Interdire</button>',
    '          </div>',
    '        </div>',

    '      </div>',

    '    </div>',

    '    <div class="cc-footer">',
    '      <button class="cc-save" id="cc-save">Enregistrer mes préférences</button>',
    '      <p class="cc-legal">Vos préférences seront mémorisées pendant 13 mois. Propulsé par Tarteaucitron.</p>',
    '    </div>',

    '  </div>',
    '</div>'
  ].join('\n');

  /* ── Appel Tarteaucitron avec retry si pas encore initialisé ── */
  function withTac(callback) {
    if (typeof tarteaucitron !== 'undefined' && tarteaucitron.userInterface) {
      callback();
    } else {
      setTimeout(function () { withTac(callback); }, 150);
    }
  }

  /* ── Lire l'état courant de GA4 ── */
  function getGtagState() {
    if (typeof tarteaucitron !== 'undefined' && tarteaucitron.state) {
      return tarteaucitron.state['gtag'];
    }
    return undefined;
  }

  /* ── Synchronise les boutons avec l'état Tarteaucitron ── */
  function syncToggleUI() {
    var allowBtn = document.getElementById('cc-gtag-allow');
    var denyBtn  = document.getElementById('cc-gtag-deny');
    if (!allowBtn || !denyBtn) return;

    var state = getGtagState();
    if (state === true) {
      allowBtn.classList.remove('is-off');
      denyBtn.classList.remove('is-active');
    } else if (state === false) {
      allowBtn.classList.add('is-off');
      denyBtn.classList.add('is-active');
    } else {
      allowBtn.classList.add('is-off');
      denyBtn.classList.remove('is-active');
    }
  }

  /* ── iOS scroll lock — position:fixed évite le scroll du body derrière la modale ── */
  var savedScrollY = 0;

  /* ── API publique ── */
  window.cookieModal = {
    open: function () {
      var backdrop = document.getElementById('cc-backdrop');
      if (!backdrop) return;
      backdrop.classList.add('is-open');
      savedScrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + savedScrollY + 'px';
      document.body.style.width = '100%';
      syncToggleUI();
      setTimeout(function () {
        var firstBtn = backdrop.querySelector('button');
        if (firstBtn) firstBtn.focus();
      }, 50);
    },
    close: function () {
      var backdrop = document.getElementById('cc-backdrop');
      if (!backdrop) return;
      backdrop.classList.remove('is-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, savedScrollY);
    }
  };

  /* ── Attache les événements ── */
  function bindEvents() {
    var backdrop = document.getElementById('cc-backdrop');

    /* Fermer au clic sur le backdrop */
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) window.cookieModal.close();
    });

    /* Fermer avec Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
        window.cookieModal.close();
      }
    });

    /* Bouton × */
    document.getElementById('cc-close-btn').addEventListener('click', function () {
      window.cookieModal.close();
    });

    /* Tout accepter */
    document.getElementById('cc-accept-all').addEventListener('click', function () {
      withTac(function () { tarteaucitron.userInterface.respondAll(true); });
      window.cookieModal.close();
    });

    /* Tout refuser */
    document.getElementById('cc-deny-all').addEventListener('click', function () {
      withTac(function () { tarteaucitron.userInterface.respondAll(false); });
      window.cookieModal.close();
    });

    /* Autoriser GA4 */
    document.getElementById('cc-gtag-allow').addEventListener('click', function () {
      withTac(function () { tarteaucitron.userInterface.respond({ id: 'gtag' }, true); });
      document.getElementById('cc-gtag-allow').classList.remove('is-off');
      document.getElementById('cc-gtag-deny').classList.remove('is-active');
    });

    /* Interdire GA4 */
    document.getElementById('cc-gtag-deny').addEventListener('click', function () {
      withTac(function () { tarteaucitron.userInterface.respond({ id: 'gtag' }, false); });
      document.getElementById('cc-gtag-allow').classList.add('is-off');
      document.getElementById('cc-gtag-deny').classList.add('is-active');
    });

    /* Enregistrer */
    document.getElementById('cc-save').addEventListener('click', function () {
      window.cookieModal.close();
    });

    /* Toggle détails mobile (Personnaliser par service) */
    var detailsToggle = backdrop.querySelector('.cc-details-toggle');
    var detailsPanel  = document.getElementById('cc-details');
    if (detailsToggle && detailsPanel) {
      detailsToggle.addEventListener('click', function () {
        var isExpanded = detailsToggle.getAttribute('aria-expanded') === 'true';
        detailsToggle.setAttribute('aria-expanded', String(!isExpanded));
        detailsPanel.classList.toggle('open', !isExpanded);
      });
    }
  }

  /* ── Intercepte le bouton "Personnaliser" du bandeau Tarteaucitron ── */
  function interceptPersonalizeButton() {
    var PERSONALIZE_IDS = [
      'tarteaucitronCloseAlert',
      'tarteaucitronPersonalize',
      'tarteaucitronPersonalize2'
    ];

    document.addEventListener('click', function (e) {
      var el = e.target;
      if (el && PERSONALIZE_IDS.indexOf(el.id) !== -1) {
        e.preventDefault();
        e.stopPropagation();
        window.cookieModal.open();
      }
    }, true);
  }

  /* ── Injection et initialisation ── */
  function init() {
    var container = document.createElement('div');
    container.innerHTML = MODAL_HTML;
    document.body.appendChild(container.firstElementChild);

    bindEvents();
    interceptPersonalizeButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
