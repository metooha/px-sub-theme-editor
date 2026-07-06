# Airtable Token Reference Rule

## Overview
Before implementing or modifying any Living Design 3.5 components, **ALWAYS** check the Airtable token reference to ensure correct token usage.

## Airtable Token Reference
**Primary Reference**: https://airtable.com/appYyNWTLAzg3x1t3/tblS9MOzERfdLZsrZ/viwX0VjdWPt3e43un?blocks=hide

This Airtable contains the authoritative token mappings for all Living Design 3.5 components, including:
- Correct primitive token usage
- Semantic token mappings
- Component-specific token assignments
- Color, typography, spacing, and other design token values

## When to Check Airtable

### MUST Check Before:
1. **Creating new LD 3.5 components**
   - Verify which primitive and semantic tokens to use
   - Check component-specific token requirements
   - Confirm color, typography, spacing tokens

2. **Modifying existing LD 3.5 components**
   - Validate current token usage is correct
   - Update to correct tokens if discrepancies found
   - Ensure all variants use proper tokens

3. **Implementing design specifications**
   - Cross-reference Figma designs with Airtable tokens
   - Use Airtable as source of truth for token values
   - Resolve conflicts between Figma and implementation

4. **Reviewing component token usage**
   - Audit components for incorrect token usage
   - Replace hard-coded values with proper tokens
   - Ensure semantic vs primitive token usage is correct

## Token Priority

When choosing tokens, follow this priority:

1. **Airtable Reference** (PRIMARY SOURCE OF TRUTH)
   - Use the exact tokens specified in Airtable
   - Follow Airtable's primitive vs semantic token guidance
   
2. **Living Design Guidelines** (SECONDARY)
   - Cross-reference with `guidelines/` folder
   - Use when Airtable is unavailable or unclear
   
3. **Figma Files** (TERTIARY)
   - Use only as visual reference
   - Always verify token names against Airtable
   - Figma may have outdated or incorrect token names

## Example: Link Component Token Usage

**Incorrect (before Airtable check):**
```css
.link--variant-default {
  color: var(--ld-semantic-color-text, #2e2f32);
}
```

**Correct (after Airtable check):**
```css
.link--variant-default {
  color: var(--ld-primitive-color-gray-160, #2e2f32);
}
```

**Why?** Airtable specifies that links should use `ld-primitive-color-gray-160`, not the semantic `ld-semantic-color-text` token.

## Common Token Types

### Primitive Tokens (from Airtable)
- `--ld-primitive-color-gray-{value}` - Grayscale colors
- `--ld-primitive-color-blue-{value}` - Blue colors
- `--ld-primitive-spacing-{value}` - Spacing values
- `--ld-primitive-font-{property}` - Typography

### Semantic Tokens (from Airtable)
- `--ld-semantic-color-{context}-{property}` - Contextual colors
- `--ld-semantic-spacing-{context}` - Contextual spacing
- `--ld-semantic-font-family-{variant}` - Font families

## Workflow for Token Implementation

```
1. Read Airtable token reference
   ↓
2. Identify component and variant
   ↓
3. Note primitive token specified
   ↓
4. Implement token in CSS/component
   ↓
5. Verify token renders correctly
   ↓
6. Update documentation with correct token
```

## Error Prevention

### ❌ DON'T:
- Use tokens without checking Airtable first
- Assume semantic tokens are always correct
- Hard-code color values instead of tokens
- Mix primitive and semantic tokens without verification
- Copy tokens from other components without checking Airtable

### ✅ DO:
- Always reference Airtable before implementing tokens
- Use the exact primitive token specified in Airtable
- Include fallback hex values for tokens
- Document which Airtable entry was used
- Update components when Airtable is updated

## Airtable Access Note

**Important:** The Airtable reference requires authentication. If you cannot access it:
1. Ask the user for the specific token values
2. Request they share relevant Airtable rows as screenshots
3. Consult `guidelines/` folder for documented token usage
4. Mark implementation with `// TODO: Verify token with Airtable` comment

## Component-Specific Examples

### Button Component
- **Primary variant**: Check Airtable for `--ld-semantic-color-action-fill-primary`
- **Secondary variant**: Check Airtable for `--ld-semantic-color-action-fill-secondary`
- **Text color**: Check Airtable for correct text token per variant

### Link Component
- **Default text color**: `--ld-primitive-color-gray-160` (per Airtable)
- **Hover state**: Same as default (per Airtable)
- **Focus outline**: `--ld-semantic-color-action-focus-outline`

### Tag Component
- **Background colors**: Check Airtable for variant-specific tokens
- **Text colors**: Check Airtable for matching text tokens
- **Border radius**: Check Airtable for primitive spacing token

## Enforcement

This rule is **MANDATORY** for all Living Design 3.5 component work.

**Before submitting any component:**
- [ ] Checked Airtable token reference
- [ ] Used correct primitive tokens
- [ ] Verified semantic token usage
- [ ] Documented token source
- [ ] Added fallback hex values
- [ ] Updated component documentation

## Related Rules

- See `.fusion/rules/design-guidelines-mandate.md` for guidelines-first workflow
- See `.fusion/rules/component-composition.md` for component reuse patterns
- See `guidelines/` folder for documented component specifications

---

**Remember:** When in doubt, check Airtable first. It is the authoritative source for all Living Design 3.5 token usage.
