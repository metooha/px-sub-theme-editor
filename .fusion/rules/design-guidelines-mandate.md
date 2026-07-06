# Design Implementation Guidelines Reference Rule

## MANDATORY: Always Reference Guidelines Folder First

**This rule applies to ALL design implementation work, including:**
- Implementing Figma designs
- Creating new UI components
- Modifying existing components
- Building new pages or features
- Responding to design-related user requests

---

## Rule: Guidelines-First Implementation

### Before implementing ANY design or using ANY component, you MUST:

1. **Check if guidelines exist** for the component you need
   ```bash
   # List all available guidelines
   ls guidelines/
   
   # Search for specific component guidelines
   ls guidelines/ | grep -i "button\|tag\|panel\|popover"
   ```

2. **Read the relevant guideline files** completely
   - Location: `guidelines/` folder
   - Read the ENTIRE guideline file, not just snippets
   - Pay attention to:
     - ✅ Component variants and props
     - ✅ Design tokens to use
     - ✅ Usage examples (correct vs. incorrect)
     - ✅ Accessibility requirements
     - ✅ Living Design 3.5 specifications

3. **Reference existing component implementations**
   - Check `client/components/ui/` for the actual component
   - Read the component's props interface
   - Look at example usage in existing pages

4. **Use design tokens from guidelines**
   - Always check `guidelines/tokens.md` for semantic tokens
   - Never hard-code colors, spacing, or typography
   - Reference `guidelines/typography.md` for text styles

---

## Available Guidelines (Always Check First)

| Guideline File | Component/Topic | When to Read |
|---------------|-----------------|--------------|
| `guidelines/Button.md` | Button component | Before using any button |
| `guidelines/Tag.md` | Tag/Badge component | Before creating status indicators |
| `guidelines/Panel.md` | Panel/Drawer component | Before creating any side panel or drawer |
| `guidelines/Popover.md` | Popover component | Before implementing tooltips or popovers |
| `guidelines/Banner.md` | Banner component | Before adding alerts or notifications |
| `guidelines/Bottom-Sheet.md` | Bottom sheet | Before implementing mobile overlays |
| `guidelines/Badge.md` | Badge component | Before adding notification badges |
| `guidelines/Breadcrumb.md` | Breadcrumb navigation | Before implementing breadcrumbs |
| `guidelines/icon-button.md` | Icon buttons | Before using icon-only buttons |
| `guidelines/tokens.md` | Design tokens | **ALWAYS** - for colors, spacing, etc. |
| `guidelines/typography.md` | Typography system | **ALWAYS** - for text styles |
| `guidelines/Guidelines.md` | General guidelines | Before starting any major feature |
| `guidelines/component-visibility.md` | Component visibility | For showing/hiding components |

---

## Workflow for Design Implementation

### Step 1: Identify Required Components
When given a design (Figma, screenshot, or description):
1. List all UI components needed (buttons, tags, panels, etc.)
2. For EACH component, check if a guideline exists
3. Read ALL relevant guidelines before writing any code

### Step 2: Read Guidelines Thoroughly
```bash
# Example: Implementing a page with buttons and tags
cat guidelines/Button.md      # Read button guidelines
cat guidelines/Tag.md         # Read tag guidelines
cat guidelines/tokens.md      # Read design token guidelines
```

### Step 3: Implement Using Guidelines
- ✅ Use component as documented in guidelines
- ✅ Use correct variants and props
- ✅ Apply design tokens, not hard-coded values
- ✅ Follow usage examples from guidelines

### Step 4: Verify Against Guidelines
- ✅ Compare your implementation to guideline examples
- ✅ Ensure all tokens are used correctly
- ✅ Check that no hard-coded colors/spacing exist

---

## Examples

### ✅ CORRECT: Guidelines-First Approach

**Scenario:** User asks to implement a button from Figma design

```typescript
// Step 1: Read guidelines first
// > cat guidelines/Button.md
// > cat guidelines/tokens.md

// Step 2: Implement using guideline specs
import { Button } from '@/components/ui/Button';

// Uses correct variant from guidelines
<Button variant="primary" size="medium">
  Save Changes
</Button>
```

**Why correct:**
- Read Button.md guideline first
- Used documented variant and size props
- No hard-coded styles
- Follows Living Design 3.5 spec

---

### ❌ WRONG: Skipping Guidelines

**Scenario:** User asks to implement a button from Figma design

```typescript
// Step 1: Skipped reading guidelines ❌
// Step 2: Guessed at implementation ❌

// Created custom button with hard-coded styles
<button className="bg-blue-500 px-4 py-2 rounded-full text-white">
  Save Changes
</button>
```

**Why wrong:**
- Did not read Button.md guideline
- Hard-coded color `bg-blue-500` instead of using token
- Did not use existing Button component
- Violates design system

---

## Enforcement Checklist

Before submitting any design implementation, verify:

- [ ] I checked if guidelines exist for ALL components I used
- [ ] I READ the complete guideline files (not just skimmed)
- [ ] I used components exactly as documented in guidelines
- [ ] I used design tokens from `guidelines/tokens.md`
- [ ] I used typography from `guidelines/typography.md`
- [ ] I did NOT hard-code any colors, spacing, or font sizes
- [ ] I verified my implementation matches guideline examples
- [ ] If no guideline exists, I consulted existing component usage in the codebase

---

## When Guidelines Don't Exist

If you need a component that has NO guideline:

1. **Search for existing component implementation:**
   ```bash
   ls client/components/ui/
   grep -r "export.*ComponentName" client/components/
   ```

2. **Check how it's used in existing pages:**
   ```bash
   grep -r "import.*ComponentName" client/pages/
   ```

3. **Use design tokens from `guidelines/tokens.md`:**
   - Always reference semantic color tokens
   - Use spacing tokens
   - Follow typography guidelines

4. **Consider creating a guideline:**
   - If you create a new reusable component, document it
   - Create a new file in `guidelines/ComponentName.md`
   - Follow the format of existing guidelines

---

## Quick Reference Commands

```bash
# List all available guidelines
ls guidelines/

# Read a specific guideline
cat guidelines/Button.md

# Search for component in ui folder
ls client/components/ui/ | grep -i "button"

# Find usage examples in pages
grep -r "import { Button }" client/pages/

# Check for hard-coded colors (SHOULD RETURN NOTHING)
grep -r "bg-\[#" client/pages/
grep -r "text-\[#" client/pages/
```

---

## Summary

**The Golden Rule:** 
> **Always read guidelines BEFORE implementing. Never guess at component usage or hard-code styles.**

**Mandatory Actions:**
1. ✅ Check `guidelines/` folder first
2. ✅ Read complete guideline files
3. ✅ Use documented components and tokens
4. ✅ Verify against guideline examples
5. ❌ Never hard-code colors, spacing, or typography

**Benefits:**
- Consistent design system compliance
- Faster implementation (no guesswork)
- Easier maintenance (one source of truth)
- Better user experience (cohesive UI)

---

## Violation Consequences

If this rule is not followed:

1. ❌ **Hard-coded styles will be rejected** - Must use tokens
2. ❌ **Custom components will be rejected** - Must use existing components
3. ❌ **Inconsistent UI will require rework** - Must follow guidelines
4. ❌ **Design system violations will be flagged** - Must comply with Living Design 3.5

---

**Remember: Guidelines exist to make your work EASIER and FASTER. Use them!**
