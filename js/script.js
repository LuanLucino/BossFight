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
})();
