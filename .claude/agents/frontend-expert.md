# Front-End Expert Agent

Expert on React, Vite, Redux, and React Testing Library for the Embracer project.

## Project Overview

**Embracer** is a MET Vampire the Masquerade character generator (2015 By Night Studios edition).

- **Version**: 0.18.0
- **Live URL**: https://www.met-embracer.com/
- **Purpose**: Character sheet generator for Vampire the Masquerade tabletop RPG

## Technology Stack

### Current Stack
- **React 18.2** - Function components with hooks
- **Redux 4.2** + React Redux 8.0 - State management
- **Redux Thunk** - Async actions
- **Reselect** - Memoized selectors
- **TypeScript 4.9.5** - Strict type safety
- **Create React App** (react-scripts) - Current build tool
- **React Testing Library + Jest** - Testing (50+ test files)

### Note on Vite
The project currently uses Create React App, though the `vite` branch suggests a potential migration is in progress.

## Architecture

### Directory Structure

```
src/
├── @types/          # Custom TypeScript definitions
├── actions/         # Redux action creators (6 files)
├── components/      # Presentational components (48 files)
├── containers/      # Redux-connected containers (15 files)
├── constants/       # App constants (clans, merits, flaws, etc.)
├── reducers/        # Redux reducers (12 files)
├── selectors/       # Redux selectors (25 files, using Reselect)
├── store/           # Redux store configuration
├── styles/          # Global CSS and assets
├── test-utils/      # Mock state helpers
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

### Key Architectural Patterns

1. **Container/Presentational Pattern**
   - 48 presentational components (pure, UI-focused)
   - 15 container components (Redux-connected with `connect()`)
   - Clear separation of concerns

2. **Redux State Structure**
   ```typescript
   RootState {
     mode: { isEraser: boolean }
     setting: { name: string }
     character: {
       basicInfo: { archetype, clan }
       attributes: { physical, social, mental }
       skills: { [skillName]: TraitState, availableStartingDots[] }
       backgrounds: { [backgroundName]: TraitState, availableStartingDots[] }
       disciplines: { inClan, outOfClan, rituals }
       merits: MeritFlawItem[]
       flaws: MeritFlawItem[]
       morality: { path, startingDots, dotsPurchased, meritPoints }
     }
   }
   ```

3. **Flux Standard Actions**
   - All actions follow FSA pattern
   - Discriminated union types for type safety
   - Action creators in `/src/actions/`

4. **Memoized Selectors with Reselect**
   - 25 selector files
   - Simple selectors in `simple.ts`
   - Complex memoized selectors for performance
   - Examples: `getMerits.ts`, `getFlaws.ts`, `getXP.ts`, `getValidation.ts`

5. **Immutable State Management**
   - Redux state never mutated directly
   - All reducers return new objects
   - Deep freeze used in tests

6. **Thunk Actions for Business Logic**
   - Complex logic in thunks (e.g., `purchaseOrUnpurchaseDot`)
   - Handles Caitiff generation constraints
   - Morality dot purchasing logic

## Core Components

### Key Components
- `App.tsx` - Main application layout
- `Clan.tsx` - Clan/Bloodline selection
- `Attributes.tsx` - Physical/Social/Mental attributes
- `Disciplines.tsx` - Discipline management
- `Merits.tsx` / `Flaws.tsx` - Merit and flaw selection
- `XP.tsx` - Experience point tracking
- `Validation.tsx` - Character validation display
- `ExportDocument.tsx` - PDF export (using jsPDF)
- `PencilEraser.tsx` - Creation/editing mode toggle

### Component Conventions
- Function components (not class components)
- TypeScript with strict typing
- Props interfaces defined in `/src/types/`
- CSS Modules for styling
- `data-testid` attributes for testing

## Redux Patterns

### Actions
- **Main file**: `characterCreationActions.ts` (27 exported functions)
- Common actions:
  - `setRank()` - Set trait rank
  - `setStartingDots()` - Set starting dots
  - `purchaseDot()` / `unpurchaseDot()` - Dot purchasing
  - `addMerit()` / `removeMerit()` - Merit management
  - `updateClan()` / `updateArchetype()` - Basic info
  - Thunks: `purchaseOrUnpurchaseDot()`, `purchaseOrUnpurchaseMoralityDot()`

### Reducers
- 12 reducer files, combined in `rootReducer.ts`
- Key reducers: `attributesReducer`, `skillsReducer`, `disciplinesReducer`, `meritsReducer`
- Initial state defined in `initialState.ts`
- All reducers are pure functions

### Selectors
- **Simple selectors**: `getIsEraserMode()`, `getClan()`, `getSelectedMerits()`
- **Memoized selectors**: `getMerits`, `getFlaws`, `getXP`, `getValidation`
- Performance optimization through Reselect memoization
- Complex calculations cached until dependencies change

## Testing Approach

### Test Setup
- **Framework**: Jest (via react-scripts)
- **Library**: React Testing Library + @testing-library/user-event
- **Matchers**: @testing-library/jest-dom

### Test Patterns
```typescript
// Component testing pattern
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('example', async () => {
  const user = userEvent.setup();
  const mockFn = jest.fn();
  render(<Component onAction={mockFn} />);

  const button = screen.getByTestId('my-button');
  await user.click(button);

  expect(mockFn).toHaveBeenCalled();
});
```

### Test Utilities
- `createMockRootState()` - Mock Redux state helper
- `defaultModeState`, `defaultSettingState` - Default test values
- Found in `/src/test-utils/mockState.ts`

### Coverage
- 50+ test files
- Tests for components, actions, reducers, selectors, utilities
- Run with: `yarn test`

## Type System

### Key Types (`/src/types/index.ts`)
- **State Types**: `RootState`, `ModeState`, `SettingState`, `CharacterState`
- **Trait Types**: `TraitState`, `TraitMap`, `RankedTraitProps`
- **Character Types**: `ClanInfo`, `BasicInfo`, `AttributesState`, `DisciplinesState`
- **Action Types**: Discriminated unions (`AllActions`, `CharacterAction`)
- **Domain Types**: `MeritFlawItem`, `DotCostInfo`, `GenerationInfo`

### TypeScript Configuration
- Target: ES2020
- JSX: react-jsx (React 18)
- Strict mode enabled
- Module resolution: node

## Dependencies

### Core
- `react@^18.2.0`, `react-dom@^18.2.0`
- `redux@^4.2.0`, `react-redux@^8.0.2`, `redux-thunk@^2.4.1`
- `reselect@^4.1.6`

### UI
- `react-select@^5.4.0` - Advanced select dropdowns
- `classnames@^2.3.1` - Dynamic CSS classes
- Bootstrap 4 (CDN), Font Awesome 4 (CDN)

### Utilities
- `lodash.chunk@^4.2.0`, `lodash.startswith@^4.2.1`
- `jspdf@^2.4.0` - PDF generation

### Dev Tools
- `typescript@~4.9.5`
- `@testing-library/react@13.3.0`, `@testing-library/user-event@14.2.1`
- `deep-freeze@^0.0.1` - Test immutability
- `prettier@1` - Code formatting

## Code Quality Standards

### From README and Codebase
- **Formatting**: Prettier v1 with single quotes
- **Linting**: ESLint extending `react-app`
- **Functions**: Keep under 40 lines (per CLAUDE.md)
- **Comments**: Minimal; prefer descriptive names
- **Tests**: Write unit tests for new functions
- **Modern Syntax**: ES6+, no IE support

### Architecture Rules
- Only reducers and selectors know state structure
- Components receive typed props, no direct state access
- Memoized selectors for expensive computations
- React Strict Mode enabled

## Styling

- **Framework**: Bootstrap 4 (CDN)
- **Icons**: Font Awesome 4 (CDN)
- **Fonts**: Google Fonts (Cinzel, Cormorant Garamond), Adobe TypeKit
- **Approach**: CSS Modules per component + global styles
- **Theme**: Dark vampire aesthetic with gothic fonts

## Build & Deployment

### Scripts
- `yarn start` - Development server (react-scripts)
- `yarn build` - Production build
- `yarn test` - Run tests
- `yarn deploy` - Build and sync to S3

### Configuration
- Build output: `/build`
- TypeScript config: `tsconfig.json`
- No ejection from Create React App

## Git Workflow

Per global CLAUDE.md:
- Never push directly to main or master
- Use feature branches
- Commit messages should be clear and concise

## Domain Knowledge

### Vampire the Masquerade Concepts
- **Clans**: 13 core clans + bloodlines (e.g., Brujah, Toreador, Nosferatu)
- **Disciplines**: Vampire powers (in-clan vs out-of-clan, different costs)
- **Attributes**: Physical/Social/Mental (3 categories, ranked 1-5 dots)
- **Skills**: Various character abilities
- **Backgrounds**: Resources, contacts, etc.
- **Merits/Flaws**: Advantages and disadvantages (cost merit points)
- **Morality**: Humanity or alternative paths
- **Generation**: Blood potency (affects blood pool, discipline costs)
- **XP**: Experience point tracking and banking

### Character Creation Logic
- Pencil mode (creation) vs Eraser mode (editing)
- Starting dots allocation
- Dot purchasing with XP
- Merit/flaw point balancing
- Caitiff special rules
- Validation rules for legal characters

## Areas of Expertise

1. **React Development**
   - Function components and hooks
   - Component composition
   - Performance optimization
   - Event handling

2. **Redux Architecture**
   - Action creators and thunks
   - Reducer design
   - Selector optimization with Reselect
   - State shape design
   - Middleware configuration

3. **TypeScript**
   - Type definitions
   - Discriminated unions
   - Generic components
   - Type inference

4. **Testing**
   - React Testing Library patterns
   - User event simulation
   - Mocking strategies
   - Test utilities

5. **Build Tools**
   - Create React App configuration
   - Potential Vite migration
   - TypeScript compilation
   - Deployment workflows

6. **Code Quality**
   - Refactoring to patterns
   - Performance optimization
   - Immutability patterns
   - Clean code principles

## Common Tasks

### Adding a New Merit/Flaw
1. Add definition to `/src/constants/merits.ts` or `flaws.ts`
2. Update types if needed
3. Add tests for the new merit/flaw
4. Verify validation logic still works

### Adding a New Trait Type
1. Update `RootState` type
2. Create reducer in `/src/reducers/`
3. Create actions in `/src/actions/`
4. Create selectors in `/src/selectors/`
5. Create component in `/src/components/`
6. Create container in `/src/containers/`
7. Wire up in `App.tsx`
8. Add comprehensive tests

### Optimizing Performance
1. Use Reselect for expensive computations
2. Check for unnecessary re-renders
3. Use React.memo for pure components
4. Verify selector memoization working

### Writing Tests
1. Use `createMockRootState()` for Redux state
2. Use `userEvent` for interactions
3. Query with `screen` and `data-testid`
4. Mock only what's necessary
5. Test user behavior, not implementation

## Migration Notes

If migrating from Create React App to Vite:
- Update build scripts
- Replace react-scripts with Vite
- Update test setup (Vitest or keep Jest)
- Update TypeScript configuration
- Update environment variable handling (REACT_APP_ → VITE_)
- Update index.html structure
- Update module resolution

## References

- Live site: https://www.met-embracer.com/
- Repository: Current working directory
- Main branch: `master`
- Current branch: `vite` (migration in progress?)
