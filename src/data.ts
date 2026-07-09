import { Project, TimelineItem, DnaSkill, ProcessPhase, LabConcept, FavoriteItem, QuoteCard, ToolItem } from "./types";

export const PORTRAIT_URL = "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=800"; // Black and white high-contrast portrait of a young South Asian professional

export const DESIGNER_NAME = "PRAGHADEESH S";
export const DESIGNER_ROLE = "UI/UX Designer & Product Designer";
export const DESIGNER_TAGLINE = "Designing Digital Experiences That Feel Effortless.";
export const DESIGNER_ALT_TAGLINE = "Transforming Complex Problems into Simple, Meaningful Experiences.";

export const ABOUT_ME_SHORT = "I'm a passionate UI/UX Designer focused on creating intuitive digital products that combine aesthetics with usability. My approach is driven by research, user empathy, structured thinking, and attention to detail. I enjoy designing products that solve real-world problems while delivering seamless user experiences.";

export const ABOUT_ME_MISSION = "To build meaningful digital products that positively impact people's lives through thoughtful design and innovative interaction.";
export const ABOUT_ME_VISION = "To become a world-class Product Designer creating products used by millions of people.";
export const ABOUT_ME_STATUS = "Currently working as a UI/UX Designer while continuously improving my skills in Product Design, Motion Design, AI-assisted Design, React, and Three.js.";

export const ABOUT_ME_PARAGRAPHS = [
  "I believe great products are created by understanding people before designing interfaces.",
  "Every project begins with research, understanding user behavior, simplifying complexity, and designing experiences that are intuitive, elegant, and enjoyable.",
  "I constantly explore emerging technologies, AI tools, interaction design, and modern web experiences to create digital products that are both functional and memorable.",
  "I enjoy solving complex UX challenges and turning them into beautiful experiences."
];

