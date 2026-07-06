# Performance Optimization Guide

## Theme Switching Performance

### Optimizations Implemented:

1. **Removed Interval Polling**
   - Eliminated 1-second interval checks (CPU intensive)
   - Now only watch for actual theme CSS changes

2. **Debounced Token Extraction**
   - Increased debounce to 500ms
   - Prevents multiple extractions during theme load

3. **requestAnimationFrame**
   - Token extraction happens off main thread
   - Doesn't block UI rendering

4. **React.startTransition**
   - State updates are non-blocking
   - UI stays responsive during updates

5. **Optimized Observers**
   - Only watch head for theme CSS links
   - Filter by `data-theme-override` attribute
   - Removed redundant html/body observers

6. **Simplified Font Detection**
   - Use CSS variable directly (no DOM manipulation)
   - Faster, no temporary elements

### Further Optimizations You Can Make:

1. **Code Splitting**
```tsx
// Lazy load heavy pages
const ThemesPage = React.lazy(() => import('./pages/component-library/Themes'));
const ComponentTester = React.lazy(() => import('./pages/component-library/ComponentTester'));
```

2. **Memoize Heavy Components**
```tsx
const MemoizedThemeSwitcher = React.memo(ThemeSwitcher);
```

3. **Virtual Scrolling for Token Tables**
```tsx
// Use react-window or react-virtual for 400+ token rows
import { FixedSizeList } from 'react-window';
```

4. **Reduce Bundle Size**
```bash
# Analyze bundle
pnpm run build -- --analyze

# Check for duplicate dependencies
pnpm dedupe
```

5. **Preload Theme CSS**
```tsx
// In ThemeContext, preload common themes
<link rel="preload" href="/styles/themes/walmart/semantic.css" as="style" />
```

6. **Cache Extracted Tokens**
```tsx
// Store in localStorage to avoid re-extraction
const cachedTokens = localStorage.getItem('theme-tokens-walmart');
if (cachedTokens) {
  setTokens(JSON.parse(cachedTokens));
} else {
  const tokens = extractTokens();
  localStorage.setItem('theme-tokens-walmart', JSON.stringify(tokens));
}
```

7. **Avoid Re-renders**
```tsx
// Use React.memo for card components
const ComponentCard = React.memo(({ section }) => {
  // ...
});
```

### Performance Metrics to Monitor:

- **First Contentful Paint (FCP)**: < 1.8s
- **Time to Interactive (TTI)**: < 3.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### Quick Wins:

1. ✅ **Debounce theme changes** - Done (500ms)
2. ✅ **Remove interval polling** - Done
3. ✅ **Use requestAnimationFrame** - Done
4. ✅ **Use React.startTransition** - Done
5. ⏳ **Add code splitting** - Recommended next
6. ⏳ **Cache tokens** - Recommended next

### Testing Performance:

```bash
# Run build
pnpm run build

# Check bundle size
ls -lh dist/assets/*.js

# Use Chrome DevTools
# 1. Open DevTools (F12)
# 2. Go to Performance tab
# 3. Record while switching themes
# 4. Look for long tasks (> 50ms)
```

---

**Current Status**: Theme switching optimized. Page navigation should be faster now.
**Next Steps**: Consider code splitting for heavy pages like Themes and Component Tester.
