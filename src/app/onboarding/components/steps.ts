export interface Step {
  id: number;

  field:
    | '' // Demo-call
    | `user.${'fullPhoneNumber' | 'position'}`
    | `company.${'businessName' | 'abn' | 'number' | 'email' | 'address.full'}`;

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
    field: 'company.businessName',
    question: "What's the name of your company or business?",
    inputType: 'text',
    validate: input => input.trim().length >= 2,
    onValidResponse: name => `Great – "${name}" sounds solid!`,
    retryMessage:
      "Oops, didn't catch that. Could you type the business name again?",
  },

  {
    id: 4,
    field: 'company.abn',
    question: "What's your Australian Business Number (ABN)?",
    inputType: 'text',
    validate: input => /^\d{11}$/.test(input.replace(/\s/g, '')),
    onValidResponse: () => 'Thanks, ABN stored.',
    retryMessage: 'ABN should be 11 digits. Could you double-check it?',
  },

  {
    id: 5,
    field: 'company.number',
    question: "What's the best phone number for your business line?",
    inputType: 'text',
    validate: input => /^\+?[0-9\s\-()]{7,20}$/.test(input.trim()),
    onValidResponse: () => 'Number noted ',
    retryMessage: "That doesn't look like a valid phone number. Try again?",
  },

  {
    id: 6,
    field: 'company.address.full',
    inputType: 'text',
    question:
      'Please enter your office address in the format: Street, Suburb, STATE Postcode. (eg. 123 Collins St, Melbourne, VIC 3000)',
    // Accepts: any chars + comma + Suburb + comma + STATE + space + 4-digit postcode
    validate: input =>
      /^[^,]+,\s*[^,]+,\s*[A-Z]{2,3}\s+\d{4}$/.test(input.trim()),
    onValidResponse: addr => `Great, I have your address as "${addr}".`,
    retryMessage:
      'That address does not look right. Example: 123 Collins St, Melbourne, VIC 3000',
  },

  {
    id: 7,
    field: 'company.email',
    question: "And lastly, what's the best work email to stay in touch?",
    inputType: 'text',
    validate: input => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim()),
    onValidResponse: email => `Perfect, I'll reach you at ${email}.`,
    retryMessage: 'Hmm, that doesn’t look like a valid email. Double-check it?',
  },

  {
    id: 8,
    field: '',
    question:
      'Would you like to hear a sample of how Dispatch AI will answer your calls?',
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
