"use client";

import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

type SalesNotificationProps = {
  name: string;
  time: string;
  product: string;
  onHide: () => void;
};

export function SalesNotification({ name, time, product, onHide }: SalesNotificationProps) {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsHiding(true);
      const unmountTimer = setTimeout(onHide, 500); // Corresponde à duração da animação de saída
      return () => clearTimeout(unmountTimer);
    }, 4500); // Começa a desaparecer um pouco antes de 5s

    return () => clearTimeout(hideTimer);
  }, [onHide]);

  const animationClasses = isHiding 
    ? 'animate-out fade-out slide-out-to-bottom-5 duration-500'
    : 'animate-in fade-in slide-in-from-bottom-5 duration-500';

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-full max-w-xs sm:max-w-sm ${animationClasses}`}>
      <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4 border border-gray-200">
        <div className="p-1.5 sm:p-2 bg-green-100 rounded-full border-2 sm:border-4 border-green-50">
          <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
        </div>
        <div className="flex-1">
          <p className="text-xs sm:text-sm font-semibold text-gray-900">
            <span className="font-bold">{name}</span>{' '}
            <span className="text-gray-500 font-normal">{time}</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-700">comprou {product}</p>
        </div>
      </div>
    </div>
  );
}
