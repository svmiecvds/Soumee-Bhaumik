// Publications Page Logic
document.addEventListener('DOMContentLoaded', () => {
    let isDarkMode = false;
    let currentCategory = 'all'; // all, technical, creative

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleImg = document.getElementById('theme-toggle-img');
    const pubVideoLoop = document.getElementById('pub-video-loop');
    const dropdownBtn = document.getElementById('pub-dropdown-btn');
    const dropdownContent = document.getElementById('pub-dropdown-content');
    const slideshowSection = document.getElementById('pub-slideshow-section');
    
    // Cards and Gallery elements
    const allCards = Array.from(document.querySelectorAll('.pub-card'));
    const allGalleryItems = Array.from(document.querySelectorAll('.gallery-card'));
    const dotsContainer = document.getElementById('pub-dots');
    const prevBtn = document.getElementById('pub-prev');
    const nextBtn = document.getElementById('pub-next');
    
    let activeCards = [];
    let currentIndex = 0;

    // ── Theme ──────────────────────────────────────────────
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

    function applyThemeAssets() {
        if (pubVideoLoop) {
            const currentSrc = pubVideoLoop.src;
            const newSrc = isDarkMode ? 'assets/publications/publi_dark.mp4' : 'assets/publications/publi_light.mp4';
            if (!currentSrc.includes(newSrc.split('/').pop())) {
                pubVideoLoop.src = newSrc;
                pubVideoLoop.play().catch(e => console.log('Autoplay prevented:', e));
            }
        }
        if (themeToggleImg) {
            themeToggleImg.src = isDarkMode ? 'assets/dark-mode-btn.png' : 'assets/light-mode-btn.png';
        }
    }
    applyThemeAssets();

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-theme', isDarkMode);
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            applyThemeAssets();
        });
    }

    // ── Dropdown & Filtering ───────────────────────────────
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });
    }

    // Close dropdown if clicked outside
    window.addEventListener('click', () => {
        if (dropdownContent && dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    });

    if (dropdownContent) {
        dropdownContent.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                const filter = e.target.getAttribute('data-filter');
                const text = e.target.textContent;
                
                dropdownBtn.innerHTML = `${text} <span>▼</span>`;
                dropdownContent.classList.remove('show');
                
                applyFilter(filter);
                
                // Smooth scroll down to slideshow
                slideshowSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ── Carousel Logic ─────────────────────────────────────
    function applyFilter(filter) {
        currentCategory = filter;
        
        // Hide all cards first
        allCards.forEach(card => card.style.display = 'none');
        
        // Filter cards
        activeCards = allCards.filter(card => {
            return filter === 'all' || card.getAttribute('data-category') === filter;
        });
        
        // Show active cards
        activeCards.forEach(card => card.style.display = 'block');
        
        // Re-initialize carousel
        initCarousel();
        
        // Filter Gallery items
        allGalleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    function initCarousel() {
        // Clear existing dots
        dotsContainer.innerHTML = '';
        
        // Remove active class from all
        allCards.forEach(card => card.classList.remove('active'));
        
        if (activeCards.length === 0) return;
        
        currentIndex = 0;
        
        // Create dots
        activeCards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'pub-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });
        
        // Show first card
        activeCards[0].classList.add('active');
    }

    function goTo(index) {
        if (!activeCards.length) return;
        
        // Remove active from current
        activeCards[currentIndex].classList.remove('active');
        if (dotsContainer.children[currentIndex]) {
            dotsContainer.children[currentIndex].classList.remove('active');
        }

        currentIndex = index;

        // Add active to new
        activeCards[currentIndex].classList.add('active');
        if (dotsContainer.children[currentIndex]) {
            dotsContainer.children[currentIndex].classList.add('active');
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (!activeCards.length) return;
            const newIdx = (currentIndex - 1 + activeCards.length) % activeCards.length;
            goTo(newIdx);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (!activeCards.length) return;
            const newIdx = (currentIndex + 1) % activeCards.length;
            goTo(newIdx);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
        if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });

    // Initialize on page load
    applyFilter('all');


    // ── Nested Gallery Carousels ───────────────────────────
    const galleryTracks = document.querySelectorAll('.gallery-carousel-track');
    const galleryNavBtns = document.querySelectorAll('.gallery-nav');
    
    // Store state for each track
    const carouselStates = {};
    
    galleryTracks.forEach(track => {
        const id = track.id;
        const slidesCount = track.children.length;
        carouselStates[id] = {
            currentIndex: 0,
            count: slidesCount,
            intervalId: null
        };
        startAutoSlide(id);
    });
    
    function updateGallerySlide(trackId) {
        const track = document.getElementById(trackId);
        const state = carouselStates[trackId];
        track.style.transform = `translateX(-${state.currentIndex * 100}%)`;
    }
    
    function nextGallerySlide(trackId) {
        const state = carouselStates[trackId];
        state.currentIndex = (state.currentIndex + 1) % state.count;
        updateGallerySlide(trackId);
    }
    
    function prevGallerySlide(trackId) {
        const state = carouselStates[trackId];
        state.currentIndex = (state.currentIndex - 1 + state.count) % state.count;
        updateGallerySlide(trackId);
    }
    
    function startAutoSlide(trackId) {
        carouselStates[trackId].intervalId = setInterval(() => {
            nextGallerySlide(trackId);
        }, 3000); // 3 seconds auto-rotate
    }
    
    function resetAutoSlide(trackId) {
        clearInterval(carouselStates[trackId].intervalId);
        startAutoSlide(trackId);
    }
    
    galleryNavBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const trackId = e.target.getAttribute('data-target');
            if (e.target.classList.contains('next')) {
                nextGallerySlide(trackId);
            } else {
                prevGallerySlide(trackId);
            }
            resetAutoSlide(trackId);
        });
    });

});
