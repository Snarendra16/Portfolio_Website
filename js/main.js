document.addEventListener('DOMContentLoaded', () => {

    // --- Typing Effect ---
    const typingText = document.querySelector('.typing-text');
    const phrases = ["ML Engineer", "Full-Stack Developer", "Building intelligent systems", "Solving problems with code"];
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

        let linkHtml = '';
        if (data.link) {
            linkHtml = `
            <div class="modal-section" style="text-align: center; margin-top: 20px;">
                <a href="${data.link}" target="_blank" class="contact-btn" style="display: inline-block;">View Certificate</a>
            </div>`;
        }

        let mediaHtml = '';
        if (data.image && data.image.toLowerCase().endsWith('.pdf')) {
            mediaHtml = `<iframe src="${data.image}" width="100%" height="500px" style="border: none; border-radius: 8px;"></iframe>`;
        } else {
            mediaHtml = `<img src="${data.image}" alt="${data.title}" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--card-border);">`;
        }

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
                ${mediaHtml}
            </div>
            ${linkHtml}
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

    // --- Certification Filtering ---
    const certTabs = document.querySelectorAll('.cert-tab');
    const certCards = document.querySelectorAll('.cert-card');

    certTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            certTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            certCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                }
            });
        });
    });

    // --- Contact Form Handler ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Create mailto link
            const mailtoLink = `mailto:narendrasaraf16@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

            // Open mailto link
            window.location.href = mailtoLink;

            // Show success message
            formStatus.textContent = 'Opening your email client... Thank you for reaching out!';
            formStatus.className = 'form-status success';

            // Reset form after 2 seconds
            setTimeout(() => {
                contactForm.reset();
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 3000);
        });
    }

});