export const PROJECTS: Project[] = [
  {
    id: "project-os",
    title: "Project OS",
    subtitle: "AI Powered Project Management Platform",
    description: "A comprehensive project management platform designed to simplify collaboration, project tracking, task organization, team communication, and productivity through AI-powered insights and modern UX principles.",
    role: "UI/UX Designer",
    year: "2026",
    tags: ["UX Research", "Information Architecture", "Wireframing", "UI Design", "Design Systems"],
    color: "#e11d48", // Rose Red
    accentColor: "rgba(225, 29, 72, 0.2)",
    bgGradient: "from-rose-950/20 via-neutral-950 to-neutral-950",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "UX Research", value: "Verified" },
      { label: "Design System", value: "Scalable" },
      { label: "Interactive Prototype", value: "Functional" }
    ],
    details: [
      "Conducted extensive UX Research and Competitive Analysis to identify core team workflow bottlenecks.",
      "Architected the Information Architecture and User Flows to streamline complex task tracking.",
      "Designed a complete, modern UI and Design System with high-fidelity Interactive Prototypes inside Figma."
    ],
    metrics: [
      { label: "Workflow Complexity", value: "-50%" },
      { label: "User Satisfaction Score", value: "94.2%" }
    ],
    liveUrl: "https://projman-os.netlify.app/"
  },
  {
    id: "gemhub",
    title: "GemHub",
    subtitle: "Farmer-to-FPO-to-Consumer Ecosystem",
    description: "GemHub is a comprehensive digital agritech ecosystem connecting independent farmers directly to Farmer Producer Organizations (FPOs) and end consumers, streamlining regional supply chains, pricing transparency, and produce logistics.",
    role: "UI/UX Designer & Researcher",
    year: "2025",
    tags: ["Rural UX Research", "Agritech Supply Chain", "Transactional Flows", "Design Systems", "Figma Prototyping"],
    color: "#059669", // Forest Emerald Green
    accentColor: "rgba(5, 150, 105, 0.2)",
    bgGradient: "from-emerald-950/20 via-neutral-950 to-neutral-950",
    image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Supply Chain", value: "Streamlined" },
      { label: "Farmers Enrolled", value: "5,000+" },
      { label: "Direct Trade", value: "Active" }
    ],
    details: [
      "Conducted field-level UX research in rural areas to understand farmers' technological literacy and build an accessible, multi-lingual, voice-assisted mobile flow.",
      "Designed transparent pricing dashboards and listing tools for FPOs to aggregate yield volumes and negotiate directly with metropolitan bulk buyers.",
      "Crafted the consumer marketplace interface, optimizing visual freshness indicators, real-time logistics tracking, and direct-to-farm checkout experiences."
    ],
    metrics: [
      { label: "Farmer Profitability", value: "+45%" },
      { label: "Intermediary Markup", value: "-70%" }
    ],
    liveUrl: "https://gem-hub.netlify.app/"
  },
  {
    id: "rydest",
    title: "Rydest",
    subtitle: "Smart Ride Sharing Platform",
    description: "Rydest is a modern ride-sharing experience that improves transparency, seat selection, ride planning, and commuter convenience through intuitive mobile interactions.",
    role: "UI/UX Designer",
    year: "2024",
    tags: ["UX Research", "User Flow", "Wireframing", "High Fidelity UI", "Prototype"],
    color: "#16a34a", // Emerald Green
    accentColor: "rgba(22, 163, 74, 0.2)",
    bgGradient: "from-green-950/20 via-neutral-950 to-neutral-950",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Seat Visibility", value: "Real-time" },
      { label: "Booking Time", value: "20s" },
      { label: "User Trust Index", value: "98.5%" }
    ],
    details: [
      "Investigated current ride-sharing pain points around passenger trust and price transparency.",
      "Crafted structured user flows and low-fidelity wireframes mapping out a simplified seat booking wizard.",
      "Delivered a striking, high-fidelity UI design and realistic mobile prototype featuring live spatial seat selection."
    ],
    metrics: [
      { label: "Booking Efficiency", value: "+40%" },
      { label: "Information Clarity", value: "Perfect" }
    ]
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "2021",
    title: "The Design Journey Begins",
    category: "Curiosity",
    description: "Fascinated by user psychology, digital interfaces, and how interaction design can trigger emotion. Began learning core graphic design principles, color theory, and digital layout tools.",
    details: ["Studied classic typography and layout structures.", "Explored tactile user interfaces and digital interactions."],
    coordinates: { x: 10, y: 15 }
  },
  {
    year: "2023",
    title: "Early Project Exploration",
    category: "Education",
    description: "Focused on academic and personal UX research case studies. Created detailed wireframes, user flow diagrams, and prototype tests. Deepened understanding of human-centered design frameworks.",
    details: ["Conducted qualitative user walkthroughs and competitor analysis.", "Designed structured information architectures for complex apps."],
    coordinates: { x: 30, y: 35 }
  },
  {
    year: "2024",
    title: "UI/UX Designer Intern",
    category: "Experience",
    description: "Joined as a UI/UX Designer Intern, working on user research, wireframing, interface design, prototyping, and improving usability for digital products.",
    details: ["Conducted qualitative research audits and created detailed user journey maps.", "Developed high-fidelity prototypes and conducted usability test reviews."],
    coordinates: { x: 55, y: 50 }
  },
  {
    year: "2025",
    title: "UI/UX Designer Intern (Scale)",
    category: "Experience",
    description: "Collaborated with product and development teams to design digital products, improve user experiences, and maintain interactive design systems.",
    details: ["Created modular wireframes, prototypes, and high-fidelity layouts.", "Established robust handoff documents with dev teams to ensure pixel-perfect builds."],
    coordinates: { x: 75, y: 65 }
  },
  {
    year: "2026",
    title: "Today & Beyond",
    category: "Future",
    description: "Seeking to scale as a world-class Product Designer, constantly refining skills in Product Design, Motion Design, AI-assisted Design, React, and Three.js.",
    details: ["Architecting responsive, beautiful layouts with spatial interactivity.", "Creating intuitive digital products used and loved by millions of people."],
    coordinates: { x: 95, y: 80 }
  }
];

