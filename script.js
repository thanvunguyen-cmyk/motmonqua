/* ============================================
   MOTMONQUA.COM - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Hero Slider ---
  const sliderWrapper = document.getElementById('sliderWrapper');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentSlide = 0;
  let slideCount = document.querySelectorAll('.slide').length;
  let slideInterval;

  function goToSlide(index) {
    if (!sliderWrapper) return;
    if (index >= slideCount) index = 0;
    if (index < 0) index = slideCount - 1;
    currentSlide = index;
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    sliderDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
  sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(parseInt(dot.dataset.index));
      startAutoSlide();
    });
  });

  if (slideCount > 0) startAutoSlide();

  // --- Categories Dropdown ---
  const categoriesBtn = document.getElementById('categoriesBtn');
  const categoriesDropdown = document.getElementById('categoriesDropdown');

  if (categoriesBtn && categoriesDropdown) {
    categoriesBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      categoriesDropdown.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if (!categoriesDropdown.contains(e.target) && !categoriesBtn.contains(e.target)) {
        categoriesDropdown.classList.remove('active');
      }
    });
  }

  // --- Mobile Menu ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  }

  // --- Scroll to Top ---
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Scroll Animations ---
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // --- Sticky Header Shadow ---
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
      }
    });
  }

  // --- Product Detail: Thumbnail Gallery ---
  const thumbImages = document.querySelectorAll('.thumb-list img');
  const mainImage = document.querySelector('.main-image img');

  if (thumbImages.length > 0 && mainImage) {
    thumbImages.forEach(thumb => {
      thumb.addEventListener('click', () => {
        mainImage.src = thumb.src;
        thumbImages.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }
});
