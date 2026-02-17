// ========================================
// PORTFOLIO WEBSITE - INTERACTIVE SCRIPT
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initNavigation();
    initParallax();
    initScrollAnimations();
    initSkillBars();
    initThreeJSFade();
    initScrollIndicator();
});

// ========================================
// SCROLL INDICATOR - Click to scroll
// ========================================

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ========================================
// LOADING SCREEN
// ========================================

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadBtn = document.getElementById('loadBtn');
    const mainContent = document.getElementById('mainContent');

    // If loading screen elements don't exist (loading screen removed), 
    // just make sure main content is visible
    if (!loadBtn || !loadingScreen) {
        if (mainContent) {
            mainContent.classList.add('visible');
        }
        return;
    }

    loadBtn.addEventListener('click', () => {
        // Hide loading screen
        loadingScreen.classList.add('hidden');

        // Show main content after a delay
        setTimeout(() => {
            mainContent.classList.add('visible');
        }, 800);
    });
}

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    // Toggle menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (menuOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu with close button
    const menuClose = document.getElementById('menuClose');
    if (menuClose) {
        menuClose.addEventListener('click', () => {
            navToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');

            // Close menu
            navToggle.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';

            // Smooth scroll to section
            setTimeout(() => {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 400);
        });
    });

    // ===== GALLERY CONTROLLER =====
    const imagePool = [
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', // Code on screen
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80', // Code editor
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80', // Developer workspace
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', // Laptop code
        'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&q=80', // MacBook workspace
        'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80', // Developer desk
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80', // Tech workspace
        'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80', // Laptop and coffee
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80', // Developer coding
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80'  // Tech background
    ];

    const menuImages = document.querySelectorAll('.menu-image');
    const usedImages = new Set();

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomImage() {
        const available = imagePool.filter(img => !usedImages.has(img));
        if (available.length === 0) {
            usedImages.clear();
            return imagePool[Math.floor(Math.random() * imagePool.length)];
        }
        return available[Math.floor(Math.random() * available.length)];
    }

    function randomizeSlot(img) {
        const src = getRandomImage();
        usedImages.add(src);
        img.style.backgroundImage = `url('${src}')`;
        img.style.top = getRandomInt(2, 65) + '%';
        img.style.left = getRandomInt(0, 30) + '%';
        img.style.width = getRandomInt(180, 300) + 'px';
        img.style.height = getRandomInt(130, 220) + 'px';
    }

    // Initial assignment
    menuImages.forEach(img => randomizeSlot(img));

    // Cycle images every 3 seconds
    let galleryInterval = null;

    function startGallery() {
        if (galleryInterval) return;
        galleryInterval = setInterval(() => {
            const idx = getRandomInt(0, menuImages.length - 1);
            const img = menuImages[idx];
            img.style.opacity = '0';
            img.style.transform = 'scale(0.6)';
            setTimeout(() => {
                randomizeSlot(img);
                img.style.opacity = '0.55';
                img.style.transform = 'scale(1)';
            }, 600);
        }, 3000);
    }

    function stopGallery() {
        clearInterval(galleryInterval);
        galleryInterval = null;
    }

    // Start/stop gallery when menu opens/closes
    const observer = new MutationObserver(() => {
        if (menuOverlay.classList.contains('active')) {
            startGallery();
        } else {
            stopGallery();
        }
    });
    observer.observe(menuOverlay, { attributes: true, attributeFilter: ['class'] });
}

// ========================================
// PARALLAX EFFECTS
// ========================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax'));
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

