// this file is the functional component for the sign up page
// it contains the sign up form and handles the state and events for the form
import React from 'react'
import SignUpForm from '../../SignUpForm'
import { AxiosError } from 'axios'
import signUpService from '@/services/signUpService';
import { NestErrorResponse } from '@/types/NestErrorResponse';
import { set } from 'zod';



export default function SignUp() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [netError, setNetError] = React.useState('');
  const [zodError, setZodError] = React.useState('');
  const [status, setStatus] = React.useState(true);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const onReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setNetError('');
    setZodError('');
    setStatus(true);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { name, email, password };
    try {
      const response = await signUpService(userData);
      alert("User Created Successfully");
      console.log(response.data);
    }catch (err: any) {
      const zodSign = 'Zod Error';
      const isZodError = err?.message?.includes(zodSign);
      if (isZodError) {
        const zodMessage = err.message.replace(zodSign + ': ', '');
        setZodError(zodMessage);
        }

      const isAxiosError = !!err?.response;
      if (isAxiosError) {
        const axiosError = err as AxiosError<NestErrorResponse>;
        console.error(
        'User Created Failure:',
        axiosError.response?.data?.statusCode,
        axiosError.response?.data?.message
        );

        const errMsg =
        typeof axiosError.response?.data?.message === 'string'
          ? axiosError.response.data.message
          : axiosError.response?.data?.message?.join(', ');

        setNetError(errMsg || 'Unknown error');
      }
    setStatus(false);
    setName('');
    setEmail('');
    setPassword('');
  }
  }
  return (
     <SignUpForm
      name={name}
      email={email}
      password={password}
      error={netError||zodError}
      status={status}
      onNameChange={onNameChange}
      onEmailChange={onEmailChange}
      onPasswordChange={onPasswordChange}
      onSubmit={onSubmit}
      onReset={onReset}
    />
  )
}
