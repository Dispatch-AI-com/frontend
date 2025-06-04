import type { AxiosError } from 'axios';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginCredentials {
  email: string;
  password: string;
}

interface ApiError {
  message: string;
  statusCode?: number;
}

interface AuthState {
  isLoading: boolean;
  error: string | null;
}

interface LoginResponse {
  status?: string;
  data?: {
    access_token?: string;
    token?: string;
    user?: Record<string, unknown>;
  };
  access_token?: string;
  token?: string;
  user?: Record<string, unknown>;
  message?: string;
  error?: string;
}

const API_URL = 'http://localhost:4000/api/auth/login';

const handleAuthSuccess = (
  response: LoginResponse,
  router: ReturnType<typeof useRouter>,
) => {
  let access_token: string | undefined;
  let user: Record<string, unknown> | undefined;
  const responseData = response.data;
  if (responseData?.access_token) {
    access_token = responseData.access_token;
    user = responseData.user;
  } else if (response.access_token) {
    access_token = response.access_token;
    user = response.user;
  } else if (responseData?.token) {
    access_token = responseData.token;
    user = responseData.user;
  } else if (response.token) {
    access_token = response.token;
    user = response.user;
  }
  if (access_token) {
    localStorage.setItem('token', access_token);
  }
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  router.push('/dashboard');
};

const handleAuthError = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error
      ? error.message
      : 'An unexpected error occurred';
  }

  const axiosError = error as AxiosError<ApiError>;
  if (axiosError.response?.data.message) {
    return axiosError.response.data.message;
  }
  if (axiosError.request) {
    return 'No response from server. Please check your connection.';
  }
  return 'An error occurred while setting up the request.';
};

const isSuccessfulResponse = (response: {
  status: number;
  data: LoginResponse;
}): boolean => {
  const { status, data } = response;
  const isHttpSuccess = status === 200 || status === 201;
  if (isHttpSuccess) {
    if (data.status === 'success' && data.data?.access_token) {
      return true;
    }
    if (data.access_token ?? data.token) {
      return true;
    }
    if (data.data?.access_token ?? data.data?.token) {
      return true;
    }
    if (data.user ?? data.data?.user) {
      return true;
    }
  }
  return false;
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    isLoading: false,
    error: null,
  });
  const router = useRouter();

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<LoginResponse>(API_URL, credentials, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        timeout: 10000,
      });

      if (isSuccessfulResponse(response)) {
        handleAuthSuccess(response.data, router);
        return true;
      }

      const errorMessage =
        response.data.message ?? response.data.error ?? 'Login failed';
      setError(errorMessage);
      return false;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const errorData = error.response.data as LoginResponse | undefined;

        if (status === 500) {
          setError('Something went wrong. Please try again later.');
        } else if (status === 401) {
          setError(
            'Invalid email or password. Please check your login information.',
          );
        } else if (status === 404) {
          setError(
            'Login endpoint not found. Please check server configuration.',
          );
        } else {
          const message =
            errorData?.message ??
            errorData?.error ??
            `Server error (${status.toString()})`;
          setError(message);
        }
      } else {
        const errorMessage = handleAuthError(error);
        setError(errorMessage);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/signin');
  };

  const isAuthenticated = () => !!localStorage.getItem('token');

  return {
    login,
    logout,
    isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
  };
};