function initScrollAnimations() {
    // Use simple CSS-based animations that don't cause visibility issues
    // GSAP was causing content to disappear on resize due to from() setting opacity:0

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.section-header, .project-card, .skill-category, .timeline-item, .stat-item, .info-card, .contact-card'
    );

    animatableElements.forEach((element, index) => {
        element.classList.add('animate-ready');
        element.style.transitionDelay = `${Math.min(index % 6, 5) * 0.1}s`;
        observer.observe(element);
    });

    // Add parallax effect for background text (this is safe)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Only use GSAP for safe parallax effects (not opacity-based animations)
        gsap.utils.toArray('.section-bg-text').forEach(text => {
            gsap.to(text, {
                scrollTrigger: {
                    trigger: text.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                x: 80,
                ease: 'none'
            });
        });

        console.log('✨ Scroll animations initialized');
    }
}

function initFallbackAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ========================================
// SKILL BARS ANIMATION
// ========================================

function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const skillValue = skillFill.getAttribute('data-skill');

                // Animate skill bar
                setTimeout(() => {
                    skillFill.style.setProperty('--skill-width', `${skillValue}%`);
                    skillFill.classList.add('animate');
                }, 200);

                observer.unobserve(skillFill);
            }
        });
    }, observerOptions);

    skillFills.forEach(fill => {
        observer.observe(fill);
    });
}

// ========================================
// PROJECT CARD INTERACTIONS
// ========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add glow effect
        card.style.boxShadow = '0 20px 60px rgba(0, 255, 255, 0.3)';
    });

    card.addEventListener('mouseleave', () => {
        // Remove glow effect
        card.style.boxShadow = '';
    });

    // Optional: Add click handler for project details
    card.addEventListener('click', () => {
        const projectNumber = card.getAttribute('data-project');
        console.log(`Project ${projectNumber} clicked`);
        // You can add modal or page navigation here
    });
});

// ========================================
// SMOOTH SCROLL ENHANCEMENT
// ========================================

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// CURSOR EFFECTS (OPTIONAL ENHANCEMENT)
// ========================================

// Create custom cursor follower
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.2s ease, opacity 0.2s ease;
    opacity: 0;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Smooth cursor follow animation
function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;

    cursorX += dx * 0.1;
    cursorY += dy * 0.1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor interactions with interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.borderColor = 'var(--color-secondary)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--color-primary)';
    });
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        // Add any scroll-dependent logic here
        updateScrollProgress();
    });
});

function updateScrollProgress() {
    const scrolled = window.pageYOffset;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / height) * 100;

    // You can use this for a progress bar if needed
    // console.log(`Scroll progress: ${progress}%`);
}

// ========================================
// RESPONSIVE UTILITIES
// ========================================

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Refresh ScrollTrigger on resize
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
});

// ========================================
// CONSOLE EASTER EGG - PRATHAMESH NIKAM
// ========================================

console.log('%c Prathamesh Nikam', 'font-size: 2rem; font-weight: bold; color: #00ffff;');
console.log('%cML Engineer | AI Enthusiast | Problem Solver', 'font-size: 1.2rem; color: #02e498ff;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #333;');
console.log('%c Specializing in:', 'font-size: 1rem; color: #00ff88;');
console.log('%c   • Deep Learning & Neural Networks', 'color: #a0a0a0;');
console.log('%c   • NLP & Large Language Models', 'color: #a0a0a0;');
console.log('%c   • Quantum-Inspired ML (HQDE)', 'color: #a0a0a0;');
console.log('%c   • Distributed Computing with Ray', 'color: #a0a0a0;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #333;');
console.log('%c GitHub: github.com/Prathmesh333', 'font-size: 1rem; color: #ffffff;');
console.log('%c Email: prathmeshnikam2208@gmail.com', 'font-size: 1rem; color: #ffffff;');
console.log('%c LinkedIn: linkedin.com/in/prathamesh-nikam-89b614210', 'font-size: 1rem; color: #ffffff;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #333;');
console.log("%c Impressed? Let's build something amazing together!", 'font-size: 1rem; font-style: italic; color: #00ffff;');



// ========================================
// THREE.JS BACKGROUND FADE ON SCROLL
// ========================================

