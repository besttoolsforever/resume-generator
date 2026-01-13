// State Module
(function () {
  /* Expanded Test Data - Updated for Pagination Testing */
  const defaultExperiences = [
    {
      period: '01/2024 – Present',
      title: 'Principal Software Engineer & Cloud Architect',
      company: 'Global Tech Dynamics',
      role: 'Lead Architect',
      tech: 'Go, Kubernetes, Terraform, AWS, Kafka, gRPC, Prometheus, Istio',
      desc: 'Responsible for defining the global technology strategy. Leading engineering efforts for multi-cloud migration. Implementing observability standards and large-scale data governance. Achieved a 45% reduction in operational costs through infrastructure automation.'
    },
    {
      period: '07/2022 – 12/2023',
      title: 'Senior Staff Engineer',
      company: 'Innovatech Solutions Inc.',
      role: 'Tech Lead',
      tech: 'React, Node.js, TypeScript, AWS, Docker, GraphQL, Redis',
      desc: 'Led multiple engineering teams in developing critical financial systems. Architected event-driven microservices. Mentored senior engineers and defined code review and CI/CD pipeline processes.'
    },
    {
      period: '01/2021 – 06/2022',
      title: 'Senior Software Engineer',
      company: 'DataStream Analytics',
      role: 'Full Stack Lead',
      tech: 'Python, Django, PostgreSQL, Vue.js, Redis, Apache Spark',
      desc: 'Developed ETL pipelines and Big Data processing workflows. Implemented machine learning models in production environments. Optimized complex SQL queries, reducing API response times by 60%.'
    },
    {
      period: '06/2019 – 12/2020',
      title: 'Software Developer III',
      company: 'Cloud Systems US',
      role: 'Backend Specialist',
      tech: 'Java, Spring Boot, MySQL, RabbitMQ, ElasticSearch',
      desc: 'Architected and developed high-concurrency systems. Migrated on-premises infrastructure to AWS. Implemented advanced search systems using ElasticSearch clusters.'
    },
    {
      period: '01/2018 – 05/2019',
      title: 'Software Developer II',
      company: 'WebFlow Digital',
      role: 'Frontend Specialist',
      tech: 'JavaScript, React, Redux, Sass, Jest',
      desc: 'Developed complex Single Page Applications (SPAs). Created internal component libraries (Design Systems). Focused on web accessibility (WCAG) and browser rendering performance.'
    },
    {
      period: '06/2017 – 12/2017',
      title: 'Junior Developer',
      company: 'Startup Hub',
      role: 'Full Stack Developer',
      tech: 'Ruby on Rails, PostgreSQL, jQuery, Heroku',
      desc: 'Agile development of MVPs for accelerated startups. Implemented authentication features, payment gateways (Stripe), and third-party API integrations.'
    },
    {
      period: '01/2017 – 05/2017',
      title: 'Software Engineer Intern',
      company: 'NextGen Apps',
      role: 'Engineering Intern',
      tech: 'JavaScript, HTML5, CSS3, Vue.js',
      desc: 'Supported the development of prototypes and resolved technical debt. Participated in Scrum ceremonies and internal technology workshops.'
    },
    {
      period: '2016 – 2016',
      title: 'Teaching Assistant',
      company: 'University of Texas at Austin',
      role: 'Computer Science Tutor',
      tech: 'C, C++, Data Structures',
      desc: 'Assisted students in Algorithms and Data Structures courses. Performed code reviews and provided support in programming laboratories.'
    },
    {
      period: '2015 – 2016',
      title: 'Research Assistant',
      company: 'UT Research Lab',
      role: 'Undergraduate Researcher',
      tech: 'Python, MATLAB, LaTeX',
      desc: 'Research in image processing and computer vision. Data collection and technical documentation for academic publications.'
    },
    {
      period: '2014 – 2015',
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      role: 'Web Designer & Dev',
      tech: 'PHP, MySQL, WordPress',
      desc: 'Developed institutional websites and blogs for small local businesses. Customized themes and plugins.'
    }
  ];

  const defaultEducations = [
    {
      course: 'PhD in Computer Science - AI & Distributed Systems',
      where: 'Stanford University – 2024 - 2028 (Expected)'
    },
    {
      course: 'Master of Science in Software Engineering',
      where: 'MIT – 2020 - 2022'
    },
    {
      course: 'Bachelor of Science in Computer Science',
      where: 'University of Texas at Austin – 2015 - 2019'
    },
    {
      course: 'Specialization in Cybersecurity & Cryptography',
      where: 'Carnegie Mellon University – 2020'
    },
    {
      course: 'Post-Graduate Diploma in Data Science',
      where: 'UC Berkeley – 2019 - 2020'
    },
    {
      course: 'Full Stack Web Development Pro Certificate',
      where: 'CodeSphere Academy – 2019'
    },
    {
      course: 'Associate Degree in Information Technology',
      where: 'Austin Community College – 2013 - 2015'
    },
    {
      course: 'Advanced Mathematics for Engineering',
      where: 'ETH Zurich (Summer) – 2018'
    }
  ];

  const defaultCourses = [
    { name: 'AWS Certified Solutions Architect – Professional', where: 'AWS' },
    { name: 'CKAD: Certified Kubernetes Developer', where: 'CNCF' },
    { name: 'Google Professional Cloud Architect', where: 'Google Cloud' },
    { name: 'Microsoft Certified: Azure Solutions Architect', where: 'Microsoft' },
    { name: 'Advanced React Patterns & Performance', where: 'Frontend Masters' },
    { name: 'Deep Learning Specialization', where: 'DeepLearning.AI' },
    { name: 'Machine Learning Specialization', where: 'Stanford Online' },
    { name: 'Agile Project Management & Strategic Leadership', where: 'Harvard' },
    { name: 'Data Structures and Algorithms Nanodegree', where: 'Udacity' },
    { name: 'Cybersecurity Fundamentals', where: 'SANS Institute' },
    { name: 'Go: The Complete Developer Guide', where: 'Udemy' },
    { name: 'Distributed Systems Design', where: 'O\'Reilly' },
    { name: 'Advanced PostgreSQL Administration', where: 'PostgresConf' },
    { name: 'DevOps Culture and Practice', where: 'Red Hat' },
    { name: 'UI/UX Design for Engineers', where: 'IDF' },
    { name: 'Certified Scrum Master (CSM)', where: 'Scrum Alliance' },
    { name: 'Information Security Manager (CISM)', where: 'ISACA' },
    { name: 'Ethical Hacking Course', where: 'EC-Council' },
    { name: 'Big Data Engineering with Spark', where: 'Databricks' },
    { name: 'Microservices Architecture', where: 'Spring Academy' }
  ];

  const defaultLanguages = [
    {
      name: 'English',
      level: 'Native'
    },
    {
      name: 'Spanish',
      level: 'Intermediate'
    },
    {
      name: 'Portuguese',
      level: 'Basic'
    }
  ];

  const defaultProjects = [
    {
      title: 'E-Commerce Platform',
      subtitle: 'Full Stack • React, Node.js, MongoDB',
      period: '2022',
      desc: 'Developed a fully functional e-commerce platform with stripe integration, user authentication, and an admin dashboard.'
    },
    {
      title: 'Task Management App',
      subtitle: 'Frontend • Vue.js, Firebase',
      period: '2021',
      desc: 'Created a real-time task management application allowing team collaboration, task assignment, and progress tracking.'
    }
  ];

  const defaultFormData = {
    name: "Eleanor Vance",
    age: "28",
    desc: "A results-driven Full Stack Developer with 5+ years of experience in designing, developing, and deploying web applications. Proficient in JavaScript, React, Node.js, and cloud services.",
    city: "Austin, TX",
    phone: "(512) 555-0123",
    email: "eleanor.vance.dev@email.com",
    githubUrl: "https://github.com/besttoolsforever",
    githubLabel: "",
    additional: "Eager to apply my skills in a challenging and collaborative environment. Open to remote opportunities."
  };

  // Default colors for each template
  const TEMPLATE_DEFAULT_COLORS = {
    classic: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    professional: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    modern: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    banner: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    minimal: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    elegant: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    compact: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#3498db",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    bold: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    timeline: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#3498db",
      darkBg: "#34495e",
      lightBg: "#ecf0f1"
    },
    nova: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    swiss: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#2c3e50",
      lightBg: "#ecf0f1"
    },
    orbit: {
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      secondaryColor: "#f39c12",
      darkBg: "#1a1a2e",
      lightBg: "#ecf0f1"
    }
  };

  CVApp.State.resetState = function () {
    CVApp.State.data.formData = { ...defaultFormData };
    CVApp.State.data.experiences = JSON.parse(JSON.stringify(defaultExperiences));
    CVApp.State.data.educations = JSON.parse(JSON.stringify(defaultEducations));
    CVApp.State.data.courses = JSON.parse(JSON.stringify(defaultCourses));
    CVApp.State.data.languages = JSON.parse(JSON.stringify(defaultLanguages));

    // Initialize Custom Sections List
    CVApp.State.data.customSections = [
      {
        id: 'project-section', // Fixed ID for default projects to ensure stability in ordering
        title: "Projects",
        items: JSON.parse(JSON.stringify(defaultProjects))
      }
    ];

    // Initialize Order (System sections + the custom one we just created)
    CVApp.State.data.sectionOrder = [
      { id: 'edu-section', type: 'system' },
      { id: 'courses-section', type: 'system' },
      { id: 'exp-section', type: 'system' },
      { id: 'project-section', type: 'custom' }
    ];
  };

  const STORAGE_KEY = 'cv_generator_state';

  CVApp.State.data = {
    experiences: [],
    educations: [],
    courses: [],
    languages: [],
    customSections: [], // Array of { id, title, items: [] }
    sectionOrder: [],   // Array of { id, type }

    formData: { ...defaultFormData },

    settings: {
      templateColors: {
        classic: { ...TEMPLATE_DEFAULT_COLORS.classic },
        professional: { ...TEMPLATE_DEFAULT_COLORS.professional },
        modern: { ...TEMPLATE_DEFAULT_COLORS.modern },
        banner: { ...TEMPLATE_DEFAULT_COLORS.banner },
        minimal: { ...TEMPLATE_DEFAULT_COLORS.minimal },
        elegant: { ...TEMPLATE_DEFAULT_COLORS.elegant },
        compact: { ...TEMPLATE_DEFAULT_COLORS.compact },
        bold: { ...TEMPLATE_DEFAULT_COLORS.bold },
        timeline: { ...TEMPLATE_DEFAULT_COLORS.timeline },
        nova: { ...TEMPLATE_DEFAULT_COLORS.nova },
        swiss: { ...TEMPLATE_DEFAULT_COLORS.swiss },
        orbit: { ...TEMPLATE_DEFAULT_COLORS.orbit }
      },
      fontName: 25,
      fontTitle: 13,
      fontBody: 12,
      fontSmall: 11,
      language: "en-US",
      template: "classic"
    }
  };

  // Helper: Get colors for a specific template
  CVApp.State.getTemplateColors = function (templateName) {
    const colors = CVApp.State.data.settings.templateColors[templateName];
    if (!colors) {
      // Fallback to classic if template not found
      return CVApp.State.data.settings.templateColors.classic || TEMPLATE_DEFAULT_COLORS.classic;
    }
    return colors;
  };

  // Helper: Reset colors for a specific template to defaults
  CVApp.State.resetTemplateColors = function (templateName) {
    if (TEMPLATE_DEFAULT_COLORS[templateName]) {
      CVApp.State.data.settings.templateColors[templateName] = { ...TEMPLATE_DEFAULT_COLORS[templateName] };
      CVApp.State.saveState();
      return CVApp.State.data.settings.templateColors[templateName];
    }
    return null;
  };

  // resetState is defined above

  CVApp.State.loadState = function () {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        Object.assign(CVApp.State.data, parsed);

        // MIGRATION: Convert old flat color structure to new per-template structure
        if (CVApp.State.data.settings) {
          // Check if old format (has flat color properties)
          if (CVApp.State.data.settings.accent && !CVApp.State.data.settings.templateColors) {
            console.log('[Migration] Converting old color format to per-template structure');

            // Create templateColors object with old colors applied to classic template
            const oldColors = {
              accent: CVApp.State.data.settings.accent || "#0f4c81",
              textMain: CVApp.State.data.settings.textMain || "#333333",
              textSidebar: CVApp.State.data.settings.textSidebar || "#FFFFFF",
              secondaryColor: CVApp.State.data.settings.secondaryColor || "#f39c12",
              darkBg: CVApp.State.data.settings.darkBg || "#2c3e50",
              lightBg: CVApp.State.data.settings.lightBg || "#ecf0f1"
            };

            // Create new templateColors structure
            CVApp.State.data.settings.templateColors = {
              classic: oldColors,
              professional: { ...TEMPLATE_DEFAULT_COLORS.professional },
              modern: { ...TEMPLATE_DEFAULT_COLORS.modern },
              banner: { ...TEMPLATE_DEFAULT_COLORS.banner },
              minimal: { ...TEMPLATE_DEFAULT_COLORS.minimal },
              elegant: { ...TEMPLATE_DEFAULT_COLORS.elegant },
              compact: { ...TEMPLATE_DEFAULT_COLORS.compact },
              bold: { ...TEMPLATE_DEFAULT_COLORS.bold },
              timeline: { ...TEMPLATE_DEFAULT_COLORS.timeline },
              nova: { ...TEMPLATE_DEFAULT_COLORS.nova },
              swiss: { ...TEMPLATE_DEFAULT_COLORS.swiss },
              orbit: { ...TEMPLATE_DEFAULT_COLORS.orbit }
            };

            // Delete old flat color properties
            delete CVApp.State.data.settings.accent;
            delete CVApp.State.data.settings.textMain;
            delete CVApp.State.data.settings.textSidebar;
            delete CVApp.State.data.settings.secondaryColor;
            delete CVApp.State.data.settings.darkBg;
            delete CVApp.State.data.settings.lightBg;

            // Save migrated state
            CVApp.State.saveState();
            console.log('[Migration] Color migration completed');
          }
        }

        // Safety checks
        if (!Array.isArray(CVApp.State.data.experiences)) CVApp.State.data.experiences = [];
        if (!Array.isArray(CVApp.State.data.educations)) CVApp.State.data.educations = [];
        if (!Array.isArray(CVApp.State.data.courses)) CVApp.State.data.courses = [];
        if (!Array.isArray(CVApp.State.data.languages)) CVApp.State.data.languages = [];
        if (!Array.isArray(CVApp.State.data.customSections)) CVApp.State.data.customSections = [];
        if (!Array.isArray(CVApp.State.data.sectionOrder)) {
          // Migration: Create default order structure without resetting all data
          CVApp.State.data.sectionOrder = [
            { id: 'edu-section', type: 'system' },
            { id: 'courses-section', type: 'system' },
            { id: 'exp-section', type: 'system' }
          ];
        }
      } catch (e) {
        console.error("Failed to load state", e);
        CVApp.State.resetState();
      }
    } else {
      CVApp.State.resetState();
    }
  };

  CVApp.State.saveState = function () {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(CVApp.State.data));
  };

})();
