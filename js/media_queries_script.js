// Funcionalidad del menu hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menu al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Funcion para mostrar información sobre el viewport actual
function mostrarInfoViewport() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    console.log(`Viewport actual: ${width}px × ${height}px`);

    // Determinar el breakpoint actual
    let breakpoint;
    if (width >= 1200) breakpoint = 'Desktop Grande';
    else if (width >= 992) breakpoint = 'Desktop';
    else if (width >= 768) breakpoint = 'Tablet';
    else if (width >= 576) breakpoint = 'Mobile Grande';
    else breakpoint = 'Mobile Pequeño';

    console.log(`Breakpoint actual: ${breakpoint}`);
}

// Detectar cambios en el tamaño de ventana
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        mostrarInfoViewport();
    }, 250);
});

// Mostrar info inicial
window.addEventListener('load', mostrarInfoViewport);

// Animacion de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que se animan al entrar
document.querySelectorAll('.demo-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Efecto interactivo en items de galeria
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function () {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Informacion de orientacion
function checkOrientation() {
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    console.log(`Orientación: ${orientation}`);
}

window.addEventListener('orientationchange', () => {
    setTimeout(checkOrientation, 100);
});

checkOrientation();

console.log('Página de Media Queries cargada correctamente');
console.log('Redimensiona la ventana para ver los cambios en el diseño responsivo');