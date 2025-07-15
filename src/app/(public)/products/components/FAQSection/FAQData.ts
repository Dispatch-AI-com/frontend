export interface Question {
  q: string;
  a: string;
}

export interface Category {
  key: string;
  title: string;
  faqs: Question[];
}

export const CATEGORIES: Category[] = [
  {
    key: 'general',
    title: 'General Product Understanding',
    faqs: [
      {
        q: 'What is Dispatch AI and how does it work?',
        a: 'Dispatch AI is an always‑on phone assistant that greets callers, understands intent with AI and routes or records information automatically.',
      },
      {
        q: 'What types of calls can Dispatch AI handle?',
        a: 'Inbound customer enquiries, appointment bookings, status checks, simple outbound follow‑ups and more.',
      },
      {
        q: 'Is Dispatch AI available 24/7?',
        a: 'Yes — once enabled the assistant works round‑the‑clock including weekends and holidays.',
      },
      {
        q: 'What is the difference between Dispatch AI and a regular voicemail?',
        a: 'Unlike voicemail, Dispatch AI can converse with callers, answer common questions and capture structured data instead of a raw audio recording.',
      },
      {
        q: 'How quickly can I set up my AI agent?',
        a: 'You can be up and running in just a few minutes with our guided onboarding wizard.',
      },
    ],
  },
  {
    key: 'ai',
    title: 'AI & Functionality',
    faqs: [],
  },
  {
    key: 'setup',
    title: 'Setup & Integration',
    faqs: [],
  },
  {
    key: 'tasks',
    title: 'Call Management & Task Automation',
    faqs: [],
  },
  {
    key: 'notify',
    title: 'Notifications & Communication',
    faqs: [],
  },
  {
    key: 'dashboard',
    title: 'Dashboard & Service Management',
    faqs: [],
  },
  {
    key: 'billing',
    title: 'Billing & Plans',
    faqs: [],
  },
  {
    key: 'security',
    title: 'Security & Privacy',
    faqs: [],
  },
  {
    key: 'support',
    title: 'Performance & Support',
    faqs: [],
  },
];
