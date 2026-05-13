'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const services = [
  {
    id: 'kurir',
    title: 'KIRIM BARANG',
    subtitle: 'Untuk kurir/pengirim',
    icon: Package,
    color: 'bg-green-50 border-green-200',
    iconColor: 'bg-green-100 text-green-600',
  },
  {
    id: 'pelanggan',
    title: 'TITIP BARANG',
    subtitle: 'Untuk pribadi/ukuran',
    icon: User,
    color: 'bg-primary-50 border-primary',
    iconColor: 'bg-primary-100 text-primary',
  },
];

export function ServiceTypePage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-secondary-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-secondary-100 px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-secondary-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Pilih Layanan</h1>
        </div>
      </div>

      <div className="p-4">
        <p className="text-secondary-600 mb-6">Anda ingin menggunakan loker untuk?</p>

        <div className="space-y-4">
          {services.map((service) => (
            <motion.button
              key={service.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedService(service.id)}
              className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${service.color} ${
                selectedService === service.id ? 'ring-2 ring-primary ring-offset-2' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl ${service.iconColor} flex items-center justify-center`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary-900">{service.title}</h3>
                  <p className="text-sm text-secondary-500">{service.subtitle}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-100 p-4">
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => router.back()}>
            BATAL
          </Button>
          <Button
            fullWidth
            size="lg"
            disabled={!selectedService}
            onClick={() => router.push('/duration')}
          >
            LANJUT
          </Button>
        </div>
      </div>
    </div>
  );
}