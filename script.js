// Knowledge base for Ask This Page (Mini RAG)
let knowledgeBase = [];

async function loadPortfolioData() {
    try {
        const res = await fetch('/api/data');
        const data = await res.json();

        knowledgeBase = [
            {
                keywords: ["taxeasebd", "tax", "rag", "bangladesh", "nbr", "flagship"],
                answer: "TaxEaseBD is Salman's flagship RAG-powered tax compliance assistant built for Bangladesh. It indexes National Board of Revenue (NBR) tax laws and SROs using FastAPI, LangChain, FAISS, and LLaMA via Groq.",
                source: "Projects • TaxEaseBD"
            },
            {
                keywords: ["mars", "vision", "cse499", "senior", "design", "novelty", "image"],
                answer: "For his senior design project (CSE499), Salman is developing a computer vision model to categorize Mars surface imagery objects into familiar, unfamiliar, and uncertain classes (novelty detection).",
                source: "Research • Mars Vision"
            },
            {
                keywords: ["nsu", "north", "south", "university", "cse", "student", "graduation", "batch"],
                answer: `Salman is a 4th-year Computer Science and Engineering student at North South University (NSU) in Dhaka, expecting to graduate in late 2027.`,
                source: "About • Education"
            },
            {
                keywords: ["ieee", "sub", "executive", "membership", "development", "volunteered", "conference"],
                answer: "Salman is a Sub Executive on the Membership Development Team at the IEEE NSU Student Branch and has volunteered at two major international conferences hosted at NSU.",
                source: "Experience • IEEE & Leadership"
            },
            {
                keywords: ["tutor", "tutoring", "math", "science", "english", "ict", "programming"],
                answer: "Salman works as a private academic tutor across Bangla Medium, English Version, and English Medium, teaching Math, Physics, Chemistry, ICT, and basic programming.",
                source: "Experience • Tutoring"
            },
            {
                keywords: ["if", "brand", "instagram", "youtube", "psychology", "philosophy", "banglish"],
                answer: "\"IF\" is Salman's personal creative content brand on Instagram and YouTube focusing on Banglish psychology, philosophy, and modern social commentary.",
                source: "Content Brand • IF"
            }
        ];
    } catch (err) {
        console.error("Could not load backend portfolio data", err);
    }
}

// Welcome Overlay
function dismissWelcome() {
    const overlay = document.getElementById('welcome-overlay');
    if (overlay) {
        overlay.classList.add('fade-out');
        sessionStorage.setItem('welcomed', 'true');
    }
}

// Interactive Cursor Amber Spotlight & Portrait Tilt
document.addEventListener('mousemove', (e) => {
    const spotlight = document.getElementById('cursor-spotlight');
    if (spotlight) {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';
    }

    // Portrait tilt effect based on cursor position
    const profilePic = document.querySelector('.profile-pic-container.bolt-hero.transformed .profile-pic-container') || document.querySelector('.profile-pic-container');
    if (profilePic && profilePic.classList.contains('visible') || heroIsTransformed()) {
        const rect = profilePic.getBoundingClientRect();
        const xCenter = rect.left + rect.width / 2;
        const yCenter = rect.top + rect.height / 2;
        const xVal = (e.clientX - xCenter) / 25;
        const yVal = (e.clientY - yCenter) / 25;
        profilePic.style.transform = `perspective(500px) rotateY(${xVal}deg) rotateX(${-yVal}deg) scale(1.05)`;
    }
});

function heroIsTransformed() {
    const hero = document.getElementById('boltHero');
    return hero && hero.classList.contains('transformed');
}

// Scroll Progress & In-Banner Transition Choreography
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + '%';

    const heroSection = document.getElementById('boltHero');
    const navProfilePic = document.getElementById('navProfilePic');

    // When scrolling past hero (~350px), blur banner background and transform the single name into profile pic + name + details on the banner
    if (heroSection) {
        if (winScroll > 350) {
            heroSection.classList.add('blurred', 'transformed');
        } else {
            heroSection.classList.remove('blurred', 'transformed');
        }
    }

    // Navbar profile picture pops in ONLY when the profile name section on the banner has scrolled up past the screen (winScroll > 650px)
    if (navProfilePic) {
        if (winScroll > 650) {
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

// Mini RAG Query Engine
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
    const input = inputEl.value.toLowerCase().trim();
    const resultBox = document.getElementById('ragResultContainer');
    const answerText = document.getElementById('ragAnswerText');
    const sourcesBox = document.getElementById('ragSourcesBox');

    if (!input) return;

    let bestMatch = knowledgeBase[0] || { answer: "Information not found.", source: "General" };
    let maxScore = 0;

    knowledgeBase.forEach(item => {
        let score = 0;
        item.keywords.forEach(kw => {
            if (input.includes(kw)) score++;
        });
        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    });

    resultBox.style.display = 'block';
    if (maxScore > 0) {
        answerText.innerHTML = `<p>${bestMatch.answer}</p>`;
        sourcesBox.innerHTML = `<span class="source-tag">Retrieved from: ${bestMatch.source}</span>`;
    } else {
        answerText.innerHTML = `<p>I couldn't find a precise match in my indexed memory for that query. Feel free to reach out directly via email or LinkedIn!</p>`;
        sourcesBox.innerHTML = `<span class="source-tag">Fallback • General Inquiry</span>`;
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
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Initialization on DOM load
window.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();

    if (sessionStorage.getItem('welcomed') === 'true' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const overlay = document.getElementById('welcome-overlay');
        if (overlay) overlay.style.display = 'none';
    } else {
        setTimeout(dismissWelcome, 3000);
    }

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    const ragInput = document.getElementById('ragQueryInput');
    if (ragInput) {
        ragInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') runRagQuery();
        });
    }
});
