'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function OrderSummaryPage() {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  // Mock data - would come from store/context
  const orderData = {
    location: 'St. MRT Jakarta Selatan',
    size: 'L',
    quantity: 1,
    duration: 2,
    subtotal: 6000,
    serviceFee: 1000,
    total: 7000,
  };

  return (
    <div className="min-h-screen bg-secondary-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-secondary-100 px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-secondary-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Detail Transaksi</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Order Summary */}
        <Card padding="md">
          <h3 className="font-semibold text-secondary-900 mb-4">Ringkasan Pesanan:</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-secondary-500">Lokasi:</span>
              <span className="font-medium text-secondary-900">{orderData.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-500">Ukuran:</span>
              <span className="font-medium text-secondary-900">{orderData.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-500">Jumlah:</span>
              <span className="font-medium text-secondary-900">{orderData.quantity} loker</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary-500">Durasi:</span>
              <span className="font-medium text-secondary-900">{orderData.duration} jam</span>
            </div>
            <div className="border-t border-secondary-100 pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-secondary-500">Subtotal:</span>
                <span className="text-secondary-900">Rp {orderData.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-secondary-500">Biaya Layanan:</span>
                <span className="text-secondary-900">Rp {orderData.serviceFee.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div className="border-t border-secondary-100 pt-3 mt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-secondary-900">TOTAL:</span>
                <span className="text-lg font-bold text-primary">Rp {orderData.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Terms Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-secondary-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-secondary-600">
            saya setuju dengan{' '}
            <button className="text-primary font-medium underline">syarat dan ketentuan</button>
            {' '}berlaku. Lihat di sini
          </span>
        </label>
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
            disabled={!agreedToTerms}
            onClick={() => router.push('/success')}
          >
            LANJUT BAYAR
          </Button>
        </div>
      </div>

    </div>
  );
}