// Knowledge base for Ask This Page (Interactive AI)
let knowledgeBase = [];

async function loadPortfolioData() {
    if (typeof portfolioData !== 'undefined' && portfolioData.knowledgeBase) {
        knowledgeBase = portfolioData.knowledgeBase;
    }
}

// Welcome Overlay stub for backward compatibility
function dismissWelcome() {
    const overlay = document.getElementById('welcome-overlay');
    if (overlay) overlay.style.display = 'none';
}

// Floating 3D Navbar Interactions (CodeXR inspired)
const floatingNav = document.querySelector('nav');
if (floatingNav) {
    // 3D Tilt perspective on mousemove
    floatingNav.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 860) return;
        const rect = floatingNav.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = -(y / (rect.height / 2)) * 6.5;
        const rotY = (x / (rect.width / 2)) * 8.5;
        floatingNav.style.transform = `translateX(-50%) perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-2px)`;
    });

    floatingNav.addEventListener('mouseleave', () => {
        floatingNav.style.transform = 'translateX(-50%) perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
}

// Gliding Pill Indicator inside Nav Links Track
function initGlidingNavPill() {
    const navLinksTrack = document.getElementById('navLinks');
    if (!navLinksTrack) return;

    let pill = navLinksTrack.querySelector('.nav-gliding-pill');
    if (!pill) {
        pill = document.createElement('div');
        pill.className = 'nav-gliding-pill';
        navLinksTrack.prepend(pill);
    }

    const items = navLinksTrack.querySelectorAll('a.nav-item');
    const activeItem = navLinksTrack.querySelector('a.nav-item.active');

    function moveTo(item, immediate = false) {
        if (!item || window.innerWidth <= 860) {
            pill.style.opacity = '0';
            return;
        }
        const itemRect = item.getBoundingClientRect();
        const trackRect = navLinksTrack.getBoundingClientRect();
        const left = itemRect.left - trackRect.left;
        const width = itemRect.width;

        if (immediate) {
            pill.style.transition = 'none';
        }
        pill.style.left = `${left}px`;
        pill.style.width = `${width}px`;
        pill.style.opacity = '1';

        if (immediate) {
            pill.offsetHeight; // force reflow
            pill.style.transition = '';
        }
    }

    // Set initial position after fonts and layout calculate
    setTimeout(() => {
        if (activeItem) moveTo(activeItem, true);
    }, 60);

    items.forEach(item => {
        item.addEventListener('mouseenter', () => moveTo(item));
    });

    navLinksTrack.addEventListener('mouseleave', () => {
        if (activeItem) {
            moveTo(activeItem);
        } else {
            pill.style.opacity = '0';
        }
    });

    window.addEventListener('resize', () => {
        const current = navLinksTrack.querySelector('a.nav-item:hover') || activeItem;
        if (current) moveTo(current);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlidingNavPill);
} else {
    initGlidingNavPill();
}

// Scroll Progress & Navbar Compression
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + '%';

    // Compress floating nav on scroll
    if (floatingNav) {
        if (winScroll > 40) {
            floatingNav.classList.add('scrolled');
        } else {
            floatingNav.classList.remove('scrolled');
        }
    }

    // Navbar profile picture pops in after scrolling past hero
    const navProfilePic = document.getElementById('navProfilePic');
    if (navProfilePic) {
        if (winScroll > 500) {
            navProfilePic.classList.add('visible');
        } else {
            navProfilePic.classList.remove('visible');
        }
    }
});


// Scroll Reveal Observer for other sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Helper to escape HTML characters in dynamic fallback text
function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag] || tag));
}

// Interactive AI Engine (Semantic Intent Matching + Multi-Level NLP Scorer)
function askPreset(query) {
    const input = document.getElementById('ragQueryInput');
    if (input) {
        input.value = query;
        runRagQuery();
    }
}

