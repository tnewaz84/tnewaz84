/**
 * Main JavaScript for Tanvir Newaz's Portfolio
 * Author: Tanvir Newaz
 * Version: 1.0
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize counter animations
    initCounters();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize portfolio filters
    initPortfolioFilters();
    
    // Initialize blog filters
    initBlogFilters();
    
    // Initialize FAQ accordions
    initFaqAccordions();
    
    // Initialize form validation
    initFormValidation();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

/**
 * Counter Animation
 */
function initCounters() {
    const counters = document.querySelectorAll('.result-number');
    
    if (counters.length > 0) {
        const options = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = Math.ceil(target / (duration / 16)); // 60fps
                    
                    const timer = setInterval(function() {
                        count += increment;
                        if (count >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = count;
                        }
                    }, 16);
                    
                    // Unobserve after animation
                    observer.unobserve(counter);
                }
            });
        }, options);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    if (slider && slides.length > 0) {
        let currentSlide = 0;
        
        // Hide all slides except the first one
        for (let i = 1; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        
        // Function to show a specific slide
        function showSlide(index) {
            // Hide all slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            
            // Show the selected slide
            slides[index].style.display = 'block';
            
            // Update current slide index
            currentSlide = index;
        }
        
        // Event listeners for navigation buttons
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', function() {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) {
                    newIndex = slides.length - 1;
                }
                showSlide(newIndex);
            });
            
            nextButton.addEventListener('click', function() {
                let newIndex = currentSlide + 1;
                if (newIndex >= slides.length) {
                    newIndex = 0;
                }
                showSlide(newIndex);
            });
        }
        
        // Auto-rotate slides every 5 seconds
        setInterval(function() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slides.length) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }, 5000);
    }
}

/**
 * Portfolio Filters
 */
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.portfolio-filter .filter-button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
}

/**
 * Blog Filters
 */
function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.blog-filter .filter-button');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (filterButtons.length > 0 && blogPosts.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter blog posts
                blogPosts.forEach(post => {
                    if (filter === 'all') {
                        post.style.display = 'block';
                    } else {
                        const categories = post.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            post.style.display = 'block';
                        } else {
                            post.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Blog search functionality
    const searchForm = document.getElementById('blogSearch');
    const searchInput = document.getElementById('searchInput');
    
    if (searchForm && searchInput && blogPosts.length > 0) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search is empty, show all posts
                blogPosts.forEach(post => {
                    post.style.display = 'block';
                });
                return;
            }
            
            // Filter posts based on search term
            blogPosts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }
}

/**
 * FAQ Accordions
 */
function initFaqAccordions() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            // Initially hide all answers except the first one
            if (question !== faqQuestions[0]) {
                const answer = question.nextElementSibling;
                answer.style.display = 'none';
            } else {
                // Update icon for first question
                const icon = question.querySelector('.faq-toggle i');
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
            
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const icon = this.querySelector('.faq-toggle i');
                
                // Toggle answer visibility
                if (answer.style.display === 'none' || answer.style.display === '') {
                    answer.style.display = 'block';
                    if (icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                } else {
                    answer.style.display = 'none';
                    if (icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        });
    }
}

/**
 * Form Validation
 */
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const commentForm = document.getElementById('commentForm');
    
    // Contact form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const consent = document.getElementById('consent');
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            } else {
                removeError(name);
            }
            
            // Validate email
            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(email);
            }
            
            // Validate subject
            if (!subject.value.trim()) {
                showError(subject, 'Please enter a subject');
                isValid = false;
            } else {
                removeError(subject);
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else {
                removeError(message);
            }
            
            // Validate consent
            if (consent && !consent.checked) {
                showError(consent.parentElement, 'Please provide your consent');
                isValid = false;
            } else if (consent) {
                removeError(consent.parentElement);
            }
            
            // If form is valid, submit it (in a real scenario, this would send data to a server)
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate server response
                setTimeout(function() {
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Your message has been sent successfully!';
                    contactForm.appendChild(successMessage);
                    
                    // Remove success message after 5 seconds
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Newsletter form validation
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('newsletterName');
            const email = document.getElementById('newsletterEmail');
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            } else {
                removeError(name);
            }
            
            // Validate email
            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(email);
            }
            
            // If form is valid, submit it
            if (isValid) {
                // Simulate form submission
                const submitButton = newsletterForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Subscribing...';
                
                // Simulate server response
                setTimeout(function() {
                    newsletterForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Subscribe';
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                    newsletterForm.appendChild(successMessage);
                    
                    // Remove success message after 5 seconds
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Comment form validation
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('commentName');
            const email = document.getElementById('commentEmail');
            const comment = document.getElementById('commentContent');
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            } else {
                removeError(name);
            }
            
            // Validate email
            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(email);
            }
            
            // Validate comment
            if (!comment.value.trim()) {
                showError(comment, 'Please enter your comment');
                isValid = false;
            } else {
                removeError(comment);
            }
            
            // If form is valid, submit it
            if (isValid) {
                // Simulate form submission
                const submitButton = commentForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Posting...';
                
                // Simulate server response
                setTimeout(function() {
                    commentForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Post Comment';
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Your comment has been posted successfully!';
                    commentForm.appendChild(successMessage);
                    
                    // Remove success message after 5 seconds
                    setTimeout(function() {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
}

/**
 * Helper function to validate email
 */
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Helper function to show error message
 */
function showError(input, message) {
    // Remove any existing error
    removeError(input);
    
    // Create error message element
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    
    // Add error message after input
    input.parentNode.appendChild(error);
    
    // Add error class to input
    input.classList.add('error');
}

/**
 * Helper function to remove error message
 */
function removeError(input) {
    // Remove error class from input
    input.classList.remove('error');
    
    // Remove any existing error message
    const error = input.parentNode.querySelector('.error-message');
    if (error) {
        error.remove();
    }
}

/**
 * Smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (targetId === '#' || targetId === '') {
            return;
        }
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Scroll to target element
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navMenu = document.querySelector('nav ul');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        }
    });
});

/**
 * Scroll to top button
 */
window.addEventListener('scroll', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }
});

// Add scroll to top button if it doesn't exist
if (!document.getElementById('scrollToTop')) {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.id = 'scrollToTop';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.title = 'Scroll to Top';
    scrollToTopBtn.style.display = 'none';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.zIndex = '99';
    scrollToTopBtn.style.width = '40px';
    scrollToTopBtn.style.height = '40px';
    scrollToTopBtn.style.borderRadius = '50%';
    scrollToTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollToTopBtn.style.color = 'white';
    scrollToTopBtn.style.border = 'none';
    scrollToTopBtn.style.cursor = 'pointer';
    scrollToTopBtn.style.boxShadow = 'var(--shadow-md)';
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollToTopBtn);
}

/**
 * Add active class to navigation links based on current page
 */
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (currentPath.endsWith(linkPath) || 
            (linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
            link.classList.add('active');
        }
    });
}

// Set active nav link on page load
setActiveNavLink();

/**
 * Analytics tracking (placeholder)
 */
function trackPageView() {
    // This would be replaced with actual analytics code
    console.log('Page view tracked:', window.location.pathname);
}

// Track page view on load
trackPageView();
