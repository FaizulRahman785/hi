import React from 'react';
import { motion } from 'framer-motion';

export function SkeletonLoader({ count = 1, type = 'card' }: { count?: number, type?: 'card' | 'list' }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white border rounded-xl p-5 shadow-sm animate-pulse">
          {type === 'card' ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2 w-full">
                  <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0 ml-4"></div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
              </div>
              <div className="flex gap-2 mb-5">
                <div className="h-6 w-16 bg-slate-200 rounded-md"></div>
                <div className="h-6 w-16 bg-slate-200 rounded-md"></div>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                <div className="h-8 bg-slate-200 rounded w-24"></div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-200 rounded-full shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-5 bg-slate-200 rounded w-1/3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}