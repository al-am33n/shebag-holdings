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
