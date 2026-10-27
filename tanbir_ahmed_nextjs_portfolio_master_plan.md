# Tanbir Ahmed — Next.js Frontend Portfolio Master Plan & Architecture Specification

> **Purpose of this Document**: This is the complete, production-ready architectural blueprint, animation specification, content repository, and step-by-step **Antigravity CLI** implementation guide for building **Tanbir Ahmed's** personal developer portfolio (`tanbir.nixsoftware.net`).

## 1. Executive Vision & Positioning Strategy

Most developer portfolios look like generic templates with static skill bars and basic project cards. To stand out to international hiring managers, CTOs, and technical founders, this portfolio positions **Tanbir Ahmed** around his real-world engineering differentiators:

1. **Financial Correctness & Money-Safe Engineering**: Highlighting idempotent payment webhooks, append-only double-entry ledgers, decimal-only arithmetic, and pessimistic row-level stock locking.

2. **Real-Time Distributed Concurrency**: Showcasing live production architectures built with **Laravel Reverb WebSockets**, **Horizon**, **Redis Pub/Sub**, **Celery**, and **JaaS/Jitsi** live classrooms.

3. **Full-Lifecycle Production Ownership**: Demonstrating end-to-end capability from normalized relational schema design (**PostgreSQL**, **MySQL**, **MariaDB**) and decoupled **Next.js 16 / React 19 / Django / Laravel** backends to hardened **Ubuntu VPS** infrastructure (**Nginx**, **Fail2ban**, **Cloudflare Strict TLS**, **GitHub Actions CI/CD**) backed by **847+ automated tests**.

## 2. Core Tech Stack (Frontend-Only Architecture)

Since this portfolio is a standalone **Next.js Frontend**, it requires zero database maintenance while feeling like a live, reactive system:

| Layer | Technology / Library | Purpose | 
| ----- | ----- | ----- | 
| **Framework** | `Next.js 16` (App Router, Static Export / Edge Ready) | Core routing, SEO metadata, optimized image rendering, and fast page loads | 
| **Language** | `TypeScript 5.x` | Strict type safety for project data, skill matrices, and animation props | 
| **Styling** | `Tailwind CSS v4` + `clsx` + `tailwind-merge` | Utility-first styling, custom CSS variables, dark/light theme tokens | 
| **Primary Animation** | `Motion` (`framer-motion` / `motion/react`) | Layout animations, spring physics, shared layout transitions, and gesture interactions | 
| **Scroll & Timeline** | `GSAP` (`gsap` + `@gsap/react` + `ScrollTrigger`) | Pinned horizontal scroll sections, SVG path drawing, and boot sequence choreography | 
| **Smooth Scroll** | `Lenis` (`lenis`) | Silky-smooth inertial scrolling synced with GSAP ScrollTrigger | 
| **UI Primitives** | `shadcn/ui` + `Radix UI` | Accessible modals/drawers for architecture deep-dives, tooltips, tabs, and badges | 
| **Command Menu** | `cmdk` | Interactive `Cmd + K` / `Ctrl + K` developer command palette | 
| **Icons** | `lucide-react` + `@icons-pack/react-simple-icons` | Crisp UI icons and official brand SVGs for Laravel, Next.js, Django, React, Redis, Docker | 
| **3D / WebGL** | `cobe` (5KB WebGL Globe) | Interactive rotating globe pinning client deployments in **Bangladesh** and **Canada** | 

## 3. Recommended Animation Libraries & Visual Component References

When implementing each section with **Antigravity**, reference these curated component patterns for high visual impact:

### A. Best Component Registries to Use

| Library / Registry | Reference URL | Best Components to Use in Tanbir's Portfolio | 
| ----- | ----- | ----- | 
| **Magic UI** | `https://magicui.design` | **Animated Beam** (to visualize API -> Queue -> DB data flow), **Orbiting Circles** (for tech stack galaxy), **Number Ticker** (counting up to `847` tests), **Bento Grid**, **Hyper Text**, **Marquee**, **Border Beam** | 
| **Aceternity UI** | `https://ui.aceternity.com` | **Tracing Beam** (vertical career timeline), **3D Card Effect** (project cards), **Floating Dock** (macOS-style navigation), **Spotlight** (hero lighting), **Container Scroll Animation**, **Compare Slider** | 
| **React Bits** | `https://reactbits.dev` | **Decrypted Text** (terminal title reveal), **Magnet** (magnetic CTA buttons), **Spotlight Card** (cursor-tracking radial border cards), **Star Border**, **Split Text** | 
| **Motion Primitives** | `https://motion-primitives.com` | **Text Effect**, **Morphing Dialog** (click a project card to expand smoothly into a full architectural case study), **Animated Background** (sliding tab indicators) | 

