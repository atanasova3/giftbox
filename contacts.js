document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For this example, we'll just show an alert
    alert('Thank you for your message! We will get back to you soon.');
    
    contactForm.reset();
  });

  // Update cart count on page load
  const cartQuantity = document.querySelector('.cart-quantity');
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartQuantity.textContent = totalItems;
});
