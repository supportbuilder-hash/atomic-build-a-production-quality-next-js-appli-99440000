# AGENTS.md

Project conventions for AI agents and humans editing this codebase.

## Original request
Build a production-quality Next.js application called "LaunchHub", a SaaS platform where users can create, manage, and deploy websites.

The application should contain:

AUTHENTICATION

* Sign up
* Login
* Logout
* Forgot password
* Protected routes
* User profile

DASHBOARD

* Overview
* Project statistics
* Recent projects
* Recent activity
* Usage metrics

PROJECTS

* Create project
* Rename project
* Delete project
* Duplicate project
* Search projects
* Filter projects
* Sort projects
* Project details page using a dynamic route

WEBSITE BUILDER

* Website preview
* Pages list
* Components list
* Basic theme settings
* Color customization
* Typography settings
* Save changes
* Undo/redo

TEAM COLLABORATION

* Invite members
* Team member list
* Roles: Owner, Editor, Viewer
* Activity feed
* Comments

BILLING

* Free plan
* Pro plan
* Enterprise plan
* Monthly/yearly toggle
* Usage limits
* Upgrade/downgrade UI
* Billing history

ADMIN

* Users
* Projects
* Subscriptions
* Usage
* Activity logs

TECHNICAL REQUIREMENTS

* Next.js App Router
* TypeScript
* Reusable components
* Proper server/client component separation
* API abstraction layer
* Form validation
* Loading states
* Error states
* Empty states
* Responsive design
* Dark/light mode
* Accessible UI
* SEO metadata
* Dynamic routes
* 404 page
* Proper error boundaries

IMPORTANT:

* Do not create fake buttons that do nothing.
* Every interactive element should have a meaningful behavior.
* Do not duplicate components unnecessarily.
* Do not put the entire application into one file.
* Keep business logic separate from presentation.
* Use realistic mock data where a backend is unavailable.
* Handle API failures gracefully.
* Make the application build successfully.
* Before finishing, inspect the generated code for TypeScript errors, broken imports, hydration issues, missing dependencies, invalid Next.js patterns, and broken routes.
* Fix discovered issues before completing the task.

## Goal
Build the LaunchHub homepage and shared app infrastructure (layout, nav, footer, motion system, mock data) as a single buildable Next.js App Router core, with all remaining SaaS pages (auth, dashboard, projects, builder, team, billing, profile, admin) queued as suggested follow-up pages.

## Project type
other

## Design system — match this exactly
- Color tokens: `--background: #FAFAF9`, `--foreground: #181B20`, `--card: #FFFFFF`, `--border: #E4E4E0`, `--muted-foreground: #63666D`, `--primary: #4F46E5`, `--accent: #F97316`
- Fonts: Inter

## Existing components — reuse these, don't create near-duplicates
- Footer (components/Footer.tsx)
- LanguageToggle (components/LanguageToggle.tsx)
- LocaleProvider (components/LocaleProvider.tsx)
- Navbar (components/Navbar.tsx)

## Existing i18n namespaces
Every translation key must be namespaced (`hero.title`, never a bare `title`) so two components never collide on the same catalog slot. Reuse one of these, or pick a new, distinct name:
`footer`, `nav`

When editing or adding pages: preserve the design system above, reuse existing components and the shared nav data file, and keep the established structure and tone.
