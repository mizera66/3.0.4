'use client';

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500); // Show for 2.5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-3 border-2 border-green-500">
        <CheckCircle size={24} className="text-green-500" />
        <span className="font-medium text-gray-900">{message}</span>
      </div>
    </div>
  );
}
