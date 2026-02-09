# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Embracer is a MET Vampire the Masquerade character generator (2015 edition, By Night Studios). It is a React 18 + TypeScript SPA using Redux for state management, built with Vite and deployed to AWS S3.

## Commands

- `yarn start` - Dev server (port 3000, HMR)
- `yarn build` - Type-check (`tsc -b`) then production build
- `yarn test` - Run all tests once (Vitest)
- `yarn test:watch` - Run tests in watch mode
- `npx vitest run src/path/to/file.test.ts` - Run a single test file
- `yarn lint` - ESLint
- `yarn prettify` - Prettier (v1, single quotes)

## Architecture

**React + Redux with Container/Presentational pattern:**

- `src/containers/` - Redux-connected components using `connect()` with `mapStateToProps`/`mapDispatchToProps`
- `src/components/` - Presentational function components receiving props
- `src/reducers/` - Redux reducers (combined in `index.ts`)
- `src/selectors/` - Reselect memoized selectors; simple accessors in `simple.ts`
- `src/actions/` - Flux Standard Actions; thunks for logic requiring state access
- `src/constants/` - Action types, character/clan/setting game data, merits, flaws
- `src/utils/` - Domain-specific utilities (dot purchasing, XP calc, PDF export, etc.)
- `src/types/index.ts` - Comprehensive TypeScript types for the entire Redux state tree

**Key architectural rule:** Only reducers and selectors should know the exact state structure. Components access state exclusively through selectors.

**Redux state shape:**

```text
RootState
├── mode (isEraser toggle for pencil/eraser mode)
├── setting (game setting name)
└── character
    ├── basicInfo (archetype, clan)
    ├── attributes (physical, social, mental)
    ├── skills, backgrounds, disciplines, merits, flaws, morality
```

## Styling

- CSS Modules (`.module.css`) for component-scoped styles
- Bootstrap 4 via CDN for grid layout (not npm)
- Font Awesome v4 (not v5)
- Custom fonts: Cinzel, Cormorant Garamond

## Conventions

- Function components only (no class components); hooks are fine
- Flux Standard Actions pattern for Redux actions
- React Strict Mode enabled (except react-select)
- Use `it()` alias (not `test()`) in test files
- Tests use `@testing-library/react` with `userEvent.setup()` and `vi.fn()` for mocks
- Prettier v1 with single quotes
- Yarn (not npm)
- Modern browsers only (no IE support)
