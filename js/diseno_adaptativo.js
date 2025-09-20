        // Variables globales
        let currentBreakpoint = '';
        let resizeTimer;

        // Definicion de breakpoints
        const breakpoints = {
            mobile: 480,
            tablet: 1024,
            desktop: 1025
        };

        function detectBreakpoint() {
            const width = window.innerWidth;

            if (width <= breakpoints.mobile) {
                return 'mobile';
            } else if (width <= breakpoints.tablet) {
                return 'tablet';
            } else {
                return 'desktop';
            }
        }

        function updateDeviceIndicator() {
            const indicator = document.getElementById('dispositivo-actual');
            if (!indicator) return;

            const width = window.innerWidth;
            const height = window.innerHeight;
            const breakpoint = detectBreakpoint();
            const orientation = width > height ? 'landscape' : 'portrait';

            let deviceEmoji = '';
            let deviceName = '';
            let deviceColor = '';

            switch (breakpoint) {
                case 'mobile':
                    deviceEmoji = '📱';
                    deviceName = 'Movil';
                    deviceColor = 'var(--accent-color)';
                    break;
                case 'tablet':
                    deviceEmoji = '📲';
                    deviceName = 'Tablet';
                    deviceColor = 'var(--warning-color)';
                    break;
                case 'desktop':
                    deviceEmoji = '💻';
                    deviceName = 'Desktop';
                    deviceColor = 'var(--success-color)';
                    break;
            }

            indicator.innerHTML = `
                ${deviceEmoji} ${deviceName} | 
                ${width} × ${height}px | 
                ${orientation}
            `;

            indicator.style.background = deviceColor;

            // Log para desarrollo
            console.log(`📊 Dispositivo: ${deviceName} | ${width}×${height}px | ${orientation}`);
            console.log(`📏 Unidades actuales:`);
            console.log(`   1rem = ${parseFloat(getComputedStyle(document.documentElement).fontSize)}px`);
            console.log(`   1vh = ${height / 100}px`);
            console.log(`   1vw = ${width / 100}px`);
            console.log(`   1vmin = ${Math.min(width, height) / 100}px`);
            console.log(`   1vmax = ${Math.max(width, height) / 100}px`);
        }

        function initializeNavigation() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });

                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    });
                });
            }
        }

        function initializeScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observar elementos animables
            document.querySelectorAll('.demo-section, .unidad-ejemplo, .breakpoint-card').forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
        }

        /**
         Analisis de imagenes responsivas
         */
        function analyzeResponsiveImages() {
            setTimeout(() => {
                console.group('🖼️ Analisis de Imagenes Responsivas');

                const srcsetImg = document.querySelector('.imagen-srcset');
                if (srcsetImg && srcsetImg.complete) {
                    console.log('Imagen con srcset:');
                    console.log(`  - URL cargada: ${srcsetImg.currentSrc || srcsetImg.src}`);
                    console.log(`  - Dimensiones naturales: ${srcsetImg.naturalWidth}×${srcsetImg.naturalHeight}px`);
                    console.log(`  - Dimensiones mostradas: ${Math.round(srcsetImg.getBoundingClientRect().width)}×${Math.round(srcsetImg.getBoundingClientRect().height)}px`);
                }

                const pictureImg = document.querySelector('.imagen-picture img');
                if (pictureImg && pictureImg.complete) {
                    console.log('Imagen con picture:');
                    console.log(`  - URL cargada: ${pictureImg.currentSrc || pictureImg.src}`);
                    console.log(`  - Dimensiones naturales: ${pictureImg.naturalWidth}×${pictureImg.naturalHeight}px`);
                    console.log(`  - Dimensiones mostradas: ${Math.round(pictureImg.getBoundingClientRect().width)}×${Math.round(pictureImg.getBoundingClientRect().height)}px`);
                }

                console.groupEnd();
            }, 2000);
        }

        /**
         Inicializacion principal
         */
        function initializeAdaptiveDesign() {
            console.log('🚀 Inicializando Diseño Adaptativo...');

            // Inicializar componentes
            initializeNavigation();
            initializeScrollAnimations();

            // Actualizar indicador inicial
            updateDeviceIndicator();
            currentBreakpoint = detectBreakpoint();

            // Manejar redimensionado de ventana
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    const newBreakpoint = detectBreakpoint();

                    if (newBreakpoint !== currentBreakpoint) {
                        console.log(`🔄 Cambio de breakpoint: ${currentBreakpoint} → ${newBreakpoint}`);
                        currentBreakpoint = newBreakpoint;
                    }

                    updateDeviceIndicator();
                }, 250);
            });

            // Manejar cambio de orientacion
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    console.log('🔄 Cambio de orientacion detectado');
                    updateDeviceIndicator();
                }, 100);
            });

            // Analisis de imagenes cuando esten cargadas
            analyzeResponsiveImages();

            console.log('✅ Diseño Adaptativo inicializado correctamente');
            console.log('📱 Redimensiona la ventana para ver los cambios en tiempo real');
        }

        // Inicializar cuando el DOM este listo
        document.addEventListener('DOMContentLoaded', initializeAdaptiveDesign);

        // Analisis adicional cuando todo este cargado
        window.addEventListener('load', () => {
            console.log('🖼️ Pagina completamente cargada');
            analyzeResponsiveImages();
        });