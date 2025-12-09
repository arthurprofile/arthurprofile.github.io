/* ═══════════════════════════════════════════════════════════════
   Arthur Clifford - Interactive Features
   Victorian Gothic Romance Theme
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Navigation.init();
    MusicPlayer.init();
    Gallery.init();
    Lightbox.init();
    ScrollEffects.init();
});

/* ─────────────────────────────────────────────────────────────────
   Navigation Module
   ───────────────────────────────────────────────────────────────── */
const Navigation = {
    nav: null,
    toggle: null,
    links: null,

    init() {
        this.nav = document.querySelector('.main-nav');
        this.toggle = document.querySelector('.nav-toggle');
        this.links = document.querySelector('.nav-links');

        if (!this.nav || !this.toggle || !this.links) return;

        this.bindEvents();
        this.handleScroll();
    },

    bindEvents() {
        // Mobile toggle
        this.toggle.addEventListener('click', () => this.toggleMenu());

        // Close menu on link click
        this.links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && this.links.classList.contains('active')) {
                this.closeMenu();
            }
        });

        // Scroll handler
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

        // Smooth scroll for nav links
        this.links.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const offset = this.nav.offsetHeight + 20;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.links.classList.toggle('active');
        document.body.style.overflow = this.links.classList.contains('active') ? 'hidden' : '';
    },

    closeMenu() {
        this.toggle.classList.remove('active');
        this.links.classList.remove('active');
        document.body.style.overflow = '';
    },

    handleScroll() {
        if (window.scrollY > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }
};

/* ─────────────────────────────────────────────────────────────────
   Music Player Module
   ───────────────────────────────────────────────────────────────── */
const MusicPlayer = {
    audio: null,
    button: null,
    isPlaying: false,

    init() {
        this.audio = document.getElementById('bgMusic');
        this.button = document.getElementById('musicToggle');

        if (!this.audio || !this.button) return;

        // Set initial volume
        this.audio.volume = 0.4;

        this.bindEvents();
    },

    bindEvents() {
        this.button.addEventListener('click', () => this.toggle());

        // Handle audio events
        this.audio.addEventListener('play', () => this.updateUI(true));
        this.audio.addEventListener('pause', () => this.updateUI(false));
        this.audio.addEventListener('ended', () => this.updateUI(false));
    },

    toggle() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(err => {
                console.log('Audio play failed:', err);
            });
        }
    },

    updateUI(playing) {
        this.isPlaying = playing;
        this.button.classList.toggle('playing', playing);
    }
};

/* ─────────────────────────────────────────────────────────────────
   Gallery Module
   ───────────────────────────────────────────────────────────────── */
