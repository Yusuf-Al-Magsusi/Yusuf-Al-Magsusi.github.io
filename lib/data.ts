export const projects = [
  {
    id: "01",
    slug: "evaid",
    title: "Evaid",
    subtitle: "Investigation Case Management Platform",
    year: "2025",
    tags: ["Python", "TypeScript", "React", "FastAPI", "Azure SQL"],
    description:
      "Full-stack case management platform for law enforcement and private investigators — evidence ingestion, actor relationship mapping, and a GPT-4o reasoning pipeline that surfaces connections across case data.",
    color: "#1E40AF",
    size: "large",
    overview:
      "Evaid is a case management platform built for law enforcement and private investigators who need to track evidence, map relationships between actors, and surface insights across complex cases. It was built as a four-person team project with a focus on reliability, structured data, and intelligent automation.",
    problem:
      "Investigators were managing case data across spreadsheets, email threads, and physical documents. There was no structured way to link actors across cases, no automated ingestion of evidence, and collaboration was slow and error-prone.",
    solution:
      "A FastAPI backend backed by Azure SQL, with a service layer pattern, session-based authentication, and CI/CD deployment on Azure. Document ingestion was automated using Azure Document Intelligence and Computer Vision OCR. A GPT-4o reasoning pipeline surfaces connections across case data automatically.",
    highlights: [
      "Automated evidence ingestion via Azure Document Intelligence and Computer Vision OCR",
      "GPT-4o reasoning pipeline that maps relationships between actors across case data",
      "FastAPI backend with service layer pattern, soft deletes, partial updates, and session auth",
      "React/TypeScript frontend with real-time notifications, built with a four-person team on branch-protected Git workflows",
    ],
    links: { github: "", live: "" },
  },
  {
    id: "02",
    slug: "graph-analysis-engine",
    title: "Graph Analysis Engine",
    subtitle: "Big Data Processing Tool",
    year: "2025",
    tags: ["Python", "NetworkX", "Data Analysis"],
    description:
      "High-performance graph analysis tool that processes 5M+ edges and 800K+ nodes — dynamic subgraph generation, shortest path computation, and closeness centrality analysis at scale.",
    color: "#059669",
    size: "medium",
    overview:
      "A graph analysis engine built to process large-scale network data efficiently. Designed to handle edge lists with millions of entries, enabling deep analysis of node relationships and network topology.",
    problem:
      "Analyzing large graph datasets is computationally expensive. Standard approaches break down at scale — loading millions of edges naively exhausts memory, and naive path computations become infeasible.",
    solution:
      "Built with Python and NetworkX, the tool efficiently processes edge lists of 5M+ edges and 800K+ nodes. Dynamic subgraph generation allows analysis of targeted sub-networks based on a user-defined root node and depth. Results are exported to structured CSV files for downstream analysis.",
    highlights: [
      "Processes edge lists with over 5 million edges and 800,000+ nodes",
      "Dynamic subgraph generation based on user-defined root node and traversal depth",
      "All-pairs shortest path computation across the full graph",
      "Inward closeness centrality analysis exported to structured CSV",
    ],
    links: { github: "", live: "" },
  },
  {
    id: "03",
    slug: "fittrack",
    title: "FitTrack",
    subtitle: "Cross-Platform Fitness Application",
    year: "2023",
    tags: ["C++", "QML", "Mobile"],
    description:
      "Cross-platform strength tracking app — full CRUD for workout sessions and a recommendation engine that suggests weekly weight and rep goals based on your progression history.",
    color: "#B45309",
    size: "medium",
    overview:
      "A mobile fitness tracking application built in C++ and QML targeting strength athletes. Designed to track progress across the primary compound lifts and provide data-driven weekly goal recommendations.",
    problem:
      "Most fitness apps are generic and don't give meaningful feedback based on specific progression history. Athletes needed a simple way to log workouts and get intelligent guidance without complex setup.",
    solution:
      "A cross-platform app with full CRUD for workout session tracking. A recommendation engine analyzes past performance trends to suggest weekly weight and rep targets, giving users a clear progression path.",
    highlights: [
      "Tracks bench press, squat, and deadlift progress across sessions",
      "Full CRUD functionality for workout session management",
      "Recommendation engine suggests weekly weight and rep goals based on performance trends",
      "Cross-platform via C++ and QML",
    ],
    links: { github: "", live: "" },
  },
];

export const timeline = [
  {
    year: "2025",
    role: "Resident Advisor",
    company: "Seattle Pacific University",
    description:
      "Managing a community of 20 residents, fostering a positive and inclusive living environment. Planning and executing 3–5 community events per quarter with consistent 70%+ resident participation.",
  },
  {
    year: "2025",
    role: "Azure AI Engineer Associate",
    company: "Microsoft Certified",
    description:
      "Certification demonstrating expertise in deploying and managing AI solutions on Azure — natural language processing, computer vision, conversational AI, and responsible AI practices in cloud environments.",
  },
  {
    year: "2022",
    role: "Bachelor of Arts, Computer Science",
    company: "Seattle Pacific University",
    description:
      "GPA 3.53 · Merit Scholarship · Dean's List. Coursework in data structures, algorithm design, netcentric computing, programming languages, and cybersecurity fundamentals. Graduating June 2026.",
  },
  {
    year: "2018",
    role: "Restaurant Manager",
    company: "Copacabana Restaurant",
    description:
      "Seven years managing front and back of house operations — customer service, inventory management, financial reconciliation, staff coordination, and conflict resolution.",
  },
];

export const techStack = [
  { name: "Python", category: "Language" },
  { name: "C++", category: "Language" },
  { name: "Go", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "React", category: "UI" },
  { name: "FastAPI", category: "Framework" },
  { name: "Node.js", category: "Runtime" },
  { name: "MongoDB", category: "Database" },
  { name: "Azure SQL", category: "Database" },
  { name: "Azure", category: "Cloud" },
  { name: "Git", category: "DevOps" },
  { name: "HTML / CSS", category: "Styling" },
];

export const testimonials = [
  {
    quote:
      "Yusuf doesn't just write code — he thinks deeply about the problem first. The solutions he ships are elegant precisely because they understand the real question.",
    author: "A. Rahman",
    role: "CTO, Placeholder Systems",
  },
  {
    quote:
      "Working with Yusuf raised the bar for every engineer on our team. He has a rare ability to simplify without losing nuance.",
    author: "S. Chen",
    role: "Engineering Lead, Acme Corp",
  },
  {
    quote:
      "What sets Yusuf apart is his commitment to craft. The difference between code that works and code that endures — he understands that distinction deeply.",
    author: "M. Davies",
    role: "Principal Engineer, Studio Placeholder",
  },
];

export const navItems = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact", href: "#contact" },
];
