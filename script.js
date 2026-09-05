/* ============================================================
   CROSSPOINT ROTTWEILERS — Site JavaScript
   Version 1.0 | April 2026
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------
     NAVIGATION — Scroll Behavior
     Adds .nav-scrolled class on scroll for
     background and padding change.
     ---------------------------------------- */
  const nav = document.querySelector('.nav');

  function handleNavScroll() {
    if (window.scrollY > 80) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll(); // Run on load

  /* ----------------------------------------
     NAVIGATION — Mobile Menu Toggle
     Opens/closes full-screen mobile menu.
     ---------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when a link is clicked
    const mobileLinks = navMobile.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ----------------------------------------
     SCROLL ANIMATIONS
     Reveals .animate elements as they enter
     the viewport using IntersectionObserver.
     ---------------------------------------- */
  const animatedElements = document.querySelectorAll('.animate');

  if ('IntersectionObserver' in window && animatedElements.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: make everything visible if no IntersectionObserver
    animatedElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----------------------------------------
     SMOOTH SCROLL
     Smooth scroll to anchor links on same page.
     ---------------------------------------- */
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  /* ----------------------------------------
     ACTIVE NAV LINK
     Highlights the current page link in nav.
     ---------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else if (currentPage === '' && linkPage === 'index.html') {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------
     CONTACT FORM — Basic Validation
     Validates required fields before submit.
     Replace the submit handler with your
     actual form handling (Formspree, Netlify,
     custom backend, etc.).
     ---------------------------------------- */
  const contactForm = document.getElementById('inquiry-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderBottomColor = '#A45A2A';
        } else {
          field.style.borderBottomColor = '';
        }
      });

      if (!isValid) {
        return;
      }

      // Actually send the submission to Netlify Forms (AJAX), then show the
      // confirmation. Netlify captures POSTs whose body includes form-name.
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(contactForm)).toString()
      })
      .then(function () {
        const formContainer = contactForm.parentElement;
        contactForm.style.display = 'none';

        const confirmation = document.createElement('div');
        confirmation.className = 'form-confirmation';
        confirmation.innerHTML = `
          <h3>Inquiry Received</h3>
          <div class="divider divider-left"></div>
          <p>Thank you for submitting your inquiry to Crosspoint Rottweilers. We have received your information and will review it carefully.</p>
          <p>You can expect to hear from us within 3–5 business days. We appreciate your interest and your patience as we work through our inquiry process thoughtfully.</p>
          <p style="margin-top: 2rem;">— Crosspoint Rottweilers</p>
        `;
        formContainer.appendChild(confirmation);
        confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
      })
      .catch(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Inquiry'; }
        alert('Sorry — something went wrong sending your inquiry. Please email us directly at crosspointrottweilers@outlook.com.');
      });
    });

    // Reset field styles on input
    const formFields = contactForm.querySelectorAll('.form-input, .form-textarea, .form-select');
    formFields.forEach(function (field) {
      field.addEventListener('input', function () {
        this.style.borderBottomColor = '';
      });
    });
  }

  /* ----------------------------------------
     IMAGE PLACEHOLDER TEXT
     Adds placeholder text to empty .card-image
     and similar containers for development.
     Remove this in production.
     ---------------------------------------- */
  const imagePlaceholders = document.querySelectorAll('.img-placeholder');
  // Placeholder text is handled via CSS / HTML content

  /* ----------------------------------------
     YEAR IN FOOTER
     Auto-updates copyright year.
     ---------------------------------------- */
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
