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
        a: "Dispatch AI is a 24/7 AI-powered phone assistant that answers calls on your behalf, understands the caller's needs using natural language processing, and handles tasks like booking services or collecting information.",
      },
      {
        q: 'What types of calls can Dispatch AI handle?',
        a: 'Dispatch AI handles inbound calls, including appointment requests, service inquiries, task confirmations, and general customer queries.',
      },
      {
        q: 'Is Dispatch AI available 24/7?',
        a: 'Yes, Dispatch AI is designed to operate continuously, ensuring no important calls are missed regardless of the time or day.',
      },
      {
        q: 'What is the difference between Dispatch AI and a regular voicemail?',
        a: 'Unlike voicemail, Dispatch AI actively interacts with callers, understands intent, collects structured data, and takes action such as creating tasks or sending summaries.',
      },
      {
        q: 'How quickly can I set up my AI agent?',
        a: 'Setting up your AI agent takes only a few minutes. Once call forwarding is configured and services are added, the agent is ready to go.',
      },
    ],
  },
  {
    key: 'ai',
    title: 'AI & Functionality',
    faqs: [
      {
        q: 'How does Dispatch AI understand and respond to callers?',
        a: 'Dispatch AI uses advanced language models trained to interpret intent, extract key information, and respond in a conversational manner.',
      },
      {
        q: 'What kind of AI model powers the conversations?',
        a: 'It is powered by state-of-the-art large language models (LLMs) with domain-specific tuning for phone call interactions.',
      },
      {
        q: 'Can Dispatch AI handle multiple service types in one call?',
        a: 'Yes, the AI can discuss and process multiple service-related requests during a single call session.',
      },
      {
        q: 'How does Dispatch AI know when to create a task?',
        a: 'The AI detects task-triggering language patterns and conditions pre-configured by your services setup and workflow settings.',
      },
      {
        q: 'Does the AI learn from previous calls?',
        a: 'While Dispatch AI does not automatically retrain from past calls, improvements are made based on aggregate feedback and user settings.',
      },
    ],
  },
  {
    key: 'setup',
    title: 'Setup & Integration',
    faqs: [
      {
        q: 'How do I forward my calls to Dispatch AI?',
        a: "You can forward calls through your phone carrier's call forwarding feature, directing calls to the number provided by Dispatch AI.",
      },
      {
        q: 'Will it work with my phone carrier?',
        a: 'Dispatch AI supports all major carriers that allow conditional or unconditional call forwarding.',
      },
      {
        q: 'How do I test if my call forwarding is working?',
        a: 'Simply call your own number from another phone. If forwarding is set correctly, the AI will answer the call.',
      },
      {
        q: 'What happens if the setup fails?',
        a: 'The system will alert you to retry setup, and support is available to troubleshoot common call forwarding issues.',
      },
    ],
  },
  {
    key: 'tasks',
    title: 'Call Management & Task Automation',
    faqs: [
      {
        q: 'What happens after Dispatch AI finishes a call?',
        a: 'A summary is generated, relevant tasks are created, and notifications are sent based on your preferences.',
      },
      {
        q: 'Where can I find a summary of each call?',
        a: 'Call summaries are available in your dashboard under the Inbox or Call History sections.',
      },
      {
        q: 'How does Dispatch AI assign follow-up tasks?',
        a: 'Tasks are assigned automatically based on recognised intent and your configured services and business logic.',
      },
      {
        q: 'Can I edit or delete AI-generated tasks?',
        a: 'Yes, all AI-generated tasks can be reviewed, modified, or deleted manually in the dashboard.',
      },
      {
        q: 'Can I track missed or declined calls?',
        a: 'Yes, call logs include detailed tracking for answered, missed, or rejected calls.',
      },
    ],
  },
  {
    key: 'notify',
    title: 'Notifications & Communication',
    faqs: [
      {
        q: 'Will I be notified when someone calls me?',
        a: 'Yes, notifications can be enabled for missed calls, completed calls, or new task creations via email or SMS.',
      },
      {
        q: 'Can I receive summaries of my calls?',
        a: 'Absolutely. You can receive call summaries via email, SMS, or access them anytime in your dashboard.',
      },
      {
        q: 'How soon will I get follow-up tasks after a call?',
        a: 'Tasks are typically created within seconds after the call ends and will immediately appear in your dashboard.',
      },
    ],
  },
  {
    key: 'dashboard',
    title: 'Dashboard & Service Management',
    faqs: [
      {
        q: 'What can I manage from my Dispatch AI dashboard?',
        a: 'You can manage services, view call summaries, adjust settings, review tasks, manage billing, and configure AI behaviour.',
      },
      {
        q: 'How do I create or edit my services?',
        a: 'Navigate to the Service Management section, where you can add new services or edit existing ones, including their form fields.',
      },
      {
        q: 'Can I attach custom forms to a service?',
        a: 'Yes, you can create and attach customisable forms to each service to collect structured information from callers.',
      },
      {
        q: 'How does the calendar sync with my tasks?',
        a: 'Tasks can be linked to your calendar for visibility and time management; integrations with Google Calendar are supported.',
      },
      {
        q: 'Can I export my service or task data?',
        a: 'Yes, the dashboard provides export features for reports and data analysis in CSV or other formats.',
      },
    ],
  },
  {
    key: 'billing',
    title: 'Billing & Plans',
    faqs: [
      {
        q: 'What plans does Dispatch AI offer?',
        a: 'Dispatch AI offers Free, Basic, and Pro plans tailored to different business sizes and usage needs.',
      },
      {
        q: 'What is included in the Free, Basic, and Pro plans?',
        a: 'Each plan offers varying levels of call volume, task automation, customisation, and support access. Details are on the Pricing page.',
      },
      {
        q: 'Can I change my plan later?',
        a: 'Yes, you can upgrade, downgrade, or cancel your plan at any time from your Billing settings.',
      },
      {
        q: 'How does billing work (weekly/monthly/annually)?',
        a: 'Dispatch AI supports both monthly and annual billing cycles. Choose the one that suits your needs during checkout.',
      },
      {
        q: 'How do I cancel or downgrade my plan?',
        a: 'You can cancel or downgrade your plan from the Billing page, with options to confirm changes and review the effective date.',
      },
      {
        q: 'Will I get an invoice after payment?',
        a: 'Yes, an invoice will be emailed to you and can also be accessed from your Billing history.',
      },
    ],
  },
  {
    key: 'security',
    title: 'Security & Privacy',
    faqs: [
      {
        q: 'Is my call data secure?',
        a: 'Yes, all call data is encrypted during transmission and storage using industry-standard security protocols.',
      },
      {
        q: 'Where is my data stored?',
        a: 'Your data is stored securely on compliant cloud infrastructure, typically within your selected geographic region.',
      },
      {
        q: 'Who can access my call transcripts?',
        a: 'Only authorised users with the proper dashboard access can view call transcripts.',
      },
      {
        q: 'Does Dispatch AI comply with data privacy regulations?',
        a: 'Yes, Dispatch AI adheres to GDPR and other applicable data privacy laws.',
      },
    ],
  },
  {
    key: 'support',
    title: 'Performance & Support',
    faqs: [
      {
        q: 'What if Dispatch AI does not pick up a call?',
        a: 'If a call is not answered, it will be logged as missed, and you will receive a notification to follow up.',
      },
      {
        q: 'What do I do if my AI agent gives the wrong response?',
        a: 'You can review the transcript and adjust your service setup or report the issue for tuning assistance.',
      },
      {
        q: 'Can I train or fine-tune my agent?',
        a: 'Yes, limited fine-tuning is available through service configuration and intent keyword refinement.',
      },
      {
        q: 'How do I contact support if something goes wrong?',
        a: 'Support is available via email and chat, with priority support offered for Pro plan users.',
      },
      {
        q: 'Is there an uptime guarantee for Dispatch AI?',
        a: 'Yes, Dispatch AI maintains a 99.9% uptime SLA to ensure reliability in your business operations.',
      },
    ],
  },
];
