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
  console.warn('Processing successful login response:', response);
  
  let access_token: string | undefined;
  let user: Record<string, unknown> | undefined;
  
  // 尝试从不同位置提取 token 和 user 信息
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
    console.warn('Token saved to localStorage');
  }
  
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    console.warn('User data saved to localStorage');
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
  console.warn('Login response check:', { status, data });
  
  const isHttpSuccess = status === 200 || status === 201;
  const hasValidData = data && typeof data === 'object';
  
  if (isHttpSuccess && hasValidData) {
    // 检查是否有 status 字段且为 'success'
    if (data.status === 'success' && (data.data as Record<string, unknown>)?.access_token) {
      console.warn('Found success status with access_token');
      return true;
    }
    
    // 检查是否直接包含 access_token 或 token 字段
    if (data.access_token || data.token) {
      console.warn('Found access_token directly in response');
      return true;
    }
    
    // 检查是否在 data.data 中包含 access_token
    if ((data.data as Record<string, unknown>)?.access_token || (data.data as Record<string, unknown>)?.token) {
      console.warn('Found access_token in data.data');
      return true;
    }
    
    // 检查其他可能的成功标识
    if (data.user || (data.data as Record<string, unknown>)?.user) {
      console.warn('Found user data, assuming successful login');
      return true;
    }
  }
  
  console.warn('Login response failed all checks');
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

    console.warn('Attempting login to:', API_URL);
    console.warn('Login credentials:', { email: credentials.email, password: '***' });

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

      console.warn('Login response received:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });

      if (isSuccessfulResponse(response)) {
        handleAuthSuccess(response.data, router);
        return true;
      }

      const errorMessage = response.data?.message || response.data?.error || 'Login failed';
      console.error('Login failed with response:', {
        status: response.status,
        data: response.data,
        errorMessage
      });
      setError(errorMessage);
      return false;
    } catch (error) {
      console.error('Login error caught:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        const errorData = error.response.data;
        
        console.error('Server error details:', {
          status,
          statusText: error.response.statusText,
          data: errorData,
          headers: error.response.headers
        });
        
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