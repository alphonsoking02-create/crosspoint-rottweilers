/* Gallery lightbox — extracted from an inline <script> in gallery.html.
   Kept in its own file so the Content-Security-Policy can use a strict
   script-src 'self' with no 'unsafe-inline' and no brittle hashes.
   Only gallery.html loads this. */
// Self-contained lightbox for the gallery — scoped to this page.
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item img'));
  var lb = document.getElementById('lightbox');
  if (!lb || !items.length) return;
  var lbImg = lb.querySelector('img');
  var current = 0;

  function show(i) {
    current = (i + items.length) % items.length;
    lbImg.src = items[current].src;
  }
  function open(i) { show(i); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }
  function close() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); }

  items.forEach(function (img, i) {
    img.parentElement.addEventListener('click', function () { open(i); });
  });
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(current + 1); });
  lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(current - 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'ArrowLeft') show(current - 1);
  });
})();
