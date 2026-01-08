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

---

**Remember:** A great template is not just about code; it's about helping the user present their best self. Make it clean, professional, and beautiful.
