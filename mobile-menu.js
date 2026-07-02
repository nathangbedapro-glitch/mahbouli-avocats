/* Cabinet MAHBOULI — Mobile hamburger menu
   Injects hamburger button + full-screen overlay into every page.
   Works with both static (index.html) and shared.js-injected navs.
*/
(function () {
  'use strict';

  var ITEMS = [
    { label: 'Accueil', href: 'index.html' },
    {
      label: 'Notre expertise',
      href: 'notre-expertise.html',
      sub: [
        { label: 'Droit des Étrangers',   href: 'droit-etrangers.html' },
        { label: 'Droit Pénal',           href: 'droit-penal.html' },
        { label: 'Droit de la Famille',   href: 'droit-famille.html' },
        { label: 'Divorce',               href: 'divorce.html' },
        { label: 'Droit Civil',           href: 'droit-civil.html' },
        { label: 'Droit des Affaires',    href: 'droit-affaires.html' },
        { label: 'Droit du Travail',      href: 'droit-travail.html' },
        { label: 'Droit International',   href: 'droit-international.html' },
        { label: 'Droit Immobilier',      href: 'droit-immobilier.html' }
      ]
    },
    { label: 'Notre cabinet', href: 'notre-cabinet.html' },
    {
      label: 'Calculez vos droits',
      href: 'calculez-vos-droits.html',
      sub: [
        { label: 'Indemnité de licenciement', href: 'calcul-licenciement.html' },
        { label: 'Pension alimentaire',       href: 'calcul-pension.html' },
        { label: 'Prestation compensatoire',  href: 'calcul-prestation.html' }
      ]
    },
    {
      label: 'Actualités',
      href: 'articles.html',
      sub: [
        { label: 'Articles',          href: 'articles.html' },
        { label: 'Newsletter',        href: 'newsletter.html' }
      ]
    },
    { label: 'Contact',   href: 'contact.html' }
  ];

  function init() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    /* Prevent double-injection */
    if (document.querySelector('.hamburger')) return;

    /* ── Hamburger button ── */
    var btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Ouvrir le menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(btn);

    /* ── Overlay HTML ── */
    var html = '<button class="mobile-menu-close" aria-label="Fermer le menu">&times;</button>';
    html += '<nav class="mobile-menu-nav">';
    ITEMS.forEach(function (item) {
      html += '<a href="' + item.href + '" class="mobile-menu-item">' + item.label + '</a>';
      if (item.sub) {
        html += '<div class="mobile-menu-submenu">';
        item.sub.forEach(function (s) {
          html += '<a href="' + s.href + '">' + s.label + '</a>';
        });
        html += '</div>';
      }
    });
    html += '</nav>';
    html += '<a href="contact.html" class="mobile-rdv">PRENDRE UN RDV</a>';

    var overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    /* ── Open / Close ── */
    /* iOS requires position:fixed on body to prevent background scroll
       while keeping overflow-y:auto scrollable on the overlay itself. */
    var savedScrollY = 0;

    function openMenu() {
      overlay.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      savedScrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + savedScrollY + 'px';
      document.body.style.width = '100%';
    }

    function closeMenu() {
      overlay.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, savedScrollY);
    }

    btn.addEventListener('click', openMenu);
    overlay.querySelector('.mobile-menu-close').addEventListener('click', closeMenu);

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    /* Close on nav link click (after tiny delay so navigation fires) */
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setTimeout(closeMenu, 80); });
    });

    /* Make phone numbers tappable */
    document.querySelectorAll('.contact-info li, .footer .f-contact li').forEach(function (li) {
      var text = li.textContent;
      var m = text.match(/0[0-9][\.\s]?[0-9]{2}[\.\s]?[0-9]{2}[\.\s]?[0-9]{2}[\.\s]?[0-9]{2}/);
      if (m && !li.querySelector('a[href^="tel"]')) {
        var raw = m[0].replace(/[\.\s]/g, '');
        li.innerHTML = li.innerHTML.replace(
          m[0],
          '<a href="tel:' + raw + '" style="color:#C9A84C;font-weight:600;">' + m[0] + '</a>'
        );
      }
    });
  }

  /* Run after DOM + shared.js have both executed */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
