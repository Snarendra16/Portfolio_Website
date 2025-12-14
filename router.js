// router.js
// Handles client-side routing using the History API

// Typewriter Effect Logic
let currentTypewriter = null;

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.timeoutId = null;
        this.isDeleting = false;
        this.isStopped = false;
        this.type();
    }

    type() {
        if (this.isStopped) return;

        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        this.timeoutId = setTimeout(() => this.type(), typeSpeed);
    }

    stop() {
        this.isStopped = true;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}

function initTypewriter() {
    // Stop existing typewriter if it exists
    if (currentTypewriter) {
        console.log('Stopping previous typewriter instance');
        currentTypewriter.stop();
        currentTypewriter = null;
    }

    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        try {
            const words = JSON.parse(txtElement.getAttribute('data-words'));
            const wait = txtElement.getAttribute('data-wait');
            console.log('Initializing new Typewriter with words:', words);
            currentTypewriter = new TypeWriter(txtElement, words, wait);
        } catch (e) {
            console.error('Error initializing typewriter:', e);
        }
    }
}

const appContainer = document.getElementById('app-container');

// 1. Define the routing function
const navigate = (pathname) => {
    // Check if the route exists in our content map
    const content = pageContent[pathname] || pageContent['/'];

    // Use pushState to change the URL without a full page reload
    if (window.location.pathname !== pathname) {
        window.history.pushState({}, pathname, pathname);
    }

    // Inject the content
    appContainer.innerHTML = content;

    // Initialize Typewriter if on home page
    if (pathname === '/') {
        setTimeout(initTypewriter, 100);
    }

    // Optional: Add a smooth fade-in effect
    const section = appContainer.querySelector('section');
    if (section) {
        // Wait a tick to ensure element is in DOM before fading
        setTimeout(() => {
            section.classList.add('active');
        }, 50);
    }

    // Update active state in navbar
    updateNavLinks(pathname);

    // Scroll to the top of the page
    window.scrollTo(0, 0);
};

// 2. Update Navbar Active State
const updateNavLinks = (pathname) => {
    document.querySelectorAll('.nav-links a').forEach(link => {
        // Remove 'active' class from all links
        link.classList.remove('active');

        // Add 'active' class if href matches current path
        if (link.getAttribute('href') === pathname) {
            link.classList.add('active');
        }
    });
};

// 3. Handle Initial Load and Popstate (Browser Back/Forward)
document.addEventListener('DOMContentLoaded', () => {
    // Initial load: navigate to the current path
    navigate(window.location.pathname);

    // Listen for link clicks on the entire document
    document.body.addEventListener('click', e => {
        // Find the closest ancestor link with the 'data-route' attribute
        const link = e.target.closest('a[data-route]');

        if (link) {
            e.preventDefault(); // Stop default link behavior
            const href = link.getAttribute('href');
            navigate(href); // Use our custom navigation function
        }
    });
});

// 4. Handle Browser Back/Forward buttons
window.addEventListener('popstate', () => {
    navigate(window.location.pathname);
});