const Gallery = {
    container: null,
    filterButtons: null,
    images: [],
    currentFilter: 'all',

    // Gallery image data
    galleryData: [
        // Arthur Images
        { src: 'arthur_reading_book.jpg', title: 'Reading Book', category: 'arthur' },
        { src: 'arthur_after_shower_drying_hair.jpg', title: 'After Shower', category: 'arthur' },
        { src: 'arthur_approach_from_side.jpg', title: 'Approaching', category: 'arthur' },
        { src: 'arthur_awkwardly_offer_umbrella.jpg', title: 'Offering Umbrella', category: 'arthur' },
        { src: 'arthur_catch_partner_about_to_fall.jpg', title: 'Catching Partner', category: 'arthur' },
        { src: 'arthur_check_on_lover.jpg', title: 'Check on Lover', category: 'arthur' },
        { src: 'arthur_choose_flowers_in_garden.jpg', title: 'Choosing Flowers', category: 'arthur' },
        { src: 'arthur_choose_lovers_gift_carefully.jpg', title: 'Choosing Gift', category: 'arthur' },
        { src: 'arthur_deep_kiss_with_half_closed_eyes.jpg', title: 'Deep Kiss', category: 'arthur' },
        { src: 'arthur_embarrassed_in_study.jpg', title: 'Embarrassed in Study', category: 'arthur' },
        { src: 'arthur_fall_into_thought.jpg', title: 'Lost in Thought', category: 'arthur' },
        { src: 'arthur_formal_kiss_on_back_of_hand.jpg', title: 'Formal Kiss', category: 'arthur' },
        { src: 'arthur_invite_to_dance.jpg', title: 'Invite to Dance', category: 'arthur' },
        { src: 'arthur_jealousy.jpg', title: 'Jealousy', category: 'arthur' },
        { src: 'arthur_kiss_hand.jpg', title: 'Kiss Hand', category: 'arthur' },
        { src: 'arthur_kiss_with_eyes_closed.jpg', title: 'Kiss with Eyes Closed', category: 'arthur' },
        { src: 'arthur_kneeling_and_looking_up.jpg', title: 'Kneeling', category: 'arthur' },
        { src: 'arthur_look_outside_from_carriage.jpg', title: 'Looking Outside', category: 'arthur' },
        { src: 'arthur_lost_in_thought_in_carriage.jpg', title: 'In Carriage', category: 'arthur' },
        { src: 'arthur_meal_together.jpg', title: 'Meal Together', category: 'arthur' },
        { src: 'arthur_observe_with_affectionate_gaze.jpg', title: 'Affectionate Gaze', category: 'arthur' },
        { src: 'arthur_peeking_while_drinking_tea.jpg', title: 'Drinking Tea', category: 'arthur' },
        { src: 'arthur_polite_greeting.jpg', title: 'Polite Greeting', category: 'arthur' },
        { src: 'arthur_pretend_calm_in_study.jpg', title: 'Pretending Calm', category: 'arthur' },
        { src: 'arthur_read_lovers_letter_with_flutter.jpg', title: 'Reading Letter', category: 'arthur' },
        { src: 'arthur_show_embarrassment.jpg', title: 'Embarrassment', category: 'arthur' },
        { src: 'arthur_sigh_with_irritation.jpg', title: 'Irritated Sigh', category: 'arthur' },
        { src: 'arthur_smell_lovers_gift.jpg', title: 'Smelling Gift', category: 'arthur' },
        { src: 'arthur_speaking_outside.jpg', title: 'Speaking Outside', category: 'arthur' },
        { src: 'arthur_stand_holding_flowers_with_trembling.jpg', title: 'Holding Flowers', category: 'arthur' },
        { src: 'arthur_stand_in_hallway.jpg', title: 'In Hallway', category: 'arthur' },
        { src: 'arthur_stroke_lovers_cheek.jpg', title: 'Stroking Cheek', category: 'arthur' },
        { src: 'arthur_take_off_own_clothes_for_partner.jpg', title: 'Taking Off Clothes', category: 'arthur' },
        { src: 'arthur_take_shower.jpg', title: 'Taking Shower', category: 'arthur' },
        { src: 'arthur_tears.jpg', title: 'Tears', category: 'arthur' },
        { src: 'arthur_think_of_lover_in_carriage.jpg', title: 'Thinking of Lover', category: 'arthur' },
        { src: 'arthur_touch_lovers_scarf.jpg', title: 'Touching Scarf', category: 'arthur' },
        { src: 'arthur_tucking_in_with_blanket.jpg', title: 'Tucking In', category: 'arthur' },
        { src: 'arthur_tying_shoelaces_for_partner.jpg', title: 'Tying Shoelaces', category: 'arthur' },
        { src: 'arthur_walk_sharing_umbrella_with_partner.jpg', title: 'Sharing Umbrella', category: 'arthur' },
        { src: 'arthur_watching_sleeping_lover.jpg', title: 'Watching Sleep', category: 'arthur' },
        { src: 'arthur_wipe_lovers_tears.jpg', title: 'Wiping Tears', category: 'arthur' },
        { src: 'arthur_and_cliff_coexistence.jpg', title: 'Coexistence', category: 'arthur' },
        { src: 'arthur_and_cliff_inner_conflict.jpg', title: 'Inner Conflict', category: 'arthur' },
        { src: 'arthur_cliffs_true_side_gradually_revealed.jpg', title: 'True Side Revealed', category: 'arthur' },
        { src: 'arthur_nsfw_masturbation.jpg', title: '🔞 Private Moment', category: 'arthur' },
        { src: 'arthur_nsfw_masturbation_ejaculation.jpg', title: '🔞 Release', category: 'arthur' },
        { src: 'arthur_nsfw_missionary_sex.jpg', title: '🔞 Intimate', category: 'arthur' },
        { src: 'arthur_nsfw_wet_shirt_and_bottoms_off.jpg', title: '🔞 Wet Shirt', category: 'arthur' },
        
        // Cliff Images
        { src: 'cliff_appears.jpg', title: 'Cliff Appears', category: 'cliff' },
        { src: 'cliff_approach_threateningly.jpg', title: 'Threatening Approach', category: 'cliff' },
        { src: 'cliff_grab_wrist_and_pull.jpg', title: 'Grabbing Wrist', category: 'cliff' },
        { src: 'cliff_grin.jpg', title: 'Grin', category: 'cliff' },
        { src: 'cliff_kiss.jpg', title: 'Kiss', category: 'cliff' },
        { src: 'cliff_laugh_shirtless.jpg', title: 'Shirtless Laugh', category: 'cliff' },
        { src: 'cliff_lean_lazily_on_railing.jpg', title: 'Leaning on Railing', category: 'cliff' },
        { src: 'cliff_lie_on_bed_and_stare.jpg', title: 'On Bed', category: 'cliff' },
        { src: 'cliff_pin_opponent_against_wall.jpg', title: 'Against Wall', category: 'cliff' },
        { src: 'cliff_pretend_to_be_arthur.jpg', title: 'Pretending', category: 'cliff' },
        { src: 'cliff_pull_opponent_onto_bed.jpg', title: 'Pull to Bed', category: 'cliff' },
        { src: 'cliff_push_opponent_down.jpg', title: 'Push Down', category: 'cliff' },
        { src: 'cliff_seduce.jpg', title: 'Seduction', category: 'cliff' },
        { src: 'cliff_sit_on_window_sill.jpg', title: 'Window Sill', category: 'cliff' },
        { src: 'cliff_steal_food_at_night.jpg', title: 'Midnight Snack', category: 'cliff' },
        { src: 'cliff_nsfw_missionary_sex.jpg', title: '🔞 Intimate', category: 'cliff' }
    ],

    init() {
        this.container = document.getElementById('galleryGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');

        if (!this.container) return;

        this.renderGallery();
        this.bindEvents();
    },

    bindEvents() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.setFilter(filter);
                
                // Update active state
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    },

    setFilter(filter) {
        this.currentFilter = filter;
        this.renderGallery();
    },

    renderGallery() {
        const filtered = this.currentFilter === 'all' 
            ? this.galleryData 
            : this.galleryData.filter(img => img.category === this.currentFilter);

        this.container.innerHTML = '';
        this.images = [];

        filtered.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.dataset.index = index;
            item.dataset.category = img.category;

            item.innerHTML = `
                <img src="아서 클리프 에셋/${img.src}" alt="${img.title}" loading="lazy">
                <div class="gallery-item-overlay">
                    <span class="gallery-item-title">${img.title}</span>
                </div>
            `;

            this.container.appendChild(item);
            this.images.push(`아서 클리프 에셋/${img.src}`);
        });

        // Add click handlers for lightbox
        this.container.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                Lightbox.open(this.images, index);
            });
        });

        // Animate items
        this.animateItems();
    },

    animateItems() {
        const items = this.container.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
};

