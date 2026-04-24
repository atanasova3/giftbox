/**
 * 1. SLIDE DATA
 * Each object defines the name, background color, and image filename for a slide.
 */
const slides = [
  { name: "CLASSIC", color: "#a588c8 ", img: "0.png" },
  { name: "CHRISTMAS", color: "#AB2330", img: "1.png" },
  { name: "VALENTINE'S", color: "#E73895", img: "2.png" },
  { name: "KIDS", color: "#FADA5E", img: "3.png" },
  { name: "EASTER", color: "#136207", img: "4.png" }
];

let currentIndex = 0;

/**
 * 2. INITIALIZATION
 * Creates image elements for all containers once.
 */
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

/**
 * 3. UPDATE CAROUSEL
 * Changes active images, background color, and background text.
 */
function updateCarousel() {
  const total = slides.length;
  
  // Calculate neighbors for the side previews
  const leftIdx = (currentIndex - 1 + total) % total;
  const rightIdx = (currentIndex + 1) % total;

  // A. Update Background Color and Large Text
  document.body.style.backgroundColor = slides[currentIndex].color;
  const bgText = document.getElementById('bg-text');
  bgText.textContent = slides[currentIndex].name;

  // B. Toggle "active" class on images
  document.querySelectorAll('.carousel-container').forEach(container => {
    const imgs = container.querySelectorAll('.box-image');
    
    // Hide all first
    imgs.forEach(img => img.classList.remove('active'));
    
    // Show specific image based on container role
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