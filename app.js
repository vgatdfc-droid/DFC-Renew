/* ==========================================================================
   DIGITAL FOLKS - INTERACTIVE ENGINE & JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. STICKY NAVBAR & ACTIVE SCROLL HIGHLIGHT --- */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section detection
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* --- 2. MOBILE HAMBURGER MENU --- */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu(open) {
        if (open) {
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => toggleMobileMenu(true));
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', () => toggleMobileMenu(false));
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', (e) => {
            if (e.target === mobileOverlay) toggleMobileMenu(false);
        });
    }
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });

    /* --- 3. SERVICES FILTER TABS --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            serviceCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* --- 4. SERVICE MODAL DRAWER WITH DETAILED SCOPE --- */
    const serviceDetailsMap = {
        seo: {
            title: "Search Engine Optimization (SEO)",
            badge: "Rank #1 on Google",
            desc: "Digital Folks delivers aggressive, white-hat SEO solutions designed to put your website at the top of Google search results for high-intent keywords.",
            deliverables: [
                "Comprehensive Technical SEO & Speed Audit",
                "Competitor Intelligence & High-Intent Keyword Mapping",
                "On-Page Optimization (Title tags, Meta schema, H1-H6 hierarchy)",
                "Quality Backlink Acquisition & High-DA Guest Posting",
                "Monthly Performance Reports & Organic Traffic Tracking"
            ]
        },
        linkbuilding: {
            title: "Link Building Services",
            badge: "Domain Rating Booster",
            desc: "Our high-authority link building campaigns acquire contextual, niche-relevant backlinks that skyrocket your website's trust and rank.",
            deliverables: [
                "Niche-Specific High DA/DR Guest Post Outreach",
                "Contextual Anchor Text Optimization",
                "Broken Link Recovery & Editorial Mentions",
                "100% Manual White-Hat Placement Guarantee"
            ]
        },
        gmb: {
            title: "Google My Business & Local SEO",
            badge: "Local Map Pack Domination",
            desc: "Dominate local map searches in Dehradun and your target service areas, driving direct phone calls, store visits, and local leads.",
            deliverables: [
                "GMB Profile Verification & Complete Optimization",
                "Geo-Targeted Citation Building across Indian Directories",
                "Review Generation Strategy & Response Management",
                "Local Keyword Ranking Reports"
            ]
        },
        ppc: {
            title: "Pay Per Click (PPC) & Paid Ads",
            badge: "Instant Quality Leads",
            desc: "Performance-driven Google Ads (Search, Display, Shopping) & Meta Ads (Facebook & Instagram) engineered for maximum ROAS.",
            deliverables: [
                "High-Converting Landing Page & Conversion Tracking Setup",
                "Precise Demographic & Interest Audience Targeting",
                "Compelling Ad Copywriting & Dynamic Visual Creatives",
                "Continuous Bid Optimization & Weekly ROAS Audits"
            ]
        },
        smm: {
            title: "Social Media Marketing (SMM)",
            badge: "Brand Authority & Engagement",
            desc: "Transform your social channels into vibrant community hubs on Instagram, Facebook, LinkedIn, YouTube, and X.",
            deliverables: [
                "Monthly Content Calendar & Visual Design Graphics",
                "Reels & Short-Form Video Content Direction",
                "Audience Engagement & Community Moderation",
                "Social Growth Analytics & Insights"
            ]
        },
        webdesign: {
            title: "Website Design Services",
            badge: "Futuristic & High-Converting UI/UX",
            desc: "Custom website designs that delight users, reflect your corporate or startup brand identity, and guide visitors toward conversion.",
            deliverables: [
                "Tailored Wireframes & Modern Visual Mockups",
                "100% Mobile-First Responsive Layout Architecture",
                "Custom Micro-Animations & Smooth User Journeys",
                "SEO-Friendly Content Structure"
            ]
        },
        webdev: {
            title: "Web Development Services",
            badge: "Custom Engineering & E-Commerce",
            desc: "High-performance web applications, custom corporate portals, and e-commerce platforms engineered with clean code and high speed.",
            deliverables: [
                "Custom Frontend & Backend Engineering",
                "E-Commerce Integration (WooCommerce, Custom Gateways)",
                "Page Speed Optimization (Google PageSpeed 90+ Score)",
                "Full Security Hardening & SSL Setup"
            ]
        },
        appdev: {
            title: "Android & iOS App Development",
            badge: "Mobile Application Excellence",
            desc: "Feature-rich, intuitive mobile apps for iOS and Android built to streamline customer experiences and power digital products.",
            deliverables: [
                "Cross-Platform & Native Mobile Architecture",
                "Intuitive Mobile UX & Modern UI Components",
                "Secure REST API & Database Integration",
                "Apple App Store & Google Play Store Publishing"
            ]
        },
        content: {
            title: "Content Marketing",
            badge: "Thought Leadership & Organic Reach",
            desc: "Strategic content creation that captures attention, educates your target market, and positions your brand as an industry leader.",
            deliverables: [
                "Keyword-Optimized Blog & Article Publishing",
                "E-Books, Case Studies & Lead Magnet Writing",
                "Infographics & Visual Content Assets",
                "Content Syndication & Distribution"
            ]
        },
        orm: {
            title: "Online Reputation Management (ORM)",
            badge: "Brand Perception Protection",
            desc: "Manage and safeguard your corporate reputation across search engines, review platforms, and social media channels.",
            deliverables: [
                "Real-Time Brand Sentiment Monitoring",
                "Negative Search Result De-indexing & Suppression",
                "Positive Google Review Generation Campaigns",
                "PR & Crisis Communication Guidance"
            ]
        },
        influencer: {
            title: "Influencer Marketing",
            badge: "Viral Growth & Creator Reach",
            desc: "Connect your brand with vetted influencers and content creators across Instagram and YouTube to drive massive awareness.",
            deliverables: [
                "Targeted Influencer Sourcing & Vetting",
                "Campaign Briefing & Contract Negotiations",
                "Content Execution Oversight",
                "Sales & Conversion Tracking"
            ]
        },
        security: {
            title: "Cyber Security Services",
            badge: "Enterprise Defense & Hardening",
            desc: "Protect your digital assets, web servers, and client databases against malware, DDoS attacks, and security vulnerabilities.",
            deliverables: [
                "Comprehensive Penetration Testing & Vulnerability Audits",
                "Web Application Firewall (WAF) & SSL Setup",
                "Malware Removal & Malware Defense Protocols",
                "24/7 Security Monitoring & Incident Response"
            ]
        },
        training: {
            title: "Digital Training & Staffing",
            badge: "Practical Skills & Top Talent",
            desc: "Hands-on digital marketing training programs, AICTE-approved internships, and recruitment staffing to build your internal powerhouse.",
            deliverables: [
                "Practical On-Page & Off-Page SEO Courses",
                "Hands-On Google & Meta Ads Workshops",
                "AICTE-Approved Internship Certificates",
                "Executive Recruitment & Talent Matching"
            ]
        }
    };

    const serviceModal = document.getElementById('service-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBodyContent = document.getElementById('modal-body-content');

    document.querySelectorAll('.open-service-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceId = btn.getAttribute('data-id');
            const data = serviceDetailsMap[serviceId];
            if (!data) return;

            modalBodyContent.innerHTML = `
                <div class="badge-pill mb-2">${data.badge}</div>
                <h2 style="color:#FFFFFF; font-size: 2rem; margin-bottom: 1rem;">${data.title}</h2>
                <p style="color: var(--text-light-muted); font-size: 1.05rem; margin-bottom: 2rem;">${data.desc}</p>
                <h4 style="color: var(--accent-cyan); margin-bottom: 1rem;">What You Get (Deliverables):</h4>
                <ul style="list-style: none; padding: 0; margin-bottom: 2rem;">
                    ${data.deliverables.map(item => `
                        <li style="margin-bottom: 0.8rem; color: #FFFFFF; display: flex; align-items: center; gap: 0.8rem;">
                            <i class="fa-solid fa-circle-check" style="color: var(--accent-green); font-size: 1.1rem;"></i>
                            <span>${item}</span>
                        </li>
                    `).join('')}
                </ul>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="#contact" class="btn btn-gradient close-modal-trigger"><i class="fa-solid fa-paper-plane"></i> Request Custom Quote</a>
                    <a href="tel:+917310781935" class="btn btn-glass"><i class="fa-solid fa-phone"></i> Call +91 7310781935</a>
                </div>
            `;

            serviceModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            const closeTrigger = modalBodyContent.querySelector('.close-modal-trigger');
            if (closeTrigger) {
                closeTrigger.addEventListener('click', () => {
                    serviceModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                });
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            serviceModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (serviceModal) {
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                serviceModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    /* --- 5. INTERACTIVE LEAD WIZARD & ESTIMATOR --- */
    const wizardStepBtns = document.querySelectorAll('.next-step-btn');
    const wizardPrevBtns = document.querySelectorAll('.prev-step-btn');
    const wizardContents = document.querySelectorAll('.wizard-step-content');
    const wizardIndicators = document.querySelectorAll('.step-item');
    const generateSummaryBtn = document.getElementById('generate-summary-btn');
    const summaryBox = document.getElementById('wizard-summary-box');

    function goToStep(stepNum) {
        wizardContents.forEach(c => c.classList.remove('active'));
        wizardIndicators.forEach(i => i.classList.remove('active'));

        const targetContent = document.getElementById(`step-${stepNum}`);
        if (targetContent) targetContent.classList.add('active');

        wizardIndicators.forEach(i => {
            if (parseInt(i.getAttribute('data-step')) <= stepNum) {
                i.classList.add('active');
            }
        });
    }

    wizardStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = parseInt(btn.getAttribute('data-next'));
            goToStep(nextStep);
        });
    });

    wizardPrevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStep = parseInt(btn.getAttribute('data-prev'));
            goToStep(prevStep);
        });
    });

    if (generateSummaryBtn) {
        generateSummaryBtn.addEventListener('click', () => {
            const goal = document.querySelector('input[name="wizard_goal"]:checked')?.value || 'seo';
            const scale = document.querySelector('input[name="wizard_scale"]:checked')?.value || 'local';
            const budget = document.querySelector('input[name="wizard_budget"]:checked')?.value || 'base';

            let goalText = 'Organic SEO & Ranking';
            if (goal === 'web') goalText = 'Modern Web & UI/UX Engineering';
            if (goal === 'leads') goalText = 'Paid Leads & Performance Ads';
            if (goal === 'fullstack') goalText = 'Complete 360° Digital Growth Suite';

            let scaleText = 'Dehradun / Local Region';
            if (scale === 'national') scaleText = 'Pan-India Market Expansion';
            if (scale === 'global') scaleText = 'North America & International Global Audience';

            let budgetText = 'Base Plan (₹61,285 / mo)';
            if (budget === 'standard') budgetText = 'Standard Plan (₹99,485 / mo)';
            if (budget === 'premium') budgetText = 'Premium Plan (₹1,55,285 / mo)';

            summaryBox.innerHTML = `
                <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1.2rem;">
                    <i class="fa-solid fa-circle-check" style="color: var(--accent-cyan); font-size: 1.5rem;"></i>
                    <h3 style="color: #FFFFFF; margin: 0;">Strategy Proposal Overview</h3>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; color: var(--text-light-muted); font-size: 0.95rem;">
                    <div>
                        <strong style="color: var(--accent-indigo); display: block;">Primary Focus:</strong>
                        <span style="color: #FFFFFF;">${goalText}</span>
                    </div>
                    <div>
                        <strong style="color: var(--accent-indigo); display: block;">Target Scale:</strong>
                        <span style="color: #FFFFFF;">${scaleText}</span>
                    </div>
                    <div>
                        <strong style="color: var(--accent-indigo); display: block;">Investment Tier:</strong>
                        <span style="color: #FFFFFF;">${budgetText}</span>
                    </div>
                    <div>
                        <strong style="color: var(--accent-indigo); display: block;">Estimated Timeline:</strong>
                        <span style="color: #FFFFFF;">30-60 Days to Initial Peak Results</span>
                    </div>
                </div>
            `;
        });
    }

    /* --- 6. FAQ SEARCH & ACCORDION --- */
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSearchInput = document.getElementById('faq-search');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    if (faqSearchInput) {
        faqSearchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            faqItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    /* --- 7. CONTACT LEAD FORM SUBMISSION --- */
    const leadForm = document.getElementById('lead-form');
    const formStatus = document.getElementById('form-status');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.innerHTML = '<span style="color: var(--accent-cyan);"><i class="fa-solid fa-spinner fa-spin"></i> Submitting your request to Digital Folks team...</span>';

            setTimeout(() => {
                formStatus.innerHTML = '<span style="color: var(--accent-green);"><i class="fa-solid fa-circle-check"></i> Thank you! Your details have been submitted. Our executive will call you shortly.</span>';
                leadForm.reset();
            }, 1200);
        });
    }

    /* --- 8. BACK TO TOP BUTTON --- */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --- 9. SCROLL SLIDE REVEAL OBSERVER --- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

});

