## Typography Design System

All text in this project MUST use the Geist Core typography classes defined in `docs/app/globals.css`. Reference: https://vercel.com/geist/typography

### Header and Layout
- The site header across both landing page and documentation MUST use a height of `h-14` (56px) for consistency.
- The `LogoIcon` in the header should use `size-6` (24px) with tracking text size `text-[16px]`.
- Landing page heroes should use the massive `text-heading-72` for the main `h1` and `text-copy-20` for the subtitle.

### Classes (use these, NOT raw Tailwind font utilities)

**Headings** - for page/section intros:
`text-heading-72` · `text-heading-64` · `text-heading-56` · `text-heading-48` ·
`text-heading-40` · `text-heading-32` · `text-heading-24` · `text-heading-20` ·
`text-heading-16` · `text-heading-14`

**Copy** - for multi-line body text (higher line-height than Label):
`text-copy-24` · `text-copy-20` · `text-copy-18` · `text-copy-16` ·
`text-copy-14` · `text-copy-13` · `text-copy-13-mono`

**Label** - for single-line UI text (menus, nav, metadata):
`text-label-20` · `text-label-18` · `text-label-16` · `text-label-14` ·
`text-label-14-mono` · `text-label-13` · `text-label-13-mono` ·
`text-label-12` · `text-label-12-mono`

**Buttons** - only inside button components:
`text-button-16` · `text-button-14` · `text-button-12`

### Rules
- NEVER use raw `text-sm`, `text-xs`, `text-base` etc. for content text.
- NEVER use `font-semibold`, `font-medium`, `tracking-tight` on headings - the
  heading classes preset these.
- Use `<strong>` inside any typography class for the Strong modifier.
- Mono variants (`text-label-14-mono`, `text-copy-13-mono`) are for inline code
  and code-like content only.
- `text-label-12` is uppercase by default - do NOT add `uppercase` manually.