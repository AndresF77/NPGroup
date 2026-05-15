'use client';

import { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RequestAssetModal({ open, onClose }: Props) {
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // no API — take-home / catalog intake would POST here
    setSent(true);
  };

  const handleClose = () => {
    setSent(false);
    setNote('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-asset-title"
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-gray-100">
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-gray-100">
          <div>
            <h2 id="request-asset-title" className="text-lg font-semibold text-gray-900">
              Request an asset
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              New KPI, layout, viz, or storyboard — routed to catalog admins (mock).
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 shrink-0"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {sent ? (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-gray-700 font-medium">Request captured (demo)</p>
            <p className="text-xs text-gray-500 mt-2">
              Production build would send this to your workflow or ticketing API.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 px-4 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
            <div>
              <label htmlFor="req-note" className="block text-xs font-medium text-gray-600 mb-1">
                What do you need?
              </label>
              <textarea
                id="req-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="e.g. Weekly ARPU by affiliate, board-ready…"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-y min-h-[96px]"
              />
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-600 text-white rounded-lg"
              >
                Submit request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
