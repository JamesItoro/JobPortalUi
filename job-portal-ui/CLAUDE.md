# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Vite dev server
- `npm run build` — Production build
- `npm run lint` — ESLint (flat config, JS/JSX only)
- `npm run preview` — Preview production build

## Architecture

React 19 SPA using Vite 7, Tailwind CSS 4, and React Router 7. No TypeScript — plain JSX throughout.

### State Management

Two layers of React Context:

- **`src/context/`** — Core contexts: `AuthContext` (auth + dummy users + localStorage persistence), `JobContext` (applications, saved jobs, employer job CRUD), `ThemeContext`
- **`src/contexts/`** — Data-fetching contexts: `JobsDataContext` (cached job list with 5-min TTL), `CompaniesContext`

Provider nesting order (in App.jsx): AuthProvider → JobsDataProvider → JobProvider → CompaniesProvider → ThemeProvider

### Data Layer

Currently uses **mock data** with localStorage persistence — no real backend. Services in `src/services/` simulate async API calls using `delay()` from `src/utils/delay.js`. Data originates from `src/data/mockData.js`.

Key localStorage keys: `jobPortalUser`, `authToken`, `registeredUsers`, `globalPostedJobs`, `jobApplications_{userId}`, `savedJobs_{userId}`, `postedJobs_{userId}`.

### Routing & Roles

Three roles with route protection via `ProtectedRoute` component:
- **ROLE_JOB_SEEKER** — profile, applied-jobs, saved-jobs
- **ROLE_EMPLOYER** — post-job, employer/jobs, job-applicants/:jobId
- **ROLE_ADMIN** — admin/*, admin pages in `src/pages/admin/`

### Key Libraries

- Font Awesome + Lucide React for icons
- react-toastify for notifications

### ESLint

Flat config (`eslint.config.js`). The `no-unused-vars` rule ignores variables starting with uppercase or underscore (`varsIgnorePattern: '^[A-Z_]'`).

## Git Workflow

- **Commit messages**: imperative mood, concise subject line (≤72 chars), blank line before a longer body if needed (e.g. `fix: correct saved-jobs localStorage key`). Prefer [Conventional Commits](https://www.conventionalcommits.org/) prefixes (`feat`, `fix`, `refactor`, `chore`, `docs`, `test`) where it adds clarity.
- **Branching**: never commit directly to `main`. Create a feature/fix branch (`feat/<short-desc>`, `fix/<short-desc>`) and open a PR.
- **Small, focused commits**: one logical change per commit; don't bundle unrelated fixes.
- **Before committing**: run `npm run lint` and confirm `npm run build` succeeds.
- **Never commit**: `node_modules/`, `dist/`, `.env*` files, `.DS_Store`, or other secrets/build artifacts — keep `.gitignore` current.
- **Never rewrite published history**: no `git push --force` / `--force-with-lease` to `main`, no `git rebase -i` or amending commits that are already pushed and shared.
- **Review before pushing**: check `git status` and `git diff --staged` so only intended files are included.
- **Pull requests**: clear title, summary of what/why, and a test plan; link related issues.
