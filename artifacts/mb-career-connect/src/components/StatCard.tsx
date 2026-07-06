import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  number: string | number;
  label: string;
  icon: React.ElementType;
  delay?: number;
}

export function StatCard({ number, label, icon: Icon, delay = 0 }: StatCardProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayNumber, setDisplayNumber] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const match = String(number).match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayNumber(String(number));
      return;
    }

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    let current = 0;
    const duration = 1500;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayNumber(String(number));
        clearInterval(timer);
      } else {
        setDisplayNumber(Math.floor(current).toLocaleString() + suffix);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, number]);

  return (
    <div
      ref={ref}
      className="bg-card p-6 sm:p-8 rounded-2xl border border-border/60 flex flex-col items-center sm:items-start sm:flex-row gap-5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
      style={{ boxShadow: 'var(--card-shadow)' }}
    >
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none z-0" />
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/10 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shrink-0 border border-border shadow-sm group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 relative z-10 text-secondary-foreground">
        <Icon className="w-8 h-8" />
      </div>
      <div className="text-center sm:text-left relative z-10">
        <h4 className="text-3xl sm:text-4xl font-extrabold text-card-foreground tracking-tight flex items-center justify-center sm:justify-start gap-1 drop-shadow-sm">
          {displayNumber}
          <ArrowUpRight className="w-6 h-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </h4>
        <p className="text-muted-foreground font-medium mt-1 uppercase tracking-wider text-xs sm:text-sm">{label}</p>
      </div>
    </div>
  );
}