'use client';

import { LoginPage } from '@/components/app-flow';
import { Suspense } from 'react';

function LoginContent() {
  return <LoginPage />;
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}