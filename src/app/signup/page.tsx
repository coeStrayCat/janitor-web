'use client';

import ProtectedRoute from '@/components/auth/protected-route';
import SignUpForm from '@/components/auth/sign-up-form';

export default function SignUpPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <SignUpForm />
    </ProtectedRoute>
  );
}
