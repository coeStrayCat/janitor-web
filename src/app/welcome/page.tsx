'use client';

import ProtectedRoute from '@/components/auth/protected-route';
import WelcomePage from '@/components/auth/welcome-page';

export default function Welcome() {
  return (
    <ProtectedRoute requireAuth={true}>
      <WelcomePage />
    </ProtectedRoute>
  );
}
