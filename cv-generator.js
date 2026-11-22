/**
 * CV Generator — Mohammed Salman Ifrat
 * ──────────────────────────────────────
 * Generates a professional A4 PDF résumé on the fly from structured portfolio data.
 * Uses html2pdf.js (loaded from CDN) for client-side PDF rendering.
 *
 * HOW TO UPDATE:
 *   When portfolio content changes (new cert, new project, etc.),
 *   update the `cvData` object below. The PDF auto-reflects the changes.
 */

/* ═══════════════════════════════════════════════════════════════
   §1  PORTFOLIO DATA — Single source of truth for the CV
   ═══════════════════════════════════════════════════════════════ */

const cvData = {

  /* ── Personal ─────────────────────────────────────────────── */
  name: "Mohammed Salman Ifrat",
  title: "Computer Science Student · Full-Stack Developer · Aspiring Entrepreneur",
  email: "ifrat.official25@gmail.com",
  phone: "",                       // add when ready
  location: "Dhaka, Bangladesh",
  github: "github.com/salmanifrat",
  linkedin: "linkedin.com/in/salman-ifrat-457157272",
  instagram: "instagram.com/mohammadsalmanifrat",
  website: "",                     // add deployed URL later

  summary:
    "4th-year Computer Science & Engineering undergraduate at North South University graduating in late 2027. " +
    "Specializing in applied AI — specifically Retrieval-Augmented Generation (RAG) and computer vision — " +
    "combined with backend microservice engineering (FastAPI, Python). Founder-level experience in circular " +
    "fashion and artisan apparel ventures. Demonstrated institutional leadership in IEEE and logistics for " +
    "three major academic and research conferences.",

  /* ── Education ────────────────────────────────────────────── */
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "North South University",
      location: "Dhaka, Bangladesh",
      timeline: "2022 — 2027 (Expected)",
      details: [
        "Senior Capstone (CSE499): Mars Image Novelty Detection — open-set computer vision for autonomous Martian surface anomaly classification.",
        "Key Courses: Data Structures & Algorithms, Database Management Systems, Software Engineering, Design & Analysis of Algorithms, Computer Organization & Architecture, Concepts of Programming Languages, Probability & Statistics, Linear Algebra."
      ]
    },
    {
      degree: "Higher Secondary Certificate (HSC) — Science",
      institution: "Govt. M.M. City College",
      location: "Khulna, Bangladesh",
      timeline: "",
      details: ["GPA 5.00 / 5.00 — Physics, Chemistry, Higher Mathematics, Biology, ICT, English, Bangla."]
    },
    {
      degree: "Secondary School Certificate (SSC) — Science",
      institution: "A C Laha Pilot High School",
      location: "Bagerhat, Bangladesh",
      timeline: "",
      details: ["GPA 5.00 / 5.00 — Physics, Chemistry, Higher Mathematics, Biology, ICT, English, Bangla."]
    }
  ],

  /* ── Skills ───────────────────────────────────────────────── */
  skills: [
    {
      category: "AI & Machine Learning",
      items: "RAG Architecture, LangChain, FAISS, Groq / LLaMA 3, PyTorch, OpenCV, Scikit-Learn, HuggingFace Embeddings, Prompt Engineering, Anomaly Detection"
    },
    {
      category: "Backend & Databases",
      items: "Python 3 (FastAPI, Asyncio, Pydantic), MySQL (3NF/BCNF, Stored Procedures, Triggers, RBAC), SQLite, PHP, REST APIs"
    },
    {
      category: "Frontend & Design",
      items: "JavaScript (ES6+), React, HTML5, CSS3 (Custom Properties, Animations, Glassmorphism), Figma"
    },
    {
      category: "Productivity & Media",
      items: "Microsoft Office Suite (Word, Excel, PowerPoint), Canva Graphic Design, Video Editing & Scene Assembly, Presentation Design"
    },
    {
      category: "Languages (Programming)",
      items: "Python, C, C++, Java, JavaScript, PHP, SQL"
    },
    {
      category: "Tools & Platforms",
      items: "Git & GitHub, Postman, macOS / Linux Terminal, Claude Code CLI, Google Cloud"
    },
    {
      category: "Public Speaking & Languages",
      items: "Public Speaking & Event Hosting (EMCEE for 2–3 events), Bengali (Native), English (Fluent), Hindi (Conversational), Arabic (Elementary Reading)"
    }
  ],

  /* ── Projects ─────────────────────────────────────────────── */
  projects: [
    {
      name: "TaxEaseBD — RAG LegalTech Assistant",
      status: "Completed",
      stack: "Python, FastAPI, LangChain, FAISS, Groq Cloud, LLaMA 3, React",
      description:
        "Asynchronous RAG assistant indexing 150+ pages of Bangladesh NBR tax statutes. Features semantic sliding-window chunking, anti-hallucination citation constraints, bilingual (Bengali & English) support, and < 850ms Groq LPU inference. Open-source: github.com/salmanifrat/TaxeaseBD"
    },
    {
      name: "Departmental Store Management System",
      status: "Completed",
      stack: "MySQL, PHP, Python, SQL Stored Procedures & Triggers",
      description:
        "Full-stack retail inventory platform with normalized relational schema (3NF/BCNF), POS checkout triggers, real-time stock deduction, role-based access control (RBAC), and revenue analytics."
    },
    {
      name: "Mobile Phone Management System",
      status: "Completed",
      stack: "Pure C, Binary File I/O, Data Structures, Memory Management",
      description:
        "Procedural inventory engine in pure C with IMEI registration, warranty tracking, binary file persistence, pointer arithmetic, and sub-millisecond search algorithms."
    },
    {
      name: "Mars Image Novelty Detection",
      status: "Ongoing — Senior Capstone (CSE499)",
      stack: "Python, PyTorch, OpenCV, NASA HiRISE Datasets",
      description:
        "Open-set computer vision research classifying Martian imagery into familiar terrain, unfamiliar anomalies, and uncertain observations to optimize rover downlink transmission."
    }
  ],

  /* ── Ventures ─────────────────────────────────────────────── */
  ventures: [
    {
      name: "PLUSH",
      role: "Founder & Operator",
      description:
        "Circular fashion venture focused on waste reduction and sustainable fashion. Curated and authenticated branded pre-loved apparel for university students. Executed on-campus pop-up stalls at NSU with direct-to-consumer fulfillment."
    },
    {
      name: "IBU",
      role: "Founder",
      description:
        "Hand-painted apparel brand blending Bangladeshi artisan craftsmanship with contemporary casual wear. Managed bespoke commissions, fabric sourcing, and nationwide social commerce logistics."
    },
    {
      name: "ifnarrates",
      role: "Creator & Producer",
      description:
        "Digital storytelling brand producing essays on psychology, philosophy, and cultural commentary through Banglish narratives."
    }
  ],

  /* ── Certifications ───────────────────────────────────────── */
  certifications: [
    {
      name: "Claude Code in Action",
      issuer: "Claude Academy — Anthropic",
      date: "November 2026",
      url: "academy.claude.com/verify/a285820c05ed2449b849083ddd471f0d"
    },
    {
      name: "Introduction to Generative AI",
      issuer: "Google Cloud / Google Skills",
      date: "November 2026",
      url: "skills.google/public_profiles/790ca946-ad5e-4d49-8368-b181e4e0213c/badges/29820792"
    },
    {
      name: "Optimize Your Campaign with Meta Advantage+",
      issuer: "Meta Blueprint — Meta",
      date: "November 2026",
      url: "facebookblueprint.com/student/award/xTucaZ3Gvq4A4joNsHzcp3k1"
    }
  ],

  /* ── Leadership & IEEE ────────────────────────────────────── */
  leadership: [
    {
      role: "Sub Executive — Membership Development Team",
      org: "IEEE NSU Student Branch (INSB)",
      timeline: "2026 — 2027",
      details: "Spearheaded recruitment and onboarding for student engineers. Delivered keynote at INSB Fresher Orientation."
    },
    {
      role: "In-charge — PR & Corporate Team & Social Media",
      org: "IEEE Industry Applications Society (IAS) Chapter, NSU",
      timeline: "Jan 2024 — Feb 2025",
      details: "Directed public relations and corporate outreach. Managed official social media channels for workshops and seminars."
    },
    {
      role: "Member — Event Management Team",
      org: "IEEE Power and Energy Society (PES) Chapter, NSU",
      timeline: "",
      details: "Coordinated venue logistics, workshop setup, and participant operations for technical seminars."
    }
  ],

  /* ── Conferences ──────────────────────────────────────────── */
  conferences: [
    "1st International Conference on the July Revolution (ICJR-1, 2025) — Senate Bhaban, University of Dhaka",
    "Student Professional Awareness Conference 2025 (SPAC 25) — IEEE NSU Student Branch",
    "International Conference on 'China - South Asia Civilization and Connectivity' (2024) — North South University"
  ],

  /* ── Other Experience ─────────────────────────────────────── */
  otherExperience: [
    {
      role: "Private Academic Tutor",
      details: "Mathematics, Physics, Chemistry, ICT, and Basic Programming for Bangla Medium, English Version, and Cambridge/Edexcel curricula students at RAJUK Uttara Model College, Hurdco International School, Playpen School, and others."
    },
    {
      role: "NSU Fresher Advising & Orientation Assistant",
      details: "Guided incoming freshmen through course advising, registration, degree planning, and campus orientation."
    }
  ]
};


