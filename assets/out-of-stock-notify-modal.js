document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-out-of-stock-notify-trigger]');
  if (!trigger) {
    return;
  }

  const modalHost = document.querySelector('details-modal.out-of-stock-notify-modal');
  if (!modalHost) {
    return;
  }

  const summary = modalHost.querySelector('summary');
  const bodyField = modalHost.querySelector('[data-notify-body]');
  const productTitle = trigger.getAttribute('data-product-title');

  if (bodyField) {
    if (productTitle) {
      bodyField.value = `Please notify me when ${productTitle} is back in stock`;
    } else {
      bodyField.value = 'Please notify me when this product is back in stock';
    }
  }

  // Use the theme's native modal component API instead of simulated clicks.
  if (typeof modalHost.open === 'function' && summary) {
    modalHost.open({ target: summary });
    return;
  }

  const details = modalHost.querySelector('details');
  if (details) {
    details.setAttribute('open', 'open');
  }
});

