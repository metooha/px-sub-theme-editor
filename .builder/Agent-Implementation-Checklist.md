---
title: Agent Implementation Checklist
scope: meta
status: draft
owner: design-system
last_updated: 2026-01-14
---

## MANDATORY PRE-IMPLEMENTATION CHECKLIST

Before implementing ANY UI component or feature, agents **MUST** complete this checklist:

### Step 1: Identify What You Need
- [ ] What UI element(s) does the user request require? (button, modal, input, etc.)
- [ ] What interaction patterns are needed? (form submission, navigation, data display, etc.)

### Step 2: Check Living Design Components FIRST
**STOP. Do NOT proceed with implementation until you complete this step.**

**FIRST: Check the Component Inventory**
- [ ] Open `/guidelines/Component-Inventory.md`
- [ ] Use CTRL+F / CMD+F to search for the component you need
- [ ] Check the status: ✅ Implemented, 📝 Guideline Only, ⚠️ Partial, or ❌ Not Available

For EACH UI element identified in Step 1:

1. **Check if a guideline exists**: Look in `/guidelines/` for `[ComponentName].md`
   - Example: Need a modal? Check `/guidelines/Modal.md`
   - Example: Need a button? Check `/guidelines/Button.md`

2. **If guideline exists**: 
   - [ ] Read the ENTIRE guideline file
   - [ ] Note the required props (open, onOpenChange, title, size, etc.)
   - [ ] Note the MUST and MUST NOT rules
   - [ ] Check if a Living Design component exists in `/components/ui/`
   - [ ] If component exists, USE IT. Do not create a new one.
   - [ ] If component does NOT exist, create one following the guideline EXACTLY

3. **If NO guideline exists**:
   - [ ] Check `/guidelines/overview-components.md` for general rules
   - [ ] Can you compose this from existing Living Design primitives?
   - [ ] If uncertain, ASK the user before proceeding

### Step 3: Check Design Tokens
- [ ] Review `/guidelines/design-tokens-overview.md`
- [ ] For colors: Check `/guidelines/Color.md` - MUST use CSS variables, NO hardcoded hex
- [ ] For spacing: Check `/guidelines/design-tokens/spacing.md` if it exists
- [ ] For typography: NO font-size or font-weight Tailwind classes unless user explicitly requests

### Step 4: Implementation
Only after completing Steps 1-3:
- [ ] Import the Living Design component from `/components/ui/`
- [ ] Use the component with props documented in the guideline
- [ ] Apply design tokens via CSS variables or documented className hooks
- [ ] Test accessibility (keyboard navigation, focus states, ARIA)

## Common Mistakes to Avoid

### ❌ DON'T DO THIS:
```tsx
// Using generic dialog when Living Design Modal exists
import { Dialog } from "./components/ui/dialog";

// Hardcoding colors instead of using tokens
<div className="bg-[#0053e2]">

// Creating custom components when Living Design versions exist
function MyCustomButton() { ... }
```

### ✅ DO THIS INSTEAD:
```tsx
// Check /guidelines/Modal.md, then use Living Design Modal
import { Modal } from "./components/ui/modal";

// Use CSS variables for colors
<div className="bg-[var(--color-primary)]">

// Or use the Living Design component
import { Button } from "./components/ui/button";
```

## Quick Reference: Where to Look

| Need | Check First | Then Check |
|------|-------------|------------|
| Any component | `/guidelines/[ComponentName].md` | `/components/ui/[componentname].tsx` |
| Colors | `/guidelines/Color.md` | `/styles/globals.css` for CSS variables |
| Layout spacing | `/guidelines/design-tokens-overview.md` | Token files in `/guidelines/` |
| Forms | `/guidelines/patterns/forms.md` | Individual input component guidelines |
| General rules | `/guidelines/Guidelines.md` | `/guidelines/overview-components.md` |

## Validation Questions

Before submitting your implementation, ask yourself:

1. **Did I check for an existing guideline?** Yes / No
2. **Did I use the Living Design component if it exists?** Yes / No / N/A
3. **Did I follow the guideline's MUST rules?** Yes / No / N/A  
4. **Am I using design tokens instead of hardcoded values?** Yes / No
5. **Did I avoid creating custom components for common UI elements?** Yes / No

If ANY answer is "No", STOP and revise your implementation.

## When to Ask for Clarification

Ask the user when:
- No guideline exists for a requested component
- The guideline is unclear or incomplete
- You need to create a new component not in Living Design
- The user's request conflicts with a guideline MUST NOT rule

## Remember

**Living Design components are NOT suggestions—they are REQUIREMENTS.**

If a Living Design component exists for what you need, you MUST use it. Creating ad-hoc implementations violates the design system and creates technical debt.
