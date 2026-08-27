import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} color="var(--emerald-primary)" />;
      case 'error':
        return <AlertCircle size={20} color="var(--ruby-accent)" />;
      case 'warning':
        return <AlertTriangle size={20} color="#f59e0b" />;
      default:
        return <Info size={20} color="var(--gold-primary)" />;
    }
  };

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item ${toast.type}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {getIcon(toast.type)}
            <span>{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="icon-btn"
            style={{ width: '28px', height: '28px' }}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
