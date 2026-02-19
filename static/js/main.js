document.addEventListener('DOMContentLoaded', () => {

    // 1. Native Smooth Scrolling for Anchors is handled by CSS (html { scroll-behavior: smooth; })
    // Lenis removed to fix scroll issues.

    // 2. Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00f3ff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#bc13fe", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" } },
                "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
            },
            "retina_detect": true
        });
    }

    // 3. GSAP Animations & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Loading Screen
    const loadingScreen = document.getElementById('loading-screen');
    const tlLoader = gsap.timeline({
        onComplete: () => {
            loadingScreen.style.display = 'none';
            initHeroAnimations();
        }
    });

    tlLoader.to('.loader-bar', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
        .to('.loader-text', { opacity: 0, y: -20, duration: 0.5 }, '-=0.3')
        .to(loadingScreen, { opacity: 0, duration: 0.8, ease: 'power2.inOut' });

    function initHeroAnimations() {
        // Hero Text Reveal
        const heroTitle = new SplitType('.hero-title', { types: 'chars' });

        gsap.from(heroTitle.chars, {
            opacity: 0,
            y: 100,
            rotateX: -90,
            stagger: 0.02,
            duration: 1,
            ease: 'back.out(1.7)',
            delay: 0.2
        });

        gsap.from('.hero-subtitle', {
            opacity: 0,
            x: -50,
            duration: 1,
            ease: 'power3.out',
            delay: 0.5
        });

        gsap.from('.hero-buttons', {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: 'power3.out',
            delay: 0.8
        });
    }

    // Scroll Animations for Sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out'
            });
        }
    });

    // Skills Animation (Looped for reliability)
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.05, // Stagger effect via delay
            ease: 'power2.out'
        });
    });

    // Project Parallax
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Experience Timeline
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '#experience',
            start: 'top 70%'
        },
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });

    // Certificates Animation (Looped for reliability)
    gsap.utils.toArray('.certificate-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i % 2 * 0.1, // Simple stagger
            ease: 'back.out(1.7)'
        });
    });

    // 4. Custom Magnetic Cursor
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursor.style.left = `${posX}px`;
        cursor.style.top = `${posY}px`;

        // Outline follows with lag (handled by CSS transition, but we explicitly set pos)
        // Using GSAP for smoother lag
        gsap.to(cursorOutline, {
            x: posX,
            y: posY,
            duration: 0.15,
            ease: 'power2.out'
        });
    });

    // Magnetic Buttons (Hover Effect)
    const buttons = document.querySelectorAll('.btn-custom, .nav-link, .btn-nav-contact, #theme-toggle');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(cursorOutline, { scale: 1.5, borderColor: '#00f3ff', duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, { scale: 1, borderColor: 'rgba(255,255,255,0.5)', duration: 0.3 });
        });
    }); // Close buttons.forEach

    // 5. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-bs-theme', newTheme);

            // Update Icon
            if (themeIcon) {
                themeIcon.classList.toggle('fa-sun');
                themeIcon.classList.toggle('fa-moon');
            }

            // Optional: Save to localStorage
            localStorage.setItem('theme', newTheme);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            htmlElement.setAttribute('data-bs-theme', savedTheme);
            if (savedTheme === 'light' && themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
    }

    // Native Anchor Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Animation
    gsap.from('.contact-card', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%'
        },
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)'
    });

    // 5. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerHTML = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(contactForm);

            // Handle static file submissions (no server)
            if (window.location.protocol === 'file:') {
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');

                const msgDiv = document.getElementById('formMessage');
                msgDiv.innerHTML = `<span style="color: var(--neon-blue)">Static Mode: Opening your email client...</span>`;

                window.location.href = `mailto:vamsikrishna.kopparaju@gmail.com?subject=Contact from ${name}&body=${message} (From: ${email})`;

                btn.innerHTML = originalText;
                btn.disabled = false;
                return;
            }

            // Handle Formspree AJAX submission
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    const msgDiv = document.getElementById('formMessage');
                    if (response.ok) {
                        msgDiv.innerHTML = `<span style="color: var(--neon-green)">Message sent successfully.</span>`;
                        contactForm.reset();
                    } else {
                        response.json().then(data => {
                            if (Object.hasOwn(data, 'errors')) {
                                msgDiv.innerHTML = `<span style="color: red">${data["errors"].map(error => error["message"]).join(", ")}</span>`;
                            } else {
                                msgDiv.innerHTML = `<span style="color: red">Oops! There was a problem submitting your form.</span>`;
                            }
                        })
                    }
                })
                .catch(error => {
                    const msgDiv = document.getElementById('formMessage');
                    msgDiv.innerHTML = `<span style="color: red">Oops! There was a problem submitting your form.</span>`;
                })
                .finally(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                });
        });
    }
});