function initThreeJSFade() {
    const threeCanvas = document.getElementById('three-canvas');
    if (!threeCanvas) return;

    let ticking = false;

    function updateCanvasOpacity() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // Calculate opacity based on scroll
        // Starts fading after 20% of viewport height
        // Fully faded at 150% of viewport height
        const fadeStart = windowHeight * 0.2;
        const fadeEnd = windowHeight * 1.5;

        let opacity = 1;

        if (scrollPosition > fadeStart) {
            const fadeRange = fadeEnd - fadeStart;
            const fadeProgress = (scrollPosition - fadeStart) / fadeRange;
            opacity = Math.max(0.40, 1 - fadeProgress); // Minimum 15% opacity
        }

        threeCanvas.style.opacity = opacity;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateCanvasOpacity);
            ticking = true;
        }
    }

    // Listen to scroll events
    window.addEventListener('scroll', requestTick, { passive: true });

    // Initial check
    updateCanvasOpacity();
}


// ========================================
// HERO TITLE EFFECTS - ULTIMATE CYBERPUNK COMBO
// Matrix Rain + Electric Arc + Holographic Scan + Glitch
// ========================================

class HeroTitleEffects {
    constructor() {
        this.titleLines = document.querySelectorAll('.title-line');
        this.heroSection = document.querySelector('.hero');
        this.matrixDrops = [];
        this.arcs = [];
        this.mouse = { x: 0, y: 0 };
        this.canvas = null;
        this.ctx = null;
        this.letterPositions = [];
        this.activeGlitchIntervals = []; // Store all active glitch intervals
        
        if (!this.titleLines.length || !this.heroSection) return;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.initMatrixRain();
        this.initGlitchEffect();
        this.initMouseTracking();
        this.getLetterPositions();
        this.initVisibilityHandler();
        this.animate();
    }
    
