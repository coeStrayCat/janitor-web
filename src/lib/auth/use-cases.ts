import { IAuthRepository } from '@/types/repository';
import { SignUpRequest, SignInRequest, AuthResponse, User } from '@/types/auth';

export class AuthUseCases {
  constructor(private authRepository: IAuthRepository) {}

  async signUp(request: SignUpRequest): Promise<AuthResponse> {
    try {
      const response = await this.authRepository.signUp(request);
      this.authRepository.saveToken(response.token);
      this.authRepository.setCurrentUser(response.user);
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Sign up failed');
    }
  }

  async signIn(request: SignInRequest): Promise<AuthResponse> {
    try {
      const response = await this.authRepository.signIn(request);
      this.authRepository.saveToken(response.token);
      this.authRepository.setCurrentUser(response.user);
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Sign in failed');
    }
  }

  async logout(): Promise<void> {
    this.authRepository.removeToken();
    this.authRepository.clearCurrentUser();
  }

  getCurrentUser(): { user: User | null; isAuthenticated: boolean } {
    const token = this.authRepository.getToken();
    const user = this.authRepository.getCurrentUser();
    
    if (token && user) {
      return { user, isAuthenticated: true };
    }
    
    return { user: null, isAuthenticated: false };
  }
}
