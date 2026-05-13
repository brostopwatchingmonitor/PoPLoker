'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Lock, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useAuthStore } from '@/store/auth';

const navLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Cara Kerja', href: '#how-it-works' },
  { label: 'Lokasi', href: '#locations' },
  { label: 'Harga', href: '#pricing' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-card' : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft">
              <Lock className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-800">LokerPintar</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-secondary-600 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-lg">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-secondary-700">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-1" />
                  Keluar
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <LogIn className="w-4 h-4" />
                    Masuk
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="gap-1">
                    <UserPlus className="w-4 h-4" />
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-secondary-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-secondary-100 shadow-elevated"
        >
          <Container>
            <div className="py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-secondary-600 font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary-50 rounded-lg">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-secondary-700">{user?.name}</span>
                    </div>
                    <Button variant="ghost" fullWidth onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" fullWidth className="gap-2">
                        <LogIn className="w-4 h-4" />
                        Masuk
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button fullWidth className="gap-2">
                        <UserPlus className="w-4 h-4" />
                        Daftar
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Container>
        </motion.div>
      )}
    </motion.header>
  );
}