    initVisibilityHandler() {
        // Store original text for all title lines
        this.titleLines.forEach(line => {
            line.dataset.originalText = line.textContent;
        });
        
        // Reset text when page becomes visible or hidden
        document.addEventListener('visibilitychange', () => {
            // Clear all active glitch intervals
            this.activeGlitchIntervals.forEach(interval => clearInterval(interval));
            this.activeGlitchIntervals = [];
            
            // Reset all title lines to original text
            this.titleLines.forEach(line => {
                line.textContent = line.dataset.originalText;
                line.style.transform = '';
                line.style.textShadow = '';
            });
        });
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
        `;
        this.heroSection.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.initMatrixRain();
            this.getLetterPositions();
        });
    }
    
    resizeCanvas() {
        this.canvas.width = this.heroSection.offsetWidth;
        this.canvas.height = this.heroSection.offsetHeight;
    }
    
    // ========== MATRIX RAIN EFFECT ==========
    initMatrixRain() {
        this.matrixDrops = [];
        const columns = Math.floor(this.canvas.width / 20);
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        
        for (let i = 0; i < columns; i++) {
            this.matrixDrops.push({
                x: i * 20,
                y: Math.random() * -500,
                speed: Math.random() * 3 + 2,
                chars: Array(20).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]),
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    updateMatrixRain() {
        this.matrixDrops.forEach(drop => {
            drop.y += drop.speed;
            
            if (drop.y > this.canvas.height + 100) {
                drop.y = Math.random() * -200;
                drop.speed = Math.random() * 3 + 2;
            }
            
            // Randomly change characters
            if (Math.random() > 0.95) {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
                const idx = Math.floor(Math.random() * drop.chars.length);
                drop.chars[idx] = chars[Math.floor(Math.random() * chars.length)];
            }
        });
    }
    
    drawMatrixRain() {
        const colors = [
            getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim(),
            getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
        ];
        
        this.matrixDrops.forEach(drop => {
            drop.chars.forEach((char, i) => {
                const y = drop.y + (i * 20);
                if (y > 0 && y < this.canvas.height) {
                    this.ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                    this.ctx.globalAlpha = drop.opacity * (1 - i / drop.chars.length);
                    this.ctx.font = '14px monospace';
                    this.ctx.fillText(char, drop.x, y);
                }
            });
        });
        this.ctx.globalAlpha = 1;
    }
    
    // ========== ELECTRIC ARC EFFECT ==========
    getLetterPositions() {
        this.letterPositions = [];
        this.titleLines.forEach(line => {
            const rect = line.getBoundingClientRect();
            const heroRect = this.heroSection.getBoundingClientRect();
            
            // Approximate letter positions
            const text = line.textContent;
            const letterWidth = rect.width / text.length;
            
            for (let i = 0; i < text.length; i++) {
                this.letterPositions.push({
                    x: rect.left - heroRect.left + (i * letterWidth) + (letterWidth / 2),
                    y: rect.top - heroRect.top + (rect.height / 2)
                });
            }
        });
    }
    
    createElectricArc() {
        // Only create arc occasionally
        if (Math.random() > 0.98 && this.letterPositions.length > 1) {
            const start = this.letterPositions[Math.floor(Math.random() * this.letterPositions.length)];
            const end = this.letterPositions[Math.floor(Math.random() * this.letterPositions.length)];
            
            if (start !== end) {
                this.arcs.push({
                    start: { ...start },
                    end: { ...end },
                    life: 1,
                    segments: this.generateArcSegments(start, end)
                });
            }
        }
    }
    
    generateArcSegments(start, end) {
        const segments = [];
        const steps = 10;
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = start.x + (end.x - start.x) * t;
            const y = start.y + (end.y - start.y) * t;
            
            // Add random offset for lightning effect
            const offset = (Math.random() - 0.5) * 30 * Math.sin(t * Math.PI);
            
            segments.push({
                x: x + offset,
                y: y + offset
            });
        }
        
        return segments;
    }
    
    updateArcs() {
        this.createElectricArc();
        
        this.arcs = this.arcs.filter(arc => {
            arc.life -= 0.05;
            return arc.life > 0;
        });
    }
    
    drawArcs() {
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim();
        
        this.arcs.forEach(arc => {
            this.ctx.beginPath();
            this.ctx.moveTo(arc.segments[0].x, arc.segments[0].y);
            
            for (let i = 1; i < arc.segments.length; i++) {
                this.ctx.lineTo(arc.segments[i].x, arc.segments[i].y);
            }
            
            this.ctx.strokeStyle = secondaryColor;
            this.ctx.globalAlpha = arc.life * 0.8;
            this.ctx.lineWidth = 2;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = secondaryColor;
            this.ctx.stroke();
            
            // Draw glow
            this.ctx.globalAlpha = arc.life * 0.3;
            this.ctx.lineWidth = 6;
            this.ctx.stroke();
        });
        
        this.ctx.globalAlpha = 1;
        this.ctx.shadowBlur = 0;
    }
    
    // ========== GLITCH EFFECT ==========
    initGlitchEffect() {
        this.titleLines.forEach(line => {
            setInterval(() => {
                if (Math.random() > 0.7) {
                    this.glitch(line);
                }
            }, 3000 + Math.random() * 2000);
        });
    }
    
    glitch(element) {
        // Don't glitch if page is hidden
        if (document.hidden) return;
        
        const originalText = element.dataset.originalText || element.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        let iterations = 0;
        const maxIterations = 8;
        
        const glitchInterval = setInterval(() => {
            // Stop if page becomes hidden
            if (document.hidden) {
                clearInterval(glitchInterval);
                // Remove from active intervals
                const index = this.activeGlitchIntervals.indexOf(glitchInterval);
                if (index > -1) {
                    this.activeGlitchIntervals.splice(index, 1);
                }
                element.textContent = originalText;
                element.style.transform = '';
                element.style.textShadow = '';
                return;
            }
            
            element.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            const offsetX = (Math.random() - 0.5) * 10;
            const offsetY = (Math.random() - 0.5) * 5;
            element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            element.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(255, 0, 0, 0.7),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 rgba(0, 255, 255, 0.7)
            `;
            
            iterations++;
            
            if (iterations > maxIterations) {
                clearInterval(glitchInterval);
                // Remove from active intervals
                const index = this.activeGlitchIntervals.indexOf(glitchInterval);
                if (index > -1) {
                    this.activeGlitchIntervals.splice(index, 1);
                }
                element.textContent = originalText;
                element.style.transform = '';
                element.style.textShadow = '';
            }
        }, 50);
        
        // Store the interval so we can clear it later
        this.activeGlitchIntervals.push(glitchInterval);
    }
    
    initMouseTracking() {
        this.heroSection.addEventListener('mousemove', (e) => {
            const rect = this.heroSection.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw Matrix Rain and Electric Arcs
        this.updateMatrixRain();
        this.drawMatrixRain();
        
        this.updateArcs();
        this.drawArcs();
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize hero title effects when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new HeroTitleEffects();
    });
} else {
    new HeroTitleEffects();
}


