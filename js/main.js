document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    // Change background when user scrolls 50px
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
});
