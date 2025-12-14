// Starfield Logic
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
const numStars = 200;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5; // Depth factor
        this.size = Math.random() * 2;
        this.brightness = Math.random();
    }

    update(speed) {
        // Move stars based on scroll speed (parallax) AND constant base speed
        // This creates a "warp" effect where stars move constantly
        const baseSpeed = 2; // Constant movement speed
        this.y -= (speed * 0.5 + baseSpeed) * this.z * 0.1;

        // Wrap around screen
        if (this.y < 0) {
            this.y = height;
            this.x = Math.random() * width; // Randomize x on reset for variety
        }
        if (this.y > height) {
            this.y = 0;
            this.x = Math.random() * width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize stars
for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
}


// Smooth Scroll Logic
const track = document.querySelector('.gallery-track');
const container = document.querySelector('.gallery-container');

let currentScroll = 0;
let targetScroll = 0;
let ease = 0.05; // The lower the value, the smoother/slower the scroll

// Calculate total scrollable height
let maxScroll = 0;

function updateMaxScroll() {
    maxScroll = track.scrollHeight - window.innerHeight;
}

window.addEventListener('resize', updateMaxScroll);
// Call after a small delay to ensure DOM is fully rendered
setTimeout(updateMaxScroll, 100);

// Listen for wheel events
window.addEventListener('wheel', (e) => {
    // e.deltaY is the vertical scroll amount
    targetScroll += e.deltaY;

    // Clamp targetScroll between 0 and maxScroll
    targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
});

// Animation Loop
function animate() {
    // Calculate speed for star warp effect
    const previousScroll = currentScroll;

    // Linear Interpolation (Lerp)
    // current = current + (target - current) * ease
    currentScroll += (targetScroll - currentScroll) * ease;

    const scrollSpeed = currentScroll - previousScroll;

    // Clear and draw stars
    ctx.clearRect(0, 0, width, height);

    stars.forEach(star => {
        star.update(scrollSpeed);
        star.draw();
    });

    // Apply transform (Vertical)
    track.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;

    // Update Progress Bar (Height)
    const progress = currentScroll / maxScroll;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.height = `${progress * 100}%`;
    }

    // Parallax effect for images
    const images = document.querySelectorAll('.work-image img');
    images.forEach(img => {
        // Get the parent section's position relative to the viewport
        const section = img.closest('.item');
        const sectionRect = section.getBoundingClientRect();

        // Check if section is visible in viewport
        if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
            // Calculate relative position (-1 to 1)
            const center = window.innerHeight / 2;
            const sectionCenter = sectionRect.top + sectionRect.height / 2;
            const distFromCenter = sectionCenter - center;

            // Move image slightly based on distance from center (Vertical Parallax)
            // Speed factor: 0.1
            img.style.transform = `scale(1.2) translateY(${distFromCenter * 0.1}px)`;
        }
    });

    requestAnimationFrame(animate);
}

animate();


// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    }
});

function animateCursor() {
    if (follower) {
        // Smooth follower
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        follower.style.left = cursorX + 'px';
        follower.style.top = cursorY + 'px';
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Typewriter Effect moved to router.js
