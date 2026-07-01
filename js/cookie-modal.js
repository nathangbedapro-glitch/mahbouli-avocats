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

  /* ── HTML de la modale (source de vérité : /mockups/cookie-modal.html) ── */
  var MODAL_HTML = [
    '<div class="cc-backdrop" id="cc-backdrop" role="dialog" aria-modal="true" aria-labelledby="cc-modal-title">',
    '  <div class="cc-modal">',

    '    <button class="cc-close" id="cc-close-btn" aria-label="Fermer">&times;</button>',

    '    <div class="cc-header">',
    '      <div class="cc-eyebrow">Cabinet MAHBOULI</div>',
    '      <h2 class="cc-title" id="cc-modal-title">Gestion de vos préférences</h2>',
    '      <p class="cc-subtitle">Vos données.  Votre choix.</p>',
    '    </div>',

    '    <hr class="cc-rule">',

    '    <div class="cc-info">',
    '      <p>En autorisant ces services tiers, vous acceptez le dépôt et la lecture de cookies et l’utilisation de technologies de suivi nécessaires à leur bon fonctionnement.</p>',
    '      <a href="/politique-confidentialite.html" class="cc-policy-link">Consulter la politique de confidentialité →</a>',
    '    </div>',

    '    <div class="cc-global">',
    '      <span class="cc-global-label">Préférences globales</span>',
    '      <div class="cc-global-actions">',
    '        <button class="cc-btn cc-btn-primary" id="cc-accept-all">Tout accepter</button>',
    '        <button class="cc-btn cc-btn-secondary" id="cc-deny-all">Tout refuser</button>',
    '      </div>',
    '    </div>',

    '    <h3 class="cc-cat-title">Mesure d’audience</h3>',
    '    <hr class="cc-cat-rule">',

    '    <div class="cc-service">',
    '      <div class="cc-service-info">',
    '        <div class="cc-service-name">Google Analytics 4</div>',
    '        <p class="cc-service-desc">Mesure d’audience anonymisée pour améliorer votre expérience sur le site.</p>',
    '        <div class="cc-service-links">',
    '          <a href="https://support.google.com/analytics/answer/6004245" target="_blank" rel="noopener noreferrer">En savoir plus</a>',
    '          <span class="sep">·</span>',
    '          <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">Site officiel ↗</a>',
    '        </div>',
    '      </div>',
    '      <div class="cc-service-actions">',
    '        <button class="cc-toggle cc-toggle-allow is-off" id="cc-gtag-allow">Autoriser</button>',
    '        <button class="cc-toggle cc-toggle-deny" id="cc-gtag-deny">Interdire</button>',
    '      </div>',
    '    </div>',

    '    <div class="cc-footer">',
    '      <button class="cc-save" id="cc-save">Enregistrer mes préférences</button>',
    '      <p class="cc-legal">Vos préférences seront mémorisées pendant 13 mois. Propulsé par Tarteaucitron.</p>',
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

  /* ── Lire l'état courant de GA4 (true = autorisé, false = refusé, undefined = non choisi) ── */
  function getGtagState() {
    if (typeof tarteaucitron !== 'undefined' && tarteaucitron.state) {
      return tarteaucitron.state['gtag'];
    }
    return undefined;
  }

  /* ── Synchronise les boutons Autoriser / Interdire avec l'état Tarteaucitron ── */
  function syncToggleUI() {
    var allowBtn = document.getElementById('cc-gtag-allow');
    var denyBtn  = document.getElementById('cc-gtag-deny');
    if (!allowBtn || !denyBtn) return;

    var state = getGtagState();
    if (state === true) {
      /* GA4 autorisé : "Autoriser" actif (or), "Interdire" inactif */
      allowBtn.classList.remove('is-off');
      denyBtn.classList.remove('is-active');
    } else if (state === false) {
      /* GA4 refusé : "Autoriser" inactif, "Interdire" actif (navy) */
      allowBtn.classList.add('is-off');
      denyBtn.classList.add('is-active');
    } else {
      /* Pas encore choisi : les deux inactifs, invite à choisir */
      allowBtn.classList.add('is-off');
      denyBtn.classList.remove('is-active');
    }
  }

  /* ── API publique ── */
  window.cookieModal = {
    open: function () {
      var backdrop = document.getElementById('cc-backdrop');
      if (!backdrop) return;
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      syncToggleUI();
      /* Focus trap : focus sur le premier élément interactif */
      setTimeout(function () {
        var firstBtn = backdrop.querySelector('button');
        if (firstBtn) firstBtn.focus();
      }, 50);
    },
    close: function () {
      var backdrop = document.getElementById('cc-backdrop');
      if (!backdrop) return;
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  /* ── Attache les événements de la modale ── */
  function bindEvents() {
    var backdrop = document.getElementById('cc-backdrop');

    /* Fermer au clic sur le backdrop (mais pas sur la modale elle-même) */
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) window.cookieModal.close();
    });

    /* Fermer avec Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && backdrop.classList.contains('is-open')) {
        window.cookieModal.close();
      }
    });

    /* Bouton × (fermeture) */
    document.getElementById('cc-close-btn').addEventListener('click', function () {
      window.cookieModal.close();
    });

    /* Tout accepter → Tarteaucitron respondAll(true) */
    document.getElementById('cc-accept-all').addEventListener('click', function () {
      withTac(function () {
        tarteaucitron.userInterface.respondAll(true);
      });
      window.cookieModal.close();
    });

    /* Tout refuser → Tarteaucitron respondAll(false) */
    document.getElementById('cc-deny-all').addEventListener('click', function () {
      withTac(function () {
        tarteaucitron.userInterface.respondAll(false);
      });
      window.cookieModal.close();
    });

    /* Autoriser GA4 → Tarteaucitron respond({ id: 'gtag' }, true) */
    document.getElementById('cc-gtag-allow').addEventListener('click', function () {
      withTac(function () {
        /* respond() extrait la clé depuis el.id — on passe un objet léger */
        tarteaucitron.userInterface.respond({ id: 'gtag' }, true);
      });
      /* Mise à jour visuelle immédiate, sans attendre Tarteaucitron */
      document.getElementById('cc-gtag-allow').classList.remove('is-off');
      document.getElementById('cc-gtag-deny').classList.remove('is-active');
    });

    /* Interdire GA4 → Tarteaucitron respond({ id: 'gtag' }, false) */
    document.getElementById('cc-gtag-deny').addEventListener('click', function () {
      withTac(function () {
        tarteaucitron.userInterface.respond({ id: 'gtag' }, false);
      });
      /* Mise à jour visuelle immédiate */
      document.getElementById('cc-gtag-allow').classList.add('is-off');
      document.getElementById('cc-gtag-deny').classList.add('is-active');
    });

    /* Enregistrer → ferme la modale (les choix sont déjà sauvegardés par Tarteaucitron) */
    document.getElementById('cc-save').addEventListener('click', function () {
      window.cookieModal.close();
    });
  }

  /* ── Intercepte le bouton "Personnaliser" du bandeau Tarteaucitron ── */
  function interceptPersonalizeButton() {
    /*
     * Le bandeau Tarteaucitron est injecté dynamiquement dans le DOM.
     * On utilise un event listener en phase de capture sur document
     * pour intercepter le clic avant que Tarteaucitron ne l'intercepte.
     * IDs connus du bouton "Personnaliser" selon la version de Tarteaucitron :
     *   #tarteaucitronCloseAlert  (bottom banner)
     *   #tarteaucitronPersonalize  (popup mode)
     *   #tarteaucitronPersonalize2 (variante)
     */
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
    }, true /* capture phase */);
  }

  /* ── Injection du HTML et initialisation ── */
  function init() {
    /* Injecter la modale dans le DOM */
    var container = document.createElement('div');
    container.innerHTML = MODAL_HTML;
    document.body.appendChild(container.firstElementChild);

    bindEvents();
    interceptPersonalizeButton();
  }

  /* Lance après que le DOM est prêt */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
