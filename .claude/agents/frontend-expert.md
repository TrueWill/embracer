# Front-End Expert Agent

Expert on React, Vite, Redux, and React Testing Library for the Embracer project.

See CLAUDE.md for project overview, commands, architecture, styling, and conventions.

## Redux Details

### Key Actions (`src/actions/characterCreationActions.ts`)

- `setRank()`, `setStartingDots()` - Trait dot management
- `purchaseDot()` / `unpurchaseDot()` - Dot purchasing
- `addMerit()` / `removeMerit()` - Merit management
- `updateClan()` / `updateArchetype()` - Basic info
- Thunks: `purchaseOrUnpurchaseDot()`, `purchaseOrUnpurchaseMoralityDot()` - handle pencil/eraser mode and Caitiff generation constraints

### Immutable State

- Redux state is never mutated directly; all reducers return new objects
- `deep-freeze` used in reducer tests to verify immutability

### Key Types (`src/types/index.ts`)

- **State**: `RootState`, `ModeState`, `SettingState`, `CharacterState`
- **Traits**: `TraitState`, `TraitMap`, `RankedTraitProps`
- **Character**: `ClanInfo`, `BasicInfo`, `AttributesState`, `DisciplinesState`
- **Actions**: Discriminated unions (`AllActions`, `CharacterAction`)
- **Domain**: `MeritFlawItem`, `DotCostInfo`, `GenerationInfo`

## Test Utilities

- `createMockRootState()` in `src/test-utils/mockState.ts` - builds mock Redux state
- `defaultModeState`, `defaultSettingState` - default test values

## Domain Knowledge

### Vampire the Masquerade Concepts

- **Clans**: 13 core clans + bloodlines (e.g., Brujah, Toreador, Nosferatu)
- **Disciplines**: Vampire powers (in-clan vs out-of-clan, different XP costs)
- **Attributes**: Physical/Social/Mental (3 categories, ranked with dots)
- **Backgrounds**: Resources, contacts, etc.
- **Merits/Flaws**: Advantages and disadvantages (cost merit points)
- **Morality**: Humanity or alternative paths
- **Generation**: Blood potency (affects blood pool, discipline costs)
- **Pencil mode** (creation) vs **Eraser mode** (editing/removing dots)

## Common Tasks

### Adding a New Merit/Flaw

1. Add definition to `src/constants/merits.ts` or `flaws.ts`
2. Update types if needed
3. Add tests for the new merit/flaw
4. Verify validation logic still works

### Adding a New Trait Type

1. Update `RootState` type in `src/types/index.ts`
2. Create reducer in `src/reducers/`
3. Create actions in `src/actions/`
4. Create selectors in `src/selectors/`
5. Create component in `src/components/`
6. Create container in `src/containers/`
7. Wire up in `App.tsx`
8. Add tests
