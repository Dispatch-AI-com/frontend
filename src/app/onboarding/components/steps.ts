export interface Step {
  id: number;

  field:
    | '' // Demo-call
    | `user.${'fullPhoneNumber' | 'position' | 'address.full' | 'greeting.type' | 'greeting.message'}`;

  question: string;
  inputType: 'text' | 'button' | 'address';
  validate: (input: string) => boolean;
  onValidResponse: (input: string) => string;
  retryMessage: string;
  options?: string[];
}

export const steps: Step[] = [
  {
    id: 1,
    field: 'user.fullPhoneNumber',
    question:
      'Hey there! 👋 Before we dive in, could you share your phone number with me?',
    inputType: 'text',
    validate: input => /^\+?[0-9\s\-()]{7,20}$/.test(input.trim()),
    onValidResponse: () => `Perfect, I've got your number.`,
    retryMessage:
      "Hmm, that doesn't look like a valid phone number. Mind checking it again?",
  },

  {
    id: 2,
    field: 'user.position',
    question:
      "What's your job title there? Just so I know who I'm chatting with! 😊",
    inputType: 'text',
    validate: input => /^[A-Za-z\s\-']{2,50}$/.test(input.trim()),
    onValidResponse: title => `${title}, got it!`,
    retryMessage:
      'Can you enter a valid job title? Like Manager, CEO, Designer…',
  },

  {
    id: 3,
    field: 'user.address.full',
    question:
      'Please enter your billing address. Start typing and select from the suggestions.',
    inputType: 'address',
    validate: input => input.trim().length >= 5,
    onValidResponse: addr => `Great, I have your billing address as "${addr}".`,
    retryMessage:
      'Please enter a valid address. Start typing and select from the suggestions.',
  },

  {
    id: 4,
    field: 'user.greeting.type',
    question: 'How would you like Dispatch AI to greet your callers?',
    inputType: 'button',
    options: ['Use Default Greeting', 'Create Custom Greeting'],
    validate: v =>
      ['Use Default Greeting', 'Create Custom Greeting'].includes(v),
    onValidResponse: choice =>
      choice === 'Use Default Greeting'
        ? "Great! We'll use our professional default greeting for your callers."
        : "Perfect! Let's create a custom greeting for your business.",
    retryMessage: 'Please choose one of the greeting options.',
  },

  {
    id: 5,
    field: 'user.greeting.message',
    question: 'Please enter your custom greeting message (10-500 characters):',
    inputType: 'text',
    validate: input => input.trim().length >= 10 && input.trim().length <= 500,
    onValidResponse: greeting =>
      `Perfect! Your custom greeting is set: "${greeting.slice(0, 50)}${greeting.length > 50 ? '...' : ''}".`,
    retryMessage:
      'Please enter a greeting message between 10 and 500 characters.',
  },

  {
    id: 6,
    field: '',
    question:
      'And lastly, would you like to hear a sample of how Dispatch AI will answer your calls?',
    inputType: 'button',
    options: ['Yes, Demo Call', 'Skip'],
    validate: v => ['Yes, Demo Call', 'Skip'].includes(v),
    onValidResponse: v =>
      v === 'Yes, Demo Call'
        ? 'Sweet! Let me show you what I can do. 📞'
        : 'No worries, we can skip the demo for now.',
    retryMessage: 'Pick one of the options so we can move forward!',
  },
];
