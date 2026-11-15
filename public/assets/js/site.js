/* A&A Promotion — small enhancements. The page works without this file:
   tabs are radio inputs, the FAQ is <details>, forms are guarded inline. */
(function () {
  'use strict';

  // Open the experience named in the address (#brunch, #polo, #outings,
  // #wine-gin), so a link shared in WhatsApp lands on the right tab.
  var tabs = { 'brunch': 'tab-brunch', 'polo': 'tab-polo', 'outings': 'tab-outings', 'wine-gin': 'tab-winegin' };

  function openFromHash(scroll) {
    var id = decodeURIComponent(location.hash.slice(1));
    var radio = tabs[id] && document.getElementById(tabs[id]);
    if (!radio) return;
    radio.checked = true;
    if (!scroll) return;
    var target = window.matchMedia('(max-width: 599px)').matches
      ? document.getElementById(id)
      : document.getElementById('whats-on');
    if (target) target.scrollIntoView();
  }

  openFromHash(true);
  window.addEventListener('hashchange', function () { openFromHash(true); });

  // Demo forms say plainly that they are not connected yet, and send nothing.
  Array.prototype.forEach.call(document.querySelectorAll('form[data-demo]'), function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var status = form.querySelector('.form-status');
      if (status) status.textContent = form.getAttribute('data-demo');
    });
  });
})();
