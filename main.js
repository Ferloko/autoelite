const nav  = document.getElementById('nav');
const hero = document.querySelector('.hero');

// Nav color swap — only when a .hero section exists (index page)
if (hero) {
  new IntersectionObserver(([e]) => {
    nav.classList.toggle('on-light', e.intersectionRatio < 0.05);
  }, { threshold: 0.05 }).observe(hero);
}

// Scroll reveal — works on every page
document.querySelectorAll('.reveal').forEach(el => {
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) e.target.classList.add('in');
  }, { threshold: 0.1 }).observe(el);
});