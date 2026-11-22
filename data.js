const portfolioData = {
    knowledgeBase: [
        /* ── 01. EXECUTIVE BIO & IDENTITY ── */
        {
            id: "bio",
            topic: "About Salman / Executive Overview",
            keywords: [
                "who", "salman", "ifrat", "mohammed", "yourself", "about", "bio", "biography",
                "identity", "background", "profile", "overview", "introduction", "who is salman",
                "tell me about yourself", "who are you", "what does salman do", "what is what",
                "summary", "person", "engineer", "student"
            ],
            answer: "Mohammed Salman Ifrat is a Senior Undergraduate in Computer Science & Engineering at North South University (graduating late 2027), an aspiring entrepreneur, and an applied AI developer. He specializes in full-stack engineering and Retrieval-Augmented Generation (RAG) architectures—most notably TaxEaseBD, his flagship tax compliance assistant. He has bootstrapped two circular apparel ventures (PLUSH & IBU), holds verified credentials from Google Cloud, Anthropic Claude Academy, and Meta, and serves as a Sub Executive on the Membership Development Team at IEEE NSU Student Branch.",
            source: "Overview • About Me"
        },

        /* ── 02. ALL PROJECTS OVERVIEW ── */
        {
            id: "projects_overview",
            topic: "Software Engineering Projects",
            keywords: [
                "project", "projects", "software", "portfolio", "built", "coding", "work",
                "applications", "apps", "systems", "code", "github", "what did you build",
                "what projects", "what has salman made", "technical work"
            ],
            answer: "Salman has engineered 4 major software systems across AI, databases, and systems programming:<br>1. <strong>TaxEaseBD (Flagship)</strong>: LegalTech RAG assistant indexing NBR tax codes with FastAPI, LangChain, FAISS & Groq LLaMA 3 (<a href='https://github.com/salmanifrat/TaxeaseBD' target='_blank' style='color:var(--accent);text-decoration:underline;'>GitHub Repo</a>).<br>2. <strong>Departmental Store DBMS</strong>: Full-stack POS management system in MySQL, PHP & Python.<br>3. <strong>Mobile Phone Inventory Engine</strong>: Modular inventory management engine written in pure C with custom file I/O.<br>4. <strong>Mars Vision Novelty Detector (CSE499)</strong>: Computer vision model categorizing surface objects on Mars into familiar, unfamiliar, and uncertain classes.",
            source: "Projects • Software Systems"
        },

        /* ── 03. TAXEASEBD (FLAGSHIP) ── */
        {
            id: "taxeasebd",
            topic: "TaxEaseBD Flagship AI Assistant",
            keywords: [
                "taxeasebd", "tax", "taxes", "nbr", "rag", "bangladesh", "langchain", "groq",
                "faiss", "vector", "embedding", "llama", "legaltech", "compliance", "sro",
                "income tax", "fastapi"
            ],
            answer: "TaxEaseBD is Salman's flagship AI project designed to simplify tax compliance for Bangladesh. Built on FastAPI, LangChain, FAISS vector search, and Groq LLaMA 3, it indexes National Board of Revenue (NBR) legal codes, Finance Acts, and Statutory Regulatory Orders (SROs) to provide verified, citation-backed answers in natural language. The project is open-source on GitHub at <a href='https://github.com/salmanifrat/TaxeaseBD' target='_blank' style='color:var(--accent);text-decoration:underline;'>https://github.com/salmanifrat/TaxeaseBD</a>.",
            source: "Projects • TaxEaseBD"
        },

        /* ── 04. MARS VISION (CSE499 CAPSTONE) ── */
        {
            id: "mars_vision",
            topic: "Mars Vision Capstone Research",
            keywords: [
                "mars", "vision", "cse499", "senior", "design", "novelty", "image", "rover",
                "curiosity", "space", "computer vision", "anomaly", "capstone", "research"
            ],
            answer: "For his Senior Design Capstone (CSE499), Salman is developing a computer vision novelty detection model for planetary exploration. The system analyzes surface imagery from Mars rovers (Curiosity, Perseverance) and categorizes geological objects into familiar, unfamiliar, and uncertain classes to flag scientific anomalies autonomously.",
            source: "Research • Mars Vision"
        },

        /* ── 05. DEPARTMENTAL STORE DBMS ── */
        {
            id: "dbms_store",
            topic: "Departmental Store Management System",
            keywords: [
                "store", "departmental", "cse311", "database", "mysql", "php", "sql",
                "management system", "pos", "retail", "inventory"
            ],
            answer: "Built for his Database Management Systems course (CSE311), this is a complete departmental store management solution. Salman designed relational SQL schemas in MySQL and integrated PHP and Python backends to handle point-of-sale billing, real-time inventory deduction, supplier tracking, and sales analytics.",
            source: "Projects • Departmental Store DBMS"
        },

        /* ── 06. MOBILE PHONE MANAGEMENT IN C ── */
        {
            id: "mobile_c",
            topic: "Mobile Phone Management Engine in C",
            keywords: [
                "mobile", "phone", "c", "cse115", "procedural", "pointers", "file io",
                "inventory engine", "cli", "struct"
            ],
            answer: "Developed for Programming Language I (CSE115), this is a lightweight terminal inventory engine built in pure C. Salman implemented manual pointer memory management, custom binary and text file I/O streams for persistent record storage, dynamic search indexing, and modular CRUD operations without external libraries.",
            source: "Projects • Mobile Phone Engine in C"
        },

        /* ── 07. ALL CERTIFICATIONS OVERVIEW ── */
        {
            id: "certifications_overview",
            topic: "Verified Certifications & Credentials",
            keywords: [
                "certification", "certifications", "certificate", "certificates", "credentials",
                "badges", "google", "anthropic", "claude", "meta", "blueprint", "proof", "vault",
                "courses", "verified", "skills", "exam"
            ],
            answer: "Salman holds 3 verified industry credentials from global technology leaders:<br>1. <strong>Google Cloud</strong>: 'Introduction to Generative AI' (Nov 2026; ID: 29820792).<br>2. <strong>Anthropic Claude Academy</strong>: 'Claude Code in action' Course Badge (Nov 2026; Verify: academy.claude.com).<br>3. <strong>Meta Blueprint</strong>: 'Optimize your campaign with Meta Advantage+' (Nov 2026).<br>All official credentials and event appointment letters can be inspected with high-resolution proofs in the <strong>Document & Proof Vault</strong> at <a href='experience.html#vault' style='color:var(--accent);text-decoration:underline;'>experience.html#vault</a>.",
            source: "Credentials • Document Vault"
        },

        /* ── 08. ALL VENTURES & STARTUPS ── */
        {
            id: "ventures_overview",
            topic: "Commercial Ventures (PLUSH & IBU)",
            keywords: [
                "venture", "ventures", "startup", "startups", "business", "plush", "ibu",
                "entrepreneur", "entrepreneurship", "thrifting", "fashion", "clothing",
                "apparel", "circular", "waste reduction", "hand-painted", "pop-up"
            ],
            answer: "Salman has founded 2 commercial apparel ventures:<br>1. <strong>PLUSH</strong>: A sustainable circular fashion and curated thrifting initiative focused on textile waste reduction, which executed on-campus pop-up retail stalls at North South University.<br>2. <strong>IBU</strong>: An early artisan streetwear brand offering custom hand-painted Punjabi and graphic t-shirts (<a href='https://www.facebook.com/profile.php?id=100064260244610' target='_blank' style='color:var(--accent);text-decoration:underline;'>IBU Facebook</a>).<br>These bootstrapped ventures gave Salman direct frontline experience in supplier procurement, inventory turnover, pop-up stall logistics, and customer psychology.",
            source: "Ventures • PLUSH & IBU"
        },

        /* ── 09. EDUCATION & ACADEMICS ── */
        {
            id: "education_overview",
            topic: "Education & Academic Progress",
            keywords: [
                "education", "study", "studying", "university", "nsu", "north south", "degree",
                "credits", "gpa", "cgpa", "school", "college", "hsc", "ssc", "graduation",
                "when will he graduate", "where does salman study", "academic", "batch"
            ],
            answer: "Salman is pursuing his Bachelor of Science in Computer Science & Engineering at <strong>North South University (NSU)</strong>, Dhaka, with expected graduation in late 2027. He has completed over <strong>100+ academic credits</strong>. Prior to university, he achieved a <strong>perfect GPA 5.00</strong> in both his Higher Secondary Certificate (HSC) from Government Mohammadpur Model School & College and Secondary School Certificate (SSC) from A.C. Laha Pilot High School.",
            source: "Education • North South University"
        },

        /* ── 10. CONTACT & COLLABORATION ── */
        {
            id: "contact_info",
            topic: "Contact Information & Socials",
            keywords: [
                "contact", "email", "reach", "hire", "phone", "message", "touch", "collaborate",
                "social", "socials", "linkedin", "github", "facebook", "instagram", "how to contact",
                "send email", "inbox"
            ],
            answer: "You can reach Salman directly through:<br>• <strong>Email</strong>: <a href='mailto:ifrat.official25@gmail.com' style='color:var(--accent);'>ifrat.official25@gmail.com</a><br>• <strong>LinkedIn</strong>: <a href='https://www.linkedin.com/in/salman-ifrat-457157272/' target='_blank' style='color:var(--accent);'>linkedin.com/in/salman-ifrat-457157272</a><br>• <strong>GitHub</strong>: <a href='https://github.com/salmanifrat' target='_blank' style='color:var(--accent);'>github.com/salmanifrat</a><br>• <strong>Facebook</strong>: <a href='https://www.facebook.com/ifu.9596/' target='_blank' style='color:var(--accent);'>facebook.com/ifu.9596</a><br>• <strong>Instagram</strong>: <a href='https://www.instagram.com/mohammadsalmanifrat/' target='_blank' style='color:var(--accent);'>@mohammadsalmanifrat</a>",
            source: "Connect • Get In Touch"
        },

        /* ── 11. RESUME & CV ── */
        {
            id: "resume_info",
            topic: "Resume & Curriculum Vitae",
            keywords: [
                "resume", "cv", "download resume", "download cv", "pdf", "can i see your resume",
                "curriculum vitae", "job", "hiring", "applicant", "work history"
            ],
            answer: "You can view Salman's complete, verified Resume right here on this portfolio! Simply click the <strong>'Resume'</strong> button in the hero section at the top of the home page to launch the interactive preview modal and download a clean, ATS-compliant PDF copy instantly.",
            source: "Navigation • Resume Preview"
        },

        /* ── 12. TECHNICAL & SOFT SKILLS ── */
        {
            id: "skills_overview",
            topic: "Technical Stack & Core Skills",
            keywords: [
                "skill", "skills", "tech", "stack", "languages", "tools", "what does salman know",
                "programming", "technologies", "frameworks", "python", "javascript", "c", "php",
                "fastapi", "mysql", "react", "html", "css"
            ],
            answer: "Salman's skillset combines deep backend engineering and human-centered execution:<br>• <strong>Languages & Frameworks</strong>: Python, FastAPI, JavaScript, PHP, C, HTML5, Modern CSS.<br>• <strong>AI & Systems</strong>: Domain RAG, LangChain, FAISS Vector Indexing, Groq LLaMA, Computer Vision Novelty Detection.<br>• <strong>Databases & Tools</strong>: MySQL, Git/GitHub, Postman, Terminal, Claude Code CLI.<br>• <strong>Creative & Media</strong>: Canva Graphic Design, Video Editing, Microsoft Office Suite.<br>• <strong>Communication</strong>: Public Speaking & Event Hosting (EMCEE for 2–3 major events).",
            source: "Skills • Comprehensive Matrix"
        },

        /* ── 13. PUBLIC SPEAKING & EMCEE ── */
        {
            id: "emcee_speaking",
            topic: "Public Speaking & EMCEE Hosting",
            keywords: [
                "emcee", "mc", "speaking", "host", "hosting", "presentation", "events", "stage",
                "public speaking", "master of ceremonies", "is salman an emcee", "moderation", "speech"
            ],
            answer: "Salman is an experienced <strong>EMCEE</strong> and stage host having moderated and presented across 2–3 institutional and campus events. He brings articulate live delivery, audience engagement, confident stage presence, and smooth live speaker introductions under high-stakes event schedules.",
            source: "Skills • Public Speaking & Hosting"
        },

        /* ── 14. IEEE LEADERSHIP ── */
        {
            id: "ieee_leadership",
            topic: "IEEE NSU SB Leadership",
            keywords: [
                "ieee", "sub", "executive", "leadership", "student branch", "ieee nsu sb",
                "membership", "development", "what does he do at ieee", "volunteering", "clubs"
            ],
            answer: "Salman serves as a <strong>Sub Executive on the Membership Development Team at IEEE NSU Student Branch</strong>. His responsibilities include designing recruitment pipelines, mentoring junior committee members, speaking to incoming students during orientations, and managing event logistics for international technical conferences.",
            source: "Experience • IEEE Leadership"
        },

        /* ── 15. CONFERENCES ── */
        {
            id: "conferences",
            topic: "Academic Conferences Volunteered",
            keywords: [
                "conference", "conferences", "volunteer", "volunteering", "summits", "icjr", "spac",
                "china", "senate bhaban", "du", "dhaka university", "delegates"
            ],
            answer: "Salman has volunteered across 3 major academic conferences:<br>1. <strong>ICJR-1</strong>: 1st International Conference on the July Revolution at Senate Bhaban, University of Dhaka.<br>2. <strong>SPAC 25</strong>: Student Professional Awareness Conference organized by IEEE NSU SB.<br>3. <strong>China - South Asia Civilization Dialogue Summit</strong> hosted at North South University.",
            source: "Experience • Conference Volunteering"
        },

        /* ── 16. PRIVATE TUTORING ── */
        {
            id: "tutoring",
            topic: "Academic Tutoring & Mentorship",
            keywords: [
                "tutor", "tutoring", "teaching", "teach", "math", "physics", "chemistry", "ict",
                "programming", "cambridge", "edexcel", "english medium", "bangla medium"
            ],
            answer: "Salman has extensive experience as a private academic mentor, teaching students across English Medium (Edexcel/Cambridge), English Version, and National Curriculum Bangla Medium in Mathematics, Physics, Chemistry, ICT, and fundamental computer programming.",
            source: "Experience • Academic Tutoring"
        },

        /* ── 17. IFNARRATES ── */
        {
            id: "ifnarrates",
            topic: "ifnarrates Creative Storytelling",
            keywords: [
                "if", "ifnarrates", "if.narrates", "brand", "instagram", "facebook", "youtube",
                "psychology", "philosophy", "banglish", "content", "storytelling", "writing", "essays"
            ],
            answer: "<strong>ifnarrates</strong> is Salman's personal creative storytelling initiative published on Instagram (<a href='https://www.instagram.com/if.narrates' target='_blank' style='color:var(--accent);'>@if.narrates</a>) and Facebook. He writes reflective digital essays combining psychology, human behavioral incentives, existential philosophy, and contemporary cultural commentary.",
            source: "Creative • ifnarrates"
        },

        /* ── 18. CONVERSATIONAL & GREETING FALLBACK ── */
        {
            id: "conversational_greeting",
            topic: "Assistant Guide & Capabilities",
            keywords: [
                "hi", "hello", "hey", "help", "who are you", "what can you do", "what is this",
                "what is what", "what", "good morning", "good evening", "how are you", "test"
            ],
            answer: "Hello! I am Salman's in-browser AI knowledge assistant. You can ask me naturally about anything in his portfolio, such as:<br>• <em>'Who is Salman?'</em><br>• <em>'What projects has he built?'</em><br>• <em>'Tell me about TaxEaseBD'</em><br>• <em>'What certifications does he hold?'</em><br>• <em>'What is his startup PLUSH?'</em><br>• <em>'Where does he study?'</em><br>• <em>'Is Salman an EMCEE?'</em><br>• <em>'How can I get in touch with him?'</em>",
            source: "Interactive AI • Capabilities"
        }
    ]
};