// ========================================
// MENU 3D BACKGROUND - LIGHTWEIGHT GEOMETRIC SHAPES
// ========================================

class Menu3DBackground {
    constructor() {
        this.menuOverlay = document.getElementById('menuOverlay');
        if (!this.menuOverlay) return;
        
        this.container = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.shapes = [];
        this.isActive = false;
        
        this.init();
    }
    
    init() {
        // Create container for Three.js canvas
        this.container = document.createElement('div');
        this.container.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0;
            transition: opacity 0.6s ease;
        `;
        this.menuOverlay.insertBefore(this.container, this.menuOverlay.firstChild);
        
        // Setup Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 15;
        
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
        
        // Create shapes
        this.createShapes();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onResize());
        
        // Watch for menu open/close
        this.observeMenu();
    }
    
    createShapes() {
        const geometries = [
            new THREE.OctahedronGeometry(2),
            new THREE.TetrahedronGeometry(2),
            new THREE.IcosahedronGeometry(1.5),
            new THREE.TorusGeometry(1.5, 0.5, 16, 32)
        ];
        
        const colors = [
            getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#00ffff',
            getComputedStyle(document.documentElement).getPropertyValue('--color-secondary').trim() || '#ff00ff',
            getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#00ff88'
        ];
        
        // Create 4 shapes
        for (let i = 0; i < 4; i++) {
            const geometry = geometries[i % geometries.length];
            const material = new THREE.MeshBasicMaterial({
                color: colors[i % colors.length],
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            
            // Position shapes
            mesh.position.x = (Math.random() - 0.5) * 20;
            mesh.position.y = (Math.random() - 0.5) * 15;
            mesh.position.z = (Math.random() - 0.5) * 10;
            
            // Random rotation speeds
            mesh.userData.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            };
            
            this.shapes.push(mesh);
            this.scene.add(mesh);
        }
    }
    
    observeMenu() {
        const observer = new MutationObserver(() => {
            if (this.menuOverlay.classList.contains('active')) {
                this.start();
            } else {
                this.stop();
            }
        });
        
        observer.observe(this.menuOverlay, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
    
    start() {
        this.isActive = true;
        this.container.style.opacity = '1';
        this.animate();
    }
    
    stop() {
        this.isActive = false;
        this.container.style.opacity = '0';
    }
    
    animate() {
        if (!this.isActive) return;
        
        requestAnimationFrame(() => this.animate());
        
        // Rotate shapes
        this.shapes.forEach(shape => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            // Gentle floating motion
            shape.position.y += Math.sin(Date.now() * 0.001 + shape.position.x) * 0.01;
        });
        
        // Slight camera rotation
        this.camera.position.x = Math.sin(Date.now() * 0.0003) * 2;
        this.camera.position.y = Math.cos(Date.now() * 0.0002) * 1;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize menu 3D background when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof THREE !== 'undefined') {
            new Menu3DBackground();
        }
    });
} else {
    if (typeof THREE !== 'undefined') {
        new Menu3DBackground();
    }
}
