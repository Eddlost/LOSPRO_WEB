/* ============================================================
   LOSPRO futuristic site — interactions
   ============================================================ */
(() => {
  'use strict';

  /* ---------- NAV: hide on scroll down, show on up ---------- */
  const nav = document.getElementById('nav');
  let lastY = 0;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', y > 30);
      if (y > 120 && y > lastY + 4) nav.classList.add('hidden');
      else if (y < lastY - 4) nav.classList.remove('hidden');
    }
    lastY = y;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ---------- Burger menu ---------- */
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Number counters ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  const counted = new WeakSet();
  if ('IntersectionObserver' in window) {
    const cIo = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting && !counted.has(en.target)) {
          counted.add(en.target);
          const el = en.target;
          const target = parseInt(el.dataset.counter, 10) || 0;
          const dur = 1400;
          const start = performance.now();
          const step = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.floor(target * ease) + (target >= 100 ? '+' : '+');
            if (p < 1) requestAnimationFrame(step);
            else el.textContent = target + '+';
          };
          requestAnimationFrame(step);
          cIo.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cIo.observe(el));
  }

  /* ---------- Text scramble (hero) ---------- */
  const scrambles = document.querySelectorAll('[data-scramble]');
  const chars = '█▓▒░#$%&/()=?ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  scrambles.forEach(el => {
    const final = el.dataset.scramble || el.textContent;
    let frame = 0;
    const total = 28;
    const animate = () => {
      let out = '';
      for (let i = 0; i < final.length; i++) {
        if (i < Math.floor(frame * final.length / total)) {
          out += final[i];
        } else {
          out += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = out;
      frame++;
      if (frame <= total) setTimeout(animate, 40);
      else el.textContent = final;
    };
    // trigger after slide-up animation finishes
    const delay = parseInt(getComputedStyle(el.parentElement).animationDelay) || 0;
    setTimeout(animate, 600 + delay * 1000);
  });

  /* ---------- Hero parallax bg ---------- */
  const heroBg = document.querySelector('.hero-bg-img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.3}px) scale(${1 + y * 0.0004})`;
      }
    }, { passive: true });
  }

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('.field').forEach(f => f.classList.remove('error'));

      const get = (n) => form.querySelector(`[name="${n}"]`);
      const name = get('name');
      if (name && name.value.trim().length < 2) {
        name.closest('.field').classList.add('error'); valid = false;
      }
      const email = get('email');
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRe.test(email.value.trim())) {
        email.closest('.field').classList.add('error'); valid = false;
      }
      const type = get('type');
      if (type && !type.value) {
        type.closest('.field').classList.add('error'); valid = false;
      }
      const msg = get('message');
      if (msg && msg.value.trim().length < 20) {
        msg.closest('.field').classList.add('error'); valid = false;
      }

      if (valid) {
        // Fake submit; wire up backend later
        if (formSuccess) formSuccess.classList.add('show');
        form.reset();
        setTimeout(() => formSuccess && formSuccess.classList.remove('show'), 6000);
      }
    });

    // Clear errors on input
    form.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.field').classList.remove('error');
      });
    });
  }

  /* ---------- Gallery filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        galleryItems.forEach(item => {
          const show = f === 'all' || item.dataset.category === f;
          item.classList.toggle('hidden', !show);
        });
      });
    });
  }

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbTitle = document.getElementById('lightbox-title');
  const lbMeta = document.getElementById('lightbox-meta');
  const lbDesc = document.getElementById('lightbox-desc');
  const lbClose = document.getElementById('lightbox-close');
  if (lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        lbImg.style.background = item.dataset.bg || 'var(--concrete-700)';
        lbTitle.textContent = item.dataset.title || '';
        lbMeta.textContent = item.dataset.meta || '';
        lbDesc.textContent = item.dataset.desc || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const close = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };
    lbClose && lbClose.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* ---------- Service cards 3D tilt ---------- */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-py * 3}deg) rotateY(${px * 3}deg) translateZ(0)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

})();
