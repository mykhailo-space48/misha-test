document.getElementById('clear-cart-btn')?.addEventListener('click', async function () {
    const confirmMessage = this.dataset.confirmMessage || 'Are you sure?';
    const clearingText = this.dataset.clearingText || 'Clearing...';
    const clearText = this.dataset.clearText || 'Clear Cart';
    const errorText = this.dataset.errorText || 'Error clearing cart';

    if (!confirm(confirmMessage)) {
        return;
    }

    const btn = this;
    btn.disabled = true;
    btn.textContent = clearingText;

    try {
        await fetch(window.Shopify.routes.root + 'cart/clear.js', {
            method: 'POST'
        });

        // MiniCart badge
        document.querySelector('.cart-count-bubble')?.remove();

        // Page selectors
        document.querySelectorAll('cart-items, #main-cart-footer').forEach((element) => {
            element.classList.add('is-empty');
        });

        // Remove the clear cart button
        btn.parentElement.remove();

    } catch (error) {
        console.error(errorText);
        btn.disabled = false;
        btn.textContent = clearText;
    }
});