function runRagQuery() {
    const inputEl = document.getElementById('ragQueryInput');
    if (!inputEl) return;
    const rawInput = inputEl.value.trim();
    if (!rawInput) return;

    const resultBox = document.getElementById('ragResultContainer');
    const answerText = document.getElementById('ragAnswerText');
    const sourcesBox = document.getElementById('ragSourcesBox');

    // Ensure knowledge base is loaded
    if ((!knowledgeBase || knowledgeBase.length === 0) && typeof portfolioData !== 'undefined') {
        knowledgeBase = portfolioData.knowledgeBase;
    }
    if (!knowledgeBase || knowledgeBase.length === 0) return;

    const cleanInput = rawInput.toLowerCase();
    const words = cleanInput.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 0);

    const stopWords = new Set([
        'a', 'an', 'the', 'is', 'are', 'was', 'were', 'am', 'be', 'been', 'being',
        'what', 'who', 'which', 'where', 'when', 'why', 'how', 'can', 'could', 'would',
        'will', 'do', 'does', 'did', 'have', 'has', 'had', 'tell', 'me', 'about', 'you',
        'he', 'she', 'it', 'they', 'i', 'my', 'his', 'her', 'their', 'your', 'in', 'on',
        'at', 'to', 'for', 'of', 'with', 'from', 'by', 'many', 'much', 'some', 'any'
    ]);

    const contentWords = words.filter(w => !stopWords.has(w));

    // High-confidence Intent Classifiers
    const isBioQuery = (cleanInput.includes('who') && (cleanInput.includes('salman') || cleanInput.includes('you') || cleanInput.includes('he') || cleanInput.includes('him') || cleanInput.includes('ifrat')))
        || cleanInput.includes('about salman') || cleanInput.includes('about yourself') || cleanInput.includes('tell me about')
        || cleanInput === 'who is salman' || cleanInput === 'who is salman?';

    const isContactQuery = cleanInput.includes('contact') || cleanInput.includes('email') || cleanInput.includes('hire')
        || cleanInput.includes('reach out') || cleanInput.includes('inbox') || cleanInput.includes('how to reach') || cleanInput.includes('how to contact');

    const isResumeQuery = cleanInput.includes('resume') || cleanInput.includes('cv') || cleanInput.includes('curriculum vitae');

    const isGreetingQuery = /^(hi|hello|hey|greetings|hola|help|what is what|what is this|what can you do|what not)[\s!?.]*$/.test(cleanInput)
        || cleanInput === 'what is what' || cleanInput === 'what is what?' || cleanInput.includes('what not');

    const isGeneralProjectsQuery = (cleanInput.includes('project') || cleanInput.includes('projects') || cleanInput.includes('built') || cleanInput.includes('apps') || cleanInput.includes('systems'))
        && !cleanInput.includes('taxeasebd') && !cleanInput.includes('mars') && !cleanInput.includes('store') && !cleanInput.includes('c ');

    const isGeneralCertQuery = (cleanInput.includes('cert') || cleanInput.includes('credential') || cleanInput.includes('badge'))
        && !cleanInput.includes('google') && !cleanInput.includes('claude') && !cleanInput.includes('meta');

    const isGeneralVenturesQuery = cleanInput.includes('venture') || cleanInput.includes('ventures') || cleanInput.includes('startup') || cleanInput.includes('startups') || cleanInput.includes('business');

    const isEducationQuery = cleanInput.includes('study') || cleanInput.includes('studying') || cleanInput.includes('education') || cleanInput.includes('university') || cleanInput.includes('degree') || cleanInput.includes('credits') || cleanInput.includes('gpa') || cleanInput.includes('cgpa');

    const isEmceeQuery = cleanInput.includes('emcee') || cleanInput.includes('speaking') || cleanInput.includes('host') || cleanInput.includes('presentation') || cleanInput.includes('stage') || cleanInput.includes(' mc') || cleanInput.startsWith('mc');

    let scoredItems = knowledgeBase.map(item => {
        let score = 0;

        // Intent boosters
        if (isBioQuery && item.id === 'bio') score += 200;
        if (isContactQuery && item.id === 'contact_info') score += 180;
        if (isResumeQuery && item.id === 'resume_info') score += 180;
        if (isGreetingQuery && item.id === 'conversational_greeting') score += 200;
        if (isGeneralProjectsQuery && item.id === 'projects_overview') score += 120;
        if (isGeneralCertQuery && item.id === 'certifications_overview') score += 120;
        if (isGeneralVenturesQuery && item.id === 'ventures_overview') score += 120;
        if (isEducationQuery && item.id === 'education_overview') score += 120;
        if (isEmceeQuery && item.id === 'emcee_speaking') score += 140;

        // Keyword phrase matching
        item.keywords.forEach(kw => {
            if (cleanInput.includes(kw)) {
                if (words.includes(kw)) {
                    score += 15;
                } else {
                    score += 8;
                }
            }
        });

        // Content word matching (topic & answer text)
        contentWords.forEach(w => {
            if (item.topic && item.topic.toLowerCase().includes(w)) {
                score += 12;
            }
            if (item.answer && item.answer.toLowerCase().includes(w)) {
                score += 4;
            }
        });

        return { item, score };
    });

    scoredItems.sort((a, b) => b.score - a.score);

    const best = scoredItems[0];

    resultBox.style.display = 'block';

    if (best && best.score > 6) {
        answerText.innerHTML = `<p>${best.item.answer}</p>`;
        sourcesBox.innerHTML = `
            <span class="source-tag">Retrieved from: ${best.item.source}</span>
            <span class="confidence-tag" style="margin-left:8px;font-size:0.72rem;color:var(--accent);font-family:'JetBrains Mono',monospace;">● Verified Knowledge</span>
        `;
    } else {
        answerText.innerHTML = `
            <p>I couldn't find a direct match for <em>"${escapeHtml(rawInput)}"</em> in my current memory index.</p>
            <p style="margin-top:10px;font-size:0.86rem;color:var(--text-muted);">You can try asking me one of these popular questions:</p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;">
                <button class="chip" onclick="askPreset('Who is Salman?')">Who is Salman?</button>
                <button class="chip" onclick="askPreset('What projects has Salman built?')">Projects Built?</button>
                <button class="chip" onclick="askPreset('What certifications does Salman hold?')">Certifications?</button>
                <button class="chip" onclick="askPreset('What is TaxEaseBD?')">TaxEaseBD?</button>
                <button class="chip" onclick="askPreset('What is PLUSH?')">What is PLUSH?</button>
                <button class="chip" onclick="askPreset('How can I contact Salman?')">Contact Info?</button>
            </div>
        `;
        sourcesBox.innerHTML = `<span class="source-tag">Interactive AI • Suggested Questions</span>`;
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const links = document.getElementById('navLinks');
    links.classList.toggle('active');
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    if (currentTheme === 'light') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Initialization on DOM load
window.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();

    const overlay = document.getElementById('welcome-overlay');
    if (overlay) overlay.style.display = 'none';

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    initMetricCounters();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }

    const ragInput = document.getElementById('ragQueryInput');
    if (ragInput) {
        ragInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') runRagQuery();
        });
    }

    // Marquee speed reaction to scroll velocity
    let lastScrollY = window.scrollY;
    const marqueeTrack = document.querySelector('.marquee-track');
    window.addEventListener('scroll', () => {
        const scrollDelta = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;
        if (marqueeTrack) {
            const currentAnimDuration = Math.max(10, 25 - scrollDelta * 0.5);
            marqueeTrack.style.animationDuration = currentAnimDuration + 's';
            clearTimeout(window.marqueeTimeout);
            window.marqueeTimeout = setTimeout(() => {
                marqueeTrack.style.animationDuration = '25s';
            }, 300);
        }
    });

    const tiltCards = document.querySelectorAll(
        '.nsu-banner-card, .flagship-project-card, .skill-matrix-card, .vault-card, .plush-card, .ieee-role-card, .skills-heads-up-card, .coming-next-card'
    );
    tiltCards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;
            const maxTilt = 7;
            const rotateX = (-dy / yc) * maxTilt;
            const rotateY = (dx / xc) * maxTilt;

            card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`;
        });

        card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)`;

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out, border-color 0.3s ease, box-shadow 0.3s ease';
        });
    });
});

