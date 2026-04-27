# UI Foundation Decision Record

Date: 2026-04-27
Status: Accepted for first implementation slice

## Goal

Adopt a `shadcn` + Base UI driven screen-building approach that fits the current monorepo and speeds up screen creation without collapsing package boundaries.

## Confirmed Decisions

### Shared UI ownership

- Keep low-level shared UI primitives in `libs/ui`.
- Keep page and route composition in `apps/web`.

### Theme direction

- Move toward `shadcn`-style token conventions rather than preserving the current semantic token contract unchanged.
- `libs/ui` owns the canonical base theme CSS.
- `apps/web` imports the shared stylesheet explicitly.
- Shared base theme should be brand-neutral.
- Product branding should live in thin app-level overrides.

### Generation strategy

- Generate `shadcn` components directly into `libs/ui`.
- Keep generated code close to upstream output where practical.
- Commit and maintain a stable `shadcn` configuration as a repo contract.
- Treat generated files as starting points, then own them intentionally after adoption.

### Base UI role

- Do not build a separate custom Base UI foundation layer first.
- Stay close to current `shadcn` output, with the understanding that Base UI has already superseded Radix UI in modern `shadcn` usage.

### Initial component scope

- First slice is the form-and-overlay core:
  - `button`
  - `input`
  - `label`
  - `textarea`
  - `select`
  - `dialog`
  - `popover`

### Import and package conventions

- Use a package-local alias strategy for generated code rather than app-local `@/` imports.
- Keep a curated root export surface for `@dark-factory/ui`.
- Do not expose generated internals as the primary public API.
- Keep `@dark-factory/ui` source-exported for the first vertical slice.
- Defer a build pipeline until the package shape settles.

### Dependency policy

- Declare component runtime dependencies directly in `libs/ui`.
- Keep `react` and `react-dom` as peer dependencies.

### CSS packaging

- Expose one canonical stylesheet entry from `@dark-factory/ui`.
- Import that stylesheet once from the app root.

### Validation bar

- A new or refactored component is acceptable after:
  - package typecheck passes
  - one real app integration use exists

### Delivery scope

- Execute one vertical slice.
- Do not stop at scaffolding.
- Carry the first pass through to a working landing-page refactor.

### Migration strategy

- Refactor existing shared components onto the new foundation during the landing-page pass.
- Do not leave the old shared components untouched beside the new stack.

### Reuse level in `@dark-factory/ui`

- `@dark-factory/ui` should be primitive-plus-pattern, not primitives only.
- Include reusable layout and section patterns.
- Do not include full app screens as shared package artifacts.
- Patterns should be opinionated but parameterized, with replaceable content slots.
- Organize patterns generically by default.
- Introduce domain-named patterns only after the same domain shape repeats at least twice.

### Form strategy

- Standardize on one form stack for app screens.
- Keep low-level inputs reusable outside the form stack.
- Chosen stack: TanStack Form + Zod.
- Keep TanStack Form adapters in `apps/web`.
- `@dark-factory/ui` should stop at form-aware presentation primitives, not form-library adapters.

### First-pass form consistency

- Do not create a shared field-shell contract in `@dark-factory/ui` yet.
- Ad hoc field composition was accepted for the first slice.
- That decision was later softened by requiring one canonical reference form screen to serve as the composition example.

## Unresolved Decision

### Canonical reference form screen

- We agreed to use one canonical reference form screen as the guardrail for first-pass ad hoc field composition.
- The specific screen was not chosen before the session stopped.
- Candidate options discussed:
  - settings or preferences form with mixed field types and one confirmation dialog
  - create or edit entity form with validation and primary submit flow
  - profile or account form with simple validation

## First Implementation Slice

1. Add stable `shadcn` config for monorepo generation into `libs/ui`.
2. Add package-local alias support for generated `libs/ui` code.
3. Move canonical shared theme CSS into `libs/ui`.
4. Expose one stylesheet entry from `@dark-factory/ui`.
5. Generate the initial form-and-overlay component set into `libs/ui`.
6. Curate root exports for approved components only.
7. Refactor existing shared landing-page components onto the new foundation.
8. Update `apps/web` to import shared CSS explicitly and consume the curated package API.
9. Validate with package typecheck and real app integration.

## Explicit Non-Goals For This Slice

1. No immediate build pipeline for `@dark-factory/ui`.
2. No attempt to make `@dark-factory/ui` publish-ready yet.
3. No shared TanStack Form adapters in `@dark-factory/ui` yet.
4. No full-screen templates in the shared package.
5. No domain-specific pattern naming unless reuse is proven twice.
