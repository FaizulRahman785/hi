---
name: MB Career Connect page headers
description: The established pattern for premium inner page headers across all routes
---

## Rule
All inner pages use this header pattern for consistency with both themes:

```tsx
<div className="relative pt-28 pb-14 overflow-hidden" style={{ background: 'var(--hero-gradient)' }}>
  <div className="aurora-orb aurora-orb-1 absolute w-96 h-96 top-[-40%] left-[-8%] opacity-50" />
  <div className="aurora-orb aurora-orb-2 absolute w-72 h-72 bottom-[-50%] right-[-5%] opacity-30" />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
  <div className="container mx-auto px-4 relative z-10">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* badge + h1 + p */}
    </motion.div>
  </div>
</div>
```

**Why:** `var(--hero-gradient)` switches between blue and emerald gradients automatically. Aurora orbs use `var(--orb-1)` / `var(--orb-2)` CSS variables. Consistent pt-28 clears the fixed navbar.