/* ═══════════════════════════════════════════════════════════════
   §2  PDF TEMPLATE — Professional A4 layout
   ═══════════════════════════════════════════════════════════════ */

function buildCvHtml(d) {
  const sectionTitle = (text) =>
    `<h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.6px;color:#1a1a2e;border-bottom:1.5px solid #1a1a2e;padding-bottom:4px;margin:16px 0 8px 0;font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;">${text}</h2>`;

  const dot = '<span style="color:#6c63ff;margin:0 5px;">·</span>';

  let html = `
  <div id="cv-render-target" style="
    width:210mm; min-height:297mm; padding:18mm 16mm 14mm 16mm;
    font-family:'Plus Jakarta Sans',Helvetica,Arial,sans-serif;
    color:#1a1a2e; font-size:10.5px; line-height:1.55;
    box-sizing:border-box; background:#fff;
  ">

    <!-- HEADER -->
    <div style="text-align:center;margin-bottom:4px;">
      <h1 style="font-size:24px;font-weight:800;margin:0 0 2px 0;letter-spacing:0.5px;color:#1a1a2e;font-family:'Playfair Display','Plus Jakarta Sans',serif;">${d.name}</h1>
      <p style="font-size:11px;color:#555;margin:2px 0 6px 0;">${d.title}</p>
      <p style="font-size:9.5px;color:#666;margin:0;">
        ${d.email}${dot}${d.location}${dot}${d.github}${dot}${d.linkedin}${d.instagram ? dot + d.instagram : ''}
        ${d.website ? dot + d.website : ''}
      </p>
    </div>

    <!-- SUMMARY -->
    ${sectionTitle('Professional Summary')}
    <p style="margin:0 0 2px 0;text-align:justify;">${d.summary}</p>

    <!-- EDUCATION -->
    ${sectionTitle('Education')}
    ${d.education.map(e => `
      <div style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <strong style="font-size:11px;">${e.degree}</strong>
          <span style="font-size:9.5px;color:#666;white-space:nowrap;">${e.timeline}</span>
        </div>
        <div style="font-size:10px;color:#555;margin-bottom:2px;">${e.institution}, ${e.location}</div>
        ${e.details.map(det => `<div style="font-size:10px;margin-left:12px;color:#333;">• ${det}</div>`).join('')}
      </div>
    `).join('')}

    <!-- SKILLS -->
    ${sectionTitle('Technical Skills')}
    <table style="width:100%;border-collapse:collapse;font-size:10px;">
      ${d.skills.map(s => `
        <tr>
          <td style="padding:2px 8px 2px 0;font-weight:600;white-space:nowrap;vertical-align:top;width:160px;color:#1a1a2e;">${s.category}</td>
          <td style="padding:2px 0;color:#333;">${s.items}</td>
        </tr>
      `).join('')}
    </table>

    <!-- PROJECTS -->
    ${sectionTitle('Projects & Research')}
    ${d.projects.map(p => `
      <div style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <strong style="font-size:11px;">${p.name}</strong>
          <span style="font-size:9px;padding:1px 8px;border-radius:3px;background:${p.status.startsWith('Ongoing') ? '#fff3e0' : '#e8f5e9'};color:${p.status.startsWith('Ongoing') ? '#e65100' : '#2e7d32'};white-space:nowrap;">${p.status}</span>
        </div>
        <div style="font-size:9.5px;color:#6c63ff;margin-bottom:2px;">${p.stack}</div>
        <div style="font-size:10px;color:#333;text-align:justify;">${p.description}</div>
      </div>
    `).join('')}

    <!-- VENTURES -->
    ${sectionTitle('Entrepreneurship & Ventures')}
    ${d.ventures.map(v => `
      <div style="margin-bottom:8px;">
        <strong style="font-size:11px;">${v.name}</strong>
        <span style="font-size:10px;color:#555;"> — ${v.role}</span>
        <div style="font-size:10px;color:#333;text-align:justify;">${v.description}</div>
      </div>
    `).join('')}

    <!-- CERTIFICATIONS -->
    ${sectionTitle('Certifications')}
    ${d.certifications.map(c => `
      <div style="margin-bottom:4px;">
        <strong style="font-size:10.5px;">${c.name}</strong>
        <span style="font-size:10px;color:#555;"> — ${c.issuer} (${c.date})</span>
        <div style="font-size:9px;color:#888;">Verify: ${c.url}</div>
      </div>
    `).join('')}

    <!-- LEADERSHIP -->
    ${sectionTitle('Leadership & IEEE')}
    ${d.leadership.map(l => `
      <div style="margin-bottom:6px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <strong style="font-size:10.5px;">${l.role}</strong>
          <span style="font-size:9.5px;color:#666;white-space:nowrap;">${l.timeline}</span>
        </div>
        <div style="font-size:10px;color:#555;">${l.org}</div>
        <div style="font-size:10px;color:#333;margin-left:12px;">• ${l.details}</div>
      </div>
    `).join('')}

    <!-- CONFERENCES -->
    ${sectionTitle('Conference Volunteering')}
    <div style="font-size:10px;color:#333;">
      ${d.conferences.map(c => `<div style="margin-bottom:2px;">• ${c}</div>`).join('')}
    </div>

    <!-- OTHER EXPERIENCE -->
    ${sectionTitle('Additional Experience')}
    ${d.otherExperience.map(o => `
      <div style="margin-bottom:4px;">
        <strong style="font-size:10.5px;">${o.role}</strong>
        <div style="font-size:10px;color:#333;">${o.details}</div>
      </div>
    `).join('')}

  </div>`;

  return html;
}


