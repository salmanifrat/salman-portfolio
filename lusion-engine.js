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

        // Note: 3D perspective tilt is managed centrally in script.js on specific cards (.nsu-banner-card, etc.)
        // Section containers (.timeline-item, #bscnsu, #hsc, #ssc) remain strictly static.

        console.info('Classical Micro-Interactions & Persistent Reveal active.');
    });
})();
