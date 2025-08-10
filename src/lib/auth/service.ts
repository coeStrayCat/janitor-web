import { AuthRepository } from './repository';
import { AuthUseCases } from './use-cases';

export const authRepository = new AuthRepository();
export const authService = new AuthUseCases(authRepository);
