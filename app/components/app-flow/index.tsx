'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Chrome, Apple, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth';

export function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/location';
  const { login } = useAuthStore();

  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    login(email, email.split('@')[0]);
    router.push(redirect);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-secondary-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">LokerPintar</h1>
          <p className="text-secondary-400 mt-1">Masuk ke akun Anda</p>
        </div>

        <Card padding="lg" className="bg-white/95 backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email / No. HP"
              type="email"
              placeholder="Masukkan email atau nomor HP"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
            />

            <div className="relative">
              <Input
                label="Kata Sandi"
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-secondary-400 hover:text-secondary-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary hover:underline">
                Lupa kata sandi?
              </button>
            </div>

            <Button type="submit" fullWidth size="lg" loading={loading}>
              MASUK
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-secondary-400">atau</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" type="button">
              <Chrome className="w-5 h-5" />
              Google
            </Button>
            <Button variant="outline" type="button">
              <Apple className="w-5 h-5" />
              Apple
            </Button>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-secondary-600 mt-6">
            belum punya akun?{' '}
            <Link
              href={redirect ? `/signup?redirect=${redirect}` : '/signup'}
              className="text-primary font-semibold hover:underline"
            >
              DAFTAR
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

// Signup Page Component
export function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/location';
  const { login } = useAuthStore();

  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    login(email, name);
    router.push(redirect);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-secondary-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">LokerPintar</h1>
          <p className="text-secondary-400 mt-1">Buat akun baru</p>
        </div>

        <Card padding="lg" className="bg-white/95 backdrop-blur-sm">
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="w-5 h-5" />}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
            />

            <Input
              label="Nomor HP"
              type="tel"
              placeholder="Masukkan nomor HP Anda"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Mail className="w-5 h-5" />}
            />

            <div className="relative">
              <Input
                label="Kata Sandi"
                type={showPassword ? 'text' : 'password'}
                placeholder="Buat kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-secondary-400 hover:text-secondary-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs text-secondary-500">
              Kata sandi minimal 8 karakter dengan huruf dan angka
            </p>

            <Button type="submit" fullWidth size="lg" loading={loading}>
              DAFTAR
            </Button>
          </form>

          {/* Terms */}
          <p className="text-center text-xs text-secondary-500 mt-4">
            Dengan mendaftar, Anda setuju dengan{' '}
            <button className="text-primary hover:underline">Syarat & Ketentuan</button>{' '}
            dan{' '}
            <button className="text-primary hover:underline">Kebijakan Privasi</button>
          </p>

          {/* Login Link */}
          <p className="text-center text-sm text-secondary-600 mt-6">
            sudah punya akun?{' '}
            <Link
              href={redirect ? `/login?redirect=${redirect}` : '/login'}
              className="text-primary font-semibold hover:underline"
            >
              MASUK
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

// Re-export other components
export { LocationSizePage } from './LocationSize';
export { ServiceTypePage } from './ServiceType';
export { DurationPage } from './Duration';
export { OrderSummaryPage } from './OrderSummary';
export { PaymentSuccessPage, PaymentFailedPage } from './PaymentPage';
export { DashboardPage } from './Dashboard';