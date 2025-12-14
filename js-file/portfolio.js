const navbar = document.getElementById('navbar');

function openSidebar() {
  navbar.classList.add('show');
}

function closeSidebar() {
  navbar.classList.remove('show');
}

// Use event listeners instead of inline onclick
document.getElementById('open-sidear-button').addEventListener('click', openSidebar);
document.getElementById('close-sidebar-button').addEventListener('click', closeSidebar);

const links = document.querySelectorAll('.article-nav a, .record a');
const nameTitle = document.querySelector('.name');
const expTitle = document.querySelector('.exp');
const projHeader = document.querySelector('.proj-header');
const contactHeading = document.querySelector('.heading');

const sections = [
  { el: nameTitle, section: document.getElementById('HOME') },
  { el: expTitle, section: document.getElementById('EXPERIENCE') },
  { el: projHeader, section: document.getElementById('PROJECT') },
  { el: contactHeading, section: document.getElementById('CONTACT') }
];

// Throttle scroll events to improve responsiveness
let scrollTimeout;
function onScroll() {
  if (scrollTimeout) return;
  scrollTimeout = requestAnimationFrame(() => {
    updateActiveLink();
    scrollTimeout = null;
  });
}

function updateActiveLink() {
  const scrollPos = window.scrollY || window.pageYOffset;

  links.forEach(link => {
    const targetId = link.getAttribute('href').replace('#', '');
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    const rect = targetSection.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const bottom = top + targetSection.offsetHeight;

    const isActive =
      scrollPos >= top - window.innerHeight / 2 &&
      scrollPos < bottom - window.innerHeight / 2;

    link.classList.toggle('active-scroll', isActive);
  });

  sections.forEach(item => {
    if (!item.el || !item.section) return;
    const rect = item.section.getBoundingClientRect();
    const isActive = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
    item.el.classList.toggle('active-scroll', isActive);
  });
}

// Scroll listener with passive option for smoother performance
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', updateActiveLink);

// Initialize AOS after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ once: true }); // animations play once, reduces reflows
});

// Initialize VanillaTilt only for visible images (lazy initialization)
function initVisibleTilts() {
  const imgs = document.querySelectorAll('img[data-tilt]');
  imgs.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight && !img.vtInitialized) {
      VanillaTilt.init(img, { max:6, speed:300, scale:1.02, perspective:1200 });
      img.vtInitialized = true;
    }
  });
}

// Run once on load and again on scroll for newly visible images
window.addEventListener('scroll', () => requestAnimationFrame(initVisibleTilts), { passive: true });
initVisibleTilts();
