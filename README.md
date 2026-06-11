# Portfolio App Documentation

Welcome to the documentation for Praja Lohphinesti Subiarto's Portfolio Web Application. This document provides an overview of the project's structure, flow, and key technologies used to build the website.

## 🚀 Overview
This project is a single-page personal portfolio designed to showcase skills, projects, education, and contact information. It features a modern, cosmic-themed dark design with chromatic bubble animations, custom cursors, and smooth scroll-reveal animations.

## 🛠️ Tech Stack
-   **Frontend Library:** React (via Vite)
-   **Styling:** Tailwind CSS (Utility-first CSS framework)
-   **Animations:** Framer Motion (`motion/react`)
-   **Language:** TypeScript
-   **State Management:** React Context API (for multi-language support)

## 📂 Project Structure
The project is modularly structured to ensure clean separation of concerns:

```text
/
├── public/                 # Static public assets (e.g., icons, fonts)
├── src/
│   ├── components/         # Reusable structural and UI components
│   │   ├── AboutAndEducation.tsx  # Timeline and information section
│   │   ├── BackgroundElements.tsx # Chromatic animated background rings
│   │   ├── Contact.tsx            # Contact form and social links
│   │   ├── CustomCursor.tsx       # Custom mouse cursor implementation
│   │   ├── Hero.tsx               # Main landing view with gradient text
│   │   ├── Navbar.tsx             # Top navigation bar
│   │   ├── Projects.tsx           # Portfolio projects showcase
│   │   ├── ScrollReveal.tsx       # Wrapper for reveal-on-scroll animations
│   │   ├── Skills.tsx             # Grid layout showcasing technical skills
│   │   ├── Stats.tsx              # Number/metrics highlights
│   │   └── profile.jpeg           # Developer's profile image
│   │
│   ├── contexts/
│   │   └── LanguageContext.tsx    # Context API for handling localization (en)
│   │
│   ├── pages/              # (Empty) as it is currently a single-page app
│   │
│   ├── App.tsx             # Main layout, combines all components
│   ├── index.css           # Global stylesheets and Tailwind CSS entry
│   └── main.tsx            # React application entry point
│
├── package.json            # NPM Dependencies and scripts
├── vite.config.ts          # Vite build and development configuration
├── tsconfig.json           # TypeScript compilation settings
└── README.md               # Project documentation (this file)
```

## 🔄 Application Flow
1.  **Entry Point (`main.tsx`):**
    The app boots up here, rendering the `<App />` component into the root DOM node.
2.  **State Initialization (`App.tsx` & `LanguageContext.tsx`):**
    -   The entire app is wrapped inside the `<LanguageProvider>`, which manages the dictionary (translations) and current active language state (default: English).
    -   Global decorative components like `<CustomCursor />` and `<BackgroundElements />` are mounted persistently underneath the varying content.
3.  **UI Layout (`App.tsx`):**
    -   The `<Navbar />` provides sticky top-level navigation.
    -   The `<main>` tag acts as a sequential layout wrapper for all sections.
4.  **Section Rendering & Animations:**
    -   Sections (`<Hero />`, `<Stats />`, `<AboutAndEducation />`, etc.) are rendered in order.
    -   Every section is wrapped with `<ScrollReveal />` (except where specifically omitted), allowing the sections to elegantly fade in and slide up when they enter the viewport during scrolling.

## 🎨 Visual Design & Theme
-   **Theme:** Modern, cosmic-dark minimalist aesthetic (`bg-[#050505]`).
-   **Background:** Implements unique chromatic animated bubbles (utilizing inset shadows scaling across colors like purple, blue, pink, and cyan) using Framer Motion to float seamlessly in the background.
-   **Typography:** Combines sleek, legible sans-serif fonts for the body with bold, gradient-clipped display lettering for main headings.
-   **Interactivity:** Smooth hovers, active transition states, and a custom trailing cursor to enhance the premium feel of the app.

## 🧩 Components Overview
-   **`ScrollReveal.tsx`:** A reusable Framer Motion wrapper. It uses `whileInView` to trigger the opacity and vertical transformation when the user scrolls the element into sight.
-   **`BackgroundElements.tsx`:** Responsible for the floating gradient ORBs and subtle grain filters on the background overlay, avoiding any DOM-blocking layers.
-   **Localization Context:** The application features a built-in i18n object holding translation structures (even though it defaults to English now, the implementation supports easy toggling).
