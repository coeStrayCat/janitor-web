'use client';

import ProtectedRoute from '@/components/auth/protected-route';
import SignInForm from '@/components/auth/sign-in-form';

export default function SignInPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <SignInForm />
    </ProtectedRoute>
  );
}
