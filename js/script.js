const header = document.querySelector('.site-header');
const nav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.nav-toggle');
const faqItems = document.querySelectorAll('.faq-item');
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');
const lightboxClose = document.querySelector('.lightbox-close');
let lastFocusedElement = null;

function updateHeaderState() {
  if (!header) return;

  if (window.scrollY > 24) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }
}

function toggleMobileMenu() {
  if (!nav || !navToggle) return;

  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

function closeMobileMenu() {
  if (!nav || !navToggle) return;

  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

function setupFaq() {
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach((faqItem) => {
        faqItem.classList.remove('active');
        const faqButton = faqItem.querySelector('.faq-question');
        if (faqButton) {
          faqButton.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function setupGalleryLightbox() {
  galleryItems.forEach((image) => {
    image.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;

      lastFocusedElement = document.activeElement;
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      lightboxClose?.focus();
    });
  });

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lastFocusedElement?.focus();
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      closeLightbox();
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }
}

window.addEventListener('scroll', updateHeaderState);
window.addEventListener('resize', () => {
  if (window.innerWidth > 780) {
    closeMobileMenu();
  }
});

if (navToggle) {
  navToggle.addEventListener('click', toggleMobileMenu);
}

if (nav) {
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });
}

setupFaq();
setupGalleryLightbox();
updateHeaderState();
