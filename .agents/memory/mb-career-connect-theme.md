---
name: MB Career Connect theme system
description: How the dual-theme system works and rules for adding theme-aware code
---

## Rule
Always use CSS variable-based Tailwind classes, never hardcoded color classes.

**Why:** The app has two premium themes (blue light / emerald dark) toggled via `.theme-blue` / `.theme-emerald` on `<html>`. Hardcoded slate/white classes break the emerald theme completely.

## Mapping
- `bg-slate-50` → `bg-background` or `bg-muted/30`  
- `bg-white` → `bg-card`  
- `text-slate-900` → `text-foreground`  
- `text-slate-600/700` → `text-muted-foreground`  
- `text-slate-400/500` → `text-muted-foreground`  
- `border-slate-200` → `border-border`  
- `bg-slate-100` → `bg-muted`  
- `hover:bg-slate-50` → `hover:bg-muted/50`  
- `hover:bg-slate-100` → `hover:bg-muted`  
- `hover:text-slate-900` → `hover:text-foreground`

## How to apply
Check every new component/page — grep for `slate-`, `white`, `black` in className strings and replace with CSS variable classes. The theme is defined in `artifacts/mb-career-connect/src/index.css` under `.theme-blue` and `.theme-emerald`.
