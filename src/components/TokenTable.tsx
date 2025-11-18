'use client';

import React, { useState } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';

type TokenData = {
  id: number;
  name: string;
  newPair: string;
  stretch: string;
  migrated: string;
  price: string;
  change: string;
};

const tokens: TokenData[] = [
  { id: 1, name: 'Foot Token 1', newPair: 'Pair A', stretch: '10%', migrated: 'Yes', price: '$12.34', change: '+2.5%' },
  { id: 2, name: 'Foot Token 2', newPair: 'Pair B', stretch: '15%', migrated: 'No', price: '$45.67', change: '-1.2%' },
  { id: 3, name: 'Foot Token 3', newPair: 'Pair C', stretch: '8%', migrated: 'No', price: '$78.90', change: '+0.8%' },
  { id: 4, name: 'Foot Token 4', newPair: 'Pair D', stretch: '12%', migrated: 'No', price: '$23.45', change: '-0.5%' },
];

export default function TokenTable() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const columns = ['Token', 'New Pairs', 'Final Stretch', 'Migrated', 'Price'];

  const getPriceColor = (change: string) => {
    if (change.startsWith('+')) {
      return 'text-green-400';
    }
    return 'text-red-400';
  };

  return (
    <Tooltip.Provider>
      {/* Main purple glowing card container */}
      <div 
        className="relative p-8 rounded-3xl border-2 border-purple-500 bg-gradient-to-b from-slate-950 to-slate-900 shadow-lg" 
        style={{
          boxShadow: '0 0 30px rgba(168, 85, 247, 0.5), inset 0 0 30px rgba(168, 85, 247, 0.1)'
        }}
      >
        {/* Title inside the purple card */}
        <h2 className="text-2xl font-bold text-white mb-6">Token Table</h2>

        {/* Inner table container with darker background */}
        <div className="rounded-2xl overflow-hidden border border-slate-700">
          {/* Header Row */}
          <div className="grid grid-cols-5 gap-4 bg-slate-800 px-6 py-4">
            {columns.map((col) => (
              <div key={col} className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                {col}
              </div>
            ))}
          </div>

          {/* Table Rows Container */}
          {tokens.map((token, index) => (
            <Dialog.Root key={token.id}>
              <Dialog.Trigger asChild>
                <div
                  className="grid grid-cols-5 gap-4 px-6 py-4 cursor-pointer transition-all duration-200 border-b border-slate-700 last:border-b-0"
                  style={{
                    backgroundColor: index === 0 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(20, 20, 40, 0.5)',
                    borderLeft: index === 0 ? '3px solid rgba(96, 165, 250, 0.8)' : 'none',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Token Name */}
                  <div className="text-sm font-medium text-white">
                    {token.name}
                  </div>

                  {/* New Pair */}
                  <div className="text-sm text-slate-300">
                    {token.newPair}
                  </div>

                  {/* Final Stretch */}
                  <div className="text-sm text-slate-300">
                    {token.stretch}
                  </div>

                  {/* Migrated */}
                  <div className="text-sm text-slate-300">
                    {token.migrated}
                  </div>

                  {/* Price with Tooltip */}
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className={`text-sm font-semibold ${getPriceColor(token.change)} cursor-help`}>
                        {token.price}
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      side="top"
                      className="bg-slate-800 text-white px-3 py-2 rounded text-xs border border-slate-600"
                      sideOffset={5}
                    >
                      Live price for {token.name}
                      <Tooltip.Arrow className="fill-slate-800" />
                    </Tooltip.Content>
                  </Tooltip.Root>
                </div>
              </Dialog.Trigger>

              {/* Modal Dialog */}
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Dialog.Title className="text-lg font-bold text-white">
                      {token.name} Details
                    </Dialog.Title>
                    <Dialog.Close className="text-slate-400 hover:text-white transition-colors text-2xl leading-none" style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ×
                    </Dialog.Close>
                  </div>

                  <div className="space-y-4 text-slate-300">
                    <p className="text-sm">
                      Price history, volume, and other analytics for this token can be displayed here.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Price</p>
                        <p className={`text-lg font-semibold ${getPriceColor(token.change)}`}>{token.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Change</p>
                        <p className={`text-lg font-semibold ${getPriceColor(token.change)}`}>{token.change}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Pair</p>
                        <p className="text-sm text-white">{token.newPair}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase">Migrated</p>
                        <p className="text-sm text-white">{token.migrated}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      const dialogElement = e.currentTarget.closest('[role="dialog"]');
                      if (dialogElement) {
                        const closeButton = dialogElement.querySelector('[data-radix-dialog-close]');
                        if (closeButton) {
                          (closeButton as HTMLButtonElement).click();
                        }
                      }
                    }}
                    className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </div>
      </div>
    </Tooltip.Provider>
  );
}