### B. Aesthetic & Portfolio Inspiration References

* **Linear.app / Raycast.com**: Dark obsidian surfaces (`#090D16`), 1px translucent borders (`border-white/10`), radial mouse-tracking spotlights, and keyboard-first navigation (`Cmd + K`).

* **Dennis Snellenberg Portfolio**: Smooth SVG curve preloader curtain, magnetic buttons, and kinetic scroll velocity text.

* **Paco Coursey / Rauno Freiberg**: Minimalist high-craft engineering interactions, monospace metadata, and tactile sound/visual feedback.

## 4. Preloader & Global Visual Effects Catalog

You can implement one (or a combination) of these three preloader concepts during Phase 2:

### Option 1: The "Production Server & CI/CD Boot" Preloader (Recommended)

* **Concept**: Reflects your identity as a Full-Stack & DevOps engineer who deploys hardened VPS infrastructure and writes 847+ automated tests.

* **Choreography (1.8 seconds total — skippable, runs once per session via `sessionStorage`)**:

  1. Screen starts in deep obsidian (`#060911`) with a centered monospace terminal block (`JetBrains Mono`).

  2. Rapid 3-line boot log animates in:

     * `[OK] Mounting Next.js 16 & React 19 Runtime...`

     * `[OK] Verifying 847 Automated Test Suites... PASSED`

     * `[OK] Establishing Reverb WebSocket & Ledger Integrity...`

  3. A large typographic counter in the bottom-right ticks from `00` to `100%` using `framer-motion` spring interpolation.

  4. At `100%`, the entire preloader panel slides upward (`y: "-100%"`) with a custom SVG quadratic bezier curve bottom edge that bends and snaps flat (`cubic-bezier(0.76, 0, 0.24, 1)`), revealing the Hero section underneath.

### Option 2: Multilingual Greeting + SVG Curve Curtain

* **Concept**: Cycles rapidly through greetings (`স্বাগতম` • `Hello` • `السلام عليكم` • `Welcome to Tanbir.dev`) in the center of the screen over 1.4 seconds, then lifts upward with a smooth liquid SVG path morph.

### Option 3: Architectural Blueprint Grid Draw

* **Concept**: Fine 1px technical grid lines animate across the screen (`strokeDashoffset: 1 -> 0`), locking into the exact Bento Grid containers of the Hero section before fading in the content.

### Global Visual Polish & Effects Across the Site

1. **Mouse-Tracking Radial Spotlight Cards**: Every skill card and project card tracks cursor coordinates (`--mouse-x`, `--mouse-y`) to illuminate a subtle `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.14), transparent 40%)` on the card surface and border.

2. **Animated Border Beams**: Featured projects (*Sultan Big Bazaar* and *Fur & Feather BD*) use a traveling glowing gradient border beam (`Magic UI BorderBeam`) to draw immediate eye attention.

3. **Interactive `Cmd + K` Command Palette**: Pressing `Cmd + K` (or clicking the header shortcut badge) opens a sleek developer palette with instant actions:

   * `Jump to Featured Projects`

   * `Explore Interactive Skills Matrix`

   * `Download ATS Resume (.PDF / .DOCX)`

   * `Copy Email (ahmedtanbir442@gmail.com)`

   * `Open GitHub (github.com/tdottahmed)`

   * `Open LinkedIn (linkedin.com/in/tanbir-ahmed07)`

   * `Toggle Dark / Light Mode`

4. **Magnetic Buttons & Contextual Cursor**: Primary CTA buttons gently pull toward the cursor within a 40px radius (`React Bits Magnet`). Hovering over a project screenshot morphs the cursor into a floating `"View Architecture ↗"` pill.

## 5. Design System & Color Tokens

| Token Name | CSS Variable / Hex | Usage | 
| ----- | ----- | ----- | 
| **Background Primary** | `#070A12` (Obsidian Night) | Main viewport canvas | 
| **Background Elevated** | `#0F1624` / `rgba(15, 22, 36, 0.75)` | Bento cards, skill pods, and glassmorphic modals | 
| **Text Primary** | `#F8FAFC` (Slate 50) | Main headings, project titles, and primary copy | 
| **Text Secondary** | `#94A3B8` (Slate 400) | Bullet descriptions, summaries, and context paragraphs | 
| **Text Muted / Technical** | `#64748B` (Slate 500) | Dates, locations, monospace labels, and architectural tags | 
| **Accent Primary (Tech Blue)** | `#3B82F6` (Blue 500) | Primary CTAs, active skill filters, Next.js / React highlights | 
| **Accent Secondary (Laravel)** | `#F43F5E` (Rose 500) | Laravel, Reverb, Horizon, and backend highlights | 
| **Accent Emerald (Finance/Django)** | `#10B981` (Emerald 500) | Financial ledger badges, "Available for Hire" pulse, 847 tests badge | 
| **Border Subtle** | `rgba(148, 163, 184, 0.12)` | Default 1px card borders | 
| **Display & Sans Font** | `Inter` or `Plus Jakarta Sans` | Headings (`font-bold tracking-tight`) and body copy | 
| **Monospace Font** | `JetBrains Mono` | Tech stack badges, metrics, code snippets, and dates | 

