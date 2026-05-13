'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const locations = [
  { id: '1', name: 'St. MRT Jakarta Selatan', distance: '500m', available: 3, sizes: ['S', 'M', 'L', 'XL'] },
  { id: '2', name: 'St. Bandung', distance: '2.5km', available: 5, sizes: ['S', 'M', 'L'] },
  { id: '3', name: 'Mall Grand Indonesia', distance: '3.2km', available: 8, sizes: ['S', 'M', 'L', 'XL'] },
];

const sizes = [
  { id: 'S', label: 'S', price: 2000, color: 'bg-primary-100 border-primary text-primary' },
  { id: 'M', label: 'M', price: 2000, color: 'bg-red-100 border-red-400 text-red-600' },
  { id: 'L', label: 'L', price: 3000, color: 'bg-primary-100 border-primary text-primary' },
  { id: 'XL', label: 'XL', price: 5000, color: 'bg-primary-100 border-primary text-primary' },
];

export function LocationSizePage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = React.useState(locations[0]);
  const [selectedSize, setSelectedSize] = React.useState('L');
  const [showLocationModal, setShowLocationModal] = React.useState(false);

  return (
    <div className="min-h-screen bg-secondary-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-secondary-100 px-4 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-secondary-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Cari Lokasi & Ukuran</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Search Location */}
        <Card padding="md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Cari Lokasi Loker"
              className="w-full h-12 pl-10 pr-4 bg-secondary-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              onClick={() => setShowLocationModal(true)}
              readOnly
            />
          </div>
        </Card>

        {/* Selected Location Status */}
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium text-secondary-900">AVAILABLE</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-secondary-600">Location:</p>
              <p className="font-medium text-secondary-900">{selectedLocation.name}</p>
            </div>
          </div>
        </Card>

        {/* Size Selection */}
        <div>
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Pilih Ukuran:</h2>
          <div className="grid grid-cols-4 gap-3">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`py-4 rounded-xl border-2 transition-all ${
                  selectedSize === size.id
                    ? 'border-primary bg-primary-50'
                    : 'border-secondary-200 bg-white hover:border-primary/50'
                }`}
              >
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  selectedSize === size.id ? 'bg-primary text-white' : 'bg-secondary-100 text-secondary-600'
                }`}>
                  <span className="font-bold">{size.label}</span>
                </div>
                <p className="text-xs text-secondary-500">Rp {size.price.toLocaleString('id-ID')}/jam</p>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Info */}
        {selectedSize && (
          <Card variant="elevated" padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-secondary-500">Ukuran Terpilih</p>
                <p className="text-xl font-bold text-primary">Size {selectedSize}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-secondary-500">Per Jam</p>
                <p className="text-xl font-bold text-secondary-900">
                  Rp {sizes.find(s => s.id === selectedSize)?.price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-100 p-4">
        <Button fullWidth size="lg" onClick={() => router.push('/service')}>
          LANJUT
        </Button>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end"
          onClick={() => setShowLocationModal(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="w-full bg-white rounded-t-2xl max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-secondary-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Pilih Lokasi</h2>
              <button onClick={() => setShowLocationModal(false)} className="p-2 hover:bg-secondary-100 rounded-lg">
                ✕
              </button>
            </div>

            <div className="p-4 space-y-3">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    setSelectedLocation(location);
                    setShowLocationModal(false);
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedLocation.id === location.id
                      ? 'border-primary bg-primary-50'
                      : 'border-secondary-100 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-secondary-900">{location.name}</p>
                      <p className="text-sm text-secondary-500">{location.distance} • {location.available} tersedia</p>
                    </div>
                    {selectedLocation.id === location.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}