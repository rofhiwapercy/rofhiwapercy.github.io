document.addEventListener('DOMContentLoaded', () => {
// Helpers
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from((ctx || document).querySelectorAll(sel));

// Toast
  function createToast(message, timeout = 2200) {
    const container = document.getElementById('toastContainer') || (() => {
      const c = document.createElement('div');
      c.id = 'toastContainer';
      document.body.appendChild(c);
      return c;
    })();

    const toast = document.createElement('div');
    toast.className = 'site-toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    container.appendChild(toast);

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

// Modalar
  const storeLink = document.getElementById('storeLink');
  const storeModal = document.getElementById('storeModal');
  const modalCloseButtons = qsa('.close-btn', storeModal || document);
  const focusableSelector = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
  let lastActiveElement = null;

  function openModal(modal, triggerEl = null) {
    if (!modal) return;
    lastActiveElement = triggerEl || document.activeElement;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const first = qs(focusableSelector, modal);
    if (first) first.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  if (storeLink && storeModal) {
    storeLink.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(storeModal, storeLink);
    });

    modalCloseButtons.forEach(btn =>
      btn.addEventListener('click', () => closeModal(storeModal))
    );

    // click outside modal-content to close
    storeModal.addEventListener('click', (e) => {
      if (e.target === storeModal) closeModal(storeModal);
    });

    // escape to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && storeModal.classList.contains('active')) {
        closeModal(storeModal);
      }
    });
  }

  // Add to Cart (non-blocking toast, safer selectors)
  const addToCartButtons = qsa(
    '.product-card .btn.primary, .product-card .btnModal, .product-card .btn.primaryModal, .product-card .btnModal.primaryModal'
  );

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (ev) => {
      const productCard = button.closest('.product-card');
      if (!productCard) return;

      const title = productCard.dataset.title
        || (qs('.product-title', productCard) && qs('.product-title', productCard).textContent.trim())
        || 'Product';

      const price = productCard.dataset.price
        || (qs('.product-price', productCard) && qs('.product-price', productCard).textContent.trim())
        || '';

      createToast(`Added ${title}${price ? ' — ' + price : ''}`);

      // dispatch a custom event for integration
      const event = new CustomEvent('product:added', {
        detail: { title, price, productCard }
      });
      document.dispatchEvent(event);
    });
  });

  /*hook */
  document.addEventListener('product:added', (e) => {
    // hook to update cart UI or analytics
    // console.log('product added', e.detail);
  });
});
