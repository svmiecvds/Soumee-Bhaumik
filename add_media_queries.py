media_queries = """
/* ==========================================================================
   MOBILE RESPONSIVENESS
   ========================================================================== */

@media screen and (max-width: 768px) {
    /* 1. Navbar & Header */
    .navbar {
        padding: 1rem;
        flex-direction: column;
        gap: 10px;
    }
    
    .navbar .logo {
        font-size: 1.3rem;
    }

    .nav-links {
        gap: 1rem;
    }

    .nav-links a {
        font-size: 0.95rem;
    }

    .theme-toggle {
        position: absolute;
        top: 1rem;
        right: 1rem;
        margin: 0;
    }

    .theme-toggle img {
        height: 30px;
    }

    /* 2. Hero Sections (index.html & projects.html) */
    .hero-container {
        padding-left: 5vw;
        justify-content: center;
        text-align: center;
    }

    .hero-subtitle-wrapper {
        align-self: center;
        align-items: center;
    }

    .hero-title {
        font-size: clamp(3.5rem, 15vw, 6rem);
    }
    
    .hero-subtitle {
        font-size: 1rem;
        letter-spacing: 2px;
    }

    /* 3. Projects Timeline (projects.html) */
    .projects-list {
        padding-top: 20vh;
        padding-bottom: 20vh;
        gap: 5vh; /* Uniform spacing */
    }

    .project-box {
        margin: 0 auto !important; /* Override all the staggered margins */
        width: 90vw;
        padding: 1.5rem;
        margin-bottom: 5vh !important; /* Override large margins */
    }

    .project-box h2 {
        font-size: 2rem;
    }

    /* 4. Achievements Carousel (index.html) */
    .carousel-overlay {
        padding: 4rem 0;
    }

    .carousel-title, .section-title {
        font-size: 3.5rem;
        margin-bottom: 2rem;
    }

    .carousel-container {
        width: 100vw;
    }

    .glass-card {
        width: 80vw;
        padding: 1.5rem;
    }

    /* 5. Publications Page */
    .pub-hero-title {
        font-size: 4rem;
        text-align: center;
        padding: 0 1rem;
    }

    .pub-dropdown-btn {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
    }

    .pub-carousel {
        width: 85vw;
        max-width: none;
    }

    /* 6. Galleries (Publications) */
    .gallery-grid {
        grid-template-columns: 1fr; /* Single column */
        gap: 20px;
        padding: 0 1rem;
    }
    
    .gallery-img {
        height: 300px; /* Give it more height since it takes full width */
    }

    /* Poetry Links Card */
    .poetry-links-card {
        height: 300px; /* Match gallery img */
    }

    /* 7. Drone Project Page */
    .project-doc-page {
        padding-top: 140px; /* Account for taller navbar on mobile */
    }

    .project-doc-container {
        border-radius: 12px;
        width: 95vw;
    }

    .doc-slideshow {
        height: 250px;
    }

    .doc-content {
        padding: 1.5rem;
    }

    .doc-content h1 {
        font-size: 2.2rem;
    }

    .doc-content h2 {
        font-size: 1.5rem;
    }

    .doc-content p {
        font-size: 1rem;
    }

    /* Mailbox Modal */
    .mailbox-modal {
        width: 90vw;
        padding: 2rem;
    }
}
"""

with open('styles.css', 'a', encoding='utf-8') as f:
    f.write(media_queries)
