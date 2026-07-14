import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in duration-200 backdrop-blur-sm">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden scale-in-95 animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <h2 className="text-xl font-medium text-white mb-2">{title}</h2>
          <p className="text-sm text-white/60 leading-relaxed">{message}</p>
        </div>
        <div className="bg-white/5 px-6 py-4 flex justify-end gap-3 border-t border-white/5">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-white/60 hover:text-white transition-colors"
          >
            CANCEL
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-bold text-white bg-red-600/80 rounded-md hover:bg-red-600 transition-colors border border-red-500/50"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
