let isDarkMode = false;

// Theme Toggle Logic for Contact Page
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleImg = document.getElementById('theme-toggle-img');
    const bgVideo = document.getElementById('contact-video-bg');
    
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
        bgVideo.src = isDarkMode ? 'assets/contact_dark.mp4' : 'assets/contact_light.mp4';
    }
    if (themeToggleImg) {
        themeToggleImg.src = isDarkMode ? 'assets/dark-mode-btn.png' : 'assets/light-mode-btn.png';
    }
    
    // Toggle Event Listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            
            // Toggle body class
            if (isDarkMode) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
            
            // Update button image
            if (themeToggleImg) {
                themeToggleImg.src = isDarkMode ? 'assets/dark-mode-btn.png' : 'assets/light-mode-btn.png';
            }
            
            // Update background video with fade effect
            if (bgVideo) {
                bgVideo.style.opacity = 0;
                setTimeout(() => {
                    bgVideo.src = isDarkMode ? 'assets/contact_dark.mp4' : 'assets/contact_light.mp4';
                    bgVideo.load();
                    bgVideo.play();
                    bgVideo.style.opacity = 1;
                }, 300);
            }
        });
    }
});
