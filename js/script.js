// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Apply fade-in animations to elements once page loads
    const heroContent = document.querySelector('#home .md\\:w-1\\/2:first-child');
    if (heroContent) {
        heroContent.querySelectorAll('h1, h2, p, .flex.flex-wrap, .flex.space-x-4').forEach(el => {
            el.classList.add('fade-in');
        });
        
        // Add staggered animation class
        heroContent.classList.add('staggered-animation');
    }

    // Mobile menu accessibility and toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && mobileMenu) {
        // Toggle mobile menu with accessibility attributes
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            // Trap focus inside mobile menu when open
            if (!isExpanded) {
                setTimeout(() => {
                    mobileMenu.querySelector('a').focus();
                }, 100);
            }
        });
        
        // Hide mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
                menuBtn.focus();
            }
        });
    }
      // Enhanced smooth scrolling for navigation links with progress indicator
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Update URL without reload for better user experience and sharing
                history.pushState(null, null, targetId);
                
                // Highlight active nav item
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('text-indigo-600');
                    navLink.classList.add('text-gray-700');
                });
                this.classList.remove('text-gray-700');
                this.classList.add('text-indigo-600');
                
                // Scroll with offset for fixed header
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation classes to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use different animation types based on element
                if (entry.target.tagName === 'H2' || entry.target.tagName === 'H3') {
                    entry.target.classList.add('fade-in');
                } else if (entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('slide-up');
                } else if (entry.target.classList.contains('experience-item')) {
                    entry.target.classList.add('fade-in');
                } else {
                    entry.target.classList.add('fade-in');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('h2, h3, .project-card, .experience-item, #contact form, #contact .space-y-8').forEach(el => {
        observer.observe(el);
        el.style.opacity = '0'; // Start invisible
    });
    
    // Add class to experience items for selection
    document.querySelectorAll('.flex.flex-col.md\\:flex-row.gap-8.relative').forEach(el => {
        el.classList.add('experience-item');
    });
      // Simple dark/light mode toggle function
    window.toggleDarkMode = function() {
        document.body.classList.toggle('dark');
        localStorage.setItem('darkMode', document.body.classList.contains('dark'));
    }
    
    // Check for saved user preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
    }
    
    // Handle back to top button with improved animation
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('opacity-100');
                backToTopBtn.classList.remove('opacity-0');
            } else {
                backToTopBtn.classList.add('opacity-0');
                backToTopBtn.classList.remove('opacity-100');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Detect which section is in viewport for active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function onScroll() {
        const scrollPos = window.pageYOffset;
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100; // Adding offset
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('text-indigo-600');
                    navLink.classList.add('text-gray-700');
                });
                
                // Add active class to current section link
                document.querySelectorAll(`nav a[href="#${sectionId}"]`).forEach(link => {
                    link.classList.remove('text-gray-700');
                    link.classList.add('text-indigo-600');
                });
            }
        });
        
        // Handle header background opacity based on scroll
        const header = document.querySelector('nav');
        if (scrollPos > 50) {
            header.classList.add('bg-white/95');
            header.classList.remove('bg-white/90');
        } else {
            header.classList.add('bg-white/90');
            header.classList.remove('bg-white/95');
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');
            
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Please enter a message');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            if (isValid) {
                // In a real scenario, you would send the form data to a server
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
                
                // Simulate form submission (replace with actual submission)
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Message Sent!</span> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>';
                    
                    // Reset button after 2 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>';
                    }, 2000);
                }, 1500);
            }
        });
        
        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', function() {
                if (!this.value.trim()) {
                    markInvalid(this, `Please enter your ${this.id}`);
                } else if (this.id === 'email' && !isValidEmail(this.value)) {
                    markInvalid(this, 'Please enter a valid email');
                } else {
                    markValid(this);
                }
            });
        });
    }
    
    function markInvalid(element, message) {
        element.classList.add('border-red-500');
        element.classList.remove('border-gray-300', 'border-green-500');
        
        // Create or update error message
        let errorMessage = element.parentNode.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.className = 'text-red-500 text-sm mt-1 error-message';
            element.parentNode.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }
    
    function markValid(element) {
        element.classList.remove('border-red-500');
        element.classList.add('border-green-500');
        element.classList.remove('border-gray-300');
        
        // Remove error message if it exists
        const errorMessage = element.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Initialize scroll position check on page load
    onScroll();
    
    // Add some console message for fun
    console.log("Welcome to my portfolio! Feel free to explore.");
});