// Interactive 1-click email copy
function copyEmailToClipboard() {
    const email = 'ifrat.official25@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const textSpan = document.getElementById('copyEmailText');
        if (textSpan) {
            const original = textSpan.innerText;
            textSpan.innerText = 'Copied to Clipboard! ✓';
            setTimeout(() => {
                textSpan.innerText = original;
            }, 2500);
        }
    }).catch(err => {
        window.location.href = 'mailto:ifrat.official25@gmail.com';
    });
}

// Power-User shortcut: '/' or 'Cmd+K' to focus in-browser AI search
document.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || (document.activeElement && document.activeElement.isContentEditable)) {
        return;
    }

    if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        const searchInput = document.getElementById('ragQueryInput');
        const askSection = document.getElementById('ask-page');
        if (searchInput && askSection) {
            askSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                searchInput.focus();
                searchInput.select();
            }, 350);
        }
    }
});

// Magnetic Buttons physics for .btn and .social-icon-btn
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .social-icon-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate3d(${x * 0.18}px, ${y * 0.22}px, 0)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate3d(0, 0, 0)';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease';
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.transition = 'transform 0.08s ease-out';
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagneticButtons);
} else {
    initMagneticButtons();
}

// Global Lightbox Handler
function openLightbox(imgSrc) {
    let modal = document.getElementById('lightboxModal');
    let modalImg = document.getElementById('lightboxImg');
    
    // Auto-create modal element if not present in the DOM
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lightboxModal';
        modal.innerHTML = `
            <span id="lightboxClose" onclick="closeLightbox()">&times;</span>
            <img id="lightboxImg" src="" alt="Certificate Preview">
        `;
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.id === 'lightboxClose') {
                closeLightbox();
            }
        });
        document.body.appendChild(modal);
        modalImg = document.getElementById('lightboxImg');
    }
    
    modalImg.src = imgSrc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ─── ANIMATED METRIC COUNTER (INCREASING & LOCKING EFFECT) ────
function initMetricCounters() {
    const box = document.querySelector('.about-highlights') || document.querySelector('.metrics-dialog-box');
    if (!box) return;

    let animated = false;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                obs.unobserve(entry.target);
                runCounters(box);
            }
        });
    }, { threshold: 0.15 });

    observer.observe(box);

    function runCounters(container) {
        const counters = container.querySelectorAll('.metric-counter');
        counters.forEach((counter, idx) => {
            const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = target > 50 ? 1500 : 1100;
            const delay = idx * 90;

            setTimeout(() => {
                const startTime = performance.now();

                function step(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Cubic ease-out: fast roll then smooth deceleration into locked number
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(ease * target);

                    counter.textContent = current + (progress === 1 ? suffix : '');

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        counter.textContent = target + suffix;
                        counter.classList.add('locked');
                    }
                }

                requestAnimationFrame(step);
            }, delay);
        });
    }
}
