// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize project filtering
    initProjectFilter();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Initialize animations
function initAnimations() {
    // Header animations
    const headerTitle = document.querySelector('.header-title');
    const headerSubtitle = document.querySelector('.header-subtitle');
    const backLink = document.querySelector('.back-link');
    
    if (headerTitle) headerTitle.style.animation = 'fadeInUp 0.8s ease forwards 0.2s';
    if (headerSubtitle) headerSubtitle.style.animation = 'fadeInUp 0.8s ease forwards 0.4s';
    if (backLink) backLink.style.animation = 'fadeInUp 0.8s ease forwards 0.6s';
    
    // Project cards animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// Project filtering
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else if (card.classList.contains(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '-100px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    projectCards.forEach(card => {
        observer.observe(card);
    });
}

// Add hover effects to project cards
function addHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
            this.style.boxShadow = 'var(--shadow-xl)';
            
            const img = this.querySelector('.project-img img');
            if (img) img.style.transform = 'scale(1.1)';
            
            const overlay = this.querySelector('.project-img::before');
            if (overlay) overlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
            this.style.boxShadow = 'var(--shadow-md)';
            
            const img = this.querySelector('.project-img img');
            if (img) img.style.transform = 'scale(1)';
            
            const overlay = this.querySelector('.project-img::before');
            if (overlay) overlay.style.opacity = '0';
        });
    });
}

// Initialize hover effects after the page has loaded
window.addEventListener('load', function() {
    addHoverEffects();
});