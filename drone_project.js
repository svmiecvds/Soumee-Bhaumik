document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleImg = document.getElementById('theme-toggle-img');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('dark-theme', prefersDark);
    }
    
    // Update button image based on theme
    updateThemeIcon();

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon();
    });

    function updateThemeIcon() {
        const isDark = document.body.classList.contains('dark-theme');
        const bgVideo = document.getElementById('drone-bg-video');
        
        if (isDark) {
            themeToggleImg.src = 'assets/dark-mode-btn.png';
            themeToggleImg.alt = 'Switch to Light Mode';
            if (bgVideo && (!bgVideo.src || !bgVideo.src.includes('drone_dark.mp4'))) {
                bgVideo.src = 'assets/drone_dark.mp4';
                bgVideo.load();
                bgVideo.play().catch(e => console.log('Autoplay prevented:', e));
            }
        } else {
            themeToggleImg.src = 'assets/light-mode-btn.png';
            themeToggleImg.alt = 'Switch to Dark Mode';
            if (bgVideo && (!bgVideo.src || !bgVideo.src.includes('drone_light.mp4'))) {
                bgVideo.src = 'assets/drone_light.mp4';
                bgVideo.load();
                bgVideo.play().catch(e => console.log('Autoplay prevented:', e));
            }
        }
    }

    // Slideshow Logic
    const track = document.getElementById('drone-track');
    const slides = document.querySelectorAll('.doc-slide');
    if (track && slides.length > 0) {
        let currentSlide = 0;
        
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 4000); // Change image every 4 seconds
    }
});
