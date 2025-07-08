// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 2000);

    // Initialize Three.js background
    initThreeJsBackground();

    // Initialize GSAP animations
    initGSAPAnimations();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize navbar scroll effect
    initNavbarScroll();

    // Initialize smooth scrolling for navigation links
    initSmoothScroll();

    // Initialize skill progress bars
    initSkillBars();

    // Initialize project filtering
    initProjectFilter();

    // Initialize project modal
    initProjectModal();

    // Initialize testimonial slider
    initTestimonialSlider();

    // Initialize back to top button
    initBackToTop();

    // Initialize form validation
    initFormValidation();

    // Initialize typing animation
    initTypingAnimation();
    
    // Add a global function to update skill percentages (for testing)
    window.updateSkillPercentage = function(skillName, percentage) {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const skillTitle = item.querySelector('h4');
            if (skillTitle && skillTitle.textContent === skillName) {
                const progressBar = item.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.setAttribute('data-width', percentage);
                }
            }
        });
    };
});

// Three.js Background Animation
function initThreeJsBackground() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Materials
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x6c63ff,
        transparent: true,
        opacity: 0.8
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Position camera
    camera.position.z = 2;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - window.innerWidth / 2) / 100;
        mouseY = (event.clientY - window.innerHeight / 2) / 100;
    }

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;

        // Responsive to mouse movement
        particlesMesh.rotation.x += mouseY * 0.0003;
        particlesMesh.rotation.y += mouseX * 0.0003;

        renderer.render(scene, camera);
    }

    animate();
}

