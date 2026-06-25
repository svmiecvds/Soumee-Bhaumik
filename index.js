let isDarkMode = false;

// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleImg = document.getElementById('theme-toggle-img');
    const bgVideo = document.getElementById('bg-video-loop');
    const introVideo = document.getElementById('intro-video-loop');

    
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
        isDarkMode = false;
        document.body.classList.remove('dark-theme');
    } else if (document.body.classList.contains('dark-theme')) {
        isDarkMode = true;
    }
    
    // Set initial video and button image based on current theme
    if (bgVideo) {
        bgVideo.src = isDarkMode ? 'assets/hero/hero_dark.mp4' : 'assets/hero/hero_light.mp4';
    }
    if (introVideo) {
        introVideo.src = isDarkMode ? 'assets/intro_dark.mp4' : 'assets/intro_light.mp4';
    }
    if (themeToggleImg) {
        themeToggleImg.src = isDarkMode ? 'assets/dark-mode-btn.png' : 'assets/light-mode-btn.png';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-theme', isDarkMode);
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            if (themeToggleImg) {
                themeToggleImg.src = isDarkMode ? 'assets/dark-mode-btn.png' : 'assets/light-mode-btn.png';
            }
            
            if (bgVideo) {
                bgVideo.src = isDarkMode ? 'assets/hero/hero_dark.mp4' : 'assets/hero/hero_light.mp4';
                bgVideo.play().catch(e => console.log("Video autoplay blocked:", e));
            }
            if (introVideo) {
                introVideo.src = isDarkMode ? 'assets/intro_dark.mp4' : 'assets/intro_light.mp4';
                introVideo.play().catch(e => console.log("Video autoplay blocked:", e));
            }
        });
    }
    
    // Fade in animation
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('visible');
        }
    }, 100);
});

