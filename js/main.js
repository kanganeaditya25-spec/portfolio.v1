// --- DOCUMENT READY WRAPPER ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCustomCursor();
    initTerminalMockup();
    initMobileMenu();
    initHeaderScroll();
    initProjectFiltering();
    initProjectModal();
    initContactForm();
    initScrollToTop();
    initTimelineAnimation();
    updateCopyrightYear();
});

// --- COPYRIGHT YEAR ---
function updateCopyrightYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// --- THEME MANAGEMENT ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        document.documentElement.classList.add('light-theme');
    }

    // Toggle click event
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');
        const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
    });
}

// --- CUSTOM CURSOR ---
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('custom-cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    // Track mouse move coordinates
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Lerp/smooth cursor follower movement
    function animateFollower() {
        // Linear interpolation to make the follower lag behind smoothly
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactable targets
    const hoverTargets = document.querySelectorAll('.hover-target');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        target.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });

    // Reset cursor state when leaving window boundaries
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
}

// --- TERMINAL SIMULATOR ---
function initTerminalMockup() {
    const cliText = document.getElementById('cli-typing-text');
    if (!cliText) return;

    const terminalLogs = [
        "git status",
        "On branch main",
        "Your branch is up to date with 'origin/main'.",
        "nothing to commit, working tree clean",
        "cat developer_motto.txt",
        "\"Clean code always looks like it was written by someone who cares.\""
    ];

    let currentLogIndex = 0;
    let charIndex = 0;
    let delay = 60; // Typing speed (ms)
    
    function startTypingLog() {
        if (currentLogIndex >= terminalLogs.length) {
            // End simulation, loop back after wait
            setTimeout(() => {
                cliText.innerHTML = '';
                currentLogIndex = 0;
                charIndex = 0;
                startTypingLog();
            }, 6000);
            return;
        }

        const currentLine = terminalLogs[currentLogIndex];
        
        // If it's a command input simulation
        if (currentLogIndex % 2 === 0) {
            if (charIndex === 0) {
                // Prepend command prefix styles
                cliText.innerHTML += `<br><span class="terminal-prompt">$ </span>`;
            }

            if (charIndex < currentLine.length) {
                cliText.innerHTML += currentLine.charAt(charIndex);
                charIndex++;
                setTimeout(startTypingLog, delay);
            } else {
                // Command typed, proceed to output instantly
                charIndex = 0;
                currentLogIndex++;
                setTimeout(startTypingLog, 500); // Small delay before command response
            }
        } else {
            // Output lines (printed instantly)
            cliText.innerHTML += `<br><span class="terminal-output">${currentLine}</span>`;
            
            // Auto scroll terminal container
            const terminalBody = document.getElementById('terminal-body');
            if (terminalBody) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }

            currentLogIndex++;
            setTimeout(startTypingLog, 1200); // Delay before typing next command
        }
    }

    // Launch typing simulator after introductory loading animation
    setTimeout(startTypingLog, 1500);
}

// --- MOBILE MENU ---
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// --- HEADER SCROLL ACTION ---
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add scroll-up/down class
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
        } else {
            header.classList.remove('scroll-down', 'scroll-up');
        }

        lastScrollY = currentScrollY;
    });

    // Nav Links Active State update on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// --- PROJECTS FILTERING ---
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterButtons.length === 0 || projectCards.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                // Card transitions
                card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// --- PROJECT MODALS DATA ---
const projectData = {
    devspace: {
        title: "DevSpace Community Blog",
        tags: ["Next.js", "React", "TailwindCSS", "MDX", "Vercel"],
        description: "DevSpace is a static developer blog built using Next.js to parse and present Markdown content efficiently. It integrates custom MDX component plugins, supports dark mode code blocks with custom syntax highlights, includes auto-generated article sitemaps for SEO, and builds statically with ISR (Incremental Static Regeneration) to assure seamless updates. The project achieves a perfect 100/100 Lighthouse performance rating.",
        category: "Frontend Web App",
        focus: "Static Site Performance",
        icon: "fa-keyboard",
        live: "#",
        github: "#"
    },
    algovis: {
        title: "AlgoVis Pathfinder & Sorter",
        tags: ["Vanilla JS", "HTML5 Canvas", "CSS Grid", "Algorithms"],
        description: "AlgoVis is a lightweight, responsive dashboard mapping computer science algorithms visually. It simulates sorting engines (Bubble, Merge, Quick, Heap sort) and pathfinding solvers (Dijkstra, A*, BFS, DFS) on grid boards with obstacle editing, custom starting/ending nodes, and animation controls. Built entirely with vanilla JS and canvas rendering to keep script overhead extremely low.",
        category: "Creative Simulation",
        focus: "UI Render Speed",
        icon: "fa-chart-line",
        live: "#",
        github: "#"
    },
    cyberstore: {
        title: "CyberStore Secure E-Commerce API",
        tags: ["NodeJS", "Express", "PostgreSQL", "JWT", "Stripe"],
        description: "CyberStore is a secure REST API architecture designed for ecommerce. Features include JWT authorization structure with sliding expiration limits, product category querying with PostgreSQL index optimizations, Redis session storage to accelerate requests, and secure Stripe webhook listeners verifying payments before item reserves. Built to support up to 5,000 transactions daily.",
        category: "Backend Platform",
        focus: "Database Security & Caching",
        icon: "fa-shield-halved",
        live: "#",
        github: "#"
    },
    terminalgit: {
        title: "Terminal Git Simulator",
        tags: ["React.js", "Vite", "CSS Grid", "SVG Graphs"],
        description: "Terminal Git maps git repository structure into graphic layouts. It runs a custom shell parser checking basic git commands (git add, git commit, git branch, git checkout). It renders repository trees containing nodes, branch arrows, and head indicator points inside SVG components, serving as an onboarding tool for command-line beginners.",
        category: "Interactive Workspace",
        focus: "Graph Representation & Parsing",
        icon: "fa-git-alt",
        live: "#",
        github: "#"
    }
};

