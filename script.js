/* ============================================
   Ramraj Chandradevan — Portfolio Website v2
   JavaScript: Interactivity, Animations &
   Google Analytics Event Tracking
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Google Analytics Helper ---
    // Safely send GA4 events (no-op if gtag is not loaded)
    function trackEvent(eventName, params) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
        }
    }

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        trackEvent('click', { event_category: 'navigation', event_label: 'back_to_top' });
    });

    // --- Mobile nav toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // --- Track navigation clicks ---
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            trackEvent('click', {
                event_category: 'navigation',
                event_label: item.textContent.trim()
            });
        });
    });

    // --- Track hero button clicks (CV download, social links) ---
    document.querySelectorAll('.hero-links .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const label = btn.textContent.trim();
            const href = btn.getAttribute('href') || '';
            trackEvent('click', {
                event_category: 'hero_cta',
                event_label: label,
                link_url: href
            });
        });
    });

    // --- Track publication link clicks ---
    document.querySelectorAll('.pub-link').forEach(link => {
        link.addEventListener('click', () => {
            const paperTitle = link.closest('.pub-details')?.querySelector('h4')?.textContent || 'unknown';
            trackEvent('click', {
                event_category: 'publication',
                event_label: paperTitle,
                link_url: link.getAttribute('href') || ''
            });
        });
    });

    // --- Track contact card clicks ---
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('click', () => {
            const label = card.querySelector('h4')?.textContent || 'unknown';
            trackEvent('click', {
                event_category: 'contact',
                event_label: label
            });
        });
    });

    // --- Track section visibility (scroll depth) ---
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                trackEvent('section_view', {
                    event_category: 'engagement',
                    event_label: sectionId
                });
                // Only track first view per section
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Publication filters ---
    const pubFilters = document.querySelectorAll('.pub-filter');
    const pubItems = document.querySelectorAll('.pub-item');

    pubFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active filter
            pubFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const filterValue = filter.getAttribute('data-filter');

            // Track filter usage
            trackEvent('filter', {
                event_category: 'publications',
                event_label: filterValue
            });

            pubItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-year') === filterValue) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- Scroll-triggered fade-in animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to animatable elements
    const animatableSelectors = [
        '.about-text',
        '.about-highlights',
        '.highlight-card',
        '.timeline-item',
        '.pub-item',
        '.project-card',
        '.skill-category',
        '.edu-card',
        '.contact-card'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.08}s`;
            fadeObserver.observe(el);
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Add fadeInUp keyframe dynamically ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // --- Typing effect for hero subtitle (subtle) ---
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '1';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        // Start typing after a short delay
        setTimeout(typeWriter, 800);
    }
});
