"use client";

import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

type SalesNotificationProps = {
  name: string;
  time: string;
  product: string;
  onHide: () => void;
};

export function SalesNotification({ name, time, product, onHide }: SalesNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 5000); // A notificação desaparecerá após 5 segundos

    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4 border border-gray-200">
        <div className="p-2 bg-green-100 rounded-full border-4 border-green-50">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">
            <span className="font-bold">{name}</span>{' '}
            <span className="text-gray-500 font-normal">{time}</span>
          </p>
          <p className="text-sm text-gray-700">comprou {product}</p>
        </div>
      </div>
    </div>
  );
}
