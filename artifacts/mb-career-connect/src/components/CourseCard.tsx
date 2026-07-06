import React from 'react';
import { Clock, BarChart, Award, BookOpen } from 'lucide-react';
import { Link } from 'wouter';
import { useTheme } from '@/contexts/ThemeContext';

interface CourseCardProps {
  title: string;
  category: string;
  duration: string;
  level: string;
  price: string;
  originalPrice: string;
  instructor: string;
  certificate: boolean;
  placement: boolean;
}

export function CourseCard({
  title, category, duration, level, price, originalPrice, instructor, certificate, placement
}: CourseCardProps) {
  const { theme } = useTheme();

  return (
    <div
      className="bg-card border border-border/60 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative hover:-translate-y-1"
      style={{ boxShadow: 'var(--card-shadow)' }}
      data-cursor="card"
    >
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none z-10" />

      {/* Card Header */}
      <div className="h-36 bg-muted/30 flex items-center justify-center relative overflow-hidden">
        <div className={`absolute inset-0 opacity-80 ${
          theme === 'blue' ? 'bg-gradient-to-br from-blue-100 to-indigo-50' : 'bg-gradient-to-br from-emerald-900/40 to-teal-900/40'
        }`} />
        <div className="absolute top-[-20%] left-[-10%] w-24 h-24 rounded-full bg-primary/20 blur-xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 rounded-full bg-accent/20 blur-xl" />
        <BookOpen className="w-12 h-12 text-primary/40 relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
        {placement && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-green-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md z-20 uppercase tracking-wide">
            Placement Assistance
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1 relative z-20">
        <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider bg-primary/10 self-start px-2 py-1 rounded-md">
          {category}
        </div>
        <h3 className="font-bold text-lg text-card-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-snug">{title}</h3>

        <div className="flex flex-wrap gap-y-3 gap-x-4 text-sm text-muted-foreground mb-5">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock className="w-4 h-4 text-primary/60" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <BarChart className="w-4 h-4 text-primary/60" />
            <span>{level}</span>
          </div>
          {certificate && (
            <div className="flex items-center gap-1.5 font-medium">
              <Award className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="text-emerald-600">Certificate</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mb-6 mt-auto bg-muted/30 p-2 rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20 shadow-sm">
            {instructor.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="text-sm font-medium text-foreground">by {instructor}</span>
        </div>

        <div className="pt-5 border-t border-border/60 flex items-center justify-between">
          <div>
            <span className="text-xl font-extrabold text-foreground">{price}</span>
            <span className="text-sm text-muted-foreground line-through ml-2 font-medium">{originalPrice}</span>
          </div>
          <Link href="/apply">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200 active:scale-95 cursor-pointer">
              Enroll Now
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
