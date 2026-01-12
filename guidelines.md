# Guidelines for Creating Successful Resume Templates

This document outlines the **Gold Standards** for creating high-quality, visually appealing, and technically robust templates for the Resume Generator project.

## 1. Technical Implementation

### naming Convention & Structure
*   **Unique Class Name:** Start with `.cv-template-[name]`.
*   **Root Element:** Apply `display: grid` or `display: flex` to the root class to define the page structure.
*   **Scoping:** **CRITICAL:** Every single style rule MUST be prepended with your template class.
    *   ❌ ` .sidebar { ... }` (Global pollution - DO NOT DO THIS)
    *   ✅ `.cv-template-pro .sidebar { ... }` (Correct)

### Typography & Sizing (Crucial)
*   **NO Hardcoded Pixels:** Never use `12px`, `14px`, etc.
*   **Use Variables:** You must use the system CSS variables to ensure the user's "Appearance" settings work.
    *   `var(--font-size-name)` (Base: ~24px)
    *   `var(--font-size-title)` (Base: ~16px)
    *   `var(--font-size-body)` (Base: ~12px)
    *   `var(--font-size-small)` (Base: ~10px)
*   **Scaling:** If you need a larger title, use `calc()`.
    *   Example: `font-size: calc(var(--font-size-name) * 1.5);`

### Color System
*   **Respect User Choices:** Use the color variables whenever possible.
    *   `var(--accent)`: For headings, decorative lines, icons.
    *   `var(--text-color-main)`: For body text.
    *   `var(--text-color-sidebar)`: For text inside the sidebar (if it has a background).

*   **Template-Specific Colors (New):** For templates that need additional customizable colors:
    *   `var(--secondary-color)`: Default `#f39c12` (orange/gold). Used for secondary accents, highlights, or alternative colors.
    *   `var(--dark-bg)`: Default `#2c3e50` (dark blue-gray). Used for dark backgrounds in templates like Compact, Timeline, Orbit.
    *   `var(--light-bg)`: Default `#ecf0f1` (light gray). Used for light text on dark backgrounds or light background colors.
    
    **When to Use Template-Specific Colors:**
    - If your template needs a **second accent color** different from the main accent (e.g., Bold template uses orange borders alongside blue accents), use `var(--secondary-color)`.
    - If your template has a **dark mode** or **dark sidebar** that's not based on the main accent, use `var(--dark-bg)`.
    - If your template needs **light-colored text or backgrounds** as part of the design, use `var(--light-bg)`.


> **⚠️ CRITICAL CONTRAST WARNING:**
> If you design a template with a **LIGHT** or **WHITE** background (especially in the Sidebar), you **MUST** explicitly set the text color to a dark value (e.g., `#333` or `var(--text-color-main)`).
> *   Do **NOT** assume the default text color is black.
> *   Do **NOT** inherit white text from a previous "Dark Mode" styling.
> *   **Check ALL Sections:** distinct sections like `Additional Info` (`.additional-info`), `Languages`, and `Contact` often have their own default white text rules in `styles.css`. You **MUST** override them.
> *   **Rule of Thumb:** If `background-color` is white, `color` MUST be dark.

## 2. Design Aesthetics (The "Wow" Factor)

To create a **successful** template that users will love, follow these design principles:

### Layout & Hierarchy
*   **Balance:** Ensure a good ratio between the Sidebar (approx 30-35%) and Main Content (65-70%).
*   **Breathing Room:** Don't crowd the content. Use generous padding (at least `20px-30px`) for sections.
*   **Visual Logic:** The user's eye should scan naturally from the most important info (Name/Role) to the details.

### Modern Touches
*   **Geometric Shapes:** Use `clip-path` or `border-radius` to create unique header shapes or sidebar curves.
*   **Distinctive Section Headers:** Don't just bold the text. use:
    *   Underlines: `border-bottom: 2px solid var(--accent);`
    *   Side-lines: `border-left: 5px solid var(--accent);`
    *   Icons or dots before the title.
