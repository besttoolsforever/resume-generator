/* --- Main Entry Point --- */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Load State
    CVApp.State.loadState();

    // 2. Set Language
    CVApp.I18n.setLanguage(CVApp.State.data.settings.language);

    // 3. Render Forms
    CVApp.Render.renderExperienceForm();
    CVApp.Render.renderEducationForm();
    CVApp.Render.renderCoursesForm();
    CVApp.Render.renderLanguagesForm();

    // 4. Update UI Text (i18n)
    CVApp.Render.updateInterfaceLanguage();

    // 5. Initial Preview Render
    CVApp.Render.updatePreview();

    // 6. Init Events
    CVApp.Events.initEvents();

    // Initialize Sortable for Experience List
    const sortParams = {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: () => {
            // Re-read DOM to State.
            const rows = Array.from(document.querySelectorAll('#exp-list .exp-row'));
            CVApp.State.data.experiences = rows.map(row => {
                return {
                    title: row.querySelector('.exp-title').value,
                    company: row.querySelector('.exp-company').value,
                    period: row.querySelector('.exp-period').value,
                    role: row.querySelector('.exp-role').value,
                    tech: row.querySelector('.exp-tech').value,
                    desc: row.querySelector('.exp-desc').value
                };
            });
            CVApp.Render.renderExperienceForm();
            CVApp.State.saveState();
            CVApp.Render.updatePreview();
        }
    };
    new Sortable(document.getElementById('exp-list'), sortParams);
});
