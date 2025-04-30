
document.getElementById('nav-toggle').addEventListener('click', function () {
  const links = document.getElementById('nav-links');
  links.classList.toggle('active');
});

const dropdown = document.querySelector('.dropdown');
if (dropdown) {
  dropdown.addEventListener('mouseenter', () => {
    dropdown.classList.add('open');
  });
  dropdown.addEventListener('mouseleave', () => {
    dropdown.classList.remove('open');
  });
}

window.addEventListener('scroll', () => {
  const header = document.querySelector('.navbar');
  if (window.scrollY > 30) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

if (window.innerWidth > 768) {
  dropdown.addEventListener('mouseenter', () => {
    dropdown.classList.add('open');
  });
  dropdown.addEventListener('mouseleave', () => {
    dropdown.classList.remove('open');
  });
}

// Carousel with seamless loop
const track = document.querySelector('.carousel-track');
let slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
let currentSlide = 1;

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.classList.add('clone');
lastClone.classList.add('clone');

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);
slides = Array.from(track.children);

const slideWidth = slides[0].getBoundingClientRect().width;
track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

function updateSlide(position, transition = true) {
  track.style.transition = transition ? 'transform 0.4s ease-in-out' : 'none';
  track.style.transform = `translateX(-${slideWidth * position}px)`;
}

nextButton.addEventListener('click', () => {
  if (currentSlide >= slides.length - 1) return;
  currentSlide++;
  updateSlide(currentSlide);
});

prevButton.addEventListener('click', () => {
  if (currentSlide <= 0) return;
  currentSlide--;
  updateSlide(currentSlide);
});

track.addEventListener('transitionend', () => {
  if (slides[currentSlide].classList.contains('clone')) {
    track.style.transition = 'none';
    currentSlide = slides[currentSlide].classList.contains('clone') && currentSlide === slides.length - 1 ? 1 : slides.length - 2;
    updateSlide(currentSlide, false);
  }
});

// Swipe for mobile
let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

track.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const touchX = e.touches[0].clientX;
  const diff = startX - touchX;

  if (diff > 50) {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSlide(currentSlide);
    }
    isDragging = false;
  } else if (diff < -50) {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlide(currentSlide);
    }
    isDragging = false;
  }
});

track.addEventListener('touchend', () => {
  isDragging = false;
});

function desktopParallax() {
  const heroImage = document.querySelector('.hero-image');
  if (!heroImage || window.innerWidth < 768) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroImage.style.transform = `translateY(${scrollY * 0.3}px)`; // Ajusta intensidad aquí
  });
}

document.addEventListener('DOMContentLoaded', desktopParallax);
