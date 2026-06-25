import re

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Hero Subtitle
hero_subtitle_target = """    .hero-subtitle {
        font-size: 1rem;
        letter-spacing: 2px;
    }"""
hero_subtitle_replacement = """    .hero-subtitle {
        font-size: 0.75rem;
        letter-spacing: 1px;
    }"""
css = css.replace(hero_subtitle_target, hero_subtitle_replacement)

# 2. Theme Toggle
theme_toggle_target = """    .theme-toggle img {
        height: 30px;
    }"""
theme_toggle_replacement = """    .theme-toggle img {
        height: 20px;
    }"""
css = css.replace(theme_toggle_target, theme_toggle_replacement)

# 3. Project Boxes and horizontal overflow
project_box_target = """    .project-box {
        width: 80vw;
        padding: 1.5rem;
        margin-bottom: 15vh !important; /* Add space back so they appear one after another */
    }
    
    /* Stagger them -_ */
    .box-1 { margin-left: 0 !important; }
    .box-2 { margin-left: 5vw !important; }
    .box-3 { margin-left: 10vw !important; }
    .box-4 { margin-left: 15vw !important; }

    .project-box h2 {
        font-size: 2rem;
    }"""
project_box_replacement = """    body, html {
        overflow-x: hidden;
        width: 100%;
        max-width: 100vw;
    }

    .project-box {
        width: 75vw;
        padding: 1.2rem;
        margin-bottom: 15vh !important;
        box-sizing: border-box;
    }
    
    /* Stagger them securely -_ */
    .box-1 { margin-left: 0 !important; }
    .box-2 { margin-left: 4vw !important; }
    .box-3 { margin-left: 8vw !important; }
    .box-4 { margin-left: 12vw !important; }

    .project-box h2 {
        font-size: 1.8rem;
        background: none;
        -webkit-text-fill-color: initial;
        color: #ffffff;
    }"""
css = css.replace(project_box_target, project_box_replacement)

# 4. Publications Gallery Cards smaller and center aligned
gallery_card_target = """    .gallery-card {
        width: 90vw;
    }"""
gallery_card_replacement = """    .gallery-card {
        width: 80vw;
        max-width: 320px;
        margin: 0 auto;
    }"""
css = css.replace(gallery_card_target, gallery_card_replacement)

# 5. Selected Works (pub-carousel) taller box
pub_carousel_target = """    .pub-carousel {
        width: 85vw;
        max-width: none;
    }"""
pub_carousel_replacement = """    .pub-carousel {
        width: 85vw;
        max-width: none;
        height: 55vh; /* Make it longer on mobile to avoid internal scrolling */
    }"""
css = css.replace(pub_carousel_target, pub_carousel_replacement)

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)
