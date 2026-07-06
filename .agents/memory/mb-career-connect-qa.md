---
name: MB Career Connect QA patterns
description: Patterns established during the frontend QA audit — mobile filters, search/filter logic, dead-link fixes.
---

# MB Career Connect QA Patterns

## Mobile collapsible sidebar (Jobs/Internships)
Use CSS-only conditional visibility so desktop is always shown and mobile toggles:
```jsx
const [filtersOpen, setFiltersOpen] = useState(false);
// Toggle button: aria-expanded={filtersOpen}, aria-controls="<id>"
<div id="<id>" className={filtersOpen ? 'block' : 'hidden lg:block'} aria-hidden={!filtersOpen}>
  {/* filter content */}
</div>
```
**Why:** AnimatePresence with `|| true` is always truthy — sidebar never collapses. CSS `hidden lg:block` handles desktop-always-visible + mobile-collapsible cleanly without JS overhead.

## Search + filter pattern (Courses, Mentors)
Use `useMemo` to derive filtered list from both `activeCategory` and `query`:
```tsx
const filtered = useMemo(() => {
  let list = category === 'All' ? items : items.filter(i => i.category === category);
  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(i => i.title.toLowerCase().includes(q) || ...);
  }
  return list;
}, [category, query]);
```
Always add an empty state with a "Clear filters" button. Wrap the grid in `<AnimatePresence mode="wait">` keyed on `${category}-${query}`.

## Category filter strings must match data exactly
The CATEGORIES array in Courses.tsx must use values that match `course.category` in the data file exactly (e.g. "Digital Marketing" not "Marketing"). Mismatches silently return zero results.

## Dead-link audit results
- `/resume-builder`, `/ats-checker`, `/cover-letter`, `/salary-calculator`, `/cgpa-calculator`, `/interview-prep`, `/career-roadmaps`, `/apply` — all have ComingSoon routes in App.tsx. Safe to link to.
- Resources.tsx cards used to link to `/apply` with "Download PDF" text — corrected to per-category routes.

## Form autoComplete attributes (Auth.tsx)
- Login email: `autoComplete="email"`
- Login password: `autoComplete="current-password"`
- Register first name: `autoComplete="given-name"`
- Register last name: `autoComplete="family-name"`
- Register email: `autoComplete="email"`
- Register phone: `autoComplete="tel"`
- Register password: `autoComplete="new-password"`
