# Component Composition & Atomic Design Rule

## MANDATORY: Check Existing Components Before Creating New Ones

**This rule applies to ALL component creation and development work.**

---

## Rule: Composition-First Development

### Before creating ANY new component, you MUST:

1. **Inventory existing components** in `client/components/ui/`
2. **Search for similar patterns** in existing pages
3. **Attempt to compose** from existing atoms and molecules
4. **Only create new** if composition is truly impossible

---

## Component Hierarchy (Atomic Design)

Follow atomic design principles when building components:

```
Atoms (Basic building blocks)
  ↓
Molecules (Simple combinations of atoms)
  ↓
Organisms (Complex combinations of molecules/atoms)
  ↓
Templates (Page-level patterns)
  ↓
Pages (Specific instances)
```

### Available Atoms (Always Use These First)

Located in `client/components/ui/`:

**Action Components:**
- `Button.tsx` - All button variants (primary, secondary, tertiary, destructive)
- `IconButton.tsx` - Icon-only buttons (ghost, primary, secondary, tertiary, destructive)
- `checkbox.tsx` - Checkboxes
- `switch.tsx` - Toggle switches
- `radio-group.tsx` - Radio buttons

**Data Display:**
- `tag.tsx` - Status tags
- `badge.tsx` - Notification badges
- `avatar.tsx` - User avatars
- `separator.tsx` - Dividers

**Form Inputs:**
- `input.tsx` - Text inputs
- `textarea.tsx` - Multi-line text
- `select.tsx` - Dropdowns
- `slider.tsx` - Range inputs
- `calendar.tsx` - Date picker

**Typography:**
- Use design tokens for text styles (see `guidelines/typography.md`)

**Icons:**
- Use Lucide React icons consistently

### Available Molecules (Build From These)

**Compound Components:**
- `ButtonGroup.tsx` - Multiple buttons
- `dropdown-menu.tsx` - Menu with trigger
- `popover.tsx` - Popover with trigger + content
- `dialog.tsx` - Modal with trigger + content
- `alert-dialog.tsx` - Confirmation dialog
- `tooltip.tsx` - Tooltip with trigger

**Form Molecules:**
- `form.tsx` - Form field wrapper with label + validation
- `label.tsx` - Form labels

### Available Organisms (Reuse When Possible)

**Complex Components:**
- `MastHead.tsx` - Application header
- `MediaSolutionsDropdown.tsx` - Media solutions selector
- `MartyFloatingPanel.tsx` - AI assistant panel
- `card.tsx` - Content card
- `table.tsx` - Data table

---

## Workflow: Creating New Components

### Step 1: Audit Existing Components

**REQUIRED BEFORE ANY NEW COMPONENT:**

```bash
# List all available UI components
ls -la client/components/ui/

# Search for similar components
grep -r "export.*function\|export.*const" client/components/ui/ | grep -i "SEARCH_TERM"

# Check how similar patterns are implemented
grep -r "import.*ComponentName" client/pages/
```

### Step 2: Attempt Composition First

**Can you build it from existing components?**

```tsx
// ✅ CORRECT: Compose from existing atoms
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/tag';

function CampaignCard({ status, onEdit }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <Tag variant={status === 'active' ? 'success' : 'neutral'}>
          {status}
        </Tag>
        <Button variant="secondary" size="small" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </div>
  );
}
```

**Benefits of composition:**
- ✅ Consistent design system compliance
- ✅ Automatic token usage
- ✅ Built-in accessibility
- ✅ Less code to maintain
- ✅ Faster implementation

### Step 3: Check Guidelines Before Building

If you must create a new component:

```bash
# Read relevant guidelines first
cat guidelines/Button.md
cat guidelines/tokens.md
cat guidelines/typography.md
```

### Step 4: Build With Existing Primitives

**NEVER build from scratch when atoms exist:**

```tsx
// ❌ WRONG: Building custom button from scratch
function CustomActionButton({ children, onClick }) {
  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ✅ CORRECT: Compose using existing Button atom
import { Button } from '@/components/ui/Button';

function ActionButton({ children, onClick }) {
  return (
    <Button variant="primary" size="medium" onClick={onClick}>
      {children}
    </Button>
  );
}

// ✅ EVEN BETTER: Just use Button directly
<Button variant="primary" size="medium" onClick={handleClick}>
  Save Changes
</Button>
```

---

## Examples: Composition vs. Creation

### Example 1: Alert Banner

**❌ WRONG: Create new component from scratch**
```tsx
// DON'T DO THIS
function AlertBanner({ message, type }) {
  return (
    <div className={`p-4 rounded ${type === 'error' ? 'bg-red-100' : 'bg-blue-100'}`}>
      <span className="font-bold">{message}</span>
      <button className="ml-4 px-2 py-1 bg-gray-200">Dismiss</button>
    </div>
  );
}
```

**✅ CORRECT: Compose from existing atoms**
```tsx
// First check: Does a Banner component exist in guidelines?
// If yes, use it. If no, compose from atoms:

import { Button } from '@/components/ui/Button';
import { AlertCircle, X } from 'lucide-react';

function AlertBanner({ message, variant, onDismiss }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border"
         style={{
           backgroundColor: variant === 'error' 
             ? 'var(--ld-semantic-color-fill-error-subtle)' 
             : 'var(--ld-semantic-color-fill-info-subtle)',
           borderColor: variant === 'error'
             ? 'var(--ld-semantic-color-border-error)'
             : 'var(--ld-semantic-color-border-info)'
         }}>
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5" />
        <span style={{ color: 'var(--ld-semantic-color-text-primary)' }}>
          {message}
        </span>
      </div>
      <Button variant="tertiary" size="small" onClick={onDismiss}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

### Example 2: User Profile Menu

**❌ WRONG: Build entire menu from scratch**
```tsx
// DON'T DO THIS
function UserMenu() {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <img src="/avatar.jpg" className="w-8 h-8 rounded-full" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg">
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
          <button>Logout</button>
        </div>
      )}
    </div>
  );
}
```

**✅ CORRECT: Compose from existing molecules**
```tsx
// Use existing DropdownMenu + Avatar components
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

