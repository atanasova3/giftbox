
const slides = [
  { name: "CLASSIC", color: "#a588c8 ", img: "0.png" },
  { name: "CHRISTMAS", color: "#AB2330", img: "1.png" },
  { name: "VALENTINE'S", color: "#E73895", img: "2.png" },
  { name: "KIDS", color: "#FADA5E", img: "3.png" },
  { name: "EASTER", color: "#136207", img: "4.png" }
];

let currentIndex = 0;

function init() {
  const containers = ['left-container', 'center-container', 'right-container'];
  
  containers.forEach(id => {
    const el = document.getElementById(id);
    slides.forEach((slide, index) => {
      const img = document.createElement('img');
      img.src = slide.img;
      img.className = 'box-image';
      img.alt = slide.name;
      img.dataset.index = index;
      el.appendChild(img);
    });
  });
  
  updateCarousel();
}

function updateCarousel() {
  const total = slides.length;
  
  const leftIdx = (currentIndex - 1 + total) % total;
  const rightIdx = (currentIndex + 1) % total;

  document.body.style.backgroundColor = slides[currentIndex].color;
  const bgText = document.getElementById('bg-text');
  bgText.textContent = slides[currentIndex].name;

  document.querySelectorAll('.carousel-container').forEach(container => {
    const imgs = container.querySelectorAll('.box-image');
    
    imgs.forEach(img => img.classList.remove('active'));
    
    if(container.id === 'left-container') {
      imgs[leftIdx].classList.add('active');
    } else if(container.id === 'center-container') {
      imgs[currentIndex].classList.add('active');
    } else if(container.id === 'right-container') {
      imgs[rightIdx].classList.add('active');
    }
  });
}

/**
 * 4. NAVIGATION FUNCTIONS
 */
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

// Start the app
init();