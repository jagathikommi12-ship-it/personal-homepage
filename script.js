// ===== Footer year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMobilePanel = document.querySelector('.nav-mobile-panel');
if (navToggle && navMobilePanel) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMobilePanel.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navMobilePanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobilePanel.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Active nav link based on current page =====
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile-panel a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });
})();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealEls.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// ===== Status card subtle tilt on pointer move =====
const statusCard = document.querySelector('.status-card');
if (statusCard && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  statusCard.addEventListener('mousemove', (e) => {
    const rect = statusCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    statusCard.style.transform = `rotateY(${x * 6}deg) rotateX(${y * -6}deg)`;
  });
  statusCard.addEventListener('mouseleave', () => {
    statusCard.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}
