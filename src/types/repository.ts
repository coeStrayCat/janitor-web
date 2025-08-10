import { User, AuthResponse, SignUpRequest, SignInRequest } from '@/types/auth';

export interface IAuthRepository {
  signUp(request: SignUpRequest): Promise<AuthResponse>;
  signIn(request: SignInRequest): Promise<AuthResponse>;
  saveToken(token: string): void;
  getToken(): string | null;
  removeToken(): void;
  getCurrentUser(): User | null;
  setCurrentUser(user: User): void;
  clearCurrentUser(): void;
}
