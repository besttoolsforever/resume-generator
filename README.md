# Resume Generator Project

A powerful, client-side, offline-first resume generator built with Vanilla JavaScript, HTML, and CSS. It allows users to create, customize, and export professional resumes directly from the browser.

## Features

*   **Real-time Preview:** See changes instantly as you type.
*   **Multiple Templates:** Choose from 9+ distinct templates (Classic, Modern, Minimalist, etc.).
*   **Offline First:** Works completely offline. No server-side processing for data.
*   **Data Management:** Save/Load data locally (LocalStorage) and Backup/Restore via JSON files.
*   **Customizable:** Adjustable fonts, colors (accent, main, sidebar), and section ordering.
*   **Multi-language Support:** Easy i18n implementation.
*   **Visual Editor:** Drag-and-drop section reordering.
*   **Export:** Generate clean, print-ready output (PDF via browser print).

## Project Structure

```
/
├── index.html          # Main application entry point
└── assets/
    ├── css/
    │   └── styles.css  # Core styles and Template definitions
    └── js/
        ├── main.js     # Entry point logic
        ├── namespace.js# Global namespace setup
        └── modules/
            ├── state.js    # State management (Store)
            ├── i18n.js     # Internationalization
            ├── render.js   # UI Rendering logic
            └── events.js   # Event listeners and user interaction
```

## Setup & Usage

1.  Clone the repository.
2.  Open `index.html` in any modern web browser.
3.  No build step required (Vanilla JS).

## Development Guidelines

### Creating New Templates

The project uses a CSS-Grid/Flexbox based layout system. Templates are defined purely via CSS classes applied to the main wrapper `#cv`.

1.  **Define the Class**: Create a new CSS class in `styles.css` following the naming convention `.cv-template-[name]`.
    *   *Example:* `.cv-template-futuristic`

2.  **Layout Structure**: The HTML structure is divided into `.sidebar` and `.main`. Use CSS Grid to position them.
    *   *Example:*
        ```css
        .cv-template-futuristic {
           display: grid;
           grid-template-columns: 1fr 2fr; /* Sidebar | Main */
           grid-template-areas: "sidebar main";
        }
        ```

3.  **Scope Styles**: ALWAYS scope your styles to your template class to avoid breaking other templates.
    *   *Bad:* `.sidebar { background: black; }`
    *   *Good:* `.cv-template-futuristic .sidebar { background: black; }`

4.  **Key Elements to Style**:
    *   `.sidebar`: Background color, text color, borders.
    *   `.main`: Padding, background.
    *   `.name`, `.surname`: Font sizes, colors, alignment.
    *   `.section-title`: Borders, colors, text-transform (uppercase/lowercase).
    *   `.contact-label`: Color, weight.

5.  **Register Template**: Add your new template option to the `<select id="template-select">` in `index.html`.
    ```html
    <option value="futuristic" data-i18n="tmpl_futuristic">Futuristic</option>
    ```

6.  **Variables**: Use CSS variables for user-customizable values where appropriate:
    *   `var(--accent)`
    *   `var(--text-color-main)`
    *   `var(--text-color-sidebar)`

### Typography & Customization

**CRITICAL:** Do NOT use hardcoded pixel values for font sizes (e.g., `font-size: 24px`). This breaks the user's ability to customize font sizes via the settings panel.

ALWAYS use the defined CSS variables, optionally with `calc()` for relative scaling:

*   **Name:** `var(--font-size-name)` or `calc(var(--font-size-name) * 1.2)`
*   **Section Titles:** `var(--font-size-title)`
*   **Body Text:** `var(--font-size-body)`
*   **Small Text/Metadata:** `var(--font-size-small)`

### State Management

*   State is handled in `assets/js/modules/state.js`.
*   Any new data fields must be added to the default state object and saved via `CVApp.State.saveState()`.

### Localization (i18n)

*   Add new translation keys to `assets/js/modules/i18n.js`.
*   Use `data-i18n="key_name"` in HTML elements to automatically bind text.

---
*Built with simplicity and performance in mind.*
