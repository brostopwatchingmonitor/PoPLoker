'use client';

import { SignupPage } from '@/components/app-flow';
import { Suspense } from 'react';

function SignupContent() {
  return <SignupPage />;
}

export default function Signup() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}