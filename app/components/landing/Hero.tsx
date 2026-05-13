'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, MapPin, ArrowRight, Shield, Clock, MapPinned, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth';

export function Hero() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const handleSearch = () => {
    if (isAuthenticated) {
      router.push('/location');
    } else {
      router.push('/login?redirect=location');
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-[#0A0A0B]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] opacity-70 animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] opacity-50" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-purple-500/10 blur-[120px] opacity-50" />
      </div>

      {/* Modern Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }} 
      />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content (Text & CTA) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20">
                <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              </div>
              <span className="text-sm font-medium text-white/90">Loker Pintar No. 1 di Indonesia</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
                Titip Barang <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-400 to-blue-400">
                  Tanpa Beban
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed">
                Revolusi penyimpanan barang dengan loker pintar otomatis. Tersebar di ratusan titik strategis, diakses 100% digital melalui ponsel Anda.
              </p>
            </div>

            {/* Interactive Search Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative p-1 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <div className="flex flex-col sm:flex-row gap-2 bg-white/5 rounded-xl p-2">
                <div className="flex-1 relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Cari lokasi loker terdekat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full h-14 pl-12 pr-4 rounded-xl border-none bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:ring-0 text-lg"
                  />
                </div>
                <Button 
                  size="lg" 
                  className="h-14 px-8 rounded-xl bg-primary hover:bg-primary-600 text-white font-semibold text-lg shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.6)]"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Temukan
                </Button>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 sm:gap-10 pt-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} alt={`User ${i}`} className="w-10 h-10 rounded-full border-2 border-[#0A0A0B]" />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-white font-bold text-sm">4.9/5</span>
                  </div>
                  <span className="text-white/50 text-xs">dari 10rb+ ulasan</span>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-white/70">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">Aman 100%</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium text-sm">Akses 24/7</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content (Visual Showcase) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative hidden lg:block h-[600px]"
          >
            {/* Floating UI Elements */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute top-[10%] right-[10%] z-20"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <MapPinned className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-bold">Stasiun MRT</p>
                  <p className="text-green-400 text-sm font-medium">3 Loker Tersedia</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              style={{ y: y2 }}
              className="absolute bottom-[20%] -left-[10%] z-20"
            >
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-white font-bold">Loker LKR-842</p>
                  <p className="text-white/60 text-sm">Terkunci Aman</p>
                </div>
              </div>
            </motion.div>

            {/* Main App Mockup Container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[9/19] bg-black rounded-[3rem] border-[8px] border-white/10 shadow-2xl overflow-hidden">
                {/* Mockup Screen Content */}
                <div className="absolute inset-0 bg-secondary-50">
                  {/* Mockup Header */}
                  <div className="h-24 bg-primary pt-8 px-6 rounded-b-3xl">
                    <p className="text-white/80 text-sm">Lokasi Anda</p>
                    <p className="text-white font-bold text-lg flex items-center gap-1">
                      Jakarta Selatan <ChevronRight className="w-4 h-4" />
                    </p>
                  </div>
                  {/* Mockup Body */}
                  <div className="p-6 space-y-4">
                    <div className="h-32 bg-white rounded-2xl shadow-sm border border-secondary-100 p-4">
                      <div className="flex justify-between items-start mb-4">
                         <div className="w-12 h-12 bg-secondary-100 rounded-xl" />
                         <div className="w-16 h-6 bg-green-100 rounded-full" />
                      </div>
                      <div className="w-3/4 h-4 bg-secondary-200 rounded-full mb-2" />
                      <div className="w-1/2 h-4 bg-secondary-100 rounded-full" />
                    </div>
                    <div className="h-32 bg-white rounded-2xl shadow-sm border border-secondary-100 p-4 opacity-50">
                      <div className="flex justify-between items-start mb-4">
                         <div className="w-12 h-12 bg-secondary-100 rounded-xl" />
                         <div className="w-16 h-6 bg-red-100 rounded-full" />
                      </div>
                      <div className="w-3/4 h-4 bg-secondary-200 rounded-full mb-2" />
                      <div className="w-1/2 h-4 bg-secondary-100 rounded-full" />
                    </div>
                  </div>
                  {/* Mockup Floating Action Button */}
                  <div className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing orb behind the phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/30 rounded-full blur-[100px] -z-10" />
          </motion.div>

        </div>
      </Container>
    </section>
  );
}