import { SignUpFormProps } from '@/types/SignUpFormProps'
import { Container } from '@mui/material'
import React from 'react'
import FormTitle from '../ui/FormTitle'
import InputTextField from '../ui/InputTextField'
import ErrorMessage from '../ui/ErrorMessage'
import ButtonGroup from '../ui/ButtonGroup'

export default function SignUpForm({
    name,
    email,
    password,
    error,
    status,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onSubmit,
    onReset
    }: SignUpFormProps) {
  return (
    <form onSubmit={onSubmit}>
        <Container maxWidth="xs" sx={{ my: 4, textAlign: 'center', display:'flex' , flexDirection:'column', gap:2 }}>
            <FormTitle title="Sign Up" />
            <InputTextField label="Name" value={name} onChange={onNameChange}/>
            <InputTextField label="Email" type="email" value={email} onChange={onEmailChange}/>
            <InputTextField label="Password" type="password" value={password} onChange={onPasswordChange}/>
            {!status && <ErrorMessage message={error} />}
            <ButtonGroup onReset={onReset} />
        </Container>
    </form>
  )
}
