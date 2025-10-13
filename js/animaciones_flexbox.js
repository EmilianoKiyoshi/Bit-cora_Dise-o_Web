// Toggle menú en móvil/tablet
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', function () {
    sidebar.classList.toggle('active');

    // Cambiar icono
    if (sidebar.classList.contains('active')) {
        menuToggle.textContent = '✕';
    } else {
        menuToggle.textContent = '☰';
    }
});

// Cerrar menú al hacer click en un enlace (en móvil)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });
});

// Cerrar menú al hacer click fuera de él
document.addEventListener('click', function (event) {
    if (window.innerWidth <= 1024) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    }
});

// Animación de entrada para las tarjetas
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';

            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animación de entrada
document.querySelectorAll('.animation-card, .summary-card, .flex-example').forEach(card => {
    observer.observe(card);
});