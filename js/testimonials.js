document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            dots[i].classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    function startSlider() {
        interval = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(interval);
        startSlider();
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            showSlide(currentIndex);
            resetTimer();
        });
    });

    prevArrow.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    nextArrow.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    startSlider();
});

const modal = document.getElementById('testimonialModal');
const modalText = modal.querySelector('.modal-text');
const modalAuthorName = modal.querySelector('.modal-author-name');
const modalAuthorTitle = modal.querySelector('.modal-author-title');
const closeBtn = modal.querySelector('.modal-close');
const overlay = modal.querySelector('.modal-overlay');

let lastFocusedElement = null;

document.querySelectorAll('.read-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    lastFocusedElement = button;

    const slide = button.closest('.testimonial-slide');

    modalText.textContent =
      slide.querySelector('.testimonial-full-text').textContent;

    modalAuthorName.textContent =
      slide.querySelector('.author-name').textContent;

    modalAuthorTitle.textContent =
      slide.querySelector('.author-title').textContent;

    modal.classList.add('is-open');
    modal.removeAttribute('inert');

    closeBtn.focus();
  });
});

function closeModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('inert', '');

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