*   **Backgrounds:** Consider subtle gradients for sidebars instead of flat colors.
    *   `background: linear-gradient(180deg, var(--accent) 0%, #2c3e50 100%);`

### Details Matter
*   **Margins:** Ensure consistent spacing between items.
*   **Line-Height:** Use `1.4` to `1.6` for body text to improve readability.
*   **Uppercase vs Capitalize:** Use `text-transform: uppercase` for small headers to add elegance.

## 3. Registration Checklist

When you finish the CSS:

1.  **Index.html**:
    Add the option to the select menu:
    ```html
    <option value="template-name" data-i18n="tmpl_template_name">Template Name</option>
    ```

2.  **i18n.js**:
    Add the translation key `tmpl_template_name` to **ALL** language blocks (en-US, pt-BR, es-ES, fr-FR, de-DE, it-IT).

3.  **Test**:
    *   Check if font scaling works in settings.
    *   Check if color changes apply correctly.
    *   Check if the layout breaks on long text.
    *   **CRITICAL:** Test print preview with long content (see section 4 below)

---

## 4. Print-Safe Design (CRITICAL - ADVANCED ENGINE)

**The print engine has been upgraded to enforce absolute visual harmony. All templates must adhere to strict fragmentation rules.**

### Core Principles

1.  **Atomic Entities**: Every data block (Experience Item, Education Entry, Skill Group) is treated as an indivisible unit.
    *   **Rule**: `break-inside: avoid` is automatically applied to all `.item`, `.edu-item`, etc.
    *   **Behavior**: If an item needs 10 lines but only 5 are available, *the entire block* moves to the next page.

2.  **Header Unity**: Section Headers (`.section-title`) act as magnetic anchors.
    *   **Rule**: `break-after: avoid` prevents a header from ever being the last item on a page. it will always pull the first item of its section with it.

3.  **Dynamic Visual Margins**:
    *   **Rule**: Content on Page 2+ never touches the physical top edge.
    *   **Implementation**: A `padding-top: 5mm` is enforced on the content container on every page to ensure breathing room, working in tandem with the browser's native `@page` margins.

4.  **Text Integrity**:
    *   **Rule**: No "orphans" (single lines at bottom) or "widows" (single lines at top).
    *   **Value**: `orphans: 3; widows: 3;` enforced globally.

### Developer Checklist for New Templates

When creating a new template, ensure your CSS structure supports these rules:

*   ✅ **Do not override** `break-inside` on `.item` classes unless absolutely necessary for a unified grid layout.
*   ✅ **Test** that your custom classes (if any) inherit these protections.
*   ✅ **Verify** that `page-break-after: avoid` is working for your custom headers.

### Common Pitfalls

❌ **DON'T**: Create huge monolithic blocks. If a single item is taller than a page, it *will* be cut. Keep items reasonably sized.
✅ **DO**: Allow natural breaks between major sections (`section { break-inside: auto; }`) so the engine can find the best split point.

❌ **DON'T**: Rely on fixed heights (px).
✅ **DO**: Let content flow naturally to allow the print engine to calculate split points dynamically.




### Example: Complex Layout (Bold Template)

For templates with complex layouts (multiple sections, footers, etc.):

```css
@media print {
  /* Prevent header from breaking */
  .cv-template-bold .sidebar {
    page-break-after: avoid;
  }
  
  /* Allow main content to break naturally */
  .cv-template-bold .main {
    page-break-inside: auto;
  }
  
  /* Keep footer sections intact */
  .cv-template-bold .pre-footer,
  .cv-template-bold .footer {
    page-break-before: auto;
    page-break-inside: avoid;
  }
}
```

---

**Remember:** A great template is not just about code; it's about helping the user present their best self. Make it clean, professional, beautiful, **and print-ready**.
