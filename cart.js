document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotal = document.getElementById('cart-total');
  const cartQuantity = document.querySelector('.cart-quantity');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartQuantity.textContent = totalItems;
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      cartTotal.textContent = '$0.00';
      updateCartCount();
      return;
    }

    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>$${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-quantity">
          <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
        </div>
        <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
        <button class="remove-item-btn" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(itemElement);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    updateCartCount();
  }

  cartItemsContainer.addEventListener('click', (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains('quantity-btn')) {
      const action = e.target.dataset.action;
      if (action === 'increase') {
        cart[index].quantity++;
      } else if (action === 'decrease') {
        cart[index].quantity--;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
      }
    }

    if (e.target.classList.contains('remove-item-btn')) {
      cart.splice(index, 1);
    }

    saveCart();
    renderCartItems();
  });

  renderCartItems();
  updateCartCount();
});
