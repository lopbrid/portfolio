const navbar = document.getElementById('navbar')

function openSidebar() {
  navbar.classList.add('show')
}

function closeSidebar() {
  navbar.classList.remove('show')
}

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

let scrollTimer;

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

    if (isActive) {
      link.classList.add('active-scroll');
    } else {
      link.classList.remove('active-scroll');
    }
  });

  sections.forEach(item => {
    if (!item.el || !item.section) return;
    const rect = item.section.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
      item.el.classList.add('active-scroll');
    } else {
      item.el.classList.remove('active-scroll');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);





