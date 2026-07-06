import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import { Link } from 'wouter';

interface CompanyCardProps {
  id?: string;
  name: string;
  industry: string;
  location: string;
  activeOpenings: number;
  categories: string[];
}

export function CompanyCard({ name, industry, location, activeOpenings, categories }: CompanyCardProps) {
  const initials = name.substring(0, 2).toUpperCase();

  return (
    <div 
      className="bg-card border border-border/60 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group hover:border-primary/50 flex flex-col h-full relative overflow-hidden"
      style={{ boxShadow: 'var(--card-shadow)' }}
      data-cursor="card"
    >
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none z-10" />

      <div className="flex items-start gap-4 mb-5 relative z-20">
        <div className="w-16 h-16 rounded-2xl bg-secondary border border-border flex items-center justify-center text-2xl font-bold text-secondary-foreground flex-shrink-0 group-hover:scale-105 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 shadow-sm">
          {initials}
        </div>
        <div>
          <h3 className="font-bold text-xl text-card-foreground group-hover:text-primary transition-colors line-clamp-1">{name}</h3>
          <p className="text-sm font-medium text-primary mt-1">{industry}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm text-muted-foreground mb-6 relative z-20">
        <div className="flex items-center gap-2 font-medium">
          <MapPin className="w-4 h-4 text-primary/60 shrink-0" />
          <span>{location}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary/60 shrink-0" />
          <div className="flex flex-wrap gap-1.5">
             {categories.slice(0,2).map((cat, i) => (
                <span key={i} className="text-[11px] font-bold uppercase tracking-wider px-2 py-1 bg-muted text-muted-foreground rounded-lg border border-border/50">{cat}</span>
             ))}
             {categories.length > 2 && <span className="text-[11px] font-bold uppercase text-muted-foreground self-center ml-1">+{categories.length - 2}</span>}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-5 border-t border-border/60 flex items-center justify-between relative z-20">
        <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-600 rounded-lg text-xs font-bold border border-emerald-500/20">
          {activeOpenings} Active Jobs
        </div>
        <Link href={`/jobs?company=${name}`} className="text-sm font-bold text-primary hover:text-accent transition-colors" data-cursor="pointer">
          View Jobs →
        </Link>
      </div>
    </div>
  );
}