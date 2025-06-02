import axios, { AxiosError } from 'axios';
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

const API_URL = 'http://localhost:4000/api/auth/login';

const handleAuthSuccess = (response: Record<string, unknown>, router: ReturnType<typeof useRouter>) => {
  let access_token: string | undefined;
  let user: Record<string, unknown> | undefined;
  
  const responseData = response.data as Record<string, unknown>;
  if (responseData?.access_token) {
    access_token = responseData.access_token as string;
    user = responseData.user as Record<string, unknown>;
  } else if (response.access_token) {
    access_token = response.access_token as string;
    user = response.user as Record<string, unknown>;
  } else if (responseData?.token) {
    access_token = responseData.token as string;
    user = responseData.user as Record<string, unknown>;
  } else if (response.token) {
    access_token = response.token as string;
    user = response.user as Record<string, unknown>;
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
    return error instanceof Error ? error.message : 'An unexpected error occurred';
  }

  const axiosError = error as AxiosError<ApiError>;
  
  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }
  
  if (axiosError.request) {
    return 'No response from server. Please check your connection.';
  }
  
  return 'An error occurred while setting up the request.';
};

const isSuccessfulResponse = (response: { status: number; data: Record<string, unknown> }): boolean => {
  const { status, data } = response;
  
  const isHttpSuccess = status === 200 || status === 201;
  const hasValidData = data && typeof data === 'object';
  
  if (isHttpSuccess && hasValidData) {
    if (data.status === 'success' && (data.data as Record<string, unknown>)?.access_token) {
      return true;
    }
    
    if (data.access_token || data.token) {
      return true;
    }
    
    if ((data.data as Record<string, unknown>)?.access_token || (data.data as Record<string, unknown>)?.token) {
      return true;
    }
    
    if (data.user || (data.data as Record<string, unknown>)?.user) {
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
      const response = await axios.post(
        API_URL,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (isSuccessfulResponse(response)) {
        handleAuthSuccess(response.data, router);
        return true;
      }

      const errorMessage = response.data?.message || response.data?.error || 'Login failed';
      setError(errorMessage);
      return false;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        
        if (status === 500) {
          setError('服务器内部错误。请检查后端服务器是否正常运行，或联系管理员。');
        } else if (status === 401) {
          setError('邮箱或密码错误，请检查您的登录信息。');
        } else if (status === 404) {
          setError('登录接口不存在，请检查服务器配置。');
        } else {
          const message = errorData?.message || errorData?.error || `服务器错误 (${status})`;
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