/* ─────────────────────────────────────────────────────────────────
   Lightbox Module
   ───────────────────────────────────────────────────────────────── */
const Lightbox = {
    element: null,
    img: null,
    counter: null,
    prevBtn: null,
    nextBtn: null,
    closeBtn: null,
    images: [],
    currentIndex: 0,

    init() {
        this.element = document.getElementById('lightbox');
        this.img = document.getElementById('lightboxImg');
        this.counter = document.getElementById('lightboxCounter');
        this.prevBtn = document.querySelector('.lightbox-prev');
        this.nextBtn = document.querySelector('.lightbox-next');
        this.closeBtn = document.querySelector('.lightbox-close');

        if (!this.element) return;

        this.bindEvents();
    },

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Close on background click
        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.close();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.element.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
            }
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        this.element.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.element.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    },

    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    },

    open(images, index = 0) {
        this.images = images;
        this.currentIndex = index;
        this.updateImage();
        this.element.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.element.classList.remove('active');
        document.body.style.overflow = '';
    },

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    },

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    },

    updateImage() {
        this.img.src = this.images[this.currentIndex];
        this.counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    }
};

/* ─────────────────────────────────────────────────────────────────
   Scroll Effects Module
   ───────────────────────────────────────────────────────────────── */
const ScrollEffects = {
    init() {
        this.setupIntersectionObserver();
        this.setupSceneGallery();
    },

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = document.querySelectorAll(
            '.profile-card, .coexistence-section, .worldview-card, .greeting-paragraph, .scene-thumb'
        );

        elementsToObserve.forEach(el => {
            el.classList.add('fade-on-scroll');
            observer.observe(el);
        });
    },

    setupSceneGallery() {
        // Make scene gallery thumbnails clickable for lightbox
        const sceneThumbs = document.querySelectorAll('.scene-thumb');
        const sceneImages = Array.from(sceneThumbs).map(thumb => thumb.querySelector('img').src);

        sceneThumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                Lightbox.open(sceneImages, index);
            });
        });
    }
};

/* ─────────────────────────────────────────────────────────────────
   Additional CSS for Scroll Animations
   ───────────────────────────────────────────────────────────────── */
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .fade-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .fade-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .profile-card.fade-on-scroll {
        transition-delay: 0.1s;
    }
    
    .cliff-card.fade-on-scroll {
        transition-delay: 0.3s;
    }
    
    .worldview-card:nth-child(1).fade-on-scroll { transition-delay: 0.1s; }
    .worldview-card:nth-child(2).fade-on-scroll { transition-delay: 0.2s; }
    .worldview-card:nth-child(3).fade-on-scroll { transition-delay: 0.3s; }
    .worldview-card:nth-child(4).fade-on-scroll { transition-delay: 0.4s; }
    
    .greeting-paragraph.fade-on-scroll {
        transition-delay: 0.1s;
    }
`;
document.head.appendChild(additionalStyles);

