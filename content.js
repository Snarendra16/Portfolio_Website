// content.js
// Holds the HTML content for each route.

const pageContent = {
    '/': `
        <section id="home" class="active">
            <div class="hero">
                <img src="https://via.placeholder.com/150" alt="Your Name" style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; margin-bottom: 20px; border: 4px solid var(--primary-color);">
                <h1>Hi, I'm [Your Name]</h1>
                <h2 style="color: var(--text-color); font-weight: 300; border: none;">I am <span class="txt-type" data-wait="3000" data-words='["Developer", "Programmer", "Investor", "AI/ML Enthusiast"]'></span></h2>
                <p style="max-width: 600px; margin: 20px auto 40px;">I specialize in modern JavaScript frameworks and clean, performant backend architectures. Let's build something exceptional.</p>
                <a href="/projects" data-route class="contact-form button">Explore My Projects &rarr;</a>
            </div>
        </section>
    `,
    '/education': `
        <section id="education">
            <h1>Education 🎓</h1>
            <div class="timeline">
                <div class="timeline-item">
                    <h3>M.Sc. Computer Science</h3>
                    <p><strong>[University Name]</strong> | 20XX - 20XX</p>
                    <p>Focus on Distributed Systems and Modern Database Architectures.</p>
                </div>
                <div class="timeline-item">
                    <h3>B.Tech Information Technology</h3>
                    <p><strong>[College Name]</strong> | 20XX - 20XX</p>
                    <p>Graduated with Honors. Capstone Project: AI-Powered Recommendation Engine.</p>
                </div>
            </div>
        </section>
    `,
    '/certs': `
        <section id="certs">
            <h1>Certifications 🏅</h1>
            <div class="timeline">
                <div class="timeline-item">
                    <h3>AWS Certified Solutions Architect – Associate</h3>
                    <p><strong>Amazon Web Services (AWS)</strong> | Issued: Aug 2024</p>
                    <p><a href="#" target="_blank" style="color: var(--primary-color);">View Credential &rarr;</a></p>
                </div>
                <div class="timeline-item">
                    <h3>Professional React Developer</h3>
                    <p><strong>[Issuing Platform/Body]</strong> | Issued: Jan 2024</p>
                    <p><a href="#" target="_blank" style="color: var(--primary-color);">View Credential &rarr;</a></p>
                </div>
            </div>
        </section>
    `,
    '/projects': `
        <section id="projects">
            <h1>Featured Projects 💡</h1>
            <p>A selection of my best work demonstrating a variety of skills from UI/UX to database design.</p>
            <div class="projects-grid">
                <div class="project-card">
                    <h3>E-Commerce Analytics Dashboard</h3>
                    <p><strong>Stack:</strong> React, D3.js, Node.js, PostgreSQL</p>
                    <p style="margin-top: 10px;">High-performance, real-time data visualization tool for sales metrics.</p>
                    <p style="margin-top: 15px;"><a href="#" target="_blank" style="color: var(--primary-color);">Live Demo</a> | <a href="#" target="_blank" style="color: var(--primary-color);">GitHub</a></p>
                </div>
                <div class="project-card">
                    <h3>Secure Task Management API</h3>
                    <p><strong>Stack:</strong> Python (Flask), JWT, MongoDB</p>
                    <p style="margin-top: 10px;">A scalable, token-based authentication API for a mobile application.</p>
                    <p style="margin-top: 15px;"><a href="#" target="_blank" style="color: var(--primary-color);">Live Demo</a> | <a href="#" target="_blank" style="color: var(--primary-color);">GitHub</a></p>
                </div>
            </div>
        </section>
    `,
    '/contact': `
        <section id="contact">
            <h1>Contact Me 📧</h1>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities.</p>
            <div class="contact-form">
                <form onsubmit="alert('Thank you for your message! This is a simple placeholder for a server-side form.'); return false;">
                    <label for="name">Name</label>
                    <input type="text" id="name" required>
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                    <label for="message">Message</label>
                    <textarea id="message" rows="5" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
                
                <h2 style="margin-top: 40px; border: none;">Connect Online</h2>
                <div style="font-size: 2rem;">
                    <a href="https://linkedin.com/[yourusername]" target="_blank" style="margin-right: 15px; color: var(--primary-color);">in</a>
                    <a href="https://github.com/[yourusername]" target="_blank" style="color: var(--primary-color);">git</a>
                </div>
            </div>
        </section>
    `,
};