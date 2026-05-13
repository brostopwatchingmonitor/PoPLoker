'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function PaymentSuccessPage() {
  const router = useRouter();

  const copyCode = () => {
    navigator.clipboard.writeText('AB1234');
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5, delay: 0.2 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-secondary-900 mb-2">PEMBAYARAN BERHASIL</h1>
        <p className="text-secondary-600 mb-8">Loker Anda siap digunakan!</p>

        {/* Details Card */}
        <Card variant="elevated" padding="lg" className="text-left">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-secondary-100">
              <div>
                <p className="text-sm text-secondary-500">Lokasi</p>
                <p className="font-semibold text-secondary-900">St. MRT Jakarta Selatan</p>
              </div>
              <Badge variant="success">Aktif</Badge>
            </div>

            <div className="flex justify-between items-center py-2">
              <p className="text-sm text-secondary-500">Nomor Loker</p>
              <p className="font-bold text-xl text-primary">A1</p>
            </div>

            <div className="flex justify-between items-center py-2">
              <p className="text-sm text-secondary-500">Berlaku hingga</p>
              <p className="font-semibold text-secondary-900">14:30 WIB</p>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-secondary-100">
              <p className="text-sm text-secondary-500">Kode Akses</p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-xl text-secondary-900">AB1234</p>
                <button onClick={copyCode} className="p-1 hover:bg-secondary-100 rounded">
                  <Copy className="w-4 h-4 text-secondary-400" />
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <Button fullWidth size="lg" variant="outline">
            Lihat Detail Pesanan
          </Button>
          <Button fullWidth size="lg" onClick={() => router.push('/')}>
            Kembali ke Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export function PaymentFailedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        {/* Failed Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5, delay: 0.2 }}
          className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <AlertCircle className="w-12 h-12 text-red-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-secondary-900 mb-2">PEMBAYARAN GAGAL</h1>
        <p className="text-secondary-600 mb-8">Tidak perlu khawatir, pesanan Anda masih tersimpan.</p>

        {/* Error Reasons */}
        <Card padding="md" className="text-left mb-6">
          <h3 className="font-semibold text-secondary-900 mb-3">Kemungkinan penyebab:</h3>
          <ul className="space-y-2 text-sm text-secondary-600">
            <li>• Saldo tidak cukup</li>
            <li>• Transaksi timeout</li>
            <li>• Metode pembayaran tidak aktif</li>
          </ul>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button fullWidth size="lg" onClick={() => router.push('/order')}>
            Coba Lagi
          </Button>
          <Button fullWidth size="lg" variant="ghost" onClick={() => router.push('/')}>
            Kembali
          </Button>
        </div>
      </motion.div>
    </div>
  );
}