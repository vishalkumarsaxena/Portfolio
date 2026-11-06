const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
    menuToggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
  }));
}
const typedText = document.getElementById('typed-text');
const roles = ['Aspiring Developer', 'Web Developer', 'Problem Solver', 'Software Developer'];
let roleIndex = 0, letterIndex = roles[0].length, deleting = true;
function animateRole() {
  if (!typedText || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const role = roles[roleIndex];
  if (deleting) {
    letterIndex--; typedText.textContent = role.slice(0, Math.max(0, letterIndex));
    if (letterIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(animateRole, 350); return; }
    setTimeout(animateRole, 45);
  } else {
    const next = roles[roleIndex]; letterIndex++; typedText.textContent = next.slice(0, letterIndex);
    if (letterIndex >= next.length) { deleting = true; setTimeout(animateRole, 1500); return; }
    setTimeout(animateRole, 75);
  }
}
if (typedText && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) setTimeout(animateRole, 1500);
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => revealObserver.observe(item));
} else revealItems.forEach(item => item.classList.add('visible'));
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-link[href^="#"]');
if ('IntersectionObserver' in window && sections.length && navItems.length) {
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}
const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
