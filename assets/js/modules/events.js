/* --- Events Module --- */
// Handles User Interaction

(function () {
    const el = (sel, parent = document) => parent.querySelector(sel);
    const els = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

    // Safety check: Ensure CVApp is available
    if (typeof CVApp === 'undefined' || !CVApp.State) {
        console.error("CVApp or CVApp.State is not defined.");
        return;
    }

    const state = CVApp.State.data;

    /* --- Init --- */
    const initInputs = () => {
        // Personal Info
        if (el('#input-name')) el('#input-name').value = state.formData.name || '';
        if (el('#input-age')) el('#input-age').value = state.formData.age || '';
        if (el('#input-desc')) el('#input-desc').value = state.formData.desc || '';
        if (el('#input-city')) el('#input-city').value = state.formData.city || '';
        if (el('#input-phone')) el('#input-phone').value = state.formData.phone || '';
        if (el('#input-email')) el('#input-email').value = state.formData.email || '';
        if (el('#input-github')) el('#input-github').value = state.formData.githubUrl || '';
        if (el('#input-github-label')) el('#input-github-label').value = state.formData.githubLabel || '';
        if (el('#input-additional')) el('#input-additional').value = state.formData.additional || '';

        // Settings - Load colors for current template
        const currentTemplate = state.settings.template || 'classic';
        const colors = CVApp.State.getTemplateColors(currentTemplate);

        if (el('#accent')) el('#accent').value = colors.accent || '#000000';
        if (el('#color-main')) el('#color-main').value = colors.textMain || '#333333';
        if (el('#color-sidebar')) el('#color-sidebar').value = colors.textSidebar || '#ffffff';
        if (el('#color-secondary')) el('#color-secondary').value = colors.secondaryColor || '#f39c12';
        if (el('#color-dark-bg')) el('#color-dark-bg').value = colors.darkBg || '#2c3e50';
        if (el('#color-light-bg')) el('#color-light-bg').value = colors.lightBg || '#ecf0f1';
        if (el('#fs-name')) el('#fs-name').value = state.settings.fontName || 24;
        if (el('#fs-title')) el('#fs-title').value = state.settings.fontTitle || 16;
        if (el('#fs-body')) el('#fs-body').value = state.settings.fontBody || 12;
        if (el('#fs-small')) el('#fs-small').value = state.settings.fontSmall || 10;
        if (el('#template-select')) el('#template-select').value = currentTemplate;

        // Lang Buttons State
        const currentLang = state.settings.language || 'en-US';
        els('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === currentLang);
        });
    };

    const initEvents = () => {
        // --- Forms (Personal Data) ---
        const syncForm = (id, key) => {
            const element = el(id);
            if (!element) return;
            element.addEventListener('input', (e) => {
                state.formData[key] = e.target.value;
                CVApp.State.saveState();
                CVApp.Render.updatePreview();
            });
        };

        syncForm('#input-name', 'name');
        syncForm('#input-age', 'age');
        syncForm('#input-desc', 'desc');
        syncForm('#input-city', 'city');
        syncForm('#input-phone', 'phone');
        syncForm('#input-email', 'email');
        syncForm('#input-github', 'githubUrl');
        syncForm('#input-github-label', 'githubLabel');
        syncForm('#input-additional', 'additional');

        // --- Settings ---
        const bindColorSetting = (id, key) => {
            const element = el(id);
            if (!element) return;
            element.addEventListener('input', (e) => {
                const currentTemplate = state.settings.template || 'classic';
                if (!state.settings.templateColors[currentTemplate]) {
                    state.settings.templateColors[currentTemplate] = {};
                }
                state.settings.templateColors[currentTemplate][key] = e.target.value;
                CVApp.State.saveState();
                CVApp.Render.updatePreview();
            });
        }

        bindColorSetting('#accent', 'accent');
        bindColorSetting('#color-main', 'textMain');
        bindColorSetting('#color-sidebar', 'textSidebar');
        bindColorSetting('#color-secondary', 'secondaryColor');
        bindColorSetting('#color-dark-bg', 'darkBg');
        bindColorSetting('#color-light-bg', 'lightBg');

        // Fonts
        ['name', 'title', 'body', 'small'].forEach(font => {
            const element = el(`#fs-${font}`);
            if (element) {
                element.addEventListener('input', (e) => {
                    state.settings[`font${font.charAt(0).toUpperCase() + font.slice(1)}`] = parseInt(e.target.value);
                    CVApp.State.saveState();
                    CVApp.Render.updatePreview();
                });
            }
        });

        // Template Select
        const tmplSelect = el('#template-select');
        if (tmplSelect) {
            tmplSelect.addEventListener('change', (e) => {
                state.settings.template = e.target.value;
                CVApp.State.saveState();

                // Load colors for new template
                initInputs();

                CVApp.Render.updatePreview();
            });
        }

        // Language Buttons
        const updateActiveLangBtn = (lang) => {
            els('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });
        };

        const langOpts = el('#lang-options');
        if (langOpts) {
            langOpts.addEventListener('click', (e) => {
                const btn = e.target.closest('.lang-btn');
                if (!btn) return;
                const newLang = btn.dataset.lang;
                state.settings.language = newLang;
                updateActiveLangBtn(newLang);
                CVApp.I18n.setLanguage(newLang);
                CVApp.Render.updateInterfaceLanguage();
                CVApp.Render.updatePreview();
                CVApp.State.saveState();
            });
        }

        // --- Dynamic Form Delegation (Inputs) ---
        const container = el('#dynamic-forms-container');
        if (container) {
            container.addEventListener('input', (e) => {
                if (!e.target.matches('input, textarea')) return;
                const row = e.target.closest('.edu-row, .exp-row');
                if (!row) {
                    // Check for Section Title input
                    if (e.target.classList.contains('input-section-title')) {
                        const sectionId = e.target.dataset.id;
                        const section = state.customSections.find(s => s.id === sectionId);
                        if (section) {
                            section.title = e.target.value;
                            CVApp.State.saveState();
                            CVApp.Render.updatePreview();
                        }
                    }
                    return;
                }

                const list = row.parentElement;
                if (!list) return;
                const listId = list.id;

                if (listId === 'edu-list') {
                    const rows = els('.edu-row', list);
                    state.educations = rows.map(r => ({
                        course: el('.edu-course', r).value,
                        where: el('.edu-where', r).value
                    }));
                } else if (listId === 'exp-list') {
                    const rows = els('.exp-row', list);
                    state.experiences = rows.map(r => ({
                        title: el('.exp-title', r).value,
                        period: el('.exp-period', r).value,
                        company: el('.exp-company', r).value,
                        role: el('.exp-role', r).value,
                        tech: el('.exp-tech', r).value,
                        desc: el('.exp-desc', r).value
                    }));
                } else if (listId === 'courses-list') {
                    const rows = els('.edu-row', list);
                    state.courses = rows.map(r => ({
                        name: el('.course-name', r).value,
                        where: el('.course-where', r).value
                    }));
                } else if (listId === 'langs-list') {
                    const rows = els('.edu-row', list);
                    state.languages = rows.map(r => ({
                        name: el('.lang-name', r).value,
                        level: el('.lang-level', r).value
                    }));
                } else if (listId.startsWith('list-')) {
                    // Check if it's a custom section (not edu-list, exp-list, courses-list, langs-list)
                    const systemLists = ['edu-list', 'exp-list', 'courses-list', 'langs-list'];
                    if (!systemLists.includes(listId)) {
                        const sectionId = listId.replace('list-', '');
                        const section = state.customSections.find(s => s.id === sectionId);
                        if (section) {
                            const rows = els('.exp-row', list);
                            section.items = rows.map(r => ({
                                title: el('.custom-title', r).value,
                                period: el('.custom-period', r).value,
                                subtitle: el('.custom-subtitle', r).value,
                                desc: el('.custom-desc', r).value
                            }));
                        }
                    }
                }

                CVApp.State.saveState();
                CVApp.Render.updatePreview();
            });

            // --- Dynamic Buttons Delegation (Add / Remove) ---
            container.addEventListener('click', (e) => {
                // 1. Remove Item
                if (e.target.classList.contains('remove-item-btn')) {
                    const type = e.target.dataset.type;
                    const index = parseInt(e.target.dataset.index);

                    if (type === 'education') state.educations.splice(index, 1);
                    if (type === 'experience') state.experiences.splice(index, 1);
                    if (type === 'courses') state.courses.splice(index, 1);
                    if (type === 'languages') state.languages.splice(index, 1);
                    if (type === 'custom') {
                        const secId = e.target.dataset.sectionId;
                        const section = state.customSections.find(s => s.id === secId);
                        if (section) section.items.splice(index, 1);
                    }

                    CVApp.Render.renderSidebarForms();
                    CVApp.State.saveState();
                    CVApp.Render.updatePreview();
                }

                // 2. Add Item
                if (e.target.classList.contains('add-item-btn')) {
                    const type = e.target.dataset.type;

                    if (type === 'education') {
                        state.educations.push({ course: 'New Degree', where: 'Institution' });
                    } else if (type === 'experience') {
                        state.experiences.unshift({ period: 'MM/YYYY', title: 'Job Title', company: 'Company', role: 'Role', tech: 'Stack', desc: 'Description' });
                    } else if (type === 'courses') {
                        state.courses.push({ name: 'New Course', where: 'Institution' });
                    } else if (type === 'languages') {
                        state.languages.push({ name: 'Language', level: 'Level' });
                    } else if (type === 'custom') {
                        const secId = e.target.dataset.sectionId;
                        const section = state.customSections.find(s => s.id === secId);
                        if (section) section.items.push({ title: 'New Item', period: 'Year', subtitle: 'Detail', desc: 'Desc' });
                    }

                    CVApp.Render.renderSidebarForms();
                    CVApp.State.saveState();
                    CVApp.Render.updatePreview();
                }

                // 3. Remove Section
                if (e.target.classList.contains('remove-section-btn')) {
                    if (!confirm('Delete this entire section?')) return;
                    const secId = e.target.dataset.id;
                    state.customSections = state.customSections.filter(s => s.id !== secId);
                    state.sectionOrder = state.sectionOrder.filter(o => o.id !== secId);

                    CVApp.Render.renderSidebarForms();
                    CVApp.State.saveState();
                    CVApp.Render.updatePreview();
                }
            });
        }


        // --- Add New Section Button ---
        const btnAddSection = el('#add-new-section');
        if (btnAddSection) {
            btnAddSection.addEventListener('click', () => {
                const newId = 'custom-' + Date.now();
                state.customSections.push({
                    id: newId,
                    title: 'New Section',
                    items: []
                });
                state.sectionOrder.push({ id: newId, type: 'custom' });

                CVApp.Render.renderSidebarForms();
                CVApp.State.saveState();
                CVApp.Render.updatePreview();

                setTimeout(() => {
                    const c = el('#dynamic-forms-container');
                    if (c) c.scrollTop = c.scrollHeight;
                }, 100);
            });
        }

        // --- Reorder Sections Logic ---
        const btnSections = el('#sections-btn');
        if (btnSections) {
            btnSections.addEventListener('click', () => {
                CVApp.Render.renderSortableList();
                const sectionsModal = el('#sections-modal');
                if (sectionsModal) sectionsModal.classList.add('open');

                const list = document.getElementById('sections-sortable');
                if (list && !list._sortable) {
                    new Sortable(list, {
                        animation: 150,
                        onEnd: function (evt) {
                            const newOrderIds = Array.from(list.children).map(child => child.dataset.id);
                            const oldOrderMap = new Map(state.sectionOrder.map(o => [o.id, o]));

                            const newOrder = newOrderIds.map(id => {
                                if (oldOrderMap.has(id)) return oldOrderMap.get(id);
                                return { id: id, type: id.startsWith('custom') ? 'custom' : 'system' };
                            });

                            state.sectionOrder = newOrder;
                            CVApp.State.saveState();
                            CVApp.Render.updatePreview();
                        }
                    });
                    list._sortable = true;
                }
            });
        }

        // --- Save / Export / Import ---
        const btnSave = el('#save-btn');
        if (btnSave) {
            btnSave.addEventListener('click', () => {
                CVApp.State.saveState();
                const originalText = btnSave.innerText;
                btnSave.innerText = CVApp.I18n.getTranslation('msg_saved');
                btnSave.style.background = '#059669';
                setTimeout(() => {
                    btnSave.innerText = CVApp.I18n.getTranslation('btn_save');
                    btnSave.style.background = '#2563eb';
                }, 1000);
            });
        }

        // Restore Test Content
        const btnRestoreTest = el('#restore-test-btn');
        if (btnRestoreTest) {
            btnRestoreTest.addEventListener('click', () => {
                if (!confirm(CVApp.I18n.getTranslation('msg_restore_test_confirm'))) return;

                CVApp.State.resetState();
                CVApp.State.saveState();
                initInputs();
                CVApp.Render.renderSidebarForms();
                CVApp.Render.updatePreview();
            });
        }

        // Reset Colors Button
        const btnResetColors = el('#reset-colors-btn');
        if (btnResetColors) {
            btnResetColors.addEventListener('click', () => {
                if (!confirm(CVApp.I18n.getTranslation('msg_reset_colors_confirm'))) return;

                const currentTemplate = state.settings.template || 'classic';
                CVApp.State.resetTemplateColors(currentTemplate);
                initInputs(); // Reload color inputs with defaults
                CVApp.Render.updatePreview();
            });
        }

        // Clear Content
        const btnClear = el('#clear-btn');
        if (btnClear) {
            btnClear.addEventListener('click', () => {
                if (!confirm(CVApp.I18n.getTranslation('msg_clear_confirm'))) return;

                // Clear Data
                state.formData.name = "";
                state.formData.age = "";
                state.formData.desc = "";
                state.formData.city = "";
                state.formData.phone = "";
                state.formData.email = "";
                state.formData.githubUrl = "";
                state.formData.githubLabel = "";
                state.formData.additional = "";

                state.educations = [];
                state.experiences = [];
                state.courses = [];
                state.languages = [];
                state.customSections = [];
                // Preserve system section structure so sections can render when new items are added
                state.sectionOrder = [
                    { id: 'edu-section', type: 'system' },
                    { id: 'courses-section', type: 'system' },
                    { id: 'exp-section', type: 'system' }
                ];

                CVApp.State.saveState();
                initInputs();
                CVApp.Render.renderSidebarForms();
                CVApp.Render.updatePreview();
            });
        }

        const btnGen = el('#gen');
        if (btnGen) {
            btnGen.addEventListener('click', () => {
                window.print();
            });
        }

        const btnExport = el('#export');
        if (btnExport) {
            btnExport.addEventListener('click', () => {
                // Robust CSV export
                const cssContent = document.querySelector('style') ? document.querySelector('style').innerHTML : '';
                // Try to find link stylesheet content if possible (security restrictions might apply locally)
                // We will assume basic styles or try to fetch.
                // Re-creating styles manually is safest for invalid file protocol.
                // But for now, we leave as is, assuming user has assets.

                const htmlContent = `
<!DOCTYPE html>
<html lang="${state.settings.language}">
<head>
    <meta charset="UTF-8">
    <title>${state.formData.name || 'CV'} - CV</title>
    <style>
        ${cssContent}
        body { margin: 0; padding: 20px; font-family: sans-serif; }
    </style>
     <link rel="stylesheet" href="assets/css/styles.css">
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css"/>
</head>
<body>
    ${el('.cv-a4') ? el('.cv-a4').outerHTML : '<div>Error: CV content not found.</div>'}
</body>
</html>`;
                const blob = new Blob([htmlContent], { type: 'text/html' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `cv-${(state.formData.name || 'cv').replace(/\s+/g, '-').toLowerCase()}.html`;
                a.click();
            });
        }

        // Backup
        const btnBackup = el('#backup-btn');
        if (btnBackup) {
            btnBackup.addEventListener('click', () => {
                const dataStr = JSON.stringify(CVApp.State.data, null, 2);
                const blob = new Blob([dataStr], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `cv-backup-${(state.formData.name || 'cv').replace(/\s+/g, '-').toLowerCase()}.json`;
                a.click();
            });
        }

        // Restore
        const btnRestore = el('#restore-btn');
        if (btnRestore) {
            btnRestore.addEventListener('click', () => {
                const fileInput = el('#import-file');
                if (fileInput) fileInput.click();
            });
        }

        const fileInput = el('#import-file');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const json = JSON.parse(e.target.result);
                        if (json.formData && json.educations) {
                            // Ensure backwards compatibility
                            if (!json.customSections) json.customSections = [];
                            if (!json.sectionOrder) {
                                // Initialize default section order
                                json.sectionOrder = [
                                    { id: 'edu-section', type: 'system' },
                                    { id: 'courses-section', type: 'system' },
                                    { id: 'exp-section', type: 'system' }
                                ];
                            }

                            // Use Object.assign to preserve references
                            Object.assign(CVApp.State.data, json);
                            CVApp.State.saveState();
                            initInputs();
                            CVApp.Render.renderSidebarForms();

                            // Set language in I18n module before updating interface
                            if (json.settings && json.settings.language) {
                                CVApp.I18n.setLanguage(json.settings.language);
                            }

                            CVApp.Render.updateInterfaceLanguage();
                            CVApp.Render.updatePreview();
                            alert(CVApp.I18n.getTranslation('msg_restore_success'));
                        } else {
                            alert(CVApp.I18n.getTranslation('msg_restore_error'));
                        }
                    } catch (err) {
                        console.error(err);
                        alert(CVApp.I18n.getTranslation('msg_restore_error'));
                    }
                    // Reset input
                    fileInput.value = '';
                };
                reader.readAsText(file);
            });
        }

        // Settings Modal
        const btnSettings = el('#settings-btn');
        if (btnSettings) {
            btnSettings.addEventListener('click', () => {
                const settingsModal = el('#settings-modal');
                if (settingsModal) settingsModal.classList.add('open');
            });
        }

        els('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                const settingsModal = el('#settings-modal');
                if (settingsModal) settingsModal.classList.remove('open');
                const sectionsModal = el('#sections-modal');
                if (sectionsModal) sectionsModal.classList.remove('open');
            });
        });

    };

    /* --- Start --- */
    document.addEventListener('DOMContentLoaded', () => {
        try {
            CVApp.State.loadState();
        } catch (e) { console.error("Load state failed", e); }

        try {
            CVApp.I18n.setLanguage(state.settings.language || 'en-US');
        } catch (e) { console.error("Set Lang failed", e); }

        try { initInputs(); } catch (e) { console.error("Init inputs failed", e); }
        try { initEvents(); } catch (e) { console.error("Init events failed", e); }

        try {
            CVApp.Render.renderSidebarForms();
            CVApp.Render.updatePreview();
        } catch (e) { console.error("Initial render failed", e); }
    });

})();
