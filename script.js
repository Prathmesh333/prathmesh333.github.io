/* =========================================================
   PRATHAMESH NIKAM - PORTFOLIO
   Anime.js choreography · generative SVG art · Lenis scroll
   ========================================================= */

/* ------------------------------------------------------------------
   PROJECT DATA (single source of truth for the archive)
------------------------------------------------------------------ */
const projects = [
    {
        id: "shortlistd",
        title: "ShortList'd",
        year: "2026",
        type: "AI product",
        categories: ["product", "ml"],
        summary: "Tailors one résumé to one job description, checks ATS signals, compiles LaTeX, and writes a cover letter.",
        problem: "Tailoring a résumé for every role is repetitive.",
        system: "Imports PDF, DOCX, TXT, or Markdown. Gemini uses the user's key; guest data stays on the device.",
        stack: ["Next.js", "TypeScript", "Gemini", "Firebase", "Cloudflare"],
        repo: "https://github.com/Prathmesh333/ShortList-D"
    },
    {
        id: "forecastforge",
        title: "ForecastForge",
        year: "2026",
        type: "Decision intelligence",
        categories: ["ml", "research"],
        summary: "Offline P10/P50/P90 revenue and ROAS forecasts for Google, Meta, and Microsoft Ads.",
        problem: "Point forecasts hide downside risk, especially for new campaigns.",
        system: "Blends empirical Bayes with a capped XGBoost challenger, reconciles totals, and labels weak evidence.",
        stack: ["Python", "XGBoost", "Streamlit", "Empirical Bayes", "Backtesting"],
        repo: "https://github.com/Prathmesh333/ForecastForge"
    },
    {
        id: "hqde",
        title: "HQDE",
        year: "2026",
        type: "Open-source research",
        categories: ["ml", "research"],
        summary: "PyTorch package for ensemble training, optional Ray workers, FedAvg-style sync, and quantized deltas.",
        problem: "Ensemble experiments repeat worker and aggregation code.",
        system: "Supports independent and FedAvg modes, local fallback, weighted predictions, and adaptive quantization.",
        stack: ["Python", "PyTorch", "Ray", "FedAvg", "PyPI"],
        repo: "https://github.com/Prathmesh333/HQDE-PyPI",
        extra: { label: "PyPI package", url: "https://pypi.org/project/hqde/" }
    },
    {
        id: "psychota",
        title: "TA-RS / PsychoTA",
        year: "2026",
        type: "NLP research",
        categories: ["ml", "research"],
        summary: "Multi-task dialogue model for four Transactional Analysis labels.",
        problem: "Transactional Analysis labels depend on speaker and conversation context.",
        system: "Uses a DeBERTa-style encoder, speaker-aware attention, causal turn attention, a BiGRU, and four heads.",
        stack: ["Python", "PyTorch", "DeBERTa", "Multi-task NLP", "GRU"],
        repo: "https://github.com/Prathmesh333/PsychoTA"
    },
    {
        id: "fh-rag",
        title: "FH-RAG",
        year: "2026",
        type: "Retrieval research",
        categories: ["ml", "research"],
        summary: "Hierarchical RAG experiment for long documents.",
        problem: "Flat chunk search discards document structure.",
        system: "Uses tree chunking, fuzzy relevance, and beam search. Variants were evaluated on SQuAD and BookSum.",
        stack: ["Python", "PyTorch", "Transformers", "Sentence Transformers", "Ray"],
        repo: null
    },
    {
        id: "f1-race-predictor",
        title: "F1 Race Position Predictor",
        year: "2025",
        type: "Predictive modeling",
        categories: ["ml"],
        summary: "Predicts F1 finishing positions from Ergast race, qualifying, sprint, and circuit data.",
        problem: "Race outcomes depend on history, track, and grid context.",
        system: "Uses feature engineering, a chronological split, tuned gradient boosting, MAE/R², and a Gradio UI.",
        stack: ["Python", "scikit-learn", "Gradient Boosting", "Pandas", "Gradio"],
        repo: "https://github.com/Prathmesh333/F1-Race-Prediction"
    },
    {
        id: "multimodal-curation",
        title: "Multimodal Data Curation",
        year: "2025",
        type: "Data pipeline",
        categories: ["ml", "research"],
        summary: "Processes audio, video, and images into normalized metadata.",
        problem: "Mixed media arrives in inconsistent formats and languages.",
        system: "Runs Whisper transcription, OCR, translation, metadata normalization, and validation.",
        stack: ["Python", "Whisper", "OpenCV", "Google Vision", "Translation APIs"],
        repo: null
    },
    {
        id: "researchhub",
        title: "ResearchHub",
        year: "2026",
        type: "Full-stack product",
        categories: ["product"],
        summary: "Admin/member project and task tracking for research teams.",
        problem: "Research work is often split across chats, notes, and sheets.",
        system: "React and Express app with JWT, Prisma/PostgreSQL, role checks, memberships, and task status.",
        stack: ["React", "Vite", "Express", "PostgreSQL", "Prisma"],
        repo: "https://github.com/Prathmesh333/ResearchHub"
    },
    {
        id: "vsfeed",
        title: "VSFeed",
        year: "2026",
        type: "Developer tool",
        categories: ["product"],
        summary: "VS Code extension for time-limited browsing during builds and waits.",
        problem: "A short wait can turn into a long browser detour.",
        system: "Uses VS Code's integrated browser, custom shortcuts, launch history, and a timed focus mode.",
        stack: ["TypeScript", "VS Code API", "Webview", "Extension"],
        repo: "https://github.com/Prathmesh333/vsfeed"
    },
    {
        id: "janseva",
        title: "JanSeva AI",
        year: "2026",
        type: "Hackathon architecture",
        categories: ["product", "ml"],
        summary: "AWS architecture for a voice-first welfare-scheme assistant.",
        problem: "Welfare information is hard to navigate across languages and forms.",
        system: "The repository documents a Bedrock RAG design using Transcribe, Polly, Translate, Lambda, OpenSearch, and a React PWA.",
        stack: ["AWS Bedrock", "RAG", "Transcribe", "Polly", "React PWA"],
        repo: "https://github.com/Prathmesh333/AI4Bharat-JansevaAI"
    },
    {
        id: "trace",
        title: "TRACE",
        year: "2026",
        type: "Hackathon winner",
        categories: ["product", "ml"],
        summary: "Hackathon prototype for grading, verification, and student-risk workflows.",
        problem: "Grading and attendance data are usually handled in separate workflows.",
        system: "The design covers 15 components using FastAPI, OCR, scikit-learn, vector search, SHAP, and Streamlit.",
        stack: ["FastAPI", "scikit-learn", "FAISS", "SHAP", "Streamlit"],
        repo: "https://github.com/Prathmesh333/TRACE_Transparent_Results_and_Academic_Compliance_Engine"
    },
    {
        id: "takeone",
        title: "TakeOne",
        year: "2026",
        type: "AI video search",
        categories: ["product", "ml"],
        summary: "Indexes video scenes for natural-language and script-line search.",
        problem: "Editors scrub footage manually to find usable clips.",
        system: "Uses YOLO scene detection, FFmpeg clips, Gemini analysis, sentence embeddings, and ChromaDB search.",
        stack: ["Python", "Gemini", "YOLOv8", "ChromaDB", "FFmpeg"],
        repo: "https://github.com/Prathmesh333/TakeOne"
    },
    {
        id: "caniplay",
        title: "CanIPlay",
        year: "2026",
        type: "Network utility",
        categories: ["product"],
        summary: "Checks whether game servers respond from the current browser and network.",
        problem: "Restricted networks may block specific game services.",
        system: "Uses HTTP fetch and image requests to estimate approximate RTT and jitter across 60+ endpoints.",
        stack: ["JavaScript", "HTTP requests", "Latency", "localStorage"],
        repo: "https://github.com/Prathmesh333/CanIPlay",
        demo: "https://caniplay-web.web.app"
    },
    {
        id: "neural-consensus",
        title: "Neural Consensus Engine",
        year: "2025",
        type: "Agentic AI",
        categories: ["product", "ml"],
        summary: "Runs creative, logical, and ethical Gemini agents, then produces one answer.",
        problem: "One model response hides competing viewpoints.",
        system: "FastAPI and React app with parallel agents, configurable prompts, a process graph, and a Cloud Run demo.",
        stack: ["Python", "FastAPI", "Gemini", "React", "GCP Cloud Run"],
        repo: "https://github.com/Prathmesh333/Neural-Consensus-Engine",
        demo: "https://neural-consensus-engine-429635047942.asia-south1.run.app/"
    },
    {
        id: "sih-vanguard",
        title: "VanGuard Crowd Management",
        year: "2025",
        type: "Smart India Hackathon",
        categories: ["product"],
        summary: "Smart India Hackathon MVP for pilgrimage crowd and queue operations.",
        problem: "Pilgrimage sites need one view of crowd, queue, and incident status.",
        system: "React/Express prototype with mock IoT data, QR queues, Socket.io updates, and simulated forecasts.",
        stack: ["React", "TypeScript", "Express", "MongoDB", "Socket.io"],
        repo: "https://github.com/Prathmesh333/SIH_Team_VanGuard_Prototype"
    }
];

