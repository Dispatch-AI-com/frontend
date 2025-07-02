export interface Step {
  id: number;
  question: string;
  inputType: 'text' | 'button';
  validate: (input: string) => boolean;
  onValidResponse: (input: string) => string;
  retryMessage: string;
  options?: string[];
}

export const steps: Step[] = [
  {
    id: 1,
    question:
      'Hey there! 👋 Before we dive in, could you share your phone number with me?',
    inputType: 'text',
    validate: (input: string) => /^\+?[0-9\s\-()]{7,20}$/.test(input.trim()),
    onValidResponse: () => `Perfect, I've got your number saved. `,
    retryMessage:
      "Hmm, that doesn't look like a valid phone number. Mind checking it again?",
  },
  {
    id: 2,
    question: "What's the name of your company or business?",
    inputType: 'text',
    validate: (input: string) => input.trim().length > 0,
    onValidResponse: (input: string) =>
      `Great! "${input}" sounds like a solid name. `,
    retryMessage:
      "Oops! I didn't catch that—could you type your business name again?",
  },
  {
    id: 3,
    question:
      'Where is your company located? Just the city or full address is fine.',
    inputType: 'text',
    validate: (input: string) => input.trim().length > 5,
    onValidResponse: (input: string) =>
      `Thanks! So you're based in "${input}". Noted.`,
    retryMessage:
      'That seems a bit short—could you give me a more complete address?',
  },
  {
    id: 4,
    question:
      'What’s your job title there? Just so I know who I’m chatting with! 😊',
    inputType: 'text',
    validate: (input: string) =>
      input.trim().length > 1 && /^[A-Za-z\s\-']+$/.test(input),
    onValidResponse: (input: string) =>
      `${input}, got it! You sound important.`,
    retryMessage:
      'Can you enter a valid job title? Like Manager, CEO, Designer, etc.',
  },
  {
    id: 5,
    question: 'And lastly, what’s your best work email so I can stay in touch?',
    inputType: 'text',
    validate: (input: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim()),
    onValidResponse: (input: string) =>
      `Perfect! I'll make sure to reach you at ${input}. `,
    retryMessage:
      'Hmm, that doesn’t look like a valid email. Can you double-check it?',
  },
  {
    id: 6,
    question:
      'Would you like to hear a sample of how Dispatch AI will answer your calls?',
    inputType: 'button',
    options: ['Yes, Demo Call', 'Skip'],
    validate: (input: string) => ['Yes, Demo Call', 'Skip'].includes(input),
    onValidResponse: (input: string) =>
      input === 'Yes, Demo Call'
        ? 'Sweet! Let me show you what I can do. '
        : 'No worries, we can skip that for now. ',
    retryMessage:
      'Go ahead and choose one of the options so we can move forward!',
  },
];
