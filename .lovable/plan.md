

# Interactive 3D Hero Section — Plan

## Concept

Replace the current static hero with an **interactive 3D scene** using **React Three Fiber** (Three.js for React). A floating geometric shape (wireframe icosahedron or torus knot) reacts to mouse movement, surrounded by orbiting particles. The name "Harris Benadict. A" stays as a large serif overlay with the existing scroll-fade behavior.

## What Changes

### 1. New dependency
- Install `@react-three/fiber` and `@react-three/drei` (helper library for common 3D patterns)

### 2. New component: `src/components/HeroScene.tsx`
- A `<Canvas>` containing:
  - **Wireframe icosahedron** (or torus knot) — slowly auto-rotates, tilts toward cursor position
  - **Orbiting small spheres** — 8-12 tiny glowing dots orbiting the main shape
  - **Subtle ambient + point lights** — minimal, matching the dark portfolio aesthetic
  - Mouse tracking via `useFrame` + pointer state — shape gently follows cursor
  - Monochrome/white palette to match existing design

### 3. Update `HeroSection.tsx`
- Replace the static `hero-3d.png` image with `<HeroScene />` in the same area
- Keep the name overlay, tagline, CTA button, and scroll-fade logic untouched
- The 3D canvas sits behind the text as a visual centerpiece

### 4. Keep existing elements
- `ParticleField` (canvas background) stays as-is
- `CursorGlow` stays
- `LoadingScreen` stays
- All scroll animations preserved

## Technical Notes

- React Three Fiber renders inside a `<Canvas>` div — sized to fill the hero area
- Performance: use low polygon counts and `<AdaptiveDpr>` from drei to auto-adjust quality
- Mobile: disable mouse tracking on touch devices; keep auto-rotation only
- The 3D shape uses `MeshStandardMaterial` with wireframe or `MeshBasicMaterial` for a clean look

