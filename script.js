// Envelope functionality
const envelope = document.getElementById('envelope');
const envelopeOverlay = document.getElementById('envelopeOverlay');
const letterContainer = document.getElementById('letterContainer');
const closeLetterBtn = document.getElementById('closeLetterBtn');
const mainContainer = document.getElementById('mainContainer');

let envelopeOpened = false;

// Open envelope on click
if (envelope) {
    envelope.addEventListener('click', function() {
        if (!envelopeOpened) {
            envelope.classList.add('opened');
            envelopeOpened = true;
            
            // Show letter after envelope opens
            setTimeout(() => {
                letterContainer.classList.add('show');
                // Create hearts when letter opens
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        const rect = letterContainer.getBoundingClientRect();
                        createClickHeart(
                            rect.left + rect.width / 2 + (Math.random() - 0.5) * 200,
                            rect.top + rect.height / 2 + (Math.random() - 0.5) * 200
                        );
                    }, i * 50);
                }
            }, 500);
        }
    });
}

// Close letter and show main content
if (closeLetterBtn) {
    closeLetterBtn.addEventListener('click', function() {
        letterContainer.classList.remove('show');
        
        setTimeout(() => {
            envelopeOverlay.classList.add('hidden');
            // Show main content
            if (mainContainer) {
                mainContainer.classList.add('show');
            }
            // Start other animations
            initFloatingHearts();
            initSparkles();
            initFloatingBubbles();
            // Initialize carousel
            initCarousel();
        }, 500);
    });
}

// Initialize floating hearts and sparkles only after envelope is closed
function initFloatingHearts() {
    // This will be called after envelope is closed
}

function initSparkles() {
    // This will be called after envelope is closed
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevCarouselBtn = document.querySelector('.prev-btn');
const nextCarouselBtn = document.querySelector('.next-btn');
const totalSlides = slides.length;

// Initialize carousel
function initCarousel() {
    if (slides.length === 0) return;
    
    showSlide(currentSlide);
    
    // Auto-play carousel
    setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev');
        if (i < index) {
            slide.classList.add('prev');
        }
    });
    
    // Add active class to current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Event listeners for carousel
if (prevCarouselBtn) {
    prevCarouselBtn.addEventListener('click', prevSlide);
}

if (nextCarouselBtn) {
    nextCarouselBtn.addEventListener('click', nextSlide);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Initialize carousel only after envelope is closed (handled in closeLetterBtn event)

// Lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentImageIndex = 0;
const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

// Open lightbox
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    lightboxImg.src = images[currentImageIndex];
    document.body.style.overflow = 'hidden';
}

// Close lightbox
closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigation
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentImageIndex];
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % images.length;
    lightboxImg.src = images[currentImageIndex];
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentImageIndex];
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lightboxImg.src = images[currentImageIndex];
        }
    }
});

// Smooth scroll animation on load
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.gallery-item');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Floating Hearts Animation
function createFloatingHeart() {
    const hearts = ['💜', '💕', '💖', '💗', '💝', '💞', '💓', '💘', '💟', '💌'];
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.filter = 'drop-shadow(0 0 10px rgba(255, 182, 193, 0.6))';
    
    const floatingHeartsContainer = document.getElementById('floatingHearts');
    if (floatingHeartsContainer) {
        floatingHeartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }
}

// Initialize floating hearts (only after envelope is closed)
function initFloatingHearts() {
    // Create floating hearts more frequently for romantic effect
    setInterval(createFloatingHeart, 1500);
    
    // Create more initial floating hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createFloatingHeart(), i * 300);
    }
}

// Sparkles Animation
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    sparkle.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    const sparklesContainer = document.getElementById('sparkles');
    if (sparklesContainer) {
        sparklesContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 5000);
    }
}

// Initialize sparkles (only after envelope is closed)
function initSparkles() {
    // Create sparkles periodically
    setInterval(createSparkle, 500);
    
    // Create initial sparkles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createSparkle(), i * 100);
    }
}

