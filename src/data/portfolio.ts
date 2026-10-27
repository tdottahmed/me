export interface SkillItem {
  id: string;
  name: string;
  version?: string;
  category:
    | "Languages"
    | "Backend & APIs"
    | "Frontend & Mobile"
    | "Databases & Concurrency"
    | "DevOps & VPS"
    | "Testing & Workflow";
  highlight: string;
  relatedProjects: string[];
  featured?: boolean;
}

export interface ProjectHighlight {
  label: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  featured: boolean;
  liveUrl?: string;
  secondaryUrl?: { label: string; url: string };
  repoUrl?: string;
  metricsBadge: string;
  techStack: string[];
  highlights: ProjectHighlight[];
  architectureOverview?: string;
}

export interface ExperienceHighlight {
  label: string;
  description: string;
  link?: { text: string; url: string };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: ExperienceHighlight[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  coursework: string[];
  projects: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface LanguageItem {
  language: string;
  level: string;
}

export interface MetricItem {
  value: number;
  suffix: string;
  label: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Tanbir Ahmed",
    title: "Full-Stack Developer",
    tagline: "Laravel · React · Next.js · Django",
    headline: "Engineering Money-Safe Marketplaces, Real-Time WebApps & Hardened Cloud Systems.",
    email: "ahmedtanbir442@gmail.com",
    phone: "+8801876525073",
    phoneFormatted: "+880 1876-525073",
    location: "Uttara, Dhaka, Bangladesh",
    portfolioUrl: "https://tanbir.nixsoftware.net",
    linkedinUrl: "https://linkedin.com/in/tanbir-ahmed07",
    githubUrl: "https://github.com/tdottahmed",
    availability: "Available for Full-Stack Roles & High-Impact Contracts",
    summary:
      "Full-stack developer with 3.5+ years of production experience building and deploying high-reliability web platforms in Laravel, Django, Next.js, and React. Proven track record shipping multi-vendor marketplaces, e-commerce SPAs, and live-class LMS platforms from relational database design to hardened Linux VPS deployment with automated CI/CD. Strong focus on financial correctness (idempotent payment webhooks, append-only ledgers, row-level stock locking), real-time concurrency with WebSockets, and automated testing.",
  },

  metrics: [
    { value: 3.5, suffix: "+", label: "Years Production Experience" },
    { value: 5, suffix: "+", label: "Live Platforms in BD & Canada" },
    { value: 847, suffix: "", label: "Automated Tests in Production Marketplace" },
    { value: 6, suffix: "+", label: "CodeCanyon Commercial Products" },
    { value: 70, suffix: "+", label: "Enterprise & Defense Bugs Resolved" },
  ] as MetricItem[],

  skills: [
    // Languages
    {
      id: "php",
      name: "PHP",
      version: "7.4–8.4",
      category: "Languages",
      highlight: "Strict typing, OOP domain services, high-concurrency Laravel backends",
      relatedProjects: ["Fur & Feather BD", "TradingChart.org", "Zamzam Wholesale", "DirectMalaysia.com", "Magic LMS"],
      featured: true,
    },
    {
      id: "python",
      name: "Python",
      version: "3.x",
      category: "Languages",
      highlight: "Django modular monoliths, decimal financial arithmetic, async Celery workers",
      relatedProjects: ["Sultan Big Bazaar"],
      featured: true,
    },
    {
      id: "typescript",
      name: "TypeScript",
      version: "5.x",
      category: "Languages",
      highlight: "End-to-end type safety across Next.js 16 storefronts and Inertia SPAs",
      relatedProjects: ["Sultan Big Bazaar", "Fur & Feather BD", "DirectMalaysia.com"],
      featured: true,
    },
    {
      id: "javascript",
      name: "JavaScript",
      version: "ES6+",
      category: "Languages",
      highlight: "Reactive client state, WebSockets event listeners, and interactive UIs",
      relatedProjects: ["TradingChart.org", "Zamzam Wholesale"],
    },
    {
      id: "sql",
      name: "SQL",
      version: "PostgreSQL / MySQL",
      category: "Languages",
      highlight: "Complex query optimization, indexing, and row-level locking transactions",
      relatedProjects: ["Sultan Big Bazaar", "TradingChart.org", "Fur & Feather BD"],
    },
    {
      id: "bash",
      name: "Bash",
      version: "Shell Automation",
      category: "Languages",
      highlight: "Automated Ubuntu VPS provisioning, SSL renewal, smoke tests, and backups",
      relatedProjects: ["Sultan Big Bazaar", "Fur & Feather BD"],
    },

    // Backend & APIs
    {
      id: "laravel",
      name: "Laravel",
      version: "v11 / v12 / v13",
      category: "Backend & APIs",
      highlight: "Enterprise REST APIs, multi-app SSO, double-entry cash books, and custom LMS",
      relatedProjects: ["Fur & Feather BD", "TradingChart.org", "Zamzam Wholesale", "DirectMalaysia.com", "Magic LMS"],
      featured: true,
    },
    {
      id: "reverb",
      name: "Laravel Reverb",
      version: "WebSockets",
      category: "Backend & APIs",
      highlight: "Real-time support desks, private vet channels, and instant notifications",
      relatedProjects: ["TradingChart.org", "Fur & Feather BD"],
      featured: true,
    },
    {
      id: "horizon",
      name: "Laravel Horizon",
      version: "Queue Manager",
      category: "Backend & APIs",
      highlight: "Redis queue supervision, automated SMS/email dispatch, and retry pipelines",
      relatedProjects: ["Fur & Feather BD", "TradingChart.org"],
    },
    {
      id: "django",
      name: "Django & DRF",
      version: "REST + HTMX",
      category: "Backend & APIs",
      highlight: "20-module multi-vendor marketplace with unified business service layer",
      relatedProjects: ["Sultan Big Bazaar"],
      featured: true,
    },
    {
      id: "celery",
      name: "Celery",
      version: "Distributed Queue",
      category: "Backend & APIs",
      highlight: "Asynchronous order processing, invoice snapshots, and scheduled tasks",
      relatedProjects: ["Sultan Big Bazaar"],
    },
    {
      id: "htmx",
      name: "HTMX",
      version: "Hypermedia UI",
      category: "Backend & APIs",
      highlight: "High-speed server-rendered admin, seller, and reseller portals",
      relatedProjects: ["Sultan Big Bazaar"],
    },
    {
      id: "rest-api",
      name: "RESTful APIs",
      version: "Cross-Repo SSO",
      category: "Backend & APIs",
      highlight: "Shared identity federation across multiple Next.js frontends and mobile apps",
      relatedProjects: ["Fur & Feather BD", "Sultan Big Bazaar", "TradingChart.org"],
    },

    // Frontend & Mobile
    {
      id: "react",
      name: "React",
      version: "v19",
      category: "Frontend & Mobile",
      highlight: "Modern concurrent rendering, custom hooks, and interactive dashboards",
      relatedProjects: ["Sultan Big Bazaar", "Fur & Feather BD", "TradingChart.org", "Zamzam Wholesale"],
      featured: true,
    },
    {
      id: "nextjs",
      name: "Next.js",
      version: "v16 (App Router)",
      category: "Frontend & Mobile",
      highlight: "High-conversion e-commerce storefronts and community portals",
      relatedProjects: ["Sultan Big Bazaar", "Fur & Feather BD"],
      featured: true,
    },
    {
      id: "inertia",
      name: "Inertia.js",
      version: "SPA Bridge",
      category: "Frontend & Mobile",
      highlight: "Reactive Single-Page Applications backed by Laravel routing",
      relatedProjects: ["DirectMalaysia.com", "Zamzam Wholesale"],
    },
    {
      id: "vuejs",
      name: "Vue.js",
      version: "Reactive UI",
      category: "Frontend & Mobile",
      highlight: "Dynamic frontend interfaces and reusable component libraries",
      relatedProjects: ["Imjol IT Commercial Products"],
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      version: "v3 / v4",
      category: "Frontend & Mobile",
      highlight: "Responsive design systems, custom themes, and accessible component styling",
      relatedProjects: ["Fur & Feather BD", "Sultan Big Bazaar", "TradingChart.org"],
      featured: true,
    },
    {
      id: "react-native",
      name: "React Native",
      version: "Mobile",
      category: "Frontend & Mobile",
      highlight: "Companion cross-platform mobile learning app for TradingChart.org",
      relatedProjects: ["TradingChart.org"],
    },
    {
      id: "wordpress",
      name: "WordPress & WooCommerce",
      version: "Custom CMS",
      category: "Frontend & Mobile",
      highlight: "Custom themes, custom plugins, and bespoke WooCommerce workflows",
      relatedProjects: ["Imjol IT Client Projects"],
    },

    // Databases & Concurrency
    {
      id: "postgresql",
      name: "PostgreSQL",
      version: "Production DB",
      category: "Databases & Concurrency",
      highlight: "High-concurrency relational storage for live-class LMS platforms",
      relatedProjects: ["TradingChart.org"],
      featured: true,
    },
    {
      id: "mysql",
      name: "MySQL",
      version: "Production DB",
      category: "Databases & Concurrency",
      highlight: "Normalized e-commerce schemas, double-entry ledgers, and B2B catalogs",
      relatedProjects: ["Fur & Feather BD", "Zamzam Wholesale", "DirectMalaysia.com"],
      featured: true,
    },
    {
      id: "mariadb",
      name: "MariaDB",
      version: "Production DB",
      category: "Databases & Concurrency",
      highlight: "ACID-compliant transactional storage with row-level stock locking",
      relatedProjects: ["Sultan Big Bazaar"],
    },
    {
      id: "redis",
      name: "Redis",
      version: "Cache & Pub/Sub",
      category: "Databases & Concurrency",
      highlight: "Distributed caching, session stores, Horizon/Celery queues, and WebSockets",
      relatedProjects: ["Sultan Big Bazaar", "Fur & Feather BD", "TradingChart.org"],
      featured: true,
    },
    {
      id: "row-locking",
      name: "Row-Level Stock Locking",
      version: "ACID Safety",
      category: "Databases & Concurrency",
      highlight: "Pessimistic database locks & stock reservations preventing overselling",
      relatedProjects: ["Sultan Big Bazaar"],
    },
    {
      id: "ledgers",
      name: "Append-Only Ledgers",
      version: "Double-Entry",
      category: "Databases & Concurrency",
      highlight: "Immutable financial audit trails and automated P&L / balance sheet generation",
      relatedProjects: ["Fur & Feather BD", "Sultan Big Bazaar"],
    },

    // DevOps & VPS
    {
      id: "linux",
      name: "Linux (Ubuntu / Debian)",
      version: "Hardened VPS",
      category: "DevOps & VPS",
      highlight: "Production server administration, restricted sudo, and security hardening",
      relatedProjects: ["Sultan Big Bazaar", "Fur & Feather BD", "DirectMalaysia.com"],
      featured: true,
    },
    {
      id: "nginx",
      name: "Nginx",
      version: "Reverse Proxy",
      category: "DevOps & VPS",
      highlight: "High-performance web server routing, WebSockets proxying, and SSL",
      relatedProjects: ["DirectMalaysia.com", "Fur & Feather BD", "Sultan Big Bazaar"],
    },
    {
      id: "docker",
      name: "Docker",
      version: "Containerization",
      category: "DevOps & VPS",
      highlight: "Isolated multi-service environments for APIs, databases, and Redis",
      relatedProjects: ["Sultan Big Bazaar", "Fur & Feather BD"],
      featured: true,
    },
    {
      id: "github-actions",
      name: "GitHub Actions",
      version: "CI/CD",
      category: "DevOps & VPS",
      highlight: "Automated test suites, smoke tests, and zero-downtime VPS deployments",
      relatedProjects: ["Sultan Big Bazaar", "Fur & Feather BD"],
      featured: true,
    },
    {
      id: "supervisor",
      name: "Supervisor & systemd",
      version: "Process Daemons",
      category: "DevOps & VPS",
      highlight: "24/7 process monitoring for Reverb WebSockets, Horizon, and Celery workers",
      relatedProjects: ["Fur & Feather BD", "TradingChart.org", "Sultan Big Bazaar"],
    },
    {
      id: "cloudflare",
      name: "Cloudflare & Fail2ban",
      version: "Strict TLS & WAF",
      category: "DevOps & VPS",
      highlight: "Strict TLS encryption, automated Let's Encrypt API certs, and IP intrusion blocking",
      relatedProjects: ["Sultan Big Bazaar", "Fur & Feather BD"],
    },

    // Testing & Workflow
    {
      id: "phpunit-pest",
      name: "PHPUnit & Pest PHP",
      version: "Automated QA",
      category: "Testing & Workflow",
      highlight: "Acceptance and integration testing for Laravel financial and progression engines",
      relatedProjects: ["Fur & Feather BD", "TradingChart.org"],
      featured: true,
    },
    {
      id: "django-tests",
      name: "Django Test Framework",
      version: "847 Tests",
      category: "Testing & Workflow",
      highlight: "847 automated tests verifying checkout math, RBAC, and webhook idempotency",
      relatedProjects: ["Sultan Big Bazaar"],
      featured: true,
    },
    {
      id: "payment-gateways",
      name: "Payment Gateways",
      version: "Stripe · PayPal · SSLCommerz",
      category: "Testing & Workflow",
      highlight: "Signature-verified idempotent webhooks and multi-currency BDT/USD checkout",
      relatedProjects: ["TradingChart.org", "Sultan Big Bazaar", "Magic LMS"],
    },
    {
      id: "ai-tools",
      name: "AI-Assisted Dev",
      version: "Claude · Cursor · Antigravity CLI · OpenCode",
      category: "Testing & Workflow",
      highlight: "High-velocity architectural specs, automated test authoring, and code review",
      relatedProjects: ["All Recent Projects"],
    },
  ] as SkillItem[],

  projects: [
    {
      id: "sultan-big-bazaar",
      title: "Sultan Big Bazaar",
      subtitle: "Multi-Vendor E-Commerce Marketplace",
      period: "Sep 2026 – Present",
      featured: true,
      liveUrl: "https://sultanbigbazaar.com/",
      metricsBadge: "847 Automated Tests • 20 Domain Modules",
      techStack: ["Django", "DRF", "Next.js 16", "React 19", "TypeScript", "Redis", "Celery", "MariaDB", "HTMX", "GitHub Actions"],
      highlights: [
        {
          label: "20-Module Domain Architecture",
          description:
            "Built a full-scale marketplace for Bangladesh featuring a Next.js 16 storefront plus admin, seller, and reseller portals in Django + HTMX organized across 20 decoupled domain modules.",
        },
        {
          label: "Unified Service Layer",
          description:
            "Centralized all business rules into a single service layer consumed by both the REST API and server-rendered panels, enforcing permissions consistently in one place.",
        },
        {
          label: "Money-Safe Checkout & Audit Trail",
          description:
            "Engineered decimal-only calculations, server-side totals, immutable invoice snapshots at purchase, and an append-only audit log tracking every change to stock, money, or order status.",
        },
        {
          label: "Idempotent Webhooks & Row-Level Locks",
          description:
            "Built a plug-in payment layer (COD, SSLCommerz) with signature-verified idempotent webhooks and pessimistic row-level locks with stock reservations to prevent overselling.",
        },
        {
          label: "Multi-Vendor & White-Label Reseller Engine",
          description:
            "Added automated per-seller order splitting, dynamic commission rules, and a white-label reseller network with tiered pricing and margin tracking.",
        },
        {
          label: "Hardened VPS & 847 Automated Tests",
          description:
            "Deployed to a hardened Ubuntu VPS (Cloudflare Strict TLS, Fail2ban, restricted sudo) with GitHub Actions CI/CD validated by 847 automated tests.",
        },
      ],
    },
    {
      id: "fur-and-feather-bd",
      title: "Fur & Feather BD",
      subtitle: "Specialized E-Commerce & Avian Community Platform",
      period: "Oct 2026 – Present",
      featured: true,
      liveUrl: "https://furandfeatherbd.shop",
      secondaryUrl: { label: "pakhi.community", url: "https://pakhi.community" },
      metricsBadge: "3-Repo SSO • Double-Entry Cash Book",
      techStack: ["Laravel 13", "Next.js 16", "React 19", "MySQL", "Redis", "Laravel Reverb", "Laravel Horizon", "Tailwind v4"],
      highlights: [
        {
          label: "3-Repository Unified SSO Ecosystem",
          description:
            "Built an end-to-end bird-care platform spanning a Laravel REST API, a custom admin panel, and two Next.js frontends (shop and community) sharing one user identity across 3 repositories.",
        },
        {
          label: "Real-Time WebSockets & Horizon Queues",
          description:
            "Built real-time support cases, notifications, and a doctor consultation inbox on Laravel Reverb WebSockets with private channels, backed by Horizon queues with email and SMS alerts.",
        },
        {
          label: "Append-Only Double-Entry Cash Book",
          description:
            "Designed an automated double-entry ledger where orders, donations, and reseller payouts post automatically to generate live P&L, balance sheet, and trend reports.",
        },
        {
          label: "13-Rank Member Progression Engine",
          description:
            "Engineered a 13-rank member progression engine (screening, 40-question weighted assessment, and automated certification) covered by acceptance tests.",
        },
        {
          label: "Automated VPS & CI/CD Provisioning",
          description:
            "Automated VPS provisioning (Nginx, Supervisor, Let's Encrypt via Cloudflare API) and configured GitHub Actions CI/CD with smoke tests and scheduled backups.",
        },
      ],
    },
    {
      id: "trading-chart-org",
      title: "TradingChart.org",
      subtitle: "Live-Class Production LMS & Companion Mobile App",
      period: "Nov 2023 – Present",
      featured: true,
      liveUrl: "https://tradingchart.org",
      metricsBadge: "JaaS/Jitsi Live Classes • React Native App",
      techStack: ["Laravel 12", "React 19", "PostgreSQL", "Laravel Reverb", "JaaS / Jitsi", "SSLCommerz", "Bunny CDN", "React Native"],
      highlights: [
        {
          label: "Production LMS Architecture",
          description:
            "Built and scaled TradingChart.org at Imjol IT using Laravel 12, React 19, and PostgreSQL for high-concurrency student cohorts.",
        },
        {
          label: "Live Classrooms & Real-Time Support",
          description:
            "Integrated JaaS/Jitsi interactive live video classes, a real-time support desk on Laravel Reverb WebSockets, and Bunny CDN video delivery.",
        },
        {
          label: "Multi-Currency Payments & Mobile Client",
          description:
            "Implemented SSLCommerz BDT/USD payment processing and shipped a companion React Native mobile application.",
        },
      ],
    },
    {
      id: "zamzam-wholesale",
      title: "Zamzam Import & Export Inc.",
      subtitle: "B2B Wholesale E-Commerce Platform (Canada)",
      period: "Jul 2025 – Jan 2026",
      featured: false,
      liveUrl: "https://zamzamcanada.com/",
      repoUrl: "https://github.com/tdottahmed/zam-zam",
      metricsBadge: "Canadian B2B Platform • Open Source Repo",
      techStack: ["Laravel", "React", "Inertia.js", "MySQL"],
      highlights: [
        {
          label: "B2B Bulk Ordering Workflow",
          description:
            "Engineered a B2B wholesale platform enabling bulk ordering, scalable inventory management, and streamlined corporate transactions.",
        },
        {
          label: "Access Control & Query Optimization",
          description:
            "Implemented secure business client authentication, optimized MySQL queries, and delivered a responsive React + Inertia.js SPA frontend.",
        },
      ],
    },
    {
      id: "direct-malaysia",
      title: "DirectMalaysia.com",
      subtitle: "Cross-Border E-Commerce Single-Page Application",
      period: "Nov 2023 – Present",
      featured: false,
      liveUrl: "https://directmalaysia.com",
      metricsBadge: "Inertia SPA • Production Linux/Nginx",
      techStack: ["Laravel", "Inertia.js", "React", "TypeScript", "Nginx", "Linux VPS"],
      highlights: [
        {
          label: "Full-Stack SPA & Server Management",
          description:
            "Built and deployed an e-commerce SPA using Laravel, Inertia.js, and React/TypeScript, and managed the production Linux/Nginx server.",
        },
      ],
    },
    {
      id: "magic-lms-codecanyon",
      title: "Magic LMS & CodeCanyon Suite",
      subtitle: "Envato CodeCanyon Approved Commercial Products",
      period: "Nov 2023 – Present",
      featured: false,
      metricsBadge: "Envato Approved • 6+ Commercial Products",
      techStack: ["Laravel", "PHP", "Stripe", "PayPal", "SSLCommerz", "MySQL"],
      highlights: [
        {
          label: "Commercial Marketplace Engineering",
          description:
            "Developed Magic LMS (officially approved on Envato CodeCanyon) with Stripe, PayPal, and SSLCommerz integrations, and maintained 6+ commercial CodeCanyon products.",
        },
      ],
    },
  ] as ProjectItem[],

  experience: [
    {
      id: "imjol-it",
      role: "Software Developer",
      company: "Imjol IT",
      location: "Uttara, Dhaka, Bangladesh",
      period: "Nov 2023 – Present",
      highlights: [
        {
          label: "TradingChart.org LMS",
          description:
            "Built a production LMS (Laravel 12, React 19, PostgreSQL) featuring JaaS/Jitsi live classes, a real-time support desk on Laravel Reverb, SSLCommerz BDT/USD payments, Bunny CDN video delivery, and a companion React Native app.",
          link: { text: "TradingChart.org", url: "https://tradingchart.org" },
        },
        {
          label: "DirectMalaysia.com SPA",
          description:
            "Built and deployed an e-commerce SPA (Laravel, Inertia.js, React/TypeScript) and managed the production Linux/Nginx server.",
          link: { text: "DirectMalaysia.com", url: "https://directmalaysia.com" },
        },
        {
          label: "Magic LMS & CodeCanyon Suite",
          description:
            "Developed Magic LMS, approved on Envato CodeCanyon, with Stripe, PayPal, and SSLCommerz integration, and maintained 6+ commercial CodeCanyon products.",
        },
        {
          label: "Mentorship & Code Standards",
          description:
            "Mentored 3 junior developers and reviewed pull requests, establishing team standards for Laravel architecture, Git workflow, and automated testing.",
        },
        {
          label: "Agile Delivery",
          description:
            "Collaborated in a shared Git workflow with feature branches and peer code reviews, with sprint tasks managed in Trello.",
        },
      ],
    },
    {
      id: "pondit",
      role: "Software Developer",
      company: "PONDIT",
      location: "Uttara, Dhaka, Bangladesh",
      period: "Jan 2023 – Oct 2023",
      highlights: [
        {
          label: "Bangladesh Air Force Inventory System",
          description:
            "Developed mission-critical modules for an inventory management system utilized by the Bangladesh Air Force.",
        },
        {
          label: "Military Rank RBAC Security",
          description:
            "Built granular Role-Based Access Control (RBAC) ensuring each military rank views and mutates only authorized operational data.",
        },
        {
          label: "Agile Sprint Execution",
          description:
            "Delivered 3 major feature modules in Agile sprints, working closely with the client's in-house development team.",
        },
        {
          label: "Full-Stack Bug Resolution",
          description:
            "Resolved 70+ bugs across the Laravel backend and Blade/jQuery frontend, improving system reliability and response times.",
        },
      ],
    },
  ] as ExperienceItem[],

  education: [
    {
      degree: "Bachelor of Science in Computer Science and Engineering (CSE)",
      institution: "IUBAT – International University of Business Agriculture and Technology",
      location: "Uttara, Dhaka, Bangladesh",
      period: "2017 – 2022",
      gpa: "3.01 / 4.00",
      coursework: [
        "Data Structures",
        "Algorithms",
        "Computer Architecture",
        "Web Development",
        "Database Management Systems",
        "Object-Oriented Programming (OOP)",
      ],
      projects:
        "Developed a collaborative School Management System and an individual Shop Inventory Management System with full CRUD and reporting features using Laravel.",
    },
  ] as EducationItem[],

  certifications: [
    {
      title: "Web Development (Laravel, PHP, JavaScript)",
      issuer: "BASIS-SEIP Training Program",
      location: "Uttara, Dhaka, Bangladesh",
      period: "Aug 2022 – Jan 2023",
      highlights: [
        "Completed intensive, industry-standard training focused on backend development using Laravel, PHP, and JavaScript.",
        "Gained practical experience in developing dynamic web applications and REST APIs.",
        "Covered best practices in clean coding, debugging, and production project deployment.",
      ],
    },
  ] as CertificationItem[],

  languages: [
    { language: "Bengali", level: "Native / Bilingual Proficiency" },
    { language: "English", level: "Professional Working Proficiency (Fluent)" },
  ] as LanguageItem[],
};
