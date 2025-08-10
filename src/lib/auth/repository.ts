import axios from 'axios';
import Cookies from 'js-cookie';
import { IAuthRepository } from '@/types/repository';
import { User, AuthResponse, SignUpRequest, SignInRequest } from '@/types/auth';

const API_BASE_URL = '/api/auth'; 
const TOKEN_COOKIE_NAME = 'auth_token';
const USER_STORAGE_KEY = 'current_user';

export class AuthRepository implements IAuthRepository {
  private axios = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'accept': '*/*',
    },
  });

  async signUp(request: SignUpRequest): Promise<AuthResponse> {
    try {
      const response = await this.axios.post('/signup', request);
      
      if (response.data.error) {
        throw new Error(response.data.error);
      }
    
      const token = response.data.token;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      const user: User = {
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
      };

      return {
        token,
        user,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 
                           error.response?.data?.message || 
                           error.response?.data || 
                           'Sign up failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  async signIn(request: SignInRequest): Promise<AuthResponse> {
    try {
      const response = await this.axios.post('/signin', request);

      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      const token = response.data.token;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      const user: User = {
        email: request.email,
      };

      return {
        token,
        user,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.error || 
                           error.response?.data?.message || 
                           error.response?.data || 
                           'Sign in failed';
        throw new Error(errorMessage);
      }
      throw error;
    }
  }

  saveToken(token: string): void {
    Cookies.set(TOKEN_COOKIE_NAME, token, { 
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  getToken(): string | null {
    return Cookies.get(TOKEN_COOKIE_NAME) || null;
  }

  removeToken(): void {
    Cookies.remove(TOKEN_COOKIE_NAME);
  }

  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  clearCurrentUser(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}
