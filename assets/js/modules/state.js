// State Module
(function () {
  const defaultExperiences = [
    {
      period: '07/2021 – Present',
      title: 'Senior Software Engineer',
      company: 'Innovatech Solutions Inc.',
      role: 'Lead Developer',
      tech: 'React, Node.js, TypeScript, AWS, Docker',
      desc: 'Led a team of developers in building a scalable microservices architecture. Designed and implemented RESTful APIs, and improved application performance by 30%.'
    },
    {
      period: '06/2019 – 06/2021',
      title: 'Software Developer',
      company: 'DataStream Analytics',
      role: 'Full Stack Developer',
      tech: 'Python, Django, PostgreSQL, Vue.js',
      desc: 'Developed and maintained data-intensive web applications. Contributed to database design and created interactive data visualizations for clients.'
    },
    {
      period: '05/2018 – 08/2018',
      title: 'Software Engineer Intern',
      company: 'NextGen Apps',
      role: 'Frontend Intern',
      tech: 'JavaScript, HTML5, CSS3, Vue.js',
      desc: 'Assisted the frontend team in developing user-facing features, fixing bugs, and writing unit tests. Gained hands-on experience in an agile development environment.'
    }
  ];

  const defaultEducations = [
    {
      course: 'Bachelor of Science in Computer Science',
      where: 'University of Texas at Austin – 2015 - 2019'
    },
    {
      course: 'Full Stack Web Development Certificate',
      where: 'CodeSphere Academy – 2019'
    }
  ];

  const defaultCourses = [
    {
      name: 'AWS Certified Solutions Architect',
      where: 'Amazon Web Services (AWS)'
    },
    {
      name: 'Advanced React Patterns',
      where: 'Frontend Masters'
    },
    {
      name: 'Agile Project Management',
      where: 'Coursera'
    }
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
      accent: "#0f4c81",
      textMain: "#333333",
      textSidebar: "#FFFFFF",
      fontName: 25,
      fontTitle: 13,
      fontBody: 12,
      fontSmall: 11,
      language: "en-US",
      template: "classic"
    }
  };

  // resetState is defined above

  CVApp.State.loadState = function () {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        Object.assign(CVApp.State.data, parsed);

        // Safety checks
        if (!Array.isArray(CVApp.State.data.experiences)) CVApp.State.data.experiences = [];
        if (!Array.isArray(CVApp.State.data.educations)) CVApp.State.data.educations = [];
        if (!Array.isArray(CVApp.State.data.courses)) CVApp.State.data.courses = [];
        if (!Array.isArray(CVApp.State.data.languages)) CVApp.State.data.languages = [];
        if (!Array.isArray(CVApp.State.data.customSections)) CVApp.State.data.customSections = [];
        if (!Array.isArray(CVApp.State.data.sectionOrder)) {
          // Migration: If no order exists, create default one based on current data
          CVApp.State.resetState();
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
