document.addEventListener('DOMContentLoaded', () => {
  const products = [
    {
      name: "Classic",
      description: "A timeless collection of our finest chocolates, perfect for any occasion.",
      img: "0.png"
    },
    {
      name: "Christmas",
      description: "Get into the festive spirit with this box of holiday-themed treats.",
      img: "1.png"
    },
    {
      name: "Valentine",
      description: "The perfect way to say 'I love you' with a selection of romantic sweets.",
      img: "2.png"
    },
    {
      name: "KIDS",
      description: "A fun and delicious assortment of chocolates designed for the little ones.",
      img: "3.png"
    },
    {
      name: "EASTER",
      description: "Celebrate Easter with this joyful box of spring-themed chocolates.",
      img: "4.png"
    }
  ];

  const modal = document.getElementById("product-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");

  document.querySelectorAll('.add-to-cart').forEach(button => {
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

  closeButton.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});
