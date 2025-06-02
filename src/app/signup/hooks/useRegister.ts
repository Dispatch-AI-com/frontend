import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  workEmail: string;
  password: string;
  agreeToPolicy: boolean;
  agreeToComms?: boolean;
}

interface RegisterResponse {
  status: string;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface ApiError {
  message: string;
  statusCode?: number;
}

interface RegisterState {
  isLoading: boolean;
  error: string | null;
}

const API_URL = 'http://localhost:4000/api/auth/signup';

const handleRegisterSuccess = (response: RegisterResponse, router: ReturnType<typeof useRouter>) => {
  router.push('/signin');
};

const handleRegisterError = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : 'An unexpected error occurred';
  }

  const axiosError = error as AxiosError<ApiError>;
  
  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }
  
  if (axiosError.response?.status) {
    return `Server error: ${axiosError.response.status} - ${axiosError.response.statusText}`;
  }
  
  if (axiosError.request) {
    return 'No response from server. Please check your connection and ensure the backend is running.';
  }
  
  return 'An error occurred while setting up the request.';
};

const isSuccessfulResponse = (response: { status: number; data: RegisterResponse | Record<string, unknown> }): boolean => {
  const { status, data } = response;
  
  const isHttpSuccess = status === 200 || status === 201;
  const hasValidData = data && typeof data === 'object';
  
  if (isHttpSuccess && hasValidData) {
    if ('status' in data && data.status) {
      if (data.status === 'success') {
        return true;
      }
    }
    
    if ('email' in data || 'role' in data || '_id' in data) {
      return true;
    }
    
    return true;
  }
  
  return false;
};

export const useRegister = () => {
  const [state, setState] = useState<RegisterState>({
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

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setLoading(true);
    setError(null);

    const requestData = {
      name: `${credentials.firstName} ${credentials.lastName}`,
      email: credentials.workEmail,
      password: credentials.password,
      role: "user"
    };

    try {
      const response = await axios.post(
        API_URL,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );

      if (isSuccessfulResponse(response)) {
        handleRegisterSuccess(response.data, router);
        return true;
      }

      const errorMessage = response.data?.message || 
                          response.data?.error || 
                          `Registration failed with status ${response.status}`;
      setError(errorMessage);
      return false;
    } catch (error) {
      const errorMessage = handleRegisterError(error);
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    isLoading: state.isLoading,
    error: state.error,
  };
}; 