// Floating Bubbles with Pictures
const bubbleImages = [
    'IMG_20251127_012524_012.webp',
    'IMG_20251017_192529_504.jpg',
    'IMG_20251017_192526_717.jpg',
    'IMG_20251017_180438_045.jpg',
    'IMG_20250911_171642_348.jpg',
    'IMG_20250911_165518_240.jpg',
    'IMG_20250817_225651_872.jpg',
    'IMG_20250817_225650_128.jpg',
    'IMG_20250817_225648_428.jpg',
    '1000003674.jpg',
    '1000003672.jpg'
];

// Romantic quotes for interactive elements
const romanticQuotes = [
    "You are my sunshine 💜",
    "Forever and always 💕",
    "My heart belongs to you 💖",
    "You make everything better 💗",
    "I love you more each day 💝"
];

function createFloatingBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'floating-bubble';
    
    // Random size between 60px and 120px
    const size = Math.random() * 60 + 60;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    
    // Random starting position
    bubble.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = Math.random() * 5 + 12; // 12-17 seconds
    bubble.style.animationDuration = duration + 's';
    bubble.style.animationDelay = Math.random() * 3 + 's';
    
    // Random horizontal drift
    const drift = (Math.random() - 0.5) * 200;
    bubble.style.setProperty('--drift', drift + 'px');
    
    // Add random image
    const randomImage = bubbleImages[Math.floor(Math.random() * bubbleImages.length)];
    const img = document.createElement('img');
    img.src = randomImage;
    img.alt = 'Our Memory';
    img.loading = 'lazy';
    
    bubble.appendChild(img);
    
    const floatingBubblesContainer = document.getElementById('floatingBubbles');
    if (floatingBubblesContainer) {
        floatingBubblesContainer.appendChild(bubble);
        
        // Remove bubble after animation completes
        setTimeout(() => {
            bubble.remove();
        }, (duration + 3) * 1000);
    }
}

// Initialize floating bubbles (only after envelope is closed)
function initFloatingBubbles() {
    // Create floating bubbles periodically (more frequently for romantic effect)
    setInterval(createFloatingBubble, 2500);
    
    // Create initial floating bubbles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createFloatingBubble(), i * 500);
    }
}

// Add romantic quote interaction to quote cards
const quoteCards = document.querySelectorAll('.quote-card');
quoteCards.forEach((card, index) => {
    card.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        // Create heart burst
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createClickHeart(
                    rect.left + rect.width / 2 + (Math.random() - 0.5) * 200,
                    rect.top + rect.height / 2 + (Math.random() - 0.5) * 200
                );
            }, i * 30);
        }
        
        // Add romantic glow effect
        this.style.boxShadow = '0 20px 60px rgba(255, 182, 193, 0.6), 0 0 60px rgba(147, 51, 234, 0.5)';
        setTimeout(() => {
            this.style.boxShadow = '';
        }, 1000);
    });
});

// Click Heart Button Interaction
const heartButton = document.getElementById('heartButton');
if (heartButton) {
    heartButton.addEventListener('click', function(e) {
        // Create multiple hearts on click
        for (let i = 0; i < 10; i++) {
            createClickHeart(e.clientX, e.clientY);
        }
        
        // Animate button
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Create click heart animation
function createClickHeart(x, y) {
    const hearts = ['💜', '💕', '💖', '💗', '💝', '💞'];
    const heart = document.createElement('div');
    heart.className = 'click-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.position = 'fixed';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// Interactive Date Click
const interactiveDate = document.querySelector('.interactive-date');
if (interactiveDate) {
    interactiveDate.addEventListener('click', function(e) {
        createClickHeart(e.clientX, e.clientY);
        this.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
}

// Interactive Hearts Click
const interactiveHearts = document.querySelector('.interactive-hearts');
if (interactiveHearts) {
    interactiveHearts.addEventListener('click', function(e) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createClickHeart(e.clientX + (Math.random() - 0.5) * 100, e.clientY + (Math.random() - 0.5) * 100);
            }, i * 50);
        }
    });
}

// Interactive Cards Click
const interactiveCards = document.querySelectorAll('.interactive-card');
interactiveCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
            createClickHeart(e.clientX, e.clientY);
        }
    });
});

