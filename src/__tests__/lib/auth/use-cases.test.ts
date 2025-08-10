// ==============================
// AUTH USE CASES UNIT TESTS
// ==============================

import { AuthUseCases } from '@/lib/auth/use-cases';
import { IAuthRepository } from '@/types/repository';
import { User, AuthResponse } from '@/types/auth';

class MockAuthRepository implements IAuthRepository {
  private token: string | null = null;
  private user: User | null = null;

  async signUp(request: any): Promise<AuthResponse> {
    const user: User = {
      id: '1',
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
    };
    
    return {
      token: 'mock-token',
      user,
    };
  }

  async signIn(request: any): Promise<AuthResponse> {
    const user: User = {
      id: '1',
      email: request.email,
    };
    
    return {
      token: 'mock-token',
      user,
    };
  }

  saveToken(token: string): void {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  removeToken(): void {
    this.token = null;
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  setCurrentUser(user: User): void {
    this.user = user;
  }

  clearCurrentUser(): void {
    this.user = null;
  }
}

describe('AuthUseCases', () => {
  let authUseCases: AuthUseCases;
  let mockRepository: MockAuthRepository;

  beforeEach(() => {
    mockRepository = new MockAuthRepository();
    authUseCases = new AuthUseCases(mockRepository);
  });

  describe('signUp', () => {
    it('should sign up user successfully', async () => {
      const request = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      const result = await authUseCases.signUp(request);

      expect(result.token).toBe('mock-token');
      expect(result.user.email).toBe('john@example.com');
      expect(result.user.firstName).toBe('John');
      expect(mockRepository.getToken()).toBe('mock-token');
    });

    it('should handle sign up error', async () => {
      jest.spyOn(mockRepository, 'signUp').mockRejectedValue(new Error('Sign up failed'));

      const request = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      };

      await expect(authUseCases.signUp(request)).rejects.toThrow('Sign up failed');
    });
  });

  describe('signIn', () => {
    it('should sign in user successfully', async () => {
      const request = {
        email: 'john@example.com',
        password: 'password123',
      };

      const result = await authUseCases.signIn(request);

      expect(result.token).toBe('mock-token');
      expect(result.user.email).toBe('john@example.com');
      expect(mockRepository.getToken()).toBe('mock-token');
    });

    it('should handle sign in error', async () => {
      jest.spyOn(mockRepository, 'signIn').mockRejectedValue(new Error('Sign in failed'));

      const request = {
        email: 'john@example.com',
        password: 'password123',
      };

      await expect(authUseCases.signIn(request)).rejects.toThrow('Sign in failed');
    });
  });

  describe('logout', () => {
    it('should logout user successfully', async () => {
      // Setup authenticated user
      mockRepository.saveToken('mock-token');
      mockRepository.setCurrentUser({ email: 'john@example.com' });

      await authUseCases.logout();

      expect(mockRepository.getToken()).toBeNull();
      expect(mockRepository.getCurrentUser()).toBeNull();
    });
  });

  describe('getCurrentUser', () => {
    it('should return authenticated user when token and user exist', () => {
      const user = { email: 'john@example.com' };
      mockRepository.saveToken('mock-token');
      mockRepository.setCurrentUser(user);

      const result = authUseCases.getCurrentUser();

      expect(result.isAuthenticated).toBe(true);
      expect(result.user).toEqual(user);
    });

    it('should return unauthenticated when no token', () => {
      const result = authUseCases.getCurrentUser();

      expect(result.isAuthenticated).toBe(false);
      expect(result.user).toBeNull();
    });
  });
});
