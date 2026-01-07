document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    const scrollThreshold = 50;
    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // Mobile navigation toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('nav-open')) {
                document.body.classList.remove('nav-open');
            }
        });
    });

    // Testimonial "Read More" functionality
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const content = e.target.closest('.testimonial-content');
            if (content) {
                const testimonialText = content.querySelector('.testimonial-text');
                testimonialText.classList.toggle('expanded');
                if (testimonialText.classList.contains('expanded')) {
                    e.target.textContent = 'Read Less';
                } else {
                    e.target.textContent = 'Read More';
                }
            }
        });
    });
});