## 6. Section-by-Section Architecture & Complete Content Plan

### Section 1: Sticky Glassmorphic Header & Floating Dock

* **Top Navbar**:

  * **Left**: Monospace brand mark `tanbir.dev` with a live status pill: `🟢 Available for Full-Stack Opportunities`.

  * **Center**: Smooth-scroll navigation links (`Overview`, `Skills`, `Projects`, `Architecture`, `Experience`, `Contact`) with an animated sliding pill indicator (`motion.div` with `layoutId="activeNav"`).

  * **Right**: `Cmd + K` button, GitHub icon link, LinkedIn icon link, and a `Resume ↓` button with a shimmer border.

### Section 2: Hero Section (Executive Positioning + Live Metrics)

* **Visual Layout**: 12-column asymmetric split (7 columns left for narrative + CTAs, 5 columns right for an interactive "Production System Telemetry" Bento widget).

* **Exact Copy**:

  * **Eyebrow Badge**: `FULL-STACK SOFTWARE ENGINEER • DHAKA, BANGLADESH`

  * **Main Headline**: `Engineering Money-Safe Marketplaces, Real-Time WebApps & Hardened Cloud Systems.`

  * **Subheadline**: `Full-Stack Developer with 3.5+ years of production experience building high-concurrency platforms in Laravel, Django, Next.js, and React. Specializing in idempotent payment pipelines, append-only double-entry ledgers, real-time WebSockets, and automated CI/CD.`

  * **Primary CTA**: `Explore Production Projects ↓` (Magnetic button with shimmer effect)

  * **Secondary CTA**: `Download ATS Resume` + `Copy Email (ahmedtanbir442@gmail.com)` (with instant toast & checkmark animation)

* **Hero Metrics Bar (Animated `NumberTicker` on viewport entry)**:

  * **`3.5+`** Years Production Experience

  * **`5+`** Live Commercial Platforms Shipped (Bangladesh & Canada)

  * **`847`** Automated Unit & Integration Tests (Sultan Big Bazaar)

  * **`6+`** Commercial Products Maintained on Envato CodeCanyon

  * **`70+`** Critical Production Bugs Resolved in Defense & Enterprise Systems

* **Right-Column Interactive Widget ("Live Architecture Telemetry")**:

  * A sleek tabbed glassmorphic card showing 3 interactive micro-views:

    1. **System Flow**: Animated beams (`Magic UI AnimatedBeam`) connecting `Next.js 16 / React 19` → `Laravel 12 / Django DRF` → `Redis / Reverb / Celery` → `PostgreSQL / MySQL`.

    2. **Global Footprint**: A lightweight `Cobe` 3D WebGL Globe with glowing pins over **Dhaka, Bangladesh** (*Imjol IT, PONDIT, Sultan Big Bazaar, Fur & Feather BD*) and **Canada** (*Zamzam Import & Export Inc.*).

    3. **Terminal Card**: Interactive mini-terminal where visitors can type `help`, `skills`, `projects`, or `contact`.

### Section 3: Individualized Skills & Tools Showcase ("Interactive Skill Explorer")

> **Design Goal**: Address the exact requirement to **highlight every single skill and tool individually** with rich visual hierarchy and interactive filtering—never hiding skills in plain text blocks.

* **Interactive Controls**:

  * **Category Filter Tabs** (with `layoutId` sliding background pill):
    `All Tools (38)` | `Languages (6)` | `Backend & APIs (7)` | `Frontend & Mobile (7)` | `Databases & Concurrency (6)` | `DevOps & VPS (7)` | `Testing & AI Workflow (8)`

  * **Search & Project Cross-Filter**: Clicking any skill badge reveals a tooltip and badge showing **which production projects use that exact tool**!

* **Complete Individual Skill Cards Specification**:
  Each skill is rendered as an individual **Spotlight Tech Pod** featuring:

  1. Official SVG Brand Icon (colored on hover)

  2. Tool Name & Version (e.g., `Laravel 12 / 13`)

  3. Domain Category Tag

  4. Production Usage Context (e.g., *"Reverb WebSockets, Horizon Queues, SSO & Double-Entry Ledgers"*)

  5. Linked Project Pills (e.g., `TradingChart.org`, `Fur & Feather BD`, `Zamzam`)

