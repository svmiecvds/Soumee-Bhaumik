const canvas = document.getElementById('bg-canvas');
const context = canvas.getContext('2d');

let isDarkMode = false;
let frameCount = 121;
let images = [];
let currentFrameIndex = 1;
let initialFrameLoaded = false;

// Function to pad the frame index (e.g., 1 -> '001', 12 -> '012', 121 -> '121')
const currentFrame = index => {
    const folder = isDarkMode ? 'projects_dark_mode' : 'projects_light_mode';
    return `assets/${folder}/frame_${index.toString().padStart(3, '0')}.jpg`;
};

// Function to preload images based on current theme
const preloadImages = () => {
    images = []; // Clear array
    initialFrameLoaded = false;
    frameCount = isDarkMode ? 131 : 121;

    // Ensure index doesn't exceed frame count
    if (currentFrameIndex > frameCount) {
        currentFrameIndex = frameCount;
    }

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
        
        img.onload = () => {
            // Draw current frame once it's loaded to prevent blank screen
            if (i === currentFrameIndex) {
                initialFrameLoaded = true;
                resizeCanvas();
            }
        };
    }
};

// Initial load is now handled in DOMContentLoaded

// Theme Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleImg = document.getElementById('theme-toggle-img');
    
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
        isDarkMode = false;
        document.body.classList.remove('dark-theme');
    }
    
    // Set initial button image
    if (themeToggleImg) {
        themeToggleImg.src = isDarkMode ? 'assets/dark-mode-btn.png' : 'assets/light-mode-btn.png';
    }
    // Preload images with correct theme
    preloadImages();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-theme', isDarkMode);
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            if (themeToggleImg) {
                themeToggleImg.src = isDarkMode ? 'assets/dark-mode-btn.png' : 'assets/light-mode-btn.png';
            }
            preloadImages();
        });
    }
});

// Function to handle canvas resize and keep it responsive
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (initialFrameLoaded) {
        drawFrame(currentFrameIndex);
    }
}

// Function to draw a specific frame to the canvas, implementing "object-fit: cover" logic
function drawFrame(index) {
    const img = images[index - 1];
    if (!img || !img.complete) return;
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, startX, startY;
    
    if (canvasRatio > imgRatio) {
        // Canvas is wider than the image proportionally
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        startX = 0;
        startY = (canvas.height - drawHeight) / 2;
    } else {
        // Image is wider than canvas proportionally
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        startX = (canvas.width - drawWidth) / 2;
        startY = 0;
    }
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, startX, startY, drawWidth, drawHeight);
}

// Listen to window resize events
window.addEventListener('resize', resizeCanvas);

// Listen to scroll events to update the frame
window.addEventListener('scroll', () => {
    const html = document.documentElement;
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    
    // Calculate the percentage of scroll progress
    const scrollFraction = scrollTop / maxScrollTop;
    
    // Map the scroll fraction (0.0 - 1.0) to frame index (1 - 121)
    const frameIndex = Math.min(
        frameCount,
        Math.max(1, Math.floor(scrollFraction * frameCount) + 1)
    );
    
    if (currentFrameIndex !== frameIndex) {
        currentFrameIndex = frameIndex;
        // Use requestAnimationFrame for smooth drawing
        requestAnimationFrame(() => drawFrame(frameIndex));
    }
});

// Set initial size
resizeCanvas();

// --- Intersection Observer for Glassmorphism boxes ---
const projectBoxes = document.querySelectorAll('.project-box');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.25 // Trigger when 25% of the box is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // Remove class so it animates again when scrolling back up
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

projectBoxes.forEach(box => observer.observe(box));
