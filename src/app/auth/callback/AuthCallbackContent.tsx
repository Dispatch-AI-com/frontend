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
    // Now we expect csrfToken and user (JWT token is in httpOnly cookie)
    const csrfToken = searchParams.get('csrfToken');
    const userString = searchParams.get('user');

    if (csrfToken && userString) {
      try {
        const parsedUser = JSON.parse(
          decodeURIComponent(userString),
        ) as UserInfo;

        // Clear any persisted auth state to prevent old user ID from being used
        localStorage.removeItem('persist:root');

        console.log('[AuthCallback] Setting user with ID:', parsedUser._id);

        dispatch(
          setCredentials({
            csrfToken,
            user: {
              _id: parsedUser._id,
              email: parsedUser.email,
              firstName: parsedUser.firstName,
              lastName: parsedUser.lastName,
              role: parsedUser.role,
              status: parsedUser.status,
            },
          }),
        );

        router.replace('/admin/overview');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Auth callback - parsing error:', error);
        router.replace('/login?error=oauth_error');
      }
    } else {
      // eslint-disable-next-line no-console
      console.error('Auth callback - missing csrfToken or userString');
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
