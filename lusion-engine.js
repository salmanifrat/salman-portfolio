/**
 * lusion-engine.js: Advanced Lusion-inspired 3D Engine.
 * Features persistent bidirectional scroll-triggered 3D slide choreography (odd from left, even from right).
 * Granular 3D perspective tilt on small sub-cards and items (excluding large container blocks).
 */
(function () {
    window.addEventListener('DOMContentLoaded', () => {
        // 1. Persistent Bidirectional Scroll-Triggered Choreography
        const revealBoxes = document.querySelectorAll('.project-card, .timeline-item, .course-card, .plush-card, .ieee-role-card, .card, section');

        revealBoxes.forEach((el, index) => {
            if (!el.classList.contains('scroll-reveal')) {
                el.classList.add('scroll-reveal');
            }
            el.dataset.direction = index % 2 === 0 ? -50 : 50;
            el.style.opacity = '0';
            el.style.transform = `perspective(1000px) translate3d(${el.dataset.direction}px, 40px, 0px) rotateX(6deg)`;
            el.style.transition = 'transform 1.0s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'perspective(1000px) translate3d(0px, 0px, 0px) rotateX(0deg)';
                } else {
                    const dir = entry.target.dataset.direction || 50;
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = `perspective(1000px) translate3d(${dir}px, 40px, 0px) rotateX(6deg)`;
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

        revealBoxes.forEach(el => observer.observe(el));

        if (window.innerWidth < 1024) return;

        // 2. Granular 3D Perspective Tilt Physics strictly on small cards/sub-portions (excluding large parent blocks)
        const tiltElements = document.querySelectorAll('.course-card, .project-card, .plush-card, .ieee-role-card, .chip, .badge, .card');
        tiltElements.forEach(el => {
            el.style.transformStyle = 'preserve-3d';

            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const xc = rect.width / 2;
                const yc = rect.height / 2;
                const dx = (x - xc) / xc;
                const dy = (y - yc) / yc;

                const rotateX = (-dy * 6).toFixed(2);
                const rotateY = (dx * 6).toFixed(2);

                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px) scale3d(1.01, 1.01, 1.01)`;
                el.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
                el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease';
            });
        });

        // 3. Magnetic UI Elements
        const magneticElements = document.querySelectorAll('a, button, .social-icon-btn, .chip');
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const hx = rect.left + rect.width / 2;
                const hy = rect.top + rect.height / 2;
                const dx = (e.clientX - hx) * 0.3;
                const dy = (e.clientY - hy) * 0.3;
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px)';
                el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            el.addEventListener('mouseenter', () => {
                el.style.transition = 'none';
            });
        });

        console.info('Lusion 3D Granular Tilt & Bidirectional Engine active.');
    });
})();
