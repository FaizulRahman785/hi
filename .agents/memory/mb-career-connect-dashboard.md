---
name: MB Career Connect dashboard pattern
description: How to add coming-soon content inside the Dashboard layout
---

## Rule
Never render `<ComingSoon>` directly inside `<DashboardLayout>`.

**Why:** `ComingSoon` renders a full page with its own `<Navbar>` and `<Footer>`. Nesting it inside `DashboardLayout` (which also has Navbar/Footer) produces double navigation bars and a broken layout.

## How to apply
Use the lightweight `DashboardComingSoon` component defined in `Dashboard.tsx` for all dashboard sub-page placeholders. It renders only icon + badge + title + description + action buttons — no Navbar/Footer.
