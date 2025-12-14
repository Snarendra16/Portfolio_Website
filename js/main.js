document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    const phrases = ["AI/ML Engineer", "Building systems that learn.", "Turning data into intelligence."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typeSpeed);
    }

    type();


    // --- Intersection Observer for Fade-in ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });


    // --- Modal Logic ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal');

    window.openModal = (projectId) => {
        const dataScript = document.getElementById(`${projectId}-data`);
        if (!dataScript) return;

        const data = JSON.parse(dataScript.textContent);

        modalBody.innerHTML = `
            <h2 class="modal-title">${data.title}</h2>
            <div class="modal-section">
                <h4>The Problem</h4>
                <p>${data.problem}</p>
            </div>
            <div class="modal-section">
                <h4>Approach</h4>
                <p>${data.approach}</p>
            </div>
            <div class="modal-section">
                <h4>Outcome</h4>
                <p>${data.outcome}</p>
            </div>
            <div class="modal-section">
                <h4>Learned</h4>
                <p>${data.learned}</p>
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    window.openCertModal = (certId) => {
        const dataScript = document.getElementById(`${certId}-data`);
        if (!dataScript) return;

        const data = JSON.parse(dataScript.textContent);

        modalBody.innerHTML = `
            <h2 class="modal-title">${data.title}</h2>
            <div class="modal-section">
                <h4>Issuer</h4>
                <p>${data.issuer}</p>
            </div>
            <div class="modal-section">
                <h4>Date</h4>
                <p>${data.date}</p>
            </div>
            <div class="modal-section" style="text-align: center;">
                <img src="${data.image}" alt="${data.title}" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--card-border);">
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });


    // --- Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Check local storage or system preference
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme == "light") {
        document.body.setAttribute("data-theme", "light");
    } else {
        document.body.setAttribute("data-theme", "dark");
    }

    themeToggle.addEventListener("click", function () {
        let theme = "dark";
        if (document.body.getAttribute("data-theme") === "dark") {
            document.body.setAttribute("data-theme", "light");
            theme = "light";
        } else {
            document.body.setAttribute("data-theme", "dark");
        }
        localStorage.setItem("theme", theme);
    });

    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with a slight delay (using animate for smoothness)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

});
