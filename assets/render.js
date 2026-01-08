/* --- Render Module --- */
// Handles all DOM updates and HTML generation

CVApp.Render = (function () {

    // --- Helpers ---
    const el = (sel, parent = document) => parent.querySelector(sel);
    const els = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

    const toggleElementVisibility = (content, elementId) => {
        const element = el(`#${elementId}`);
        if (!element) return;

        let shouldShow = false;
        if (Array.isArray(content)) {
            shouldShow = content.length > 0;
        } else if (typeof content === 'string') {
            shouldShow = content.trim() !== '';
        } else {
            shouldShow = !!content;
        }

        element.style.display = shouldShow ? '' : 'none';
    };

    // --- Form Rendering (Sidebar) ---

    // 1. Render all forms into #dynamic-forms-container
    // We render System Sections (Edu, Exp, Courses, Langs) + Custom Sections
    const renderSidebarForms = () => {
        const container = el('#dynamic-forms-container');
        if (!container) return;
        container.innerHTML = '';

        // Order of forms in Sidebar:
        // 1. Education
        // 2. Experience
        // 3. Courses
        // 4. Languages
        // 5. Custom Sections (Loop)

        renderSystemSectionForm(container, 'education', 'section_education', 'btn_add_edu', 'edu-list');
        renderSystemSectionForm(container, 'experience', 'section_experience', 'btn_add_exp', 'exp-list');
        renderSystemSectionForm(container, 'courses', 'section_courses', 'btn_add_course', 'courses-list');
        renderSystemSectionForm(container, 'languages', 'section_languages', 'btn_add_lang', 'langs-list');

        // Render Custom Sections
        const customSections = CVApp.State.data.customSections || [];
        customSections.forEach((section, index) => {
            renderCustomSectionFormBlock(container, section, index);
        });
    };

    // Helper to render a System Section Form Block
    const renderSystemSectionForm = (container, type, titleKey, btnKey, listId) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <h4 data-i18n="${titleKey}">${CVApp.I18n.getTranslation(titleKey)}</h4>
            <div id="${listId}"></div>
            <button class="btn-secondary add-item-btn" data-type="${type}" data-i18n="${btnKey}">
                ${CVApp.I18n.getTranslation(btnKey)}
            </button>
            <hr style="margin: 16px 0;" />
        `;
        container.appendChild(wrapper);

        // Render the items list for this section
        if (type === 'education') renderEducationItems(el(`#${listId}`, wrapper));
        if (type === 'experience') renderExperienceItems(el(`#${listId}`, wrapper));
        if (type === 'courses') renderCoursesItems(el(`#${listId}`, wrapper));
        if (type === 'languages') renderLanguagesItems(el(`#${listId}`, wrapper));
    };

    // Helper to render a Custom Section Form Block
    const renderCustomSectionFormBlock = (container, section, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-section-form-block';
        wrapper.dataset.id = section.id;
        wrapper.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;">
                 <label>${CVApp.I18n.getTranslation('label_custom_section_title')}</label>
                 <button class="btn-danger remove-section-btn" data-id="${section.id}" style="padding:2px 6px;font-size:10px;">
                    ${CVApp.I18n.getTranslation('btn_remove_section')}
                 </button>
            </div>
            <input type="text" class="input-section-title" data-id="${section.id}" value="${section.title}">
            
            <div id="list-${section.id}" style="margin-top:10px;"></div>
            
            <button class="btn-secondary add-item-btn" data-type="custom" data-section-id="${section.id}">
                ${CVApp.I18n.getTranslation('btn_add_custom')}
            </button>
            <hr style="margin: 16px 0;" />
        `;
        container.appendChild(wrapper);
        renderCustomItems(el(`#list-${section.id}`, wrapper), section);
    };


    // --- Item List Renderers ---

    const renderEducationItems = (list) => {
        CVApp.State.data.educations.forEach((edu, i) => {
            const row = document.createElement('div');
            row.className = 'edu-row';
            row.innerHTML = `
                <div class="exp-row-header">
                    <span>${edu.course || 'New Education'}</span>
                    <button class="btn-danger remove-item-btn" data-type="education" data-index="${i}">X</button>
                </div>
                <label>Course <input class="edu-course" type="text" value="${edu.course}"></label>
                <label>Institution / Year <input class="edu-where" type="text" value="${edu.where}"></label>
            `;
            list.appendChild(row);
        });
    };

    const renderExperienceItems = (list) => {
        CVApp.State.data.experiences.forEach((exp, i) => {
            const row = document.createElement('div');
            row.className = 'exp-row';
            row.innerHTML = `
                <div class="exp-row-header">
                    <span>${exp.title || 'New Experience'}</span>
                    <button class="btn-danger remove-item-btn" data-type="experience" data-index="${i}">X</button>
                </div>
                <div class="row">
                    <label>Title <input class="exp-title" type="text" value="${exp.title}"></label>
                    <label>Period <input class="exp-period" type="text" value="${exp.period}"></label>
                </div>
                <label>Company <input class="exp-company" type="text" value="${exp.company}"></label>
                <div class="row">
                    <label>Role <input class="exp-role" type="text" value="${exp.role}"></label>
                    <label>Tech <input class="exp-tech" type="text" value="${exp.tech}"></label>
                </div>
                <label>Description <textarea class="exp-desc">${exp.desc}</textarea></label>
            `;
            list.appendChild(row);
        });
    };

    const renderCoursesItems = (list) => {
        CVApp.State.data.courses.forEach((c, i) => {
            const row = document.createElement('div');
            row.className = 'edu-row';
            row.innerHTML = `
                <div class="exp-row-header">
                    <span>${c.name || 'New Course'}</span>
                    <button class="btn-danger remove-item-btn" data-type="courses" data-index="${i}">X</button>
                </div>
                <label>Name <input class="course-name" type="text" value="${c.name}"></label>
                <label>Institution <input class="course-where" type="text" value="${c.where}"></label>
            `;
            list.appendChild(row);
        });
    };

    const renderLanguagesItems = (list) => {
        CVApp.State.data.languages.forEach((l, i) => {
            const row = document.createElement('div');
            row.className = 'edu-row';
            row.innerHTML = `
                <div class="exp-row-header">
                    <span>${l.name || 'Language'}</span>
                    <button class="btn-danger remove-item-btn" data-type="languages" data-index="${i}">X</button>
                </div>
                <div class="row">
                   <label>Language <input class="lang-name" type="text" value="${l.name}"></label>
                   <label>Level <input class="lang-level" type="text" value="${l.level}"></label>
                </div>
            `;
            list.appendChild(row);
        });
    };

    const renderCustomItems = (list, section) => {
        section.items.forEach((item, i) => {
            const row = document.createElement('div');
            row.className = 'exp-row';
            row.innerHTML = `
                <div class="exp-row-header">
                    <span>${item.title || 'New Item'}</span>
                    <button class="btn-danger remove-item-btn" data-type="custom" data-section-id="${section.id}" data-index="${i}">X</button>
                </div>
                <div class="row">
                    <label>Title <input class="custom-title" type="text" value="${item.title}"></label>
                    <label>Date/Period <input class="custom-period" type="text" value="${item.period}"></label>
                </div>
                <label>Subtitle / Role <input class="custom-subtitle" type="text" value="${item.subtitle}"></label>
                <label>Description <textarea class="custom-desc">${item.desc}</textarea></label>
            `;
            list.appendChild(row);
        });
    };

    // --- Render Sortable List (Modal) ---
    const renderSortableList = () => {
        const list = el('#sections-sortable');
        if (!list) return;
        list.innerHTML = '';

        const order = CVApp.State.data.sectionOrder || [];
        order.forEach(item => {
            const div = document.createElement('div');
            div.className = 'sortable-item';
            div.dataset.id = item.id;
            div.style.padding = '10px';
            div.style.marginBottom = '5px';
            div.style.background = '#f3f4f6';
            div.style.border = '1px solid #ddd';
            div.style.cursor = 'grab';

            let label = item.id;
            // Get proper label
            if (item.type === 'system') {
                if (item.id === 'edu-section') label = CVApp.I18n.getTranslation('section_education');
                if (item.id === 'exp-section') label = CVApp.I18n.getTranslation('section_experience');
                if (item.id === 'courses-section') label = CVApp.I18n.getTranslation('section_courses');
                // Languages usually static sidebar unless we allow moving it (not doing that yet)
            } else {
                const sec = CVApp.State.data.customSections.find(s => s.id === item.id);
                label = sec ? sec.title : 'Unknown Section';
            }

            div.innerText = label;
            list.appendChild(div);
        });
    };


    // --- CV Preview ---

    // Generic function to render any section into the DOM
    const renderSectionToDOM = (sectionMeta) => {
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.id = sectionMeta.id;
        wrapper.style.marginTop = '20px';

        // Add Title
        const titleDiv = document.createElement('div');
        titleDiv.className = 'section-title';

        let contentDiv = document.createElement('div');

        if (sectionMeta.type === 'system') {
            if (sectionMeta.id === 'edu-section') {
                titleDiv.innerText = CVApp.I18n.getTranslation('section_education');
                contentDiv.id = 'cv-edus';
                // We need to actually render the content items into this div now
                // or we can call a helper. Best to fill it now.
                CVApp.State.data.educations.forEach(edu => {
                    const d = document.createElement('div');
                    d.className = 'edu-item editable';
                    d.innerHTML = `<strong>${edu.course}</strong><div class="where">${edu.where}</div>`;
                    contentDiv.appendChild(d);
                });
                // Visibility check
                if (CVApp.State.data.educations.length === 0) wrapper.style.display = 'none';

            } else if (sectionMeta.id === 'exp-section') {
                titleDiv.innerText = CVApp.I18n.getTranslation('section_experience');
                contentDiv.id = 'cv-exps';
                CVApp.State.data.experiences.forEach(exp => {
                    const div = document.createElement('div');
                    div.className = 'experience-item editable';
                    const companyText = exp.company ? ` - ${exp.company}` : '';
                    div.innerHTML = `
                    <div class="item-header">
                        <h4>${exp.title}${companyText}</h4>
                        <div class="period">${exp.period}</div>
                    </div>
                    <div class="role-tech"><b>${CVApp.I18n.getTranslation('label_role')}:</b> ${exp.role}</div>
                    <div class="tech"><b>${CVApp.I18n.getTranslation('label_tech')}:</b> ${exp.tech}</div>
                    <p><b>${CVApp.I18n.getTranslation('section_desc')}:</b> ${exp.desc}</p>`;
                    contentDiv.appendChild(div);
                });
                if (CVApp.State.data.experiences.length === 0) wrapper.style.display = 'none';

            } else if (sectionMeta.id === 'courses-section') {
                titleDiv.innerText = CVApp.I18n.getTranslation('section_courses');
                contentDiv.id = 'cv-courses';
                CVApp.State.data.courses.forEach(c => {
                    const d = document.createElement('div');
                    d.className = 'edu-item editable';
                    d.innerHTML = `<strong>${c.name}</strong><div class="where">${c.where || ''}</div>`;
                    contentDiv.appendChild(d);
                });
                if (CVApp.State.data.courses.length === 0) wrapper.style.display = 'none';
            }

        } else if (sectionMeta.type === 'custom') {
            // Find Custom Data
            const secData = CVApp.State.data.customSections.find(s => s.id === sectionMeta.id);
            if (secData) {
                titleDiv.innerText = secData.title;
                contentDiv.className = 'custom-section-items'; // Class for future styling?

                secData.items.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'experience-item editable';
                    div.innerHTML = `
                    <div class="item-header">
                        <h4>${item.title}</h4>
                        <div class="period">${item.period}</div>
                    </div>
                    ${item.subtitle ? `<div class="role-tech">${item.subtitle}</div>` : ''}
                    <p>${item.desc}</p>`;
                    contentDiv.appendChild(div);
                });

                if (secData.items.length === 0) wrapper.style.display = 'none';
            } else {
                return null; // Section deleted?
            }
        }

        wrapper.appendChild(titleDiv);
        wrapper.appendChild(contentDiv);
        return wrapper;
    };


    const updatePreview = function () {
        const state = CVApp.State.data;

        // 1. Static Sidebar Info (Personal, Langs, Portfolio)

        // Update Static Titles for Language Change
        const updateTitle = (id, key) => {
            const t = el(id);
            if (t) t.innerText = CVApp.I18n.getTranslation(key);
        };
        updateTitle('#title-desc', 'section_desc');
        updateTitle('#title-personal', 'section_personal');
        updateTitle('#title-portfolio', 'section_portfolio');
        updateTitle('#title-additional', 'section_additional');
        updateTitle('#title-langs', 'section_languages');

        // These are fixed in position for now, as per standard templates (mostly).
        // Except languages, which are sidebar in Classic but maybe Main in others?
        // User asked to order "options below Academic Background". This implies Main Column items.

        el('#cv-name').innerText = state.formData.name.split(' ')[0] || '';
        el('#cv-surname').innerText = state.formData.name.split(' ').slice(1).join(' ') || '';
        el('#cv-age').innerText = state.formData.age;
        el('#cv-desc').innerText = state.formData.desc;
        el('#cv-city').innerText = state.formData.city;
        el('#cv-phone').innerText = state.formData.phone;
        el('#cv-email').innerText = state.formData.email;
        el('#cv-additional').innerText = state.formData.additional;

        const ghUrl = state.formData.githubUrl;
        if (ghUrl) {
            el('#cv-github').href = ghUrl;
            let linkText = state.formData.githubLabel;
            if (!linkText) {
                linkText = ghUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
            }
            el('#cv-github-user').innerText = linkText;
        }

        toggleElementVisibility(state.formData.desc, 'desc-section');
        toggleElementVisibility(state.formData.age, 'age-item');
        toggleElementVisibility(state.formData.email, 'email-item');
        toggleElementVisibility(state.formData.phone, 'phone-item');
        toggleElementVisibility(state.formData.city, 'city-item');
        toggleElementVisibility(ghUrl, 'portfolio-section');
        toggleElementVisibility(state.formData.additional, 'additional-section');


        // Languages (Fixed placement in sidebar for now)
        const langWrap = el('#cv-langs');
        if (langWrap) {
            langWrap.innerHTML = '';
            state.languages.forEach(l => {
                const d = document.createElement('div');
                d.className = 'contact-item editable';
                d.innerHTML = `<strong>${l.name}:</strong> ${l.level}`;
                langWrap.appendChild(d);
            });
            toggleElementVisibility(state.languages, 'langs-section');
        }


        // 2. Dynamic Main Column
        const mainContainer = el('#cv-main-content');
        if (mainContainer) {
            mainContainer.innerHTML = ''; // Clear

            // Loop through sectionOrder
            const order = state.sectionOrder || [];
            order.forEach(meta => {
                const element = renderSectionToDOM(meta);
                if (element) mainContainer.appendChild(element);
            });
        }

        // Styles
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty('--accent', state.settings.accent);
        rootStyle.setProperty('--text-color-main', state.settings.textMain);
        rootStyle.setProperty('--text-color-sidebar', state.settings.textSidebar);
        rootStyle.setProperty('--font-size-name', state.settings.fontName + 'px');
        rootStyle.setProperty('--font-size-title', state.settings.fontTitle + 'px');
        rootStyle.setProperty('--font-size-body', state.settings.fontBody + 'px');
        rootStyle.setProperty('--font-size-small', state.settings.fontSmall + 'px');

        // Template Class
        const cvContainer = el('#cv');
        // Remove ANY existing template class to prevent inheritance issues
        cvContainer.classList.forEach(cls => {
            if (cls.startsWith('cv-template-')) {
                cvContainer.classList.remove(cls);
            }
        });
        cvContainer.classList.add(`cv-template-${state.settings.template || 'classic'}`);
    };

    const updateInterfaceLanguage = () => {
        els('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.innerText = CVApp.I18n.getTranslation(key);
        });
        els('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = CVApp.I18n.getTranslation(key);
        });

        // Re-render forms to update labels inside them
        renderSidebarForms();
    };

    return {
        updatePreview,
        renderSidebarForms,
        renderSortableList,
        updateInterfaceLanguage,
        // Expose helpers if needed or minimal API
        // For events.js to call specifically if needed:
        renderEducationForm: () => renderSidebarForms(), // Lazy alias
        renderExperienceForm: () => renderSidebarForms(),
        renderCoursesForm: () => renderSidebarForms(),
        renderLanguagesForm: () => renderSidebarForms(),
        renderCustomSectionForm: () => renderSidebarForms()
    };
})();