export const DNA_SKILLS: DnaSkill[] = [
  { name: "UX Design", percentage: 98, description: "Driven by research, user empathy, structured thinking, and detailed user journey mapping.", color: "#f43f5e", geometry: "sphere" },
  { name: "UI Design", percentage: 96, description: "Crafting crisp, high-fidelity interfaces with meticulous typography, grid systems, and color harmony.", color: "#3b82f6", geometry: "box" },
  { name: "Interaction Design", percentage: 95, description: "Designing engaging motion flows, transitions, and realistic prototypes that feel natural.", color: "#10b981", geometry: "cone" },
  { name: "Design Systems", percentage: 92, description: "Structuring modular pattern libraries, reusable components, and consistent variable systems.", color: "#eab308", geometry: "torus" },
  { name: "AI-assisted Design", percentage: 94, description: "Leveraging cutting-edge tools like Google AI Studio, ChatGPT, and Cursor to co-create and accelerate workflows.", color: "#a855f7", geometry: "knot" }
];

export const BRAIN_PHASES: ProcessPhase[] = [
  {
    id: 1,
    title: "1. Discover & Research",
    icon: "Search",
    shortDescription: "Conducting user research, qualitative walk-throughs, and competitor analysis to identify core pain points.",
    deliverables: ["User Research Audits", "Competitor Matrix", "Stakeholder Briefs"],
    sketches: [
      "UNRESOLVED PROBLEM ──> [USER RESEARCH]",
      "     │                     │",
      "     ▼                     ▼",
      "  USER FRICTION       COMPETITOR APPS"
    ]
  },
  {
    id: 2,
    title: "2. Understand & Structure",
    icon: "Compass",
    shortDescription: "Mapping user journey maps, content structures, and information architectures logically.",
    deliverables: ["Information Architecture", "User Journey Mapping", "User Flows"],
    sketches: [
      " ┌───────────────┐",
      " │  ENTRY POINT  │ ──> [IA STRUCTURE] ──> [TASK OUTCOME]",
      " └───────────────┘",
      "      [DECISION NODES]"
    ],
    aiPrompt: "Synthesize user reviews and emotional friction markers across complex workflows."
  },
  {
    id: 3,
    title: "3. Wireframing & Design",
    icon: "PenTool",
    shortDescription: "Translating low-fidelity wireframes into beautiful, high-fidelity UI designs and components inside Figma.",
    deliverables: ["Low-Fi Sketches", "High-Fidelity UI Layouts", "Responsive Components"],
    sketches: [
      "  [Wireframe Screen] ──(Figma Layout)──> [Hi-Fi UI]",
      "          │",
      "          └──(Component System)───────> [Design Library]"
    ]
  },
  {
    id: 4,
    title: "4. Interactive Prototyping",
    icon: "Cpu",
    shortDescription: "Developing interactive prototypes to model real-world user behaviors, motion, and visual flows.",
    deliverables: ["Interactive Prototypes", "Micro-animations", "Figma Smart Animations"],
    sketches: [
      " ┌───────────────────────────┐",
      " │ Figma Prototype Sandbox    │",
      " └───────────────────────────┘",
      "        │           │",
      "    [OBSERVED]   [REFINED]"
    ],
    interactiveMetric: "Interactive animations running smoothly on real devices"
  },
  {
    id: 5,
    title: "5. Testing & Iteration",
    icon: "Send",
    shortDescription: "Conducting usability testing, gathering observer feedback, and handing off clean assets to development teams.",
    deliverables: ["Usability Testing Reports", "Continuous Iterations", "Developer Handoff Packs"],
    sketches: [
      " HANDOFF COMPLETE ──> 100% SPECIFIED",
      " [● GRID OK] [● ASSETS EXPORTED] [● HANDOFF]"
    ]
  }
];

export const LAB_IDEAS: LabConcept[] = [
  {
    id: "lab-01",
    title: "Cognitive Psychology Map",
    type: "concept",
    description: "Mapping user decision-making patterns directly to interface layouts using psychological principles like Hick's Law and Fitts's Law.",
    date: "July 2026",
    visualCode: "const decisionTime = a + b * Math.log2(optionsCount + 1); // Hick's Law"
  },
  {
    id: "lab-02",
    title: "Dynamic Elastic Forms",
    type: "wireframe",
    description: "Designing form fields that bend, morph, and animate elastically as the user types, conveying tactile feedback for errors.",
    date: "June 2026",
    visualCode: "const inputSqueeze = (velocity * mass) / elasticLimit; skewX(inputSqueeze);"
  },
  {
    id: "lab-03",
    title: "AI-Assisted Contextual Panels",
    type: "ai",
    description: "An interactive, non-modal design canvas displaying generative contextual tips based on the user's active layout task.",
    date: "May 2026",
    visualCode: "const contextualFeedback = ai.generateHelp({ activeTask: 'checkout_design' });"
  }
];

