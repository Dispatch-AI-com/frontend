// This file defines the TypeScript interface for the SignUpForm component.
// It specifies the expected props that the component will receive, including the types of each prop.
export interface SignUpFormProps {
  name: string;
  email: string;
  password: string;
  error: string;
  zodError?: string;
  status: boolean;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}