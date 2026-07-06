# Project Setup Instructions

This project is a self-contained design system built on Living Design 3.5 tokens. Follow these steps to set up the project in a new environment.

## Prerequisites

- Node.js 18+
- pnpm (see `packageManager` field in `package.json` for exact version)

## Install Dependencies

```bash
pnpm install
```

### Core Dependencies

| Package | Purpose |
|---------|---------|
| `react`, `react-dom` | UI framework |
| `react-router-dom` | Client routing |
| `typescript` | Type safety |
| `vite`, `@vitejs/plugin-react-swc`, `@swc/core` | Build tooling |

### Design System Primitives

| Package | Purpose |
|---------|---------|
| `@radix-ui/react-*` (20+ packages) | Accessible headless UI primitives |
| `class-variance-authority` | Component variant management |
| `clsx`, `tailwind-merge` | Class name utilities |
| `tailwindcss`, `autoprefixer`, `postcss`, `tailwindcss-animate` | Styling framework |

### Feature Libraries

| Package | Purpose | Used By |
|---------|---------|---------|
| `cmdk` | Command palette | `command.tsx` |
| `date-fns` | Date formatting | `DatePicker.tsx` |
| `embla-carousel-react` | Carousel | `carousel.tsx` |
| `input-otp` | OTP input | `input-otp.tsx` |
| `lottie-react` | Lottie animations | `MartyAvatar.tsx` |
| `react-day-picker` | Calendar | `calendar.tsx` |
| `react-hook-form` | Form management | `form.tsx` |
| `react-resizable-panels` | Resizable panels | `resizable.tsx` |
| `recharts` | Charts/graphs | `chart.tsx` |
| `vaul` | Drawer/bottom sheet | `drawer.tsx`, `BottomSheet.tsx` |
| `i18next`, `react-i18next`, `i18next-browser-languagedetector` | Internationalization | App-wide |

### Server (Express backend)

| Package | Purpose |
|---------|---------|
| `express`, `cors`, `dotenv` | API server |
| `serverless-http` | Netlify deployment |

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Project Structure

```
client/
  App.tsx              - Entry point with routing
  global.css           - Global styles + theme imports
  styles/themes/       - LD 3.5 theme token files
  components/ui/       - Design system components
  features/marty/      - Marty assistant feature
  contexts/            - React contexts (Theme, Marty)
  locales/             - i18n translation files (en, es, fr)
  i18n.ts              - i18n initialization
public/
  fonts/               - Brand fonts (Everyday Sans, etc.)
  animations/          - Lottie animation JSONs
server/
  index.ts             - Express server
```