| Category | Individual Skill / Tool | Version / Scope | Production Context & Highlight | 
| ----- | ----- | ----- | ----- | 
| **Languages** | **PHP** | `7.4 – 8.4` | Strict typing, OOP service layers, high-concurrency Laravel systems | 
| **Languages** | **Python** | `3.x` | Django modular monoliths, decimal financial logic, Celery workers | 
| **Languages** | **TypeScript** | `5.x` | Type-safe Next.js 16 storefronts, Inertia SPAs, and API contracts | 
| **Languages** | **JavaScript** | `ES6+` | Reactive UI state, WebSockets listeners, DOM & Blade/jQuery legacy fixes | 
| **Languages** | **SQL** | `PostgreSQL / MySQL` | Complex relational joins, composite indexing, row-level locking queries | 
| **Languages** | **Bash Scripting** | `Linux CLI` | Automated VPS provisioning, backup rotation, smoke test scripts | 
| **Backend & APIs** | **Laravel** | `v11 / v12 / v13` | Core enterprise framework across 5+ production platforms & CodeCanyon products | 
| **Backend & APIs** | **Laravel Reverb** | `WebSockets` | Real-time support desks, private doctor channels, live broadcast notifications | 
| **Backend & APIs** | **Laravel Horizon** | `Redis Queues` | Async job orchestration, SMS/email dispatch, queue telemetry | 
| **Backend & APIs** | **Django** | `Python Web` | 20-module multi-vendor marketplace architecture with unified service layer | 
| **Backend & APIs** | **Django REST Framework** | `DRF` | Token-secured RESTful APIs consumed by Next.js 16 storefronts | 
| **Backend & APIs** | **Celery** | `Distributed Tasks` | Background invoice generation, webhook retries, and scheduled tasks | 
| **Backend & APIs** | **HTMX** | `Server-Driven UI` | Fast reactive admin, vendor, and reseller portals without SPA overhead | 
| **Backend & APIs** | **RESTful APIs** | `OpenAPI / JSON` | Cross-repository SSO identity federation and third-party gateway integrations | 
| **Frontend & Mobile** | **React** | `React 19` | Component architecture, custom hooks, optimistic UI updates | 
| **Frontend & Mobile** | **Next.js** | `Next.js 16` | App Router, SSR/ISR e-commerce storefronts, SEO optimization | 
| **Frontend & Mobile** | **Inertia.js** | `Monolith SPA` | Single-Page Application speed paired with Laravel backend routing | 
| **Frontend & Mobile** | **Vue.js** | `Frontend UI` | Reactive interfaces and dynamic component state management | 
| **Frontend & Mobile** | **Tailwind CSS** | `v3 / v4` | Design systems, responsive layouts, dark mode, utility-first UI | 
| **Frontend & Mobile** | **React Native** | `Mobile App` | Companion cross-platform mobile learning app for TradingChart.org | 
| **Frontend & Mobile** | **WordPress & WooCommerce** | `Custom CMS` | Custom theme development, plugin engineering, and e-commerce customization | 
| **Databases & Concurrency** | **PostgreSQL** | `Relational DB` | Production database for TradingChart.org LMS with high read/write integrity | 
| **Databases & Concurrency** | **MySQL** | `Relational DB` | Core database for Fur & Feather BD, DirectMalaysia, and Zamzam B2B | 
| **Databases & Concurrency** | **MariaDB** | `Relational DB` | Powers Sultan Big Bazaar with strict ACID transaction isolation | 
| **Databases & Concurrency** | **Redis** | `In-Memory` | Query caching, distributed session management, Horizon/Celery broker, Pub/Sub | 
| **Databases & Concurrency** | **Row-Level Locking** | `ACID Concurrency` | `SELECT ... FOR UPDATE` stock reservation to prevent e-commerce overselling | 
| **Databases & Concurrency** | **Double-Entry Ledgers** | `Financial Integrity` | Append-only cash books & immutable audit logs feeding real-time P&L reports | 
| **DevOps & Cloud** | **Linux VPS** | `Ubuntu / Debian` | Hardened production server administration, SSH security, restricted sudo | 
| **DevOps & Cloud** | **Nginx** | `Reverse Proxy` | Virtual hosts, gzip/Brotli compression, rate limiting, SSL termination | 
| **DevOps & Cloud** | **Docker** | `Containers` | Consistent local and staging service orchestration | 
| **DevOps & Cloud** | **GitHub Actions** | `CI/CD Pipelines` | Automated test execution, zero-downtime deployment, and smoke tests | 
| **DevOps & Cloud** | **Supervisor & Systemd** | `Process Control` | Daemon management for Laravel Horizon, Reverb, and Celery workers | 
| **DevOps & Cloud** | **Cloudflare** | `DNS / WAF / TLS` | Strict TLS encryption, DNS automation via API, Let's Encrypt certs, CDN | 
| **DevOps & Cloud** | **Fail2ban** | `Server Hardening` | Automated intrusion prevention and brute-force IP banning on production VPS | 
| **Testing, Gateways & AI** | **PHPUnit & Pest PHP** | `Laravel Testing` | Feature, unit, and acceptance testing for financial and progression engines | 
| **Testing, Gateways & AI** | **Django Test Suite** | `847 Automated Tests` | Comprehensive test coverage across 20 domain modules in Sultan Big Bazaar | 
| **Testing, Gateways & AI** | **Payment Gateways** | `Stripe, PayPal, SSLCommerz` | Multi-currency (BDT/USD) checkout with signature-verified idempotent webhooks | 
| **Testing, Gateways & AI** | **JaaS / Jitsi & Bunny CDN** | `Live Video & Media` | Live interactive classroom streaming and secured video delivery | 
| **Testing, Gateways & AI** | **AI-Assisted Engineering** | `Claude, Cursor, Antigravity CLI, OpenCode` | Accelerated architecture prototyping, test generation, and refactoring | 