/* ═══════════════════════════════════════════════════════════════
   §3  CV PREVIEW MODAL — View before downloading
   ═══════════════════════════════════════════════════════════════ */

function openCvPreview() {
  const modal = document.getElementById('cvPreviewModal');
  const body = document.getElementById('cvPreviewBody');
  if (!modal || !body) return;

  // Build & inject the CV HTML into the modal body
  // For preview we use a slightly adapted version (no fixed 210mm width)
  const previewHtml = buildCvHtml(cvData)
    .replace('width:210mm;', 'width:100%; max-width:210mm; margin:0 auto;');
  body.innerHTML = previewHtml;

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCvPreview(event) {
  // If called from overlay click, only close if clicking the overlay itself
  if (event && event.target && !event.target.classList.contains('cv-modal-overlay')) return;

  const modal = document.getElementById('cvPreviewModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('cvPreviewModal');
    if (modal && modal.classList.contains('active')) {
      closeCvPreview();
    }
  }
});


/* ═══════════════════════════════════════════════════════════════
   §4  PDF DOWNLOAD & PRINT
   ═══════════════════════════════════════════════════════════════ */

function downloadCV() {
  const btn = document.querySelector('.cv-modal-download-btn');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite;vertical-align:middle;margin-right:6px;">
        <circle cx="12" cy="12" r="10" stroke-dasharray="31.4 31.4" stroke-dashoffset="10"/>
      </svg>
      Downloading…`;
  }

  // Trigger direct download of the high-res pre-rendered PDF asset
  const pdfUrl = 'assets/Mohammed_Salman_Ifrat_Resume.pdf';
  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Mohammed_Salman_Ifrat_Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    if (btn) {
      btn.innerHTML = originalText;
    }
  }, 1000);
}
