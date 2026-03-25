import { Course, Mentor } from "./types";

export const MOCK_MENTORS: Mentor[] = [
  { 
    _id: "m1", 
    name: "Alex Rivera", 
    role: "Senior Engineer at Google", 
    avatar: "https://i.pravatar.cc/150?u=alex", 
    expertise: ["React", "Node", "System Design"],
    bio: "Alex has over 10 years of experience in building large-scale distributed systems. He currently leads the frontend infrastructure team at Google.",
    socials: { linkedin: "#", twitter: "#" }
  },
  { 
    _id: "m2", 
    name: "Sarah Chen", 
    role: "Product Designer at Meta", 
    avatar: "https://i.pravatar.cc/150?u=sarah", 
    expertise: ["Figma", "UX Research", "Visual Design"],
    bio: "Sarah is a passionate product designer who loves creating intuitive user experiences. She has worked with several Fortune 500 companies.",
    socials: { linkedin: "#", twitter: "#" }
  },
  { 
    _id: "m3", 
    name: "David Kumar", 
    role: "DevOps Lead at Amazon", 
    avatar: "https://i.pravatar.cc/150?u=david", 
    expertise: ["AWS", "Docker", "Kubernetes"],
    bio: "David is an expert in cloud infrastructure and automation. He helps companies scale their operations efficiently using modern DevOps practices.",
    socials: { linkedin: "#", twitter: "#" }
  }
];

export const MOCK_COURSES: Course[] = [
  {
    _id: "1",
    title: "Full Stack Web Development with React & Node",
    description: "Master the art of building scalable web applications from scratch. This comprehensive course covers everything from frontend design to backend architecture.",
    price: 499,
    duration: "12 Weeks",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    mentors: [MOCK_MENTORS[0]],
    curriculum: [
      "Introduction to Modern Web Architecture",
      "Mastering React Hooks and State Management",
      "Building Scalable APIs with Node.js and Express",
      "Database Design with MongoDB and PostgreSQL",
      "Deployment and CI/CD Pipelines",
      "Final Capstone Project: Real-time Collaboration Tool"
    ],
    category: "Development"
  },
  {
    _id: "2",
    title: "Advanced UI/UX Design Masterclass",
    description: "Learn professional design principles and tools used by top agencies. From wireframing to high-fidelity prototyping.",
    price: 299,
    duration: "8 Weeks",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    mentors: [MOCK_MENTORS[1]],
    curriculum: [
      "Design Thinking Process",
      "User Research and Personas",
      "Wireframing and Information Architecture",
      "Visual Design Principles",
      "Prototyping in Figma",
      "Portfolio Building"
    ],
    category: "Design"
  },
  {
    _id: "3",
    title: "Cloud Computing & DevOps with AWS",
    description: "Learn to deploy and manage applications on the cloud. Master AWS services, Docker, and Kubernetes.",
    price: 399,
    duration: "10 Weeks",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    mentors: [MOCK_MENTORS[2]],
    curriculum: [
      "Cloud Fundamentals",
      "AWS Core Services",
      "Containerization with Docker",
      "Orchestration with Kubernetes",
      "Infrastructure as Code",
      "Monitoring and Logging"
    ],
    category: "DevOps"
  }
];