// Timeline Items Click
const timelineItems = document.querySelectorAll('.interactive-timeline');
timelineItems.forEach(item => {
    item.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        createClickHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
});

// Gallery Items Enhanced Interaction
const galleryItemsEnhanced = document.querySelectorAll('.gallery-item');
galleryItemsEnhanced.forEach((item, index) => {
    // Staggered fade-in animation
    item.style.animationDelay = (index * 0.1) + 's';
    
    // Mouse enter - create sparkles
    item.addEventListener('mouseenter', function() {
        const rect = this.getBoundingClientRect();
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
                sparkle.style.position = 'fixed';
                sparkle.style.animationDuration = '1s';
                sparkle.style.zIndex = '9999';
                document.body.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 100);
        }
    });
    
    // Click interaction - heart burst and animation
    item.addEventListener('click', function(e) {
        // Add click animation class
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 600);
        
        // Create heart burst from the click point
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX;
        const clickY = e.clientY;
        
        // Create multiple hearts
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createClickHeart(
                    clickX + (Math.random() - 0.5) * 150,
                    clickY + (Math.random() - 0.5) * 150
                );
            }, i * 30);
        }
        
        // Show memory date in a tooltip-like effect
        const memoryDate = this.getAttribute('data-memory');
        if (memoryDate) {
            showMemoryTooltip(this, memoryDate);
        }
    });
    
    // Double click - extra special effect
    let lastClickTime = 0;
    item.addEventListener('click', function(e) {
        const currentTime = new Date().getTime();
        if (currentTime - lastClickTime < 300) {
            // Double click detected
            const rect = this.getBoundingClientRect();
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    createClickHeart(
                        rect.left + rect.width / 2 + (Math.random() - 0.5) * 300,
                        rect.top + rect.height / 2 + (Math.random() - 0.5) * 300
                    );
                }, i * 20);
            }
        }
        lastClickTime = currentTime;
    });
    
    // Add tilt effect on mouse move
    item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `translateY(-15px) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Show memory tooltip
function showMemoryTooltip(item, date) {
    const tooltip = document.createElement('div');
    tooltip.className = 'memory-tooltip';
    tooltip.textContent = date;
    tooltip.style.position = 'fixed';
    tooltip.style.left = item.getBoundingClientRect().left + item.offsetWidth / 2 + 'px';
    tooltip.style.top = item.getBoundingClientRect().top - 40 + 'px';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.padding = '8px 15px';
    tooltip.style.background = 'rgba(147, 51, 234, 0.9)';
    tooltip.style.color = 'white';
    tooltip.style.borderRadius = '20px';
    tooltip.style.fontSize = '0.9rem';
    tooltip.style.fontWeight = '600';
    tooltip.style.zIndex = '10000';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(tooltip);
    
    // Animate in
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }, 2000);
}

// Counter Animation
function animateCounter() {
    const counter = document.getElementById('daysCounter');
    if (counter) {
        let currentValue = parseInt(counter.textContent);
        let targetValue = 120;
        let increment = targetValue / 30;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                counter.textContent = targetValue;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 30);
    }
}

// Initialize counter animation on load
window.addEventListener('load', () => {
    setTimeout(animateCounter, 500);
});

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Double click to create heart explosion
let lastClickTime = 0;
document.addEventListener('click', function(e) {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime < 300) {
        // Double click detected
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createClickHeart(
                    e.clientX + (Math.random() - 0.5) * 200,
                    e.clientY + (Math.random() - 0.5) * 200
                );
            }, i * 30);
        }
    }
    lastClickTime = currentTime;
});