function UserMenu({ user }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

---

## Atomic Design Decision Tree

```
Need a new UI element?
  ↓
Does an atom exist for this? (Button, Input, Tag, etc.)
  ├─ YES → Use the atom directly
  └─ NO ↓
     Can I compose it from existing atoms? (Button + Tag + Icon)
       ├─ YES → Create composed component from atoms
       └─ NO ↓
          Does a molecule exist? (Popover, Dropdown, Dialog)
            ├─ YES → Use or extend the molecule
            └─ NO ↓
               Does an organism exist? (MastHead, Card, Table)
                 ├─ YES → Use or extend the organism
                 └─ NO ↓
                    Read guidelines for similar patterns
                      ↓
                    Build new component using:
                      - Existing atoms as building blocks
                      - Design tokens (never hard-code)
                      - Living Design 3.5 specs
                      - Accessibility best practices
```

---

## Component Creation Checklist

Before creating a new component, verify:

- [ ] **Searched `client/components/ui/`** for existing components
- [ ] **Checked guidelines folder** for component documentation
- [ ] **Searched existing pages** for similar patterns
- [ ] **Attempted composition** from existing atoms/molecules
- [ ] **Read relevant guidelines** (Button.md, tokens.md, etc.)
- [ ] **Verified no duplicates exist** in the codebase
- [ ] **If creating new:**
  - [ ] Uses existing atoms as building blocks
  - [ ] Uses design tokens (no hard-coded values)
  - [ ] Follows Living Design 3.5 specifications
  - [ ] Includes proper TypeScript types
  - [ ] Has accessibility attributes (ARIA, keyboard support)
  - [ ] Created guideline documentation in `guidelines/`

---

## Benefits of Composition-First Approach

1. **Consistency** - All components use the same design system
2. **Maintainability** - Changes to atoms propagate automatically
3. **Speed** - Faster to compose than build from scratch
4. **Quality** - Existing components are tested and accessible
5. **Token compliance** - Atoms already use correct tokens
6. **Reduced bundle size** - Fewer duplicate styles
7. **Team alignment** - Everyone uses the same building blocks

---

## Common Composition Patterns

### Pattern 1: Form Field with Validation

```tsx
// Compose from: Label + Input + Tag (for error)
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tag } from '@/components/ui/tag';

function FormField({ label, error, ...inputProps }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input {...inputProps} />
      {error && <Tag variant="error">{error}</Tag>}
    </div>
  );
}
```

### Pattern 2: Action Card

```tsx
// Compose from: Card + Button + Tag
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/tag';

function ActionCard({ title, status, onAction }) {
  return (
    <Card>
      <CardHeader>
        <h3>{title}</h3>
        <Tag variant={status}>{status}</Tag>
      </CardHeader>
      <CardContent>
        {/* Content */}
      </CardContent>
      <CardFooter>
        <Button variant="primary" onClick={onAction}>
          Take Action
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Pattern 3: Confirmation Dialog

```tsx
// Compose from: AlertDialog + Button
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';

function DeleteConfirmation({ itemName, onConfirm, onCancel }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          Confirm Deletion
        </AlertDialogHeader>
        <p>Are you sure you want to delete {itemName}?</p>
        <AlertDialogFooter>
          <ButtonGroup>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Delete
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

---

## When to Create a New Atom

Only create a new atom when:

1. **No existing atom or molecule can be adapted**
2. **The pattern will be used in 3+ places**
3. **It represents a fundamental UI primitive**
4. **It has clear Living Design 3.5 specifications**

**Process:**
1. Read all relevant guidelines first
2. Use design tokens exclusively
3. Create TypeScript interface for props
4. Add accessibility attributes
5. Create documentation in `guidelines/`
6. Create example usage file

---

## Enforcement

**This rule is MANDATORY:**

- ❌ **Rejected:** Custom components built from scratch when atoms exist
- ❌ **Rejected:** Hard-coded styles instead of using existing components
- ❌ **Rejected:** Duplicate components that could be composed
- ✅ **Approved:** Composition from existing atoms/molecules
- ✅ **Approved:** Extending existing components appropriately
- ✅ **Approved:** New atoms with proper documentation when truly needed

---

## Quick Reference Commands

```bash
# Inventory all UI components
ls -la client/components/ui/

# Find component by name
ls client/components/ui/ | grep -i "COMPONENT_NAME"

# See how a component is used
grep -r "import.*ComponentName" client/pages/

# Check component exports
grep "export" client/components/ui/ComponentName.tsx

# List all available guidelines
ls guidelines/

# Search for component documentation
ls guidelines/ | grep -i "COMPONENT_NAME"
```

---

## Summary

**The Golden Rules:**

1. ✅ **ALWAYS check existing components first** - Never assume something doesn't exist
2. ✅ **ALWAYS attempt composition** - Build from atoms and molecules
3. ✅ **ALWAYS read guidelines** - Before creating anything new
4. ✅ **ALWAYS use design tokens** - Never hard-code values
5. ❌ **NEVER build from scratch** - When existing primitives can be composed
6. ❌ **NEVER duplicate components** - Reuse and extend instead

**Remember:** 
> **Composition over creation. Reuse over reinvention. Tokens over hard-coding.**

Every component you compose from existing atoms is:
- Faster to build
- Easier to maintain
- More consistent
- Better for users

**When in doubt, compose!**
