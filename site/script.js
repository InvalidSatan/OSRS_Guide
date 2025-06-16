// Smooth scrolling for anchor links
const links = document.querySelectorAll('nav a');
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        const navList = document.querySelector('nav ul');
        if (navList.classList.contains('show')) {
            navList.classList.remove('show');
        }
    });
});

// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('nav ul');
if (toggle) {
    toggle.addEventListener('click', () => {
        navList.classList.toggle('show');
    });
}
