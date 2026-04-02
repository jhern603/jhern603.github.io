export const nav = ['About', 'Experience', 'Projects', 'Stack', 'Contact']

export const hero = {
  firstName: 'JOSE',
  lastName: 'HERNANDEZ',
  tagline:
    'AI enablement, security practitioner, and software engineer by day — gamer, photographer and regular human also by day... and night',
  stats: [
    { value: '2+', label: 'Years at Oracle' },
    { value: '2', label: 'OCI Certifications' },
    { value: '6', label: 'Years in the Army' },
  ],
  codeSnippet: `class SoftwareEngineer:
    def __init__(self):
        self.name    = 'Jose Hernandez'
        self.focus   = 'AI Security'
        self.stack   = [
            'MCP', 'Python', 'Go',
            'OCI', 'Kubernetes',
        ]
        self.mindset = 'security-first'

    def build(self, threat):
        return self.secure(
            self.automate(threat)
        )`,
}

export const about = {
  bio: [
    'I\'m ',
    'Jose Hernandez',
    ', a Software Engineer who architected and deployed a production agentic MCP service at Oracle — connecting enterprise knowledge sources to LLM-powered interfaces with ',
    'security-aware access controls',
    ' and compliance enforcement with over 10 petabytes document scale.',
    'Alongside that, I served as a technical lead for a corporate-wide AI Adoption program, partnering with security architects to embed secure design principles into agentic tooling from the ground up.',
    'Before Oracle, I spent 6 years in the US Army as a Biomedical Equipment Technician, managing $2M+ in equipment and training 100+ personnel overseas. That background in high-stakes, high-accountability environments shapes how I approach engineering today.'
  ],
  highlight: 'I exist where agentic systems, vulnerability and data leakage detection, and secure software design meet.',
  location: 'Austin, TX',
  email: 'jhern603@gmail.com',
}

export const experience = [
  {
    company: 'Oracle — Oracle Cloud Infrastructure',
    role: 'Software Engineer',
    period: 'Jul 2024 – Mar 2026',
    location: 'Austin, TX',
    bullets: [
      'Architected and deployed a production agentic MCP Service connecting multiple enterprise knowledge sources to an LLM-powered interface — collaborating with security architects to enforce access controls, data boundaries, and secure design principles throughout.',
      'Led engineering on a Data Loss Prevention (DLP) program with EVP-level visibility — enforcing data boundary controls and compliance policies across enterprise knowledge pipelines.',
      'Spearheaded a CEO-visible, corporate-wide AI Adoption program as sole technical lead — partnered with security architects and AI Pioneers to embed security best practices into agentic tooling from the ground up.',
      'Designed SkillBridge, a self-initiated Unified MCP Gateway proposal — independently architected, documented, and presented to leadership, progressing from personal initiative to a leadership-tracked roadmap item.',
      'Improved service observability by instrumenting Prometheus and Grafana dashboards, enabling proactive fault detection and reducing mean time to resolution.',
    ],
  },
  {
    company: 'Oracle — Oracle Cloud Infrastructure',
    role: 'Software Engineer Intern',
    period: 'May 2023 – Aug 2023',
    location: 'Austin, TX',
    bullets: [
      'Reduced CI/CD build times from several hours to under 10 minutes by parallelizing test execution and optimizing dependency resolution, directly accelerating production release cycles.',
      'Integrated mock OCI services to simulate real user requests against OCI Kubernetes Engine (OKE) operations, enabling full pre-release validation without live infrastructure changes.',
    ],
  },
  {
    company: 'Florida International University',
    role: 'Junior Webmaster',
    period: 'Feb 2024 – Jun 2024',
    location: 'Miami, FL',
    bullets: [
      'Deployed an AI-powered support ticket summarization tool that reduced manual ticket review time for the IT team, improving triage throughput and incident response speed.',
      'Maintained and extended the CS department website using WordPress and custom PHP, ensuring availability for students and faculty.',
    ],
  },
  {
    company: 'Florida International University',
    role: 'Student IT Assistant',
    period: 'Mar 2022 – Feb 2024',
    location: 'Miami, FL',
    bullets: [
      'Built a poster print request automation toolchain — automating PDF dimension validation, print team notification, and job queuing — eliminating manual coordination entirely.',
      'Overhauled the campus monitoring solution to simplify log ingestion and significantly reduce mean time to diagnosis across the KFSCIS network.',
    ],
  },
  {
    company: 'US Army',
    role: 'Biomedical Equipment Technician',
    period: 'May 2017 – May 2023',
    location: '',
    bullets: [
      'Managed accountability and audit of over $2M in medical and non-medical equipment across multiple operational contexts.',
      'Trained 100+ personnel at an overseas combat support hospital in equipment operation, care, and maintenance protocols under operational conditions.',
    ],
  },
]

