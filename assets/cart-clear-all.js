document.getElementById('clear-cart-btn')?.addEventListener('click', async function () {
    if (!confirm('Are you sure you want to remove all items?')) {
        return;
    }

    const btn = this;
    btn.disabled = true;
    btn.textContent = 'Clearing...';

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
        alert('Error clearing cart');
        btn.disabled = false;
        btn.textContent = 'Clear Cart';
    }
});
