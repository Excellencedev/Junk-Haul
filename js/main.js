(function(){
  'use strict';

  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', function() {
      const open = navList.classList.toggle('open');
      this.classList.toggle('active');
      this.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navList.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navList.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const header = document.getElementById('header');
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    if (window.innerWidth < 768) {
      var current = window.scrollY;
      if (current > lastScroll && current > 120) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScroll = current;
    }
  }, { passive: true });

  document.querySelectorAll('.faq-item').forEach(function(item) {
    item.addEventListener('toggle', function() {
      if (this.open) {
        document.querySelectorAll('.faq-item').forEach(function(other) {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;

      var data = new URLSearchParams();
      Array.from(form.elements).forEach(function(el) {
        if (el.name && el.value) data.append(el.name, el.value);
      });
      data.append('_to', 'Junkhaulofftx@gmail.com');

      fetch('https://formsubmit.co/ajax/Junkhaulofftx@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      })
      .then(function(r) { return r.json(); })
      .then(function(r) {
        if (r.success) {
          btn.textContent = 'Sent! We\'ll be in touch soon.';
          btn.style.background = '#10b981';
          form.reset();
          setTimeout(function() {
            btn.textContent = original;
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        } else {
          throw new Error('Failed');
        }
      })
      .catch(function() {
        btn.textContent = 'Something went wrong. Please email us directly.';
        btn.style.background = '#ef4444';
        setTimeout(function() {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      });
    });
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .feature-card, .step, .faq-item, .about-card').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });
})();