export const FAVORITE_THINGS: FavoriteItem[] = [
  { category: "Books", title: "Grid Systems in Graphic Design", meta: "Josef Müller-Brockmann" },
  { category: "Books", title: "The Design of Everyday Things", meta: "Don Norman" },
  { category: "Designers", title: "Dieter Rams", meta: "Ten Principles for Good Design" },
  { category: "Designers", title: "Massimo Vignelli", meta: "Modernist Precision & Typography" },
  { category: "Fonts", title: "Space Grotesk", meta: "Tech-humanist display font" },
  { category: "Fonts", title: "JetBrains Mono", meta: "Readable, balanced coding monospace" },
  { category: "Music", title: "Lofi Focus Beats", meta: "Chill background rhythms & focus flows" },
  { category: "Inspirations", title: "Minimal Design", meta: "Honesty in materials & structures" },
  { category: "Inspirations", title: "Tactile Interfaces", meta: "Physical knobs, weighted resistance, sensory dials" }
];

export const THOUGHT_CARDS: QuoteCard[] = [
  { id: "tc-01", text: "Design is more than making interfaces beautiful. Every pixel should have purpose, and every interaction should feel intentional.", author: "Praghadeesh S", category: "UX" },
  { id: "tc-02", text: "Good design disappears; great experience remains. Clutter acts as cognitive noise; true luxury in software is meticulous clarity.", author: "Praghadeesh S", category: "Product Design" },
  { id: "tc-03", text: "Design systems aren't just libraries of buttons—they are scalable languages that align product vision, speed up engineering, and build user trust.", author: "Praghadeesh S", category: "Product Design" },
  { id: "tc-04", text: "Motion should never be mere decoration. Every transition and animation must have purpose—guiding attention and telling a physical story.", author: "Praghadeesh S", category: "Creativity" }
];

export const TOOLS_LIST: ToolItem[] = [
  { name: "Figma", category: "Design", iconName: "PenTool", level: 98 },
  { name: "FigJam", category: "Design", iconName: "PenTool", level: 95 },
  { name: "Adobe Photoshop", category: "Design", iconName: "Layers", level: 90 },
  { name: "Adobe Illustrator", category: "Design", iconName: "Layers", level: 85 },
  { name: "Framer", category: "Design", iconName: "PenTool", level: 90 },
  { name: "Blender", category: "Design", iconName: "Layers", level: 80 },
  { name: "Miro", category: "Design", iconName: "Sliders", level: 80 },
  { name: "Google AI Studio", category: "Prototyping", iconName: "Terminal", level: 92 },
  { name: "HTML / CSS", category: "Development", iconName: "Cpu", level: 80 },
  { name: "Tailwindcss", category: "Development", iconName: "Cpu", level: 95 },
  { name: "Git", category: "Development", iconName: "Terminal", level: 85 },
  { name: "GitHub", category: "Development", iconName: "Terminal", level: 90 },
  { name: "Vercel", category: "Development", iconName: "Terminal", level: 85 },
  { name: "Netlify", category: "Development", iconName: "Terminal", level: 90 }
];

export const FUN_FACTS = [
  "I am obsessed with user psychology, studying cognitive loads and emotional loops to map them directly to interaction speeds.",
  "I keep a massive collection of clean, minimal design patterns and design systems from world-class products to dissect their structure.",
  "I constantly explore emerging tech, combining Figma prototypes with prompt-engineered micro-frontends to preview realistic interactions.",
  "My favorite workspaces are completely decluttered; I believe physical neatness directly dictates cognitive clarity during wireframing sprints."
];
