document.addEventListener('DOMContentLoaded', () => {

  /* ========== TYPING EFFECT ========== */
  const textElement = document.getElementById('typing-text');
  const texts = ["IoT Solutions.", "Embedded Systems.", "Smart Tech."];
  let i = 0, j = 0, del = false;

  (function type() {
    if (!textElement) return;
    textElement.innerText = texts[i].substring(0, j);
    if (!del && j++ === texts[i].length) {
      del = true;
      setTimeout(type, 1500); // Wait a bit before deleting
      return;
    }
    if (del && j-- === 0) {
      del = false;
      i = (i + 1) % texts.length;
    }
    setTimeout(type, del ? 50 : 100);
  })();

  /* ========== REVEAL ON SCROLL ========== */
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        section.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on load

  /* ========== ACTIVE NAV HIGHLIGHT ========== */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  /* ========== SCROLL PROGRESS BAR ========== */
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
  });

  /* ========== BACK TO TOP BUTTON ========== */
  const backBtn = document.getElementById("backToTop");

  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backBtn.style.display = "flex";
      } else {
        backBtn.style.display = "none";
      }
    });

    backBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  /* ========== MODAL LOGIC ========== */
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const closeBtn = document.querySelector('.modal-close');

  // Trigger modal on project card click
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      modalImg.src = card.dataset.img;
      // Error handling for missing image
      modalImg.onerror = function () { this.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80'; };

      modalTitle.innerText = card.dataset.title;
      modalDesc.innerText = card.dataset.desc;
      modalTech.innerText = "Stack: " + card.dataset.tech;
      modal.style.display = 'flex'; // Use flex to center
    });
  });

  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = 'none';
  }

  window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

  /* ========== MOBILE NAV TOGGLE ========== */
  (function initMobileNav() {
    const nav = document.querySelector('.techno-nav');
    const toggle = document.querySelector('.nav-toggle');
    const mobileLinks = document.querySelectorAll('.nav-center-links a');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav-open');
    });

    mobileLinks.forEach(l => l.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  /* ========== CERTIFICATE GALLERY ========== */
  (function initCertGallery() {
    const certItems = document.querySelectorAll('.cert-item');
    const certModal = document.getElementById('certModal');
    const certModalImg = document.getElementById('certModalImg');
    const certCloseBtn = document.querySelector('.cert-close');

    if (!certModal || !certModalImg) return;

    // Add click event to each grid item
    certItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          certModalImg.src = img.src;
          certModal.style.display = 'flex';
        }
      });
    });

    // Close Modal Logic
    if (certCloseBtn) {
      certCloseBtn.onclick = () => certModal.style.display = 'none';
    }

    // Close on background click
    window.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.style.display = 'none';
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal.style.display === 'flex') {
        certModal.style.display = 'none';
      }
    });
  })();

});
