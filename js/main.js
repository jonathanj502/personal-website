/* Theme toggle — persists choice via localStorage.
   The initial theme is applied by a tiny inline script in each page's <head>
   (before paint) to avoid a flash of the wrong theme. This file just wires up
   the toggle button and keeps the label in sync. */
(function () {
  'use strict';

  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var label = document.getElementById('toggleLabel');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function syncLabel() {
    if (label) label.textContent = currentTheme();
    if (toggle) {
      toggle.setAttribute('aria-pressed', currentTheme() === 'dark');
    }
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) { /* storage unavailable — toggle still works for the session */ }
    syncLabel();
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  syncLabel();
})();