function initProjectModal() {
    const modal = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!modal || !closeBtn || projectCards.length === 0) return;

    // Elements inside modal
    const modalImgContainer = document.getElementById('modal-img-container');
    const modalTitle = document.getElementById('modal-title');
    const modalTags = document.getElementById('modal-tags');
    const modalDesc = document.getElementById('modal-description');
    const modalCategory = document.getElementById('modal-category');
    const modalFocus = document.getElementById('modal-focus');
    const modalLive = document.getElementById('modal-live-link');
    const modalGithub = document.getElementById('modal-github-link');

    // Open Modal Function
    function openModal(projectId) {
        const data = projectData[projectId];
        if (!data) return;

        // Set title, description, category, focus
        modalTitle.textContent = data.title;
        modalDesc.textContent = data.description;
        modalCategory.textContent = data.category;
        modalFocus.textContent = data.focus;
        modalLive.href = data.live;
        modalGithub.href = data.github;

        // Build Tags
        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'project-tag';
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        // Set Mock Thumbnail
        modalImgContainer.innerHTML = `
            <div style="width: 100%; height: 350px; display: flex; align-items: center; justify-content: center; background-color: var(--bg-tertiary); color: var(--accent-primary); border-bottom: 1px solid var(--border-color);">
                <i class="fa-solid ${data.icon}" style="font-size: 8rem;"></i>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock main scroll
    }

    // Close Modal Function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
    }

    // Bind triggers to project cards
    projectCards.forEach(card => {
        // Details btn trigger
        const detailsBtn = card.querySelector('.project-details-btn');
        const projectId = card.getAttribute('data-project-id');

        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModal(projectId);
            });
        }

        // Entire card body click (alternative)
        card.addEventListener('click', () => {
            openModal(projectId);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking overlay backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape Key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// --- CONTACT FORM HANDLING ---
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');
    const submitError = document.getElementById('form-submit-error');
    const originalBtnContent = submitBtn.innerHTML;

    // Simple email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setFieldError = (input, errorId, hasError) => {
        const errorSpan = document.getElementById(errorId);
        input.classList.toggle('error', hasError);
        input.classList.toggle('success', !hasError && input.value.trim().length > 0);
        input.setAttribute('aria-invalid', String(hasError));
        if (errorSpan) errorSpan.style.display = hasError ? 'block' : 'none';
        return !hasError;
    };

    const showSubmitError = (message) => {
        successMsg.hidden = true;
        submitError.textContent = message;
        submitError.hidden = false;
    };

    // Clear field and submission errors as the visitor edits the form.
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            input.removeAttribute('aria-invalid');
            const errorSpan = document.getElementById(`${input.id.replace('form-', '')}-error`);
            if (errorSpan) errorSpan.style.display = 'none';
            submitError.hidden = true;
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isNameValid = setFieldError(nameInput, 'name-error', !nameInput.value.trim());
        const isEmailValid = setFieldError(emailInput, 'email-error', !emailPattern.test(emailInput.value.trim()));
        const isMessageValid = setFieldError(messageInput, 'message-error', !messageInput.value.trim());

        if (!isNameValid || !isEmailValid || !isMessageValid) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
        successMsg.hidden = true;
        submitError.hidden = true;

        try {
            const response = await fetch(form.dataset.endpoint || form.action, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: new FormData(form)
            });
            const result = await response.json().catch(() => ({}));

            if (!response.ok || result.success !== 'true') {
                throw new Error(result.message || 'The message could not be sent.');
            }

            form.reset();
            [nameInput, emailInput, messageInput].forEach(input => {
                input.classList.remove('success');
                input.removeAttribute('aria-invalid');
            });
            successMsg.hidden = false;
        } catch (error) {
            showSubmitError('Message could not be sent. Please try again or email me directly.');
            console.error('Contact form submission failed:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
}

// --- SCROLL TO TOP ---
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- TIMELINE HIGHLIGHT ON SCROLL ---
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Subtle slide-in effect
                const content = entry.target.querySelector('.timeline-content');
                if (content) {
                    content.style.transform = 'translateX(0)';
                    content.style.opacity = '1';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        if (content) {
            content.style.transform = 'translateX(20px)';
            content.style.opacity = '0';
            content.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        observer.observe(item);
    });
}
