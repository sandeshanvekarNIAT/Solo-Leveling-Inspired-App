'use client';

import React from 'react';
import { useSystem } from '@/context/SystemContext';
import { SystemWindow } from './SystemWindow';
import { SystemButton } from './SystemButton';
import { Bell, AlertTriangle, CheckCircle2, Shield, Info, Trash2 } from 'lucide-react';
import { soundManager } from '@/lib/sound';

export const NotificationDrawer: React.FC = () => {
  const { notifications, dismissNotification, setActiveModal } = useSystem();

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
      case 'danger':
        return <AlertTriangle className="w-4 h-4 text-[#FF2D4B]" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[#38FF9A]" />;
      case 'rank':
        return <Shield className="w-4 h-4 text-[#D43BFF]" />;
      default:
        return <Info className="w-4 h-4 text-[#1EA7FF]" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="System Transmissions"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/75 backdrop-blur-md"
    >
      <div className="max-w-md w-full">
        <SystemWindow
          title="SYSTEM TRANSMISSIONS"
          subtitle={`${notifications.length} LOGS`}
          icon={<Bell className="w-4 h-4 text-[#1EA7FF]" aria-hidden="true" />}
          onClose={() => setActiveModal(null)}
          variant="blue"
        >
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1" aria-live="polite">
            {notifications.length === 0 ? (
              <div className="py-8 text-center font-mono text-xs text-slate-500">
                [No pending system transmissions.]
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 border rounded transition-all flex items-start gap-3 ${
                    notif.type === 'danger' || notif.type === 'warning'
                      ? 'border-[#FF2D4B]/50 bg-[#FF2D4B]/10'
                      : notif.type === 'rank'
                      ? 'border-[#8B2CFF]/50 bg-[#8B2CFF]/10'
                      : notif.type === 'success'
                      ? 'border-[#38FF9A]/50 bg-[#38FF9A]/10'
                      : 'border-[#1EA7FF]/40 bg-[#1EA7FF]/10'
                  }`}
                >
                  <div className="shrink-0 mt-0.5" aria-hidden="true">{getIcon(notif.type)}</div>
                  <div className="flex-1 min-w-0 font-mono">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white font-orbitron truncate">
                        {notif.title}
                      </span>
                      <span className="text-[9px] text-slate-400 shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Dismiss notification: ${notif.title}`}
                    onClick={() => {
                      soundManager.playTick();
                      dismissNotification(notif.id);
                    }}
                    className="text-slate-500 hover:text-[#FF2D4B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2D4B] p-1 transition-colors rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
            <SystemButton
              variant="ghost"
              size="sm"
              onClick={() => setActiveModal(null)}
            >
              [ CLOSE TRANSMISSION ]
            </SystemButton>
          </div>
        </SystemWindow>
      </div>
    </div>
  );
};
