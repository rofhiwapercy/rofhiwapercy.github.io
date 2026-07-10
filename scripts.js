document.addEventListener('DOMContentLoaded', () => {
// Helpers
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));


    // show
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // remove after timeout
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => {
        toast.remove();
      }, { once: true });
    }, timeout);
  }

// Current Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile menu toggle (class-based + ARIA)
  const menuBtn = document.getElementById('menuBtn');
  const navList = qs('.nav-list');

  if (menuBtn && navList) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        navList.style.display = 'flex';
        navList.style.flexDirection = 'column';
        navList.style.position = 'absolute';
        navList.style.right = '18px';
        navList.style.top = '64px';
        navList.style.background = 'rgba(255,255,255,0.92)';
        navList.style.padding = '12px';
        navList.style.borderRadius = '10px';
        navList.style.boxShadow = '0 8px 24px rgba(43,37,33,0.08)';
      } else {
        navList.style.display = '';
        navList.style.flexDirection = '';
        navList.style.position = '';
        navList.style.right = '';
        navList.style.top = '';
        navList.style.background = '';
        navList.style.padding = '';
        navList.style.borderRadius = '';
        navList.style.boxShadow = '';
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) {
        navList.classList.remove('nav-open');
        navList.style.display = '';
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

// Enroll button
  const enrollBtn = document.getElementById('enrollBtn');
  if (enrollBtn) {
    enrollBtn.addEventListener('click', () => {
      window.open('https://forms.gle/MYUrJmLeqyqrtrS8A', '_blank', 'noopener,noreferrer');
    });
  }

// Learn more +  highlight
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  const curriculum = document.getElementById('curriculum');

  if (learnMoreBtn && curriculum) {
    learnMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      curriculum.scrollIntoView({ behavior: 'smooth', block: 'start' });
      curriculum.classList.add('flash-highlight');
      setTimeout(() => curriculum.classList.remove('flash-highlight'), 2200);
    });
  }

  /*hook */
  document.addEventListener('product:added', (e) => {
    // hook to update cart UI or analytics
    // console.log('product added', e.detail);
  });
});