### Section 4: Featured Production Case Studies (Interactive Bento & Morphing Modal Cards)

* **Visual Presentation**:

  * Top 3 flagship platforms displayed as full-width interactive **Case Study Showcase Cards** with **BorderBeam**, live domain badges, tech stack pills, and an **"Inspect Architecture"** drawer trigger.

  * Additional 3 commercial platforms displayed in a 3-column **3D Tilt Grid** below.

#### Case Study 1: Sultan Big Bazaar — Multi-Vendor E-Commerce Marketplace

* **Period**: `Sep 2026 – Present`

* **Live URL**: `https://sultanbigbazaar.com/`

* **Tech Stack Badges**: `Django` · `DRF` · `Next.js 16` · `React 19` · `TypeScript` · `Redis` · `Celery` · `MariaDB` · `GitHub Actions`

* **Key Metric Badge**: `847 Automated Tests` | `20 Domain Modules`

* **Structured Bullet Highlights**:

  * **Decoupled Domain Architecture**: Engineered an enterprise marketplace combining a Next.js 16 storefront with Django + HTMX admin, seller, and reseller portals organized across 20 decoupled domain modules.

  * **Unified Service Layer**: Centralized all business rules in a single service layer shared by both the REST API and server-rendered portals so permissions are enforced in one place.

  * **Money-Safe Checkout & Auditing**: Enforced decimal-only calculations, server-side price totals, immutable purchase invoice snapshots, and an append-only audit log for every change to stock, money, or order status.

  * **Pessimistic Locking & Idempotent Webhooks**: Built a plug-in payment layer (Cash-on-Delivery, SSLCommerz) with signature-verified idempotent webhooks, row-level locks, and stock reservations to eliminate overselling.

  * **Multi-Vendor & White-Label Reseller Network**: Added per-seller order splitting, dynamic commission rules, and a tiered B2B white-label reseller network with margin tracking.

  * **Hardened VPS & CI/CD**: Deployed to a hardened Ubuntu VPS (Cloudflare Strict TLS, Fail2ban, restricted sudo) via GitHub Actions CI/CD backed by 847 automated tests.

#### Case Study 2: Fur & Feather BD — E-Commerce + Avian Community Platform

* **Period**: `Oct 2026 – Present`

* **Live URLs**: Shop: `https://furandfeatherbd.shop` | Community: `https://pakhi.community`

* **Tech Stack Badges**: `Laravel 13` · `Next.js 16` · `React 19` · `MySQL` · `Redis` · `Reverb` · `Horizon` · `Tailwind v4`

* **Key Metric Badge**: `3 Linked Repositories (SSO)` | `13-Rank Progression Engine`