/* ------------------------------------------------------------------
   STATE + MOTION PREFERENCE
------------------------------------------------------------------ */
const state = {
    filter: "all",
    query: "",
    motionOff: false,
    lenis: null,
    cursorRing: null,
    cursorDot: null,
    ringX: 0,
    ringY: 0,
    dotX: 0,
    dotY: 0,
    mouseX: 0,
    mouseY: 0
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const storedMotionPreference = localStorage.getItem("pn-motion");
state.motionOff = storedMotionPreference === "off" || (storedMotionPreference === null && prefersReducedMotion.matches);

const el = (id) => document.getElementById(id);
const animeApi = () => window.anime;

/* ------------------------------------------------------------------
   INIT
------------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", () => {
    applyMotionPreference();
    renderProjects();
    initSmoothScroll();
    initNavigation();
    initScrollState();
    initReveals();
    initProjectFilters();
    initProjectDialog();
    initContact();
    initMagneticElements();
    initCursor();
    initTilt();
    initHeroParallax();
    initCountUp();
    initMarquee();
    initSlashSearch();
    fetchGitHubStats();
    runHero();
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        resetSmoothScroll();
    }
});

/* ------------------------------------------------------------------
   MOTION PREFERENCE
------------------------------------------------------------------ */
function applyMotionPreference() {
    const toggle = el("motionToggle");
    if (toggle) toggle.setAttribute("aria-pressed", String(state.motionOff));
    document.documentElement.classList.toggle("motion-off", state.motionOff);
}

function runHero() {
    const a = animeApi();
    if (state.motionOff || !a?.animate) return;

    const nameTargets = document.querySelectorAll("[data-split]");
    a.animate(nameTargets, {
        y: { from: 105 },
        opacity: [0, 1],
        rotate: { from: -5 },
        duration: 920,
        delay: a.stagger(34, { start: 120 }),
        ease: "outExpo"
    });

    a.animate(".hero-reveal", {
        y: { from: 18 },
        opacity: [0, 1],
        duration: 760,
        delay: a.stagger(90, { start: 520 }),
        ease: "outQuart"
    });

    a.animate("#threadPath", {
        strokeDashoffset: [1, 0],
        duration: 1800,
        delay: 260,
        ease: "inOutQuart"
    });

    a.animate(".hero-route__node", {
        scale: [1, 1.75],
        opacity: [0.95, 0.35],
        duration: 1500,
        loop: true,
        alternate: true,
        ease: "inOutSine"
    });
}

/* ------------------------------------------------------------------
   SMOOTH SCROLL (Lenis)
------------------------------------------------------------------ */
function initSmoothScroll() {
    if (state.motionOff || typeof window.Lenis !== "function") return;
    state.lenis = new window.Lenis({
        autoRaf: true,
        anchors: { offset: -72 },
        smoothWheel: true,
        stopInertiaOnNavigate: true
    });
}

function resetSmoothScroll() {
    state.lenis?.destroy();
    state.lenis = null;
    initSmoothScroll();
}

/* ------------------------------------------------------------------
   NAVIGATION + SCROLL STATE
------------------------------------------------------------------ */
function initNavigation() {
    const menuToggle = el("menuToggle");
    const mobileMenu = el("mobileMenu");
    const motionToggle = el("motionToggle");

    if (menuToggle && mobileMenu) {
        const closeMenu = () => {
            mobileMenu.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            mobileMenu.setAttribute("aria-hidden", "true");
            document.body.classList.remove("menu-open");
        };
        menuToggle.addEventListener("click", () => {
            const open = menuToggle.getAttribute("aria-expanded") === "true";
            if (open) {
                closeMenu();
            } else {
                mobileMenu.classList.add("is-open");
                menuToggle.setAttribute("aria-expanded", "true");
                menuToggle.setAttribute("aria-label", "Close navigation");
                mobileMenu.setAttribute("aria-hidden", "false");
                document.body.classList.add("menu-open");
            }
        });
        mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) closeMenu();
        });
    }

    if (motionToggle) {
        motionToggle.addEventListener("click", () => {
            state.motionOff = !state.motionOff;
            localStorage.setItem("pn-motion", state.motionOff ? "off" : "on");
            applyMotionPreference();
            showToast(state.motionOff ? "Motion reduced" : "Motion on");
            if (state.motionOff) {
                state.lenis?.destroy();
                state.lenis = null;
            } else {
                resetSmoothScroll();
            }
            window.location.reload();
        });
    }

    // nav link active state via IntersectionObserver
    const navLinks = document.querySelectorAll(".desktop-nav a");
    const sections = ["work", "profile", "projects", "contact"]
        .map((id) => el(id))
        .filter(Boolean);
    if (navLinks.length && "IntersectionObserver" in window) {
        const setActive = (id) => {
            navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`));
        };
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActive(entry.target.id);
            });
        }, { rootMargin: "-45% 0px -50% 0px" });
        sections.forEach((s) => obs.observe(s));
    }
}

function initScrollState() {
    const header = el("siteHeader");
    const sentinel = el("headerSentinel");
    if (!header || !sentinel || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
        header.classList.toggle("is-scrolled", !entry.isIntersecting);
    });
    observer.observe(sentinel);
}

/* ------------------------------------------------------------------
   REVEALS (scroll-driven, anime.js)
------------------------------------------------------------------ */
function initReveals() {
    const elements = [...document.querySelectorAll(".reveal")];
    if (state.motionOff || !("IntersectionObserver" in window)) {
        elements.forEach((e) => e.classList.add("is-visible"));
        return;
    }
    const a = animeApi();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target;
            element.classList.add("is-visible");
            if (a?.animate) {
                a.animate(element, {
                    y: { from: 26 },
                    opacity: { from: 0 },
                    duration: 760,
                    ease: "outQuart"
                });
            }
            observer.unobserve(element);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    elements.forEach((e) => observer.observe(e));
}

/* ------------------------------------------------------------------
   PROJECT ARCHIVE
------------------------------------------------------------------ */
function renderProjects() {
    const grid = el("archiveGrid");
    if (!grid) return;
    const list = projects.filter(matchesFilter);
    const count = el("archiveCount");
    if (count) count.textContent = String(list.length);
    if (!list.length) {
        grid.innerHTML = `<p class="archive-empty">No projects match “${escapeHTML(state.query)}”.</p>`;
        return;
    }
    grid.innerHTML = list.map((p) => {
        const stack = p.stack.slice(0, 3).map((s) => `<span>${escapeHTML(s)}</span>`).join("");
        return `<button class="archive-card" type="button" data-id="${p.id}" aria-label="Open ${escapeHTML(p.title)} details">
            <div class="archive-card__top"><span>${escapeHTML(p.year)}</span></div>
            <h3 class="archive-card__title">${escapeHTML(p.title)}</h3>
            <p class="archive-card__type">${escapeHTML(p.type)}</p>
            <p class="archive-card__summary">${escapeHTML(p.summary)}</p>
            <div class="archive-card__stack">${stack}</div>
        </button>`;
    }).join("");

    grid.querySelectorAll(".archive-card").forEach((card) => {
        card.addEventListener("click", () => openProjectDialog(card.dataset.id));
    });

    // staggered entrance
    if (!state.motionOff) {
        const a = animeApi();
        a?.animate?.(".archive-card", {
            y: { from: 18 },
            opacity: { from: 0 },
            duration: 520,
            delay: a.stagger(40),
            ease: "outQuart"
        });
    }
}

function matchesFilter(p) {
    const inCat = state.filter === "all" || p.categories.includes(state.filter);
    const q = state.query.trim().toLowerCase();
    const inQuery = !q || [p.title, p.type, p.summary, ...(p.stack || [])].join(" ").toLowerCase().includes(q);
    return inCat && inQuery;
}

function initProjectFilters() {
    const chips = el("filterChips");
    const search = el("projectSearch");
    if (chips) {
        chips.addEventListener("click", (e) => {
            const btn = e.target.closest("button[data-filter]");
            if (!btn) return;
            state.filter = btn.dataset.filter;
            chips.querySelectorAll("button").forEach((b) => b.classList.toggle("is-active", b === btn));
            renderProjects();
        });
    }
    if (search) {
        let t;
        search.addEventListener("input", () => {
            clearTimeout(t);
            t = setTimeout(() => {
                state.query = search.value;
                renderProjects();
            }, 120);
        });
    }
}

/* ------------------------------------------------------------------
   PROJECT DIALOG
------------------------------------------------------------------ */
function initProjectDialog() {
    const dialog = el("projectDialog");
    const close = el("dialogClose");
    if (!dialog || !close) return;
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) dialog.close();
    });
}

function openProjectDialog(id) {
    const p = projects.find((x) => x.id === id);
    const dialog = el("projectDialog");
    if (!p || !dialog) return;
    setText("dialogTitle", p.title);
    setText("dialogType", `${p.type} · ${p.year}`);
    setText("dialogSummary", p.summary);
    setText("dialogProblem", p.problem);
    setText("dialogSystem", p.system);
    const stack = el("dialogStack");
    stack.innerHTML = p.stack.map((s) => `<span>${escapeHTML(s)}</span>`).join("");
    const links = el("dialogLinks");
    const parts = [];
    if (p.repo) parts.push(`<a class="button button--ghost magnetic" href="${p.repo}" target="_blank" rel="noopener noreferrer">Source <span>↗</span></a>`);
    if (p.demo) parts.push(`<a class="button button--primary magnetic" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live demo <span>↗</span></a>`);
    if (p.extra) parts.push(`<a class="button button--ghost magnetic" href="${p.extra.url}" target="_blank" rel="noopener noreferrer">${escapeHTML(p.extra.label)} <span>↗</span></a>`);
    links.innerHTML = parts.join("") || `<p class="mono">Résumé-only / private codebase.</p>`;
    dialog.showModal();
    document.body.classList.add("dialog-open");
    dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"), { once: true });
}

/* ------------------------------------------------------------------
   CONTACT
------------------------------------------------------------------ */
function initContact() {
    const form = el("contactForm");
    const copy = el("copyEmail");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const subject = encodeURIComponent(`Project inquiry from ${data.get("name") || "the portfolio"}`);
            const body = encodeURIComponent(data.get("message") || "");
            window.location.href = `mailto:prathmeshnikam2208@gmail.com?subject=${subject}&body=${body}`;
            showToast("Opening your email app…");
        });
    }
    if (copy) {
        copy.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(copy.dataset.copy);
                showToast("Email copied");
            } catch {
                showToast("Copy failed. Long-press the address");
            }
        });
    }
}

/* ------------------------------------------------------------------
   MAGNETIC ELEMENTS
------------------------------------------------------------------ */
function initMagneticElements() {
    if (state.motionOff || window.matchMedia("(pointer: coarse)").matches) return;
    const items = document.querySelectorAll(".magnetic");
    items.forEach((item) => {
        const strength = 18;
        item.addEventListener("mousemove", (e) => {
            const r = item.getBoundingClientRect();
            const x = e.clientX - (r.left + r.width / 2);
            const y = e.clientY - (r.top + r.height / 2);
            item.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
        });
        item.addEventListener("mouseleave", () => {
            item.style.transform = "";
        });
    });
}

/* ------------------------------------------------------------------
   CUSTOM CURSOR (trailing ring + dot)
------------------------------------------------------------------ */
function initCursor() {
    const dot = el("cursorDot");
    const ring = el("cursorRing");
    if (!dot || !ring) return;
    if (window.matchMedia("(pointer: coarse)").matches || state.motionOff) {
        dot.style.display = "none";
        ring.style.display = "none";
        return;
    }
    document.documentElement.classList.add("cursor-ready");
    state.cursorDot = dot;
    state.cursorRing = ring;
    state.mouseX = window.innerWidth / 2;
    state.mouseY = window.innerHeight / 2;
    state.ringX = state.mouseX;
    state.ringY = state.mouseY;
    state.dotX = state.mouseX;
    state.dotY = state.mouseY;

    window.addEventListener("mousemove", (e) => {
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;

        const target = e.target instanceof Element ? e.target : null;
        const orangeSurface = target?.closest(
            ".contact, .marquee, .button--primary, .filter-chips button"
        );
        const darkControl = target?.closest(".contact__email button");
        const useDarkCursor = Boolean(orangeSurface && !darkControl);

        dot.classList.toggle("is-on-papaya", useDarkCursor);
        ring.classList.toggle("is-on-papaya", useDarkCursor);
    });

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest("a, button, .archive-card, [data-tilt]")) ring.classList.add("is-active");
    });
    document.addEventListener("mouseout", (e) => {
        if (e.target.closest("a, button, .archive-card, [data-tilt]")) ring.classList.remove("is-active");
    });

    const tick = () => {
        // dot follows tightly, ring trails with easing
        state.dotX += (state.mouseX - state.dotX) * 0.6;
        state.dotY += (state.mouseY - state.dotY) * 0.6;
        state.ringX += (state.mouseX - state.ringX) * 0.16;
        state.ringY += (state.mouseY - state.ringY) * 0.16;
        dot.style.transform = `translate(${state.dotX}px, ${state.dotY}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${state.ringX}px, ${state.ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------
   IMAGE TILT (case-study media)
------------------------------------------------------------------ */
function initTilt() {
    if (state.motionOff || window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll("[data-tilt]").forEach((node) => {
        const max = 6;
        node.addEventListener("mousemove", (e) => {
            const r = node.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            node.style.transform = `perspective(800px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
        });
        node.addEventListener("mouseleave", () => {
            node.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
        });
    });
}

/* ------------------------------------------------------------------
   HERO PARALLAX (pointer + scroll)
------------------------------------------------------------------ */
function initHeroParallax() {
    const image = el("heroImage");
    const route = document.querySelector(".hero-route");
    if (!image || state.motionOff) return;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener("mousemove", (e) => {
        tx = (e.clientX / window.innerWidth - 0.5);
        ty = (e.clientY / window.innerHeight - 0.5);
    });
    const tick = () => {
        cx += (tx - cx) * 0.06;
        cy += (ty - cy) * 0.06;
        image.style.transform = `scale(1.055) translate3d(${cx * -14}px, ${cy * -10}px, 0)`;
        if (route) route.style.transform = `translate3d(${cx * 10}px, ${cy * 7}px, 0)`;
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------
   COUNT-UP STATS
------------------------------------------------------------------ */
function initCountUp() {
    const counts = document.querySelectorAll(".count[data-count]");
    if (!counts.length) return;
    const a = animeApi();
    const run = (node) => {
        const target = Number(node.dataset.count);
        if (state.motionOff || !a?.animate) {
            node.textContent = String(target).padStart(2, "0");
            return;
        }
        const obj = { v: 0 };
        a.animate(obj, {
            v: target,
            duration: 1400,
            ease: "outExpo",
            onUpdate: () => {
                node.textContent = String(Math.round(obj.v)).padStart(2, "0");
            }
        });
    };
    if (!("IntersectionObserver" in window)) {
        counts.forEach(run);
        return;
    }
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                run(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    counts.forEach((c) => obs.observe(c));
}

/* ------------------------------------------------------------------
   MARQUEE
------------------------------------------------------------------ */
function initMarquee() {
    const track = el("marqueeTrack");
    if (!track) return;
    // duplicate content for seamless loop
    track.innerHTML += track.innerHTML;
    if (state.motionOff) return;
    const a = animeApi();
    if (!a?.animate) return;
    a.animate(track, {
        translateX: ["0%", "-50%"],
        duration: 26000,
        loop: true,
        ease: "linear"
    });
}

/* ------------------------------------------------------------------
   SLASH-TO-SEARCH
------------------------------------------------------------------ */
function initSlashSearch() {
    const search = el("projectSearch");
    if (!search) return;
    document.addEventListener("keydown", (e) => {
        if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
            e.preventDefault();
            search.focus();
            search.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
}

/* ------------------------------------------------------------------
   GITHUB STATS (live, with static fallback)
------------------------------------------------------------------ */
function fetchGitHubStats() {
    const repos = el("publicRepos");
    const stars = el("totalStars");
    const followers = el("githubFollowers");
    if (!repos && !stars && !followers) return;
    fetch("https://api.github.com/users/Prathmesh333")
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((data) => {
            if (repos && typeof data.public_repos === "number") {
                repos.textContent = data.public_repos;
                animateNumber(repos, data.public_repos);
            }
            if (followers && typeof data.followers === "number") {
                followers.textContent = data.followers;
            }
        })
        .catch(() => {
            if (stars) stars.textContent = "Unavailable";
        });

    // stars require a search query (rate-limited); best-effort
    fetch("https://api.github.com/users/Prathmesh333/repos?per_page=100")
        .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
        .then((list) => {
            const total = list.reduce((s, r) => s + (r.stargazers_count || 0), 0);
            if (stars) {
                stars.textContent = total;
                animateNumber(stars, total);
            }
        })
        .catch(() => {
            if (stars) stars.textContent = "★";
        });
}

function animateNumber(node, target) {
    const a = animeApi();
    if (state.motionOff || !a?.animate) {
        node.textContent = target;
        return;
    }
    const obj = { v: 0 };
    a.animate(obj, {
        v: target,
        duration: 1200,
        ease: "outExpo",
        onUpdate: () => { node.textContent = Math.round(obj.v); }
    });
}

/* ------------------------------------------------------------------
   HELPERS
------------------------------------------------------------------ */
function showToast(message) {
    const toast = el("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

function setText(id, value) {
    const node = el(id);
    if (node) node.textContent = value;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
}
