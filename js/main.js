// ── Navbar scroll behavior ──
const navbar = document.getElementById('navbar');
const hero   = document.querySelector('.hero, .page-hero');

function updateNav() {
  if (!hero) { navbar.classList.add('nav-solid'); return; }
  if (window.scrollY > 40) {
    navbar.classList.remove('nav-transparent');
    navbar.classList.add('nav-solid');
  } else {
    navbar.classList.remove('nav-solid');
    navbar.classList.add('nav-transparent');
  }
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Mobile toggle ──
const toggle = document.querySelector('.nav-toggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    navbar.classList.toggle('menu-open');
    navbar.classList.add('nav-solid');
  });
}

// ── Divisions dropdown: click / tap to open (works alongside hover) ──
document.querySelectorAll('.nav-dropdown').forEach(dd => {
  const trigger = dd.querySelector('a');
  if (!trigger) return;
  trigger.addEventListener('click', (e) => {
    // The trigger is a placeholder link (#); never navigate.
    e.preventDefault();
    const wasOpen = dd.classList.contains('is-open');
    // Close any other open dropdowns.
    document.querySelectorAll('.nav-dropdown.is-open').forEach(o => o.classList.remove('is-open'));
    dd.classList.toggle('is-open', !wasOpen);
  });
});
// Click outside closes any open dropdown.
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown.is-open').forEach(o => o.classList.remove('is-open'));
  }
});

// ── Active nav link ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// ── Reveal CSS (injected) ──
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  [data-reveal] { opacity: 0; transform: translateY(28px); transition: opacity 0.65s ease, transform 0.65s ease; }
  [data-reveal][data-delay="1"] { transition-delay: 0.1s; }
  [data-reveal][data-delay="2"] { transition-delay: 0.2s; }
  [data-reveal][data-delay="3"] { transition-delay: 0.3s; }
  [data-reveal][data-delay="4"] { transition-delay: 0.4s; }
  [data-reveal][data-delay="5"] { transition-delay: 0.5s; }
  [data-reveal].revealed { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(revealStyle);

// ── Dynamic copyright year ──
document.querySelectorAll('.current-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// ── Floating WhatsApp button ──
(function () {
  const WA_NUMBER = '2348181900509';
  const WA_TEXT = encodeURIComponent('Hello Shebag Holdings, I would like to make an enquiry.');
  const a = document.createElement('a');
  a.href = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;
  a.target = '_blank';
  a.rel = 'noopener';
  a.className = 'whatsapp-float';
  a.setAttribute('aria-label', 'Chat with Shebag Holdings on WhatsApp');
  a.innerHTML = `
    <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.6 4.46 1.74 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.62h.01c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.33-6.64-3.75-9.06A12.72 12.72 0 0 0 16.003 3.2zm0 23.04h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.8-.25-.4a10.6 10.6 0 0 1-1.62-5.65c0-5.86 4.77-10.63 10.64-10.63 2.84 0 5.5 1.11 7.51 3.12a10.56 10.56 0 0 1 3.11 7.52c0 5.86-4.77 10.63-10.63 10.63zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.71.16-.21.32-.82 1.04-1 1.25-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.54-.71-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.46.21 2 .13.61-.09 1.89-.77 2.16-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37z"/>
    </svg>`;
  function mount() {
    if (document.body) document.body.appendChild(a);
    else document.addEventListener('DOMContentLoaded', () => document.body.appendChild(a));
  }
  mount();
})();
