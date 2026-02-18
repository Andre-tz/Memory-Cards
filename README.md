# MatchFlip - Memory Cards

MatchFlip is my **Level 2 frontend project**, built after my Habit Tracker (Level 1).
The goal was to move beyond a basic app and practice stronger architecture, state management, internationalization, and testing in a real interactive product.

## Project Overview

MatchFlip is a memory card game where users select a difficulty level and complete timed matching rounds.
The project focuses on clean component structure, reusable game logic, and a portfolio-ready implementation using modern React tooling.

## Core Features

- Memory card gameplay with flip-and-match logic
- Four difficulty levels: `easy`, `medium`, `hard`, `godMode`
- Pre-game countdown and difficulty-based game timer
- Victory, timeout, and give-up result flows via modals
- Theme switching (normal / code mode)
- Internationalization with runtime language switching (`es` / `en`)
- Audio feedback for key interactions (match, mismatch, countdown)
- `localStorage` persistence for basic user/session data

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- i18next + react-i18next
- Vitest + Testing Library
- Sonner (toast notifications)

## Testing

Current test coverage includes helper utilities and UI behavior in:

- `src/tests/Header.test.tsx`
- `src/tests/Footer.test.tsx`
- `src/tests/getInitialTime.test.ts`
- `src/tests/getRandomImages.test.ts`
- `src/tests/changeMmSs.test.ts`

## Engineering Focus

This project was used to practice:

- Shared state management with Context and custom hooks
- Separation of game logic into reusable helpers/hooks
- Scalable i18n setup instead of hardcoded text
- UI feedback patterns (countdowns, toasts, modals, sounds)
- Test-driven validation of critical logic paths

## Run Locally

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run test       # Run tests in watch mode
npm run test:run   # Run tests once
npm run test:ui    # Open Vitest UI
```

## Status and Roadmap

Current status: functional and deployable for portfolio use.

Planned improvements:

- Expand test coverage for full gameplay flows
- Improve accessibility (roles, labels, keyboard support)
- Refine mobile UX and interaction polish
- Add basic performance metrics

## Next Project (Level 3)

My next step is an ecommerce frontend that consumes real APIs and includes a deeper testing strategy (unit + integration + basic e2e).