export const projects = [
  {
    title: 'Production MCP Service',
    description:
      'Enterprise service connecting multiple knowledge sources to multiple agentic clients with security-aware access controls, enterprise compliance enforcement, and full audit traceability.',
    tags: ['Python', 'MCP', 'OCI', 'LLMs', 'Security'],
    featured: true,
  },
  {
    title: 'SkillBridge Gateway',
    description:
      'Proposed a Unified MCP, Agent, and skill gateway system. Independently architected, documented, and presented system to consolidate an otherwise fragmented variety of connectors, allowing users to easily discover and onboard useful LLM sources.',
    tags: ['Architecture', 'MCP', 'Security', 'OCI'],
    featured: true,
  },
  {
    title: 'CI/CD Pipeline Optimization',
    description:
      'Parallelized test execution and optimized dependency resolution across OCI Kubernetes Engine pipelines — cutting build times from several hours to under 10 minutes.',
    tags: ['CI/CD', 'OKE', 'Kubernetes', 'Docker'],
    featured: true,
  },
  {
    title: 'AI Ticket Summarizer',
    description:
      'AI-powered, RAG supplemented support ticket summarization tool that reduced manual ticket review time for the FIU KFSCIS IT team, improving triage throughput and incident response speed.',
    tags: ['Python', 'AI', 'Automation', 'PHP'],
  },
  {
    title: 'Print Request Automation',
    description:
      'End-to-end toolchain automating PDF dimension validation, print team notification, and job queuing — eliminating manual coordination entirely for the FIU KFSCIS campus print workflow, saving hundreds of hours and as a result thousands of dollars in manhours.',
    tags: ['Python', 'Automation', 'Bash', 'PDF'],
  },
  {
    title: 'Self-Hosted Homelab Infrastructure',
    description:
      'Fedora-based homelab running Docker with nginx reverse proxy, Pi-hole DNS, Authentik SSO/OIDC across all services, and mkcert-issued HTTPS on .lan domains. Hosts Immich, Paperless-ngx, Grafana, InfluxDB, OpenCTI, and Homarr — all behind a unified identity layer.',
    tags: ['Docker', 'nginx', 'Linux', 'SSO/OIDC', 'Self-Hosted'],
    personal: true,
  },
  {
    title: 'Service Management CLI',
    description:
      'Custom Bash toolchain that automates nginx reverse proxy config generation, Pi-hole DNS entry management, and Docker service lifecycle — reducing new service provisioning to a single command.',
    tags: ['Bash', 'Automation', 'Docker', 'nginx'],
    personal: true,
  }
];

export const stack = [
  {
    category: 'Languages',
    items: [
      'Python',
      'Go',
      'Java',
      'JavaScript',
      'Bash',
      'PHP',
      'Oracle SQL/PLSQL',
    ],
  },
  {
    category: 'AI / ML',
    items: [
      'LLMs',
      'Model Context Protocol (MCP)',
      'Agentic AI',
      'RAG',
      'Generative AI',
      'Prompt Engineering',
    ],
  },
  {
    category: 'Security',
    items: [
      'Secure System Design',
      'Access Control',
      'Data Loss Prevention (DLP)',
      'Compliance Enforcement',
      'Security Architecture',
      'Threat Intelligence',
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    items: [
      'Oracle Cloud Infrastructure (OCI)',
      'Kubernetes (OKE)',
      'Docker',
      'CI/CD Pipelines',
      'Linux/Unix',
      'Docker Compose',
      'nginx',
    ],
  },
  {
    category: 'Data & Backend',
    items: [
      'REST APIs',
      'Microservices',
      'Data Pipelines',
      'Document Processing at Scale',
      'Authentik (SSO/OIDC)',
      'Pi-hole',
    ],
  },
  {
    category: 'Observability',
    items: ['Prometheus', 'Grafana', 'InfluxDB', 'Log Mining', 'Monitoring'],
  },
  {
    category: 'Certifications',
    items: ['OCI Professional Developer', 'OCI Generative AI Professional'],
  },
];

export const education = {
  school: 'Florida International University',
  degree: 'Bachelor of Science in Computer Science',
  period: 'Aug 2015 – Dec 2023',
  location: 'Miami, FL',
}

export const contact = {
  email: 'jhern603@gmail.com',
  github: 'https://github.com/jhern603',
  linkedin: 'https://www.linkedin.com/in/jhern603/',
}

export const ticker = [
  'Agentic AI',
  'MCP',
  'Security Automation',
  'Oracle Cloud',
  'Python',
  'Go',
  'Secure System Design',
  'RAG',
  'Kubernetes',
  'Prompt Engineering',
  'LLMs',
  'Data Pipelines',
  'Microservices',
  'Prometheus',
  'Grafana',
  'Access Control',
  'Java',
  'Compliance Enforcement',
  'DLP',
  'QLoRA Fine-Tuning',
  'Threat Intelligence',
  'Self-Hosted Infrastructure',
  'SSO/OIDC',
]
