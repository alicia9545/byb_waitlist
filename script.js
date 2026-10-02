document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Loading Screen Removal
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1500); 

    // 2. Background Sparkle Generator
    const sparkleContainer = document.getElementById('sparkle-container');
    const createSparkle = () => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('floating-sparkle');
        
        const size = Math.random() * 4 + 2; 
        const leftPos = Math.random() * 100;
        const duration = Math.random() * 10 + 10; 
        const delay = Math.random() * 5;
        
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.left = `${leftPos}%`;
        sparkle.style.bottom = `-10px`;
        sparkle.style.animationDuration = `${duration}s`;
        sparkle.style.animationDelay = `${delay}s`;
        
        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, (duration + delay) * 1000);
    };

    for(let i = 0; i < 15; i++) {
        setTimeout(createSparkle, Math.random() * 3000);
    }
    setInterval(createSparkle, 2500);

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Netlify Form AJAX Submission & Success State
    const form = document.getElementById('waitlist-form');
    const heroContent = document.getElementById('hero-content');
    const successState = document.getElementById('success-state');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const submitBtn = form.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Adding you to the list...';
            submitBtn.disabled = true;

            const formData = new FormData(form);

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                heroContent.style.display = 'none';
                successState.style.display = 'block';
                // Trigger scroll back to top of success state to ensure it's in view
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch((error) => {
                console.error('Form submission error:', error);
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                alert('There was an issue submitting your form. Please try again.');
            });
        });
    }

    // 5. Feature Card Hover Sparkle Effect
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const spark = document.createElement('div');
            spark.style.position = 'absolute';
            spark.style.width = '6px';
            spark.style.height = '6px';
            spark.style.backgroundColor = 'var(--accent-hover)';
            spark.style.borderRadius = '50%';
            spark.style.boxShadow = '0 0 10px 2px var(--accent-color)';
            spark.style.pointerEvents = 'none';
            spark.style.zIndex = '10';
            
            spark.style.top = '20px';
            spark.style.right = '20px';
            
            spark.animate([
                { opacity: 0, transform: 'scale(0) translateY(0)' },
                { opacity: 1, transform: 'scale(1) translateY(-10px)' },
                { opacity: 0, transform: 'scale(0) translateY(-20px)' }
            ], {
                duration: 800,
                easing: 'ease-out'
            });

            card.appendChild(spark);
            setTimeout(() => spark.remove(), 800);
        });
    });
});