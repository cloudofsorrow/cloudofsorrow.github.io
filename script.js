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
    
    // Interactive Balls Animation
    const hero = document.querySelector('.hero');
    const balls = document.querySelectorAll('.floating-ball');
    const container = hero.getBoundingClientRect();

    let mouse = { x: null, y: null };

    hero.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX - container.left;
        mouse.y = e.clientY - container.top;
    });

    hero.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    const ballData = Array.from(balls).map((ball, index) => {
        const rect = ball.getBoundingClientRect();
        const radius = rect.width / 2;
        const initialX = rect.left - container.left + radius;
        const initialY = rect.top - container.top + radius;

        return {
            element: ball,
            x: initialX,
            y: initialY,
            vx: (Math.random() - 0.5) * 0.5, // Slower initial velocity
            vy: (Math.random() - 0.5) * 0.5,
            radius: radius,
            mass: radius * 0.1,
            trajectoryAngle: Math.random() * Math.PI * 2,
            trajectorySpeed: 0.2 + Math.random() * 0.2,
            initialX: initialX,
            initialY: initialY,
        };
    });

    function update() {
        ballData.forEach(ball => {
            // 1. Gravity towards initial trajectory
            const trajectoryForce = {
                x: (ball.initialX - ball.x) * 0.0005,
                y: (ball.initialY - ball.y) * 0.0005,
            };

            // 2. Mouse repulsion force
            let repulsionForce = { x: 0, y: 0 };
            if (mouse.x !== null && mouse.y !== null) {
                const dx = ball.x - mouse.x;
                const dy = ball.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const interactionRadius = ball.radius + 80; // Larger interaction radius

                if (distance < interactionRadius) {
                    const force = (interactionRadius - distance) / interactionRadius;
                    repulsionForce.x = (dx / distance) * force * 0.5;
                    repulsionForce.y = (dy / distance) * force * 0.5;
                }
            }

            // Apply forces to velocity
            ball.vx += trajectoryForce.x + repulsionForce.x;
            ball.vy += trajectoryForce.y + repulsionForce.y;

            // 3. Damping (friction)
            ball.vx *= 0.98;
            ball.vy *= 0.98;

            // Update position
            ball.x += ball.vx;
            ball.y += ball.vy;

            // 4. Boundary collision
            if (ball.x - ball.radius < 0) {
                ball.x = ball.radius;
                ball.vx *= -1;
            }
            if (ball.x + ball.radius > container.width) {
                ball.x = container.width - ball.radius;
                ball.vx *= -1;
            }
            if (ball.y - ball.radius < 0) {
                ball.y = ball.radius;
                ball.vy *= -1;
            }
            if (ball.y + ball.radius > container.height) {
                ball.y = container.height - ball.radius;
                ball.vy *= -1;
            }

            // Apply new position
            ball.element.style.transform = `translate(${ball.x - ball.initialX}px, ${ball.y - ball.initialY}px)`;
        });

        requestAnimationFrame(update);
    }

    update();
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

// ===================== Funny Section (Morphing Shapes) ===================== //
// This block is isolated: only runs if #funny-canvas-container is present.
if (document.getElementById('funny-canvas-container')) {
    (async () => {
        let THREE, OrbitControls;
        try {
            const threeMod = await import('three');
            THREE = threeMod;
            const orbitMod = await import('three/addons/controls/OrbitControls.js');
            OrbitControls = orbitMod.OrbitControls;
        } catch (e) {
            console.warn('Three.js failed to load', e);
            return;
        }

        const container = document.getElementById('funny-canvas-container');
        const morphBtn = document.getElementById('funnyMorphBtn');
        const W = container.clientWidth;
        const H = 520; // fixed visual height

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 2000);
        camera.position.set(0, 0, 85);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(W, H);
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;

        const PARTICLE_COUNT = 6000;
        const palette = [0x8d5b58, 0xb58a86, 0xffffff, 0x5a2a27].map(c => new THREE.Color(c));
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const base = new Float32Array(PARTICLE_COUNT * 3);
        const target = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 60;
            positions[i3 + 1] = (Math.random() - 0.5) * 60;
            positions[i3 + 2] = (Math.random() - 0.5) * 60;
            base.set(positions.slice(i3, i3 + 3), i3);
            target.set(positions.slice(i3, i3 + 3), i3);
            const col = palette[i % palette.length];
            colors[i3] = col.r; colors[i3 + 1] = col.g; colors[i3 + 2] = col.b;
        }
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const mat = new THREE.PointsMaterial({ size: 0.9, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        // Shape generators
        function genSphere() {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const r = 28 * Math.cbrt(Math.random());
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                target[i3] = r * Math.sin(phi) * Math.cos(theta);
                target[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                target[i3 + 2] = r * Math.cos(phi);
            }
        }
        function genTorus() {
            const R = 30, r = 10;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const u = Math.random() * Math.PI * 2;
                const v = Math.random() * Math.PI * 2;
                target[i3] = (R + r * Math.cos(v)) * Math.cos(u) * 0.6;
                target[i3 + 1] = (R + r * Math.cos(v)) * Math.sin(u) * 0.6;
                target[i3 + 2] = r * Math.sin(v) * 0.6;
            }
        }
        function genHelix() {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const i3 = i * 3;
                const t = i / PARTICLE_COUNT * Math.PI * 14;
                target[i3] = Math.cos(t) * 18;
                target[i3 + 1] = (i / PARTICLE_COUNT - 0.5) * 80;
                target[i3 + 2] = Math.sin(t) * 18;
            }
        }

        const shapes = [genSphere, genTorus, genHelix];
        let current = 0;
        let morphing = false; let progress = 0;

        function beginMorph() {
            const from = new Float32Array(positions); // snapshot
            current = (current + 1) % shapes.length;
            shapes[current]();
            morphing = true; progress = 0;
            base.set(from);
        }
        beginMorph();

        morphBtn?.addEventListener('click', () => { if (!morphing) beginMorph(); });

        const clock = new THREE.Clock();
        function animate() {
            requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            if (morphing) {
                progress += 0.02;
                const ease = progress >= 1 ? 1 : 1 - Math.pow(1 - progress, 3);
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    const i3 = i * 3;
                    positions[i3] = base[i3] + (target[i3] - base[i3]) * ease;
                    positions[i3 + 1] = base[i3 + 1] + (target[i3 + 1] - base[i3 + 1]) * ease;
                    positions[i3 + 2] = base[i3 + 2] + (target[i3 + 2] - base[i3 + 2]) * ease;
                }
                if (progress >= 1) morphing = false;
                geo.attributes.position.needsUpdate = true;
            } else {
                // Idle subtle breathing motion
                for (let i = 0; i < PARTICLE_COUNT; i++) {
                    const i3 = i * 3;
                    positions[i3 + 1] += Math.sin(t * 0.6 + i3) * 0.002;
                }
                geo.attributes.position.needsUpdate = true;
            }
            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            const w = container.clientWidth;
            camera.aspect = w / H;
            camera.updateProjectionMatrix();
            renderer.setSize(w, H);
        });
    })();
}