* **Structured Bullet Highlights**:

  * **Distributed Multi-Repo SSO**: Built a complete bird-care platform from start to finish comprising a Laravel REST API, a custom admin panel, and two Next.js frontends (shop and community) sharing one unified user identity across 3 repositories.

  * **Real-Time WebSockets & Queues**: Engineered real-time support cases, broadcast notifications, and a veterinarian inbox on Laravel Reverb WebSockets with private channels; background queues run on Horizon with email and SMS alerts.

  * **Double-Entry Financial Cash Book**: Designed an append-only, double-entry style ledger where orders, donations, and reseller payouts post automatically to feed real-time P&L, balance sheet, and trend reports.

  * **13-Rank Member Progression Engine**: Built a gamified progression engine featuring pre-screening, a 40-question weighted assessment algorithm, and automated certification covered by acceptance tests.

  * **Infrastructure Automation**: Automated VPS provisioning (Nginx, Supervisor, Let's Encrypt via Cloudflare API) and configured GitHub Actions CI/CD with smoke tests and scheduled backups.

#### Case Study 3: TradingChart.org — Live-Class Production LMS Platform

* **Period**: `Nov 2023 – Present (at Imjol IT)`

* **Live URL**: `https://tradingchart.org`

* **Tech Stack Badges**: `Laravel 12` · `React 19` · `PostgreSQL` · `Laravel Reverb` · `JaaS/Jitsi` · `SSLCommerz` · `Bunny CDN` · `React Native`

* **Key Metric Badge**: `Live Video Classrooms` | `Web + React Native App`

* **Structured Bullet Highlights**:

  * **Full-Stack LMS Architecture**: Architected and deployed a high-concurrency production Learning Management System using Laravel 12, React 19, and PostgreSQL.

  * **Interactive Live Classrooms & Media**: Integrated JaaS/Jitsi for live interactive video classes and Bunny CDN for high-speed course video streaming.

  * **Real-Time Support Desk**: Built an interactive student support desk powered by Laravel Reverb WebSockets.

  * **Multi-Currency Checkout & Mobile App**: Integrated SSLCommerz for BDT/USD payment processing and shipped a companion cross-platform React Native mobile application.

#### Case Study 4: Wholesale E-Commerce Platform — Zamzam Import & Export Inc.

* **Period**: `Jul 2025 – Jan 2026`

* **Live URL**: `https://zamzamcanada.com/` | **Repository**: `https://github.com/tdottahmed/zam-zam`

* **Tech Stack Badges**: `Laravel` · `React` · `Inertia.js` · `MySQL`

* **Key Metric Badge**: `B2B Wholesale (Canada)` | `Open-Source Repo Available`

* **Structured Bullet Highlights**:

  * **B2B Bulk Commerce**: Engineered a wholesale platform for a Canadian import/export enterprise enabling high-volume bulk ordering and streamlined corporate transactions.

  * **Warehouse & Inventory Systems**: Built scalable product catalog and inventory management modules in Laravel with dynamic ordering workflows.

  * **Reactive SPA & Query Tuning**: Delivered a responsive React + Inertia.js frontend alongside enterprise client authentication, role-based access control, and MySQL query optimization.

#### Case Study 5: https://www.google.com/url?sa=E&source=gmail&q=DirectMalaysia.com — E-Commerce Single-Page Application

* **Period**: `Nov 2023 – Present (at Imjol IT)`

* **Live URL**: `https://directmalaysia.com`

* **Tech Stack Badges**: `Laravel` · `Inertia.js` · `React` · `TypeScript` · `Linux / Nginx VPS`

* **Structured Bullet Highlights**:

  * **Reactive E-Commerce SPA**: Built and deployed a fast Single-Page Application storefront using Laravel, Inertia.js, and React/TypeScript, and managed the production Linux/Nginx server at 99.9% uptime.

#### Case Study 6: Magic LMS & Commercial Envato CodeCanyon Portfolio

* **Period**: `Nov 2023 – Present (at Imjol IT)`

* **Marketplace**: `Envato CodeCanyon`

* **Tech Stack Badges**: `Laravel` · `PHP` · `Stripe` · `PayPal` · `SSLCommerz`

* **Structured Bullet Highlights**:

  * **Commercial Product Approval**: Developed Magic LMS, passing strict code review for commercial approval on Envato's CodeCanyon marketplace with Stripe, PayPal, and SSLCommerz integrations, while maintaining 6+ commercial products.

### Section 5: Interactive "Engineering Deep-Dive" Widget Section

To make the portfolio unforgettable, include a 3-tab interactive visual simulator right below the projects:

1. **Tab 1: How I Build Money-Safe Checkouts**:

   * An interactive flow diagram showing a simulated checkout click → `Signature Verification` → `Idempotency Key Check` → `Row-Level Stock Lock (SELECT FOR UPDATE)` → `Decimal-Only Ledger Append` → `Invoice Snapshot Created`. Visitors can click **"Simulate Concurrent Order"** to see how row-level locking prevents overselling!

2. **Tab 2: Real-Time WebSockets Architecture**:

   * Shows how **Laravel Reverb** + **Horizon** + **Redis** broadcast instant events to **Next.js / React** clients across private channels.

3. **Tab 3: Hardened VPS & CI/CD Pipeline**:

   * Visual pipeline showing `Git Push` → `GitHub Actions (847 Tests)` → `Zero-Downtime Deploy` → `Ubuntu VPS (Cloudflare Strict TLS + Fail2ban + Nginx + Supervisor)`.

### Section 6: Work Experience & Career Timeline (`Aceternity TracingBeam`)

* **Visual Effect**: A glowing vertical SVG beam traces down the left side of the timeline as the user scrolls.

#### 1. Software Developer — Imjol IT

* **Timeline**: `Nov 2023 – Present` | **Location**: `Uttara, Dhaka, Bangladesh`

* **Bullets**:

  * **Platform Architecture**: Architected and deployed **TradingChart.org**, a production LMS (Laravel 12, React 19, PostgreSQL) with JaaS/Jitsi live classes, Laravel Reverb support desk, SSLCommerz BDT/USD payments, Bunny CDN video delivery, and a companion React Native app.

  * **E-Commerce SPA & Infrastructure**: Built and deployed **https://www.google.com/url?sa=E&source=gmail&q=DirectMalaysia.com** (Laravel, Inertia.js, React/TypeScript) and managed the production Linux/Nginx server.

  * **Commercial CodeCanyon Products**: Developed **Magic LMS** (approved on Envato CodeCanyon) with Stripe, PayPal, and SSLCommerz integrations, and maintained 6+ CodeCanyon products.

  * **Technical Mentorship**: Mentored 3 junior developers and reviewed pull requests, setting team standards for Laravel architecture, Git workflows, and automated testing.

  * **Agile Collaboration**: Worked in a shared Git workflow with feature branches and code reviews, managing sprint tasks in Trello.

#### 2. Software Developer — PONDIT

* **Timeline**: `Jan 2023 – Oct 2023` | **Location**: `Uttara, Dhaka, Bangladesh`

* **Bullets**:

  * **Defense Inventory Modules**: Developed core modules for an inventory management system used by the **Bangladesh Air Force**.

  * **Granular Military RBAC**: Built Role-Based Access Control (RBAC) ensuring each military rank views and mutates only authorized data.

  * **Agile Feature Delivery**: Delivered 3 major feature modules across Agile sprints in close collaboration with the client's in-house development team.

  * **Bug Resolution & Optimization**: Fixed 70+ bugs across the Laravel backend and Blade/jQuery frontend, improving stability and speed.

### Section 7: Education, Certifications & Languages (Bento Cards)

* **Card 1: Academic Degree**

  * **Degree**: Bachelor of Science in Computer Science and Engineering (CSE)

  * **University**: IUBAT — International University of Business Agriculture and Technology (*Uttara, Dhaka, Bangladesh*)

  * **Timeline**: `2017 – 2022` | **CGPA**: `3.01 / 4.00`

  * **Coursework Badges**: `Data Structures` · `Algorithms` · `Computer Architecture` · `Web Development` · `DBMS` · `OOP`

  * **Academic Projects**: Collaborative School Management System & individual Shop Inventory Management System with full CRUD and reporting in Laravel.

* **Card 2: Professional Certification**

  * **Program**: Web Development (Laravel, PHP, JavaScript) — **BASIS-SEIP Training Program**

  * **Timeline**: `Aug 2022 – Jan 2023` | **Location**: `Uttara, Dhaka, Bangladesh`

  * **Highlights**: Completed intensive industry-standard backend engineering training covering Laravel, PHP, JavaScript, REST APIs, clean coding, debugging, and deployment.

* **Card 3: Spoken Languages**

  * **Bengali**: Native / Bilingual Proficiency

  * **English**: Professional Working Proficiency (Fluent technical & business communication)

### Section 8: Contact & Footer Section

* **Interactive Contact Card**:

  * One-click **"Copy Email"** button (`ahmedtanbir442@gmail.com`) with confetti burst / toast confirmation.

  * Direct WhatsApp / Phone trigger (`+880 1876-525073`).

  * Direct links to **LinkedIn** (`linkedin.com/in/tanbir-ahmed07`), **GitHub** (`github.com/tdottahmed`), and **Download Resume (.PDF / .DOCX)**.

  * Client-side contact form (integrates cleanly with Formspree, Web3Forms, or Resend Server Action).

## 7. Complete Ready-to-Use Data File (`src/data/portfolio.ts`)

When starting with **Antigravity**, drop this file directly into `src/data/portfolio.ts` so all components are immediately typed and populated with your real data:

```
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
  highlights: { label: string; description: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: { label: string; description: string; link?: { text: string; url: string } }[];
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
  ],

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
  ],

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
  ],

  languages: [
    { language: "Bengali", level: "Native / Bilingual Proficiency" },
    { language: "English", level: "Professional Working Proficiency (Fluent)" },
  ],
};

```

## 8. Recommended Folder Structure (Next.js 16 App Router)

```
tanbir-portfolio/
├── public/
│   ├── resume/
│   │   └── Tanbir_Ahmed_Resume_ATS.pdf
│   └── images/
│       └── projects/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Inter & JetBrains Mono fonts, Lenis provider, SEO metadata
│   │   ├── page.tsx                # Main portfolio composition
│   │   └── globals.css             # Tailwind v4 + custom spotlight & scrollbar utilities
│   ├── components/
│   │   ├── preloader/
│   │   │   └── TerminalPreloader.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── FloatingDock.tsx
│   │   │   └── CommandMenu.tsx     # Cmd+K palette
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SkillsExplorer.tsx  # Individualized filterable spotlight cards
│   │   │   ├── ArchitectureSimulator.tsx # Interactive Checkout/WebSocket visualizer
│   │   │   ├── ProjectsShowcase.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── EducationBento.tsx
│   │   │   └── ContactFooter.tsx
│   │   └── ui/                     # Magic UI, Aceternity UI & shadcn primitives
│   │       ├── BentoGrid.tsx
│   │       ├── BorderBeam.tsx
│   │       ├── SpotlightCard.tsx
│   │       ├── NumberTicker.tsx
│   │       ├── AnimatedBeam.tsx
│   │       ├── TracingBeam.tsx
│   │       └── MagneticButton.tsx
│   └── data/
│       └── portfolio.ts            # Complete typed data from Section 7
├── package.json
└── tsconfig.json

```

## 9. Step-by-Step Implementation Plan for Antigravity CLI

When you are ready to build this step by step in **Antigravity**, execute these 7 sequential phases:

### Phase 1: Project Initialization & Design System Setup

* **Goal**: Scaffold Next.js 16 with TypeScript, Tailwind CSS v4, `motion`, `gsap`, `lenis`, `lucide-react`, `cmdk`, and configure `Inter` + `JetBrains Mono` fonts.

* **Deliverables**:

  * Base project structure + `src/data/portfolio.ts` loaded.

  * Dark obsidian theme variables, subtle background grid pattern, and smooth scrolling (`Lenis`) wrapper.

### Phase 2: Terminal Preloader, Sticky Navbar & `Cmd + K` Command Palette

* **Goal**: Build the first impression and navigation layer.

* **Deliverables**:

  * `TerminalPreloader.tsx` with the 3-step boot sequence, `0 -> 100%` counter, and SVG bezier curve curtain exit.

  * Sticky glassmorphic `Navbar.tsx` with active section indicator and live availability badge.

  * `CommandMenu.tsx` (`Cmd + K`) with quick navigation, one-click email copy, and resume download.

### Phase 3: Hero Section & Interactive Telemetry Bento Widget

* **Goal**: Build the high-converting Hero section.

* **Deliverables**:

  * Split Hero layout with kinetic typography reveal, magnetic CTA buttons, and `NumberTicker` counters (`3.5+`, `5+`, `847`, `6+`, `70+`).

  * Interactive right-hand widget with `AnimatedBeam` stack visualization and `Cobe` 3D globe showing Bangladesh & Canada deployments.

### Phase 4: Individualized Skills & Tools Explorer (`SkillsExplorer.tsx`)

* **Goal**: Highlight every single skill and tool individually.

* **Deliverables**:

  * Category filter bar (`All`, `Languages`, `Backend & APIs`, `Frontend & Mobile`, `Databases & Concurrency`, `DevOps & VPS`, `Testing & Workflow`) with `layoutId` spring transitions.

  * 36+ individual `SpotlightCard` pods with official SVG icons, version badges, production usage descriptions, and interactive project cross-linking pills.

### Phase 5: Featured Production Projects & Interactive Architecture Modals

* **Goal**: Showcase *Sultan Big Bazaar*, *Fur & Feather BD*, *TradingChart.org*, *Zamzam Wholesale*, *https://www.google.com/url?sa=E&source=gmail&q=DirectMalaysia.com*, and *Magic LMS*.

* **Deliverables**:

  * Flagship project cards with `BorderBeam`, live site links, GitHub repo links, and a "Deep-Dive Architecture" drawer/modal.

  * Interactive "Money-Safe Checkout & WebSockets Simulator" widget demonstrating row-level locking and idempotent webhooks visually.

### Phase 6: Tracing Beam Career Timeline & Education Bento Grid

* **Goal**: Present **Imjol IT** and **PONDIT (Bangladesh Air Force RBAC)** work experience alongside **IUBAT CSE** education and **BASIS-SEIP** certification.

* **Deliverables**:

  * Scroll-driven SVG `TracingBeam` timeline with structured bold-label bullets.

  * 3-card Bento grid for Education, Certifications, and Languages.

### Phase 7: Interactive Contact Section, SEO Metadata & Performance Audit

* **Goal**: Finalize conversion touchpoints, OpenGraph cards, and 100/100 Lighthouse performance.

* **Deliverables**:

  * One-click email copy with toast notification, WhatsApp direct trigger, and downloadable ATS resume button.

  * `prefers-reduced-motion` accessibility guards and responsive mobile dock refinement.