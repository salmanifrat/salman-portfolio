/**
 * lusion-engine.js: Advanced Lusion-inspired 3D Engine.
 * Features persistent bidirectional scroll-triggered 3D slide choreography (odd from left, even from right).
 * Granular 3D perspective tilt on small sub-cards and items (excluding large container blocks).
 */
(function () {
    window.addEventListener('DOMContentLoaded', () => {
        // 1. Permanent Smooth Entrance Observer (Never vanishes when scrolling back up)
        const revealBoxes = document.querySelectorAll('.scroll-reveal, .project-card, .timeline-item, .card, section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

        revealBoxes.forEach(el => observer.observe(el));

        if (window.innerWidth < 1024) return;

        // 2. Subtle, Dignified 3D Card Hover Tilt
        const tiltElements = document.querySelectorAll('.project-card, .card, .timeline-item, .plush-card');
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const dx = (x - xc) / xc;
                const dy = (y - yc) / yc;

                const rotateX = (-dy * 3).toFixed(2);
                const rotateY = (dx * 3).toFixed(2);

                el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
                el.style.transition = 'transform 0.1s ease-out';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });

        console.info('Classical Micro-Interactions & Persistent Reveal active.');
    });
})();
