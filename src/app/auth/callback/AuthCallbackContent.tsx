'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import styled from 'styled-components';

import { setCredentials } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import type { UserInfo } from '@/types/user';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fafafa;
`;

const LoadingCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const LoadingText = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0;
`;

export default function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = searchParams.get('token');
    const userString = searchParams.get('user');

    if (token && userString) {
      try {
        const parsedUser = JSON.parse(
          decodeURIComponent(userString),
        ) as UserInfo;

        dispatch(
          setCredentials({
            token,
            user: {
              _id: parsedUser._id,
              email: parsedUser.email,
              firstName: parsedUser.firstName,
              lastName: parsedUser.lastName,
              role: parsedUser.role,
            },
          }),
        );

        router.replace('/admin/overview');
      } catch {
        router.replace('/login?error=oauth_error');
      }
    } else {
      router.replace('/login?error=oauth_error');
    }
  }, [searchParams, dispatch, router]);

  return (
    <Container>
      <LoadingCard>
        <LoadingText>Completing authentication...</LoadingText>
      </LoadingCard>
    </Container>
  );
}
