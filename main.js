// ============================================
// JUNK HAUL OFF TEXAS — Main JS
// ============================================

(function () {
  'use strict';

  // ---- Mobile Menu ----
  const menuToggle = document.getElementById('menu-toggle');
  const navMobile = document.getElementById('nav-mobile');

  if (menuToggle && navMobile) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navMobile.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (navMobile && navMobile.classList.contains('open')) {
      if (!navMobile.contains(e.target) && !menuToggle.contains(e.target)) {
        navMobile.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Global close function for inline onclick
  window.closeMobileMenu = function () {
    if (navMobile) {
      navMobile.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  };

  // ---- Intersection Observer (fade-up animations) ----
  const fadeEls = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && fadeEls.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header').offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

        window.scrollTo({
          top: top,
          behavior: 'smooth',
        });
      }
    });
  });

  // ---- Form handling ----
  window.handleFormSubmit = function (e, formType) {
    e.preventDefault();

    var form = e.target;
    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.innerHTML;

    // Basic validation visual
    var inputs = form.querySelectorAll('[required]');
    var allFilled = true;
    inputs.forEach(function (input) {
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = '#e74c3c';
        input.addEventListener(
          'input',
          function () {
            this.style.borderColor = '';
          },
          { once: true }
        );
      }
    });

    if (!allFilled) return;

    // Show sending state
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style="animation:spin 1s linear infinite"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg> Sending...';
    btn.disabled = true;

    // Simulate send (replace with actual endpoint in production)
    setTimeout(function () {
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Sent! We\'ll be in touch.';
      btn.style.background = '#2d8a42';

      // Reset after a few seconds
      setTimeout(function () {
        form.reset();
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    }, 1200);
  };

  // ---- Header shadow on scroll ----
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 10) {
          header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.1)';
        } else {
          header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
        }
      },
      { passive: true }
    );
  }
})();

// Spin keyframe for loading spinner (injected via JS to avoid extra CSS)
(function () {
  var style = document.createElement('style');
  style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
  document.head.appendChild(style);
})();
