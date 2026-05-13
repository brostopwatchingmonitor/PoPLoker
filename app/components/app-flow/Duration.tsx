'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const prices = {
  S: 2000,
  M: 2000,
  L: 3000,
  XL: 5000,
};

export function DurationPage() {
  const router = useRouter();
  const [quantity, setQuantity] = React.useState(1);
  const [duration, setDuration] = React.useState(2);
  const selectedSize = 'L'; // Would come from store/context

  const price = prices[selectedSize as keyof typeof prices] || 3000;
  const subtotal = price * quantity * duration;
  const serviceFee = 1000;
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-secondary-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-secondary-100 px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-secondary-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Durasi & Jumlah</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Price Table */}
        <Card padding="md">
          <h3 className="font-semibold text-secondary-900 mb-4">Harga per ukuran:</h3>
          <div className="space-y-2">
            {Object.entries(prices).map(([size, price]) => (
              <div
                key={size}
                className={`flex justify-between p-3 rounded-lg ${
                  size === selectedSize ? 'bg-primary-50 border border-primary' : 'bg-secondary-50'
                }`}
              >
                <span className={`font-medium ${size === selectedSize ? 'text-primary' : 'text-secondary-600'}`}>
                  {size}
                </span>
                <span className={`font-semibold ${size === selectedSize ? 'text-primary' : 'text-secondary-900'}`}>
                  Rp {price.toLocaleString('id-ID')} / jam
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quantity Counter */}
        <Card padding="md">
          <h3 className="font-semibold text-secondary-900 mb-4">Jumlah Loker:</h3>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center disabled:opacity-50"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-3xl font-bold text-secondary-900 w-16 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(10, quantity + 1))}
              disabled={quantity >= 10}
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </Card>

        {/* Duration Counter */}
        <Card padding="md">
          <h3 className="font-semibold text-secondary-900 mb-4">Durasi:</h3>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setDuration(Math.max(1, duration - 1))}
              disabled={duration <= 1}
              className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center disabled:opacity-50"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="text-center">
              <span className="text-3xl font-bold text-secondary-900">{duration}</span>
              <span className="text-secondary-500 ml-2">jam</span>
            </div>
            <button
              onClick={() => setDuration(Math.min(72, duration + 1))}
              disabled={duration >= 72}
              className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </Card>

        {/* Total */}
        <Card variant="elevated" padding="md" className="bg-primary-50 border border-primary">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-secondary-900">Total:</span>
            <span className="text-2xl font-bold text-primary">Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </Card>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-100 p-4">
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => router.back()}>
            BATAL
          </Button>
          <Button fullWidth size="lg" onClick={() => router.push('/order')}>
            LANJUT
          </Button>
        </div>
      </div>
    </div>
  );
}