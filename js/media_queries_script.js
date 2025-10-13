        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuToggle.innerHTML = sidebar.classList.contains('active') ? '✕' : '☰';
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                }
            });
        });

        // Indicador de dispositivo
        function updateDeviceIndicator() {
            const indicator = document.getElementById('deviceIndicator');
            const width = window.innerWidth;
            
            let device = '';
            let emoji = '';
            let color = '';
            
            if (width > 1024) {
                device = 'Desktop';
                emoji = '💻';
                color = 'var(--success-color)';
            } else if (width > 768) {
                device = 'Tablet';
                emoji = '📲';
                color = 'var(--warning-color)';
            } else {
                device = 'Móvil';
                emoji = '📱';
                color = 'var(--accent-color)';
            }
            
            indicator.innerHTML = `${emoji} ${device} | ${width}×${window.innerHeight}px`;
            indicator.style.background = color;
        }

        updateDeviceIndicator();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateDeviceIndicator, 100);
        });