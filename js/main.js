document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const closeButton = document.querySelector('.mobile-menu-close');
    const navLinks = document.querySelector('.nav-links');
    const scrollThreshold = 50;

    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    function openMobileMenu() {
        document.body.classList.add('mobile-menu-open');
    }

    function closeMobileMenu() {
        document.body.classList.remove('mobile-menu-open');
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    mobileToggle.addEventListener('click', openMobileMenu);
    closeButton.addEventListener('click', closeMobileMenu);
    navLinks.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            closeMobileMenu();
        }
    });
});
