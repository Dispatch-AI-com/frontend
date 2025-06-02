"use client";

import Image from "next/image";
import styled from "styled-components";

import SigninForm from "@/app/signin/component/SigninForm";

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 100px;
  border-radius: 24px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.03);
  background-color: white;

  @media (max-width: 600px) {
    padding: 20px;
    padding-bottom: 60px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    margin-bottom: 24px;
  }
`;

export default function SigninPage() {
  return (
    <PageContainer>
      <FormContainer>
        <LogoContainer>
          <Image src="/logo.svg" alt="Logo" width={200} height={100} />
        </LogoContainer>
        <SigninForm />
      </FormContainer>
    </PageContainer>
  );
}
