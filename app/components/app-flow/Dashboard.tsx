'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Package, CheckCircle2, ChevronRight, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';

export function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/dashboard');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const activeBookings = [
    {
      id: 'LKR-84920',
      location: 'St. MRT Bundaran HI',
      size: 'Medium',
      status: 'Active',
      timeRemaining: '2 Jam 15 Menit',
      pin: '123456'
    }
  ];

  const pastBookings = [
    {
      id: 'LKR-11234',
      location: 'Grand Indonesia Mall',
      size: 'Small',
      status: 'Completed',
      date: '10 Mei 2026'
    },
    {
      id: 'LKR-10923',
      location: 'St. Sudirman',
      size: 'Large',
      status: 'Completed',
      date: '8 Mei 2026'
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50 pb-20 pt-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Halo, {user?.name || 'Pengguna'}!</h1>
            <p className="text-secondary-500">Selamat datang di dashboard LokerPintar Anda.</p>
          </div>
          <Button variant="outline" className="w-fit" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Keluar
          </Button>
        </div>

        {/* Active Booking */}
        <div>
          <h2 className="text-xl font-bold text-secondary-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Pesanan Aktif
          </h2>
          {activeBookings.length > 0 ? (
            <div className="grid gap-4">
              {activeBookings.map((booking) => (
                <Card key={booking.id} padding="lg" className="border-primary/20 bg-white">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-lg">{booking.id}</p>
                          <p className="text-sm text-secondary-500">Loker {booking.size}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-secondary-600 text-sm">
                          <MapPin className="w-4 h-4" /> {booking.location}
                        </div>
                        <div className="flex items-center gap-2 text-secondary-600 text-sm">
                          <Clock className="w-4 h-4" /> Sisa Waktu: <span className="font-semibold text-primary">{booking.timeRemaining}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary-50 p-6 rounded-xl flex flex-col items-center justify-center min-w-[200px] border border-secondary-100">
                      <p className="text-sm text-secondary-500 mb-1">PIN Buka Loker</p>
                      <p className="text-3xl font-mono font-bold tracking-widest text-secondary-900">{booking.pin}</p>
                      <Button className="mt-4 w-full" variant="outline">Buka Loker</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center border-dashed">
              <Package className="w-12 h-12 text-secondary-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-secondary-900">Belum ada loker aktif</h3>
              <p className="text-secondary-500 mb-4">Anda belum memesan loker saat ini.</p>
              <Button onClick={() => router.push('/location')}>Pesan Loker Sekarang</Button>
            </Card>
          )}
        </div>

        {/* Past Bookings */}
        <div>
          <h2 className="text-xl font-bold text-secondary-900 mb-4">Riwayat Pesanan</h2>
          <Card className="overflow-hidden bg-white">
            <div className="divide-y divide-secondary-100">
              {pastBookings.map((booking) => (
                <div key={booking.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-secondary-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-500">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-secondary-900">{booking.location}</p>
                      <p className="text-sm text-secondary-500">{booking.date} • Loker {booking.size}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-secondary-300 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
