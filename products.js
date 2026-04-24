document.addEventListener('DOMContentLoaded', () => {
  const products = [
    {
      name: "Classic",
      description: "A timeless collection of our finest chocolates, perfect for any occasion.",
      img: "0.png",
      price: 25.50
    },
    {
      name: "Christmas",
      description: "Get into the festive spirit with this box of holiday-themed treats.",
      img: "1.png",
      price: 25.50
    },
    {
      name: "Valentine",
      description: "The perfect way to say 'I love you' with a selection of romantic sweets.",
      img: "2.png",
      price: 25.50
    },
    {
      name: "KIDS",
      description: "A fun and delicious assortment of chocolates designed for the little ones.",
      img: "3.png",
      price: 25.50
    },
    {
      name: "EASTER",
      description: "Celebrate Easter with this joyful box of spring-themed chocolates.",
      img: "4.png",
      price: 25.50
    }
  ];

  const modal = document.getElementById("product-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");
  const cartQuantity = document.querySelector('.cart-quantity');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartQuantity.textContent = totalItems;
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    if (!product) return;

    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCartCount();
  }

  document.querySelectorAll('.product-card .add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      const productName = card.querySelector('h3').textContent;
      const product = products.find(p => p.name === productName);

      if (product) {
        modalImg.src = product.img;
        modalTitle.textContent = product.name;
        modalDescription.textContent = product.description;
        modal.style.display = "block";
      }
    });
  });

  document.querySelector('.modal-add-to-cart').addEventListener('click', () => {
    const productName = modalTitle.textContent;
    addToCart(productName);
    modal.style.display = "none";
  });

  closeButton.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  updateCartCount();
});
