import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from './redux';
import { checkAuthStatus } from '@/store/auth-slice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
};

export const useRequireAuth = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && user === null) {
      const timeout = setTimeout(() => {
        if (!isAuthenticated) {
          router.push('/signin');
        }
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [isAuthenticated, user, router]);

  return { isAuthenticated, user };
};

export const useGuestOnly = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/welcome');
    }
  }, [isAuthenticated, router]);

  return { isAuthenticated };
};
