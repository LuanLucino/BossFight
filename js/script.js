(function () {
  var navToggle = document.getElementById('navToggle');
  var body = document.body;
  navToggle.addEventListener('click', function () {
    var open = body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  var themeToggle = document.getElementById('themeToggle');
  var root = document.documentElement;
  themeToggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var effectiveCurrent = current || (prefersDark ? 'dark' : 'light');
    var next = effectiveCurrent === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
  });

  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    success.classList.add('visible');
    form.reset();
  });

  // Rotating word effect (e.g. "o objetivo continua. / evolui. / avança.")
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var rotators = [];
  document.querySelectorAll('.word-rotate').forEach(function (el) {
    var inner = el.querySelector('.word-rotate-inner');
    if (!inner) return;
    var entry = { el: el, inner: inner, index: 0, timer: null };
    rotators.push(entry);
    if (!prefersReducedMotion) startRotator(entry);
  });

  function getRotatorWords(entry) {
    var lang = root.getAttribute('data-lang') === 'en' ? 'en' : 'pt';
    var raw = entry.el.getAttribute('data-words-' + lang) || entry.el.getAttribute('data-words-pt') || '';
    return raw.split(',').map(function (w) { return w.trim(); }).filter(Boolean);
  }

  function startRotator(entry) {
    if (entry.timer) clearInterval(entry.timer);
    entry.timer = setInterval(function () {
      var words = getRotatorWords(entry);
      if (words.length < 2) return;
      entry.inner.classList.add('is-swapping');
      setTimeout(function () {
        entry.index = (entry.index + 1) % words.length;
        entry.inner.textContent = words[entry.index];
        entry.inner.classList.remove('is-swapping');
      }, 350);
    }, 2600);
  }

  function resetRotatorsToFirstWord() {
    rotators.forEach(function (entry) {
      var words = getRotatorWords(entry);
      entry.index = 0;
      if (words.length) entry.inner.textContent = words[0];
    });
  }

  // Language toggle (PT / EN)
  var langToggle = document.getElementById('langToggle');
  function applyLanguage(lang) {
    var dict = (window.I18N && window.I18N[lang]) || {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!(key in dict)) return;
      var attr = el.getAttribute('data-i18n-attr');
      if (attr) {
        el.setAttribute(attr, dict[key]);
      } else {
        el.innerHTML = dict[key];
      }
    });
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang === 'en' ? 'en' : 'pt-BR');
    localStorage.setItem('bf-lang', lang);
    resetRotatorsToFirstWord();
  }
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-lang') === 'en' ? 'en' : 'pt';
      applyLanguage(current === 'en' ? 'pt' : 'en');
    });
  }
  var savedLang = localStorage.getItem('bf-lang');
  if (savedLang === 'en') applyLanguage('en');
})();
