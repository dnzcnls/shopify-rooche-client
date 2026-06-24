// Maison Noir — Shopify Theme JS
(function () {
  'use strict';

  // Header scroll state
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const menuClose = document.querySelector('[data-menu-close]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (menuClose && mobileMenu) {
    menuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }

  // Toast
  const toast = (msg) => {
    let el = document.querySelector('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('visible');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('visible'), 2200);
  };

  // Update cart badge from Shopify cart
  const updateCartBadge = (count) => {
    document.querySelectorAll('[data-cart-count]').forEach((n) => {
      n.textContent = count;
      n.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  };

  // Fetch current cart count on load
  fetch('/cart.js')
    .then((r) => r.json())
    .then((c) => updateCartBadge(c.item_count))
    .catch(() => {});

  // Product page: variant + size + add to cart
  const productForm = document.querySelector('[data-product-form]');
  if (productForm) {
    const variantInput = productForm.querySelector('[name="id"]');
    const swatches = productForm.querySelectorAll('[data-variant-id]');
    const addBtn = productForm.querySelector('[data-add-btn]');
    const addLabel = addBtn ? addBtn.querySelector('[data-add-label]') : null;
    const requiresSelection = swatches.length > 0;

    if (requiresSelection && addBtn) {
      addBtn.disabled = true;
      if (addLabel) addLabel.textContent = 'Select a Size';
    }

    swatches.forEach((sw) => {
      sw.addEventListener('click', () => {
        swatches.forEach((s) => s.classList.remove('selected'));
        sw.classList.add('selected');
        if (variantInput) variantInput.value = sw.dataset.variantId;
        if (addBtn) {
          const available = sw.dataset.available === 'true';
          addBtn.disabled = !available;
          if (addLabel) addLabel.textContent = available ? 'Add to Bag' : 'Sold Out';
        }
      });
    });

    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!variantInput || !variantInput.value) {
        toast('Please select a size');
        return;
      }
      addBtn.disabled = true;
      const oldLabel = addLabel ? addLabel.textContent : '';
      if (addLabel) addLabel.textContent = 'Adding…';
      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: variantInput.value, quantity: 1 }),
        });
        if (!res.ok) throw new Error('add failed');
        const cart = await fetch('/cart.js').then((r) => r.json());
        updateCartBadge(cart.item_count);
        if (addLabel) addLabel.textContent = 'Added to Bag ✓';
        toast('Added to your bag');
        setTimeout(() => {
          if (addLabel) addLabel.textContent = oldLabel || 'Add to Bag';
          addBtn.disabled = false;
        }, 1800);
      } catch (err) {
        if (addLabel) addLabel.textContent = oldLabel || 'Add to Bag';
        addBtn.disabled = false;
        toast('Unable to add — please try again');
      }
    });
  }

  // Product gallery thumbnails
  const galleryMain = document.querySelector('[data-gallery-main] img');
  document.querySelectorAll('[data-thumb]').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('[data-thumb]').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
      if (galleryMain) galleryMain.src = thumb.dataset.src || thumb.querySelector('img').src;
    });
  });

  // Cart line item qty / remove
  document.querySelectorAll('[data-cart-item]').forEach((item) => {
    const key = item.dataset.cartItem;
    const minus = item.querySelector('[data-qty-minus]');
    const plus = item.querySelector('[data-qty-plus]');
    const display = item.querySelector('[data-qty-value]');
    const remove = item.querySelector('[data-remove]');

    const update = async (qty) => {
      try {
        const res = await fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: key, quantity: qty }),
        });
        if (!res.ok) throw new Error();
        window.location.reload();
      } catch {
        toast('Unable to update bag');
      }
    };

    if (minus) minus.addEventListener('click', () => {
      const cur = parseInt(display.textContent, 10);
      update(Math.max(1, cur - 1));
    });
    if (plus) plus.addEventListener('click', () => {
      const cur = parseInt(display.textContent, 10);
      update(cur + 1);
    });
    if (remove) remove.addEventListener('click', () => update(0));
  });
})();
