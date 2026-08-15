# Revert visual style to rounded corners

Reverting the recent change that removed rounded corners across the website. The user preferred the original "bubbly" and child-friendly aesthetic over the sharp-edged "premium" look.

## Proposed Changes

### Styling Reversion
- Restore `rounded-full`, `rounded-3xl`, `rounded-2xl`, and other specific rounding classes across all pages and components.
- Restore rounded corners to buttons, cards, image containers, badges, and structural sections.

### Component-Specific Reversions
- **Homepage (`src/routes/index.tsx`)**: Re-apply rounding to hero elements, product cards, testimonials, and newsletter sections.
- **Product Pages**: Re-apply rounding to primary/secondary CTAs, trust badges, quantity selectors, and feature grids in:
  - `src/routes/products.preschool-learning-cards.tsx`
  - `src/routes/products.finger-painting-kit.tsx`
  - `src/routes/products.interactive-busy-book.tsx`
- **Global Components (`src/components/site-chrome.tsx`)**: Restore rounding to buttons, inputs, and social icons in the header, footer, and newsletter.

## Technical Details
- Systematically search for `rounded-none` and replace with appropriate rounding classes (e.g., `rounded-full` for buttons, `rounded-2xl` or `rounded-3xl` for cards/sections).
- Ensure consistency between the restored pages to maintain a unified visual language.
