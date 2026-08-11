document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkIcon = darkModeToggle.querySelector('i');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuIcon = menuToggle.querySelector('i');
    const nav = document.getElementById('site-nav');

    const setDarkMode = (enabled) => {
        body.classList.toggle('dark-mode', enabled);
        localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
        darkIcon.classList.toggle('fa-sun', enabled);
        darkIcon.classList.toggle('fa-moon', !enabled);
    };

    setDarkMode(localStorage.getItem('darkMode') === 'enabled');

    darkModeToggle.addEventListener('click', () => {
        setDarkMode(!body.classList.contains('dark-mode'));
    });

    menuToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuIcon.classList.toggle('fa-times', isOpen);
        menuIcon.classList.toggle('fa-bars', !isOpen);
    });

    document.querySelectorAll('nav a[href^="#"], .brand[href^="#"], footer a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            nav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    const revealItems = document.querySelectorAll('.hero-content, .hero-panel, .section-heading, .skill-category, .project-card, .timeline-item, .cert-card, .contact-grid > *');
    revealItems.forEach((item) => item.classList.add('hidden'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => observer.observe(item));
});
