// ============================================================
// Living Christ International Prophetic Ministries
// Main JavaScript — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // -----------------------------------------------------------
    // 1. Navbar scroll effect
    // -----------------------------------------------------------
    const navbar = document.getElementById('navbar');

    const handleNavbarScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // run on load

    // -----------------------------------------------------------
    // 2. Hamburger / Mobile Navigation
    // -----------------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileClose = document.getElementById('mobile-nav-close');

    const openMobileNav = () => {
        hamburger.classList.add('open');
        mobileNav.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        document.body.classList.add("nav-open");
    };

    window.closeMobileNav = () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        document.body.classList.remove("nav-open");
    };

    hamburger?.addEventListener('click', () => {
        if (mobileNav.classList.contains('open')) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    mobileClose?.addEventListener('click', closeMobileNav);

    // Close mobile nav on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav?.classList.contains('open')) {
            closeMobileNav();
        }
    });

    // -----------------------------------------------------------
    // 3. Back to top button
    // -----------------------------------------------------------
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    }, { passive: true });

    // -----------------------------------------------------------
    // 4. Intersection Observer — Reveal animations
    // -----------------------------------------------------------
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right'
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // -----------------------------------------------------------
    // 5. Active nav link based on section in view (index page)
    // -----------------------------------------------------------
    const navLinks = document.querySelectorAll('.nav-links a');

    if (navLinks.length > 0) {
        const sections = document.querySelectorAll('section[id]');

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach((link) => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}` ||
                                link.getAttribute('href') === `index.html#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

    // -----------------------------------------------------------
    // 6. Contact Form submission handler
    // -----------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach((field) => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e53e3e';
                field.addEventListener('input', () => {
                    field.style.borderColor = '';
                }, { once: true });
            }
        });

        if (!isValid) return;

        // Simulate submission (replace with actual backend/FormSubmit/EmailJS)
        const submitBtn = contactForm.querySelector('.form-submit');
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;

        setTimeout(() => {
            contactForm.style.display = 'none';
            if (formSuccess) {
                formSuccess.classList.add('visible');
                formSuccess.focus();
            }
        }, 1200);
    });

    // -----------------------------------------------------------
    // 7. Lazy loading images (native + fallback)
    // -----------------------------------------------------------
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach((img) => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach((img) => {
            img.src = img.dataset.src;
        });
    }

    // -----------------------------------------------------------
    // 8. Smooth scroll for anchor links
    // -----------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80; // navbar height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});