// GSAP Animations
function initGSAPAnimations() {
    // Hero section animations
    gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 2.2 });
    gsap.from('.hero-text h1', { opacity: 0, y: 20, duration: 0.8, delay: 2.4 });
    gsap.from('.hero-job-title', { opacity: 0, y: 20, duration: 0.8, delay: 2.6 });
    gsap.from('.tagline', { opacity: 0, y: 20, duration: 0.8, delay: 2.8 });
    gsap.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.8, delay: 3.0 });
    gsap.from('.social-icons', { opacity: 0, y: 20, duration: 0.8, delay: 3.2 });
    gsap.from('.hero-visual', { opacity: 0, x: 50, duration: 1, delay: 3.0 });
    gsap.from('.scroll-indicator', { opacity: 0, duration: 1, delay: 3.5 });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
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

    sections.forEach(section => {
        observer.observe(section);
    });

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8
        });
    });

    // Animate about content
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: aboutContent,
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -50,
            duration: 0.8
        });

        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: aboutContent,
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: 50,
            duration: 0.8,
            delay: 0.3
        });
    }

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
            duration: 0.8,
            delay: index * 0.2
        });
    });

    // Animate skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: index * 0.1
        });
    });

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // Animate contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -30,
            duration: 0.6,
            delay: index * 0.2
        });
    });

    // Animate contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        gsap.from(contactForm, {
            scrollTrigger: {
                trigger: contactForm,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinksContainer.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .hero-buttons a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize skill progress bars
function initSkillBars() {
    const skillProgressElements = document.querySelectorAll('.skill-progress');
    
    // Function to update progress text based on data-width attribute
    function updateProgressText(progressBar, progressText) {
        if (progressBar && progressText) {
            const percentage = progressBar.getAttribute('data-width');
            progressText.textContent = percentage + '%';
        }
    }
    
    // Initial synchronization of progress text with data-width
    skillProgressElements.forEach(skillProgress => {
        const progressBar = skillProgress.querySelector('.progress-bar');
        const progressText = skillProgress.querySelector('.progress-text');
        updateProgressText(progressBar, progressText);
        
        // Set up a MutationObserver to watch for changes to the data-width attribute
        if (progressBar) {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'data-width') {
                        updateProgressText(progressBar, progressText);
                        progressBar.style.width = progressBar.getAttribute('data-width') + '%';
                    }
                });
            });
            
            observer.observe(progressBar, { attributes: true, attributeFilter: ['data-width'] });
        }
    });
    
    const options = {
        threshold: 0.5
    };
    
    const intersectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target;
                const progressBar = skillProgress.querySelector('.progress-bar');
                const progressText = skillProgress.querySelector('.progress-text');
                
                const percentage = progressBar.getAttribute('data-width');
                progressBar.style.width = percentage + '%';
                
                // Ensure the text is updated and visible
                updateProgressText(progressBar, progressText);
                
                intersectionObserver.unobserve(skillProgress);
            }
        });
    }, options);
    
    skillProgressElements.forEach(element => {
        intersectionObserver.observe(element);
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

// Project modal
function initProjectModal() {
    const projectLinks = document.querySelectorAll('.project-link[data-modal]');
    const modal = document.querySelector('.project-modal');
    
    if (projectLinks.length && modal) {
        const modalContent = modal.querySelector('.modal-content');
        const modalClose = modal.querySelector('.modal-close');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const projectId = this.getAttribute('data-modal');
                const projectData = getProjectData(projectId);
                
                if (projectData) {
                    populateModal(projectData);
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal when clicking the close button
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close modal when clicking outside the content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Function to get project data (replace with your actual data)
    function getProjectData(projectId) {
        // This would typically come from a database or JSON file
        // For demo purposes, we'll use a simple object
        const projects = {
            'project1': {
                title: 'E-Commerce Platform',
                image: 'assets/images/projects/project1.jpg',
                description: 'A full-featured e-commerce platform with product management, cart functionality, payment processing, and user authentication.',
                technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
                features: [
                    'User authentication and profiles',
                    'Product search and filtering',
                    'Shopping cart and checkout',
                    'Payment processing with Stripe',
                    'Order tracking and history',
                    'Admin dashboard for product management'
                ],
                liveLink: 'https://example.com/project1',
                codeLink: 'https://github.com/username/project1'
            },
            'project2': {
                title: 'Task Management App',
                image: 'assets/images/projects/project2.jpg',
                description: 'A collaborative task management application with real-time updates, task assignment, and progress tracking.',
                technologies: ['Vue.js', 'Firebase', 'Vuex', 'SCSS'],
                features: [
                    'Real-time task updates',
                    'User collaboration and task assignment',
                    'Project organization and categorization',
                    'Due date tracking and notifications',
                    'File attachments and comments',
                    'Progress visualization with charts'
                ],
                liveLink: 'https://example.com/project2',
                codeLink: 'https://github.com/username/project2'
            },
            'project3': {
                title: 'Fitness Tracking Dashboard',
                image: 'assets/images/projects/project3.jpg',
                description: 'A comprehensive fitness tracking application that monitors workouts, nutrition, and provides personalized recommendations.',
                technologies: ['Angular', 'TypeScript', 'Chart.js', 'Node.js', 'MongoDB'],
                features: [
                    'Workout planning and tracking',
                    'Nutrition logging and analysis',
                    'Progress visualization with interactive charts',
                    'Goal setting and achievement tracking',
                    'Personalized workout recommendations',
                    'Integration with fitness wearables'
                ],
                liveLink: 'https://example.com/project3',
                codeLink: 'https://github.com/username/project3'
            }
        };
        
        return projects[projectId];
    }
    
    // Function to populate modal with project data
    function populateModal(projectData) {
        const modalTitle = modal.querySelector('.modal-title');
        const modalImage = modal.querySelector('.modal-image img');
        const modalDescription = modal.querySelector('.modal-description');
        const modalTech = modal.querySelector('.modal-tech');
        const modalFeaturesList = modal.querySelector('.modal-features-list');
        const liveLink = modal.querySelector('.live-link');
        const codeLink = modal.querySelector('.code-link');
        
        if (modalTitle) modalTitle.textContent = projectData.title;
        if (modalImage) modalImage.src = projectData.image;
        if (modalDescription) modalDescription.textContent = projectData.description;
        
        if (modalTech) {
            modalTech.innerHTML = '';
            projectData.technologies.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                modalTech.appendChild(span);
            });
        }
        
        if (modalFeaturesList) {
            modalFeaturesList.innerHTML = '';
            projectData.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                modalFeaturesList.appendChild(li);
            });
        }
        
        if (liveLink) liveLink.href = projectData.liveLink;
        if (codeLink) codeLink.href = projectData.codeLink;
    }
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialCards.length) {
        let currentIndex = 0;
        
        // Show the first testimonial
        testimonialCards[0].classList.add('active');
        if (dots.length) dots[0].classList.add('active');
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonialCards.forEach(card => card.classList.remove('active'));
            if (dots.length) dots.forEach(dot => dot.classList.remove('active'));
            
            // Show the selected testimonial
            testimonialCards[index].classList.add('active');
            if (dots.length) dots[index].classList.add('active');
            
            currentIndex = index;
        }
        
        // Previous button
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                let index = currentIndex - 1;
                if (index < 0) index = testimonialCards.length - 1;
                showTestimonial(index);
            });
        }
        
        // Next button
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let index = currentIndex + 1;
                if (index >= testimonialCards.length) index = 0;
                showTestimonial(index);
            });
        }
        
        // Dot navigation
        if (dots.length) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showTestimonial(index);
                });
            });
        }
        
        // Auto-rotate testimonials
        setInterval(function() {
            let index = currentIndex + 1;
            if (index >= testimonialCards.length) index = 0;
            showTestimonial(index);
        }, 5000);
    }
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="email"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');
            
            // Simple validation
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                isValid = false;
                showError(nameInput, 'Please enter your name');
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                isValid = false;
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                showError(messageInput, 'Please enter your message');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Your message has been sent successfully!';
                    contactForm.appendChild(successMessage);
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Remove success message after 5 seconds
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 2000);
            }
        });
        
        // Helper functions for form validation
        function showError(input, message) {
            const formGroup = input.parentElement;
            let errorElement = formGroup.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                formGroup.appendChild(errorElement);
            }
            
            errorElement.textContent = message;
            formGroup.classList.add('error');
        }
        
        function removeError(input) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                errorElement.remove();
            }
            
            formGroup.classList.remove('error');
        }
        
        function isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
}

// Typing animation for job titles
function initTypingAnimation() {
    const element = document.querySelector('.txt-rotate');
    if (!element) return;
    
    const toRotate = JSON.parse(element.getAttribute('data-rotate'));
    const period = element.getAttribute('data-period');
    let loopNum = 0;
    let txt = '';
    let isDeleting = false;
    
    function tick() {
        const i = loopNum % toRotate.length;
        const fullTxt = toRotate[i];
        
        if (isDeleting) {
            txt = fullTxt.substring(0, txt.length - 1);
        } else {
            txt = fullTxt.substring(0, txt.length + 1);
        }
        
        element.innerHTML = txt;
        
        let delta = 200 - Math.random() * 100;
        
        if (isDeleting) { delta /= 2; }
        
        if (!isDeleting && txt === fullTxt) {
            delta = period;
            isDeleting = true;
        } else if (isDeleting && txt === '') {
            isDeleting = false;
            loopNum++;
            delta = 500;
        }
        
        setTimeout(function() {
            tick();
        }, delta);
    }
    
    tick();
}