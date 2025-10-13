// Menú hamburguesa
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuToggle.innerHTML = sidebar.classList.contains('active') ? '✕' : '☰';
});

// Cerrar menú al hacer clic en enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });
});

// Cerrar menú al redimensionar a desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('active');
        menuToggle.innerHTML = '☰';
    }
});

// Animación al scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.demo-section, .unidad-ejemplo, .tipografia-bloque').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Análisis de unidades en consola
function analyzeUnits() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    console.group('📏 Análisis de Unidades CSS');
    console.log(`Viewport: ${width}×${height}px`);
    console.log(`Root font-size: ${rootFontSize}px`);
    console.log(`1rem = ${rootFontSize}px`);
    console.log(`1vh = ${(height / 100).toFixed(2)}px`);
    console.log(`1vw = ${(width / 100).toFixed(2)}px`);
    console.log(`1vmin = ${(Math.min(width, height) / 100).toFixed(2)}px`);
    console.log(`1vmax = ${(Math.max(width, height) / 100).toFixed(2)}px`);
    console.groupEnd();
}

// Análisis de tipografías
function analyzeFonts() {
    console.group('🔤 Análisis de Tipografías');

    const montserrat = document.querySelector('.montserrat-text');
    const lora = document.querySelector('.lora-text');
    const inter = document.querySelector('.inter-text');

    if (montserrat) {
        const size = parseFloat(getComputedStyle(montserrat).fontSize);
        console.log(`Montserrat (clamp): ${size.toFixed(2)}px`);
    }

    if (lora) {
        const size = parseFloat(getComputedStyle(lora).fontSize);
        console.log(`Lora (fixed): ${size.toFixed(2)}px`);
    }

    if (inter) {
        const size = parseFloat(getComputedStyle(inter).fontSize);
        console.log(`Inter (calc): ${size.toFixed(2)}px`);
    }

    console.groupEnd();
}

// Análisis de imágenes
function analyzeImages() {
    setTimeout(() => {
        console.group('🖼️ Análisis de Imágenes');

        const srcsetImg = document.querySelector('.imagen-srcset');
        if (srcsetImg && srcsetImg.complete) {
            console.log('Imagen con srcset:');
            console.log(`  URL cargada: ${srcsetImg.currentSrc || srcsetImg.src}`);
            console.log(`  Dimensiones: ${srcsetImg.naturalWidth}×${srcsetImg.naturalHeight}px`);
        }

        const pictureImg = document.querySelector('.imagen-picture img');
        if (pictureImg && pictureImg.complete) {
            console.log('Imagen con picture:');
            console.log(`  URL cargada: ${pictureImg.currentSrc || pictureImg.src}`);
            console.log(`  Dimensiones: ${pictureImg.naturalWidth}×${pictureImg.naturalHeight}px`);
        }

        console.groupEnd();
    }, 1500);
}

// Ejecutar análisis inicial
window.addEventListener('load', () => {
    analyzeUnits();
    analyzeFonts();
    analyzeImages();
});

// Actualizar al redimensionar
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.clear();
        analyzeUnits();
        analyzeFonts();
    }, 500);
});