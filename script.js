// Modern Art Style Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navigation
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    
    // Paper link interaction enhancement
    const paperItems = document.querySelectorAll('.paper-item');
    paperItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Contact link hover effects
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease-out';
        });
        
        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Research card hover effects
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            icon.style.transform = 'scale(1.1)';
            icon.style.transition = 'transform 0.3s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Geometric shapes additional animation on scroll
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Add typing effect to hero subtitle (optional enhancement)
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    let index = 0;
    
    function typeWriter() {
        if (index < originalText.length) {
            subtitle.textContent = originalText.slice(0, index + 1);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a brief delay
    setTimeout(() => {
        subtitle.textContent = '';
        typeWriter();
    }, 1000);
});

// Add some utility functions for future enhancements
const utils = {
    // Function to easily add new papers
    addPaper: function(year, title, authors, venue, links) {
        const papersList = document.querySelector('.papers-list');
        const paperItem = document.createElement('div');
        paperItem.className = 'paper-item';
        
        paperItem.innerHTML = `
            <div class="paper-year">${year}</div>
            <div class="paper-content">
                <h3 class="paper-title">${title}</h3>
                <p class="paper-authors">${authors}</p>
                <p class="paper-venue">${venue}</p>
                <div class="paper-links">
                    ${links.map(link => `<a href="${link.url}" class="paper-link">${link.text}</a>`).join('')}
                </div>
            </div>
        `;
        
        papersList.appendChild(paperItem);
    },
    
    // Function to update contact information
    updateContact: function(type, url) {
        const contactLinks = {
            email: '📧',
            twitter: '🐦',
            linkedin: '💼',
            scholar: '📚'
        };
        
        const contactLink = document.querySelector(`[href*="${type}"]`);
        if (contactLink) {
            contactLink.href = url;
        }
    }
};

// Make utils available globally for easy paper management
window.HomepageUtils = utils;