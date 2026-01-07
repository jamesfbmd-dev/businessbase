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

    // Read More functionality
    const readMoreLinks = document.querySelectorAll('.read-more-link');
    readMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const testimonialText = e.target.previousElementSibling;
            testimonialText.classList.toggle('expanded');
            if (testimonialText.classList.contains('expanded')) {
                e.target.textContent = 'Read Less';
            } else {
                e.target.textContent = 'Read More';
            }
        });
    });

    startSlider();
});
