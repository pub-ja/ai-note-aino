# Gemini Project Notes: AINO

This document summarizes the key technical details and modifications for the AINO project for future reference by the Gemini assistant.

## Project Overview

- **Purpose:** A study project to build a chatbot interface.
- **Technology Stack:** React, Vite, TypeScript, and **Tailwind CSS v4**.

## Summary of Major Refactoring

This project underwent a significant refactoring to fix a broken build configuration and to migrate from legacy CSS to modern Tailwind CSS practices.

### 1. Tailwind CSS v4 Configuration Fix

The initial problem was that Tailwind styles were not being applied. This was due to an incorrect project setup for Tailwind CSS v4. The following steps were taken to fix it:

- **Uninstalled `@tailwindcss/postcss`** and **installed the correct v4 package: `@tailwindcss/vite`**.
- **Updated `vite.config.ts`** to use the `@tailwindcss/vite` plugin.
- **Updated `src/index.css`** to use the correct v4 directive: `@import "tailwindcss";` (while keeping the custom font import).
- **Removed the `content` array** from `tailwind.config.js` as it's now auto-detected by the Vite plugin.
- **Deleted the unnecessary `postcss.config.js`** file.

### 2. Component Refactoring: `src/components/layout/AppContainer.tsx`

The main application component was refactored to use Tailwind CSS utility classes instead of legacy, BEM-style classes (e.g., `ka-chatbot__...`).

- **Layout:** The entire component layout, including the header, sidebar, and main content, is now controlled by Tailwind's flexbox and spacing utilities.
- **Styling:** All colors, fonts, borders, shadows, and hover states are applied directly in the JSX using Tailwind classes.

### 3. Key Logic and State Management

The following UI logic is managed within `AppContainer.tsx` using React's `useState` hook:

- `isChatOpen`: Controls the visibility of the main chat window. Defaults to `false`.
- `isFullScreen`: Toggles the fullscreen mode for the chat window.
- `isMenuOpen`: Toggles the visibility of the slide-out side menu.
- **Push/Overlay Menu:** The side menu correctly overlays the content in normal mode and "pushes" the content in fullscreen mode, as per the original design.

## Development Notes

- To run the project, use `npm run dev`.
- **Important:** If you make changes to configuration files like `vite.config.ts` or `tailwind.config.js`, you must **restart the dev server** for the changes to take effect.
