import React from 'react';
import { Building, CheckCircle, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';

interface MentorCardProps {
  name: string;
  designation: string;
  company: string;
  experience: string;
  specialization: string[];
  availability: string;
}

export function MentorCard({
  name, designation, company, experience, specialization, availability
}: MentorCardProps) {
  const { theme } = useTheme();
  const initials = name.split(' ').map(n => n[0]).join('');

  return (
    <div
      className="bg-card border border-border/60 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 text-center flex flex-col h-full relative overflow-hidden group hover:-translate-y-1"
      style={{ boxShadow: 'var(--card-shadow)' }}
      data-cursor="card"
    >
      <div className="absolute top-0 left-0 right-0 h-24 bg-muted/40" />
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none z-10" />

      <div className="flex justify-center mb-5 relative z-20 pt-2">
        <div className="relative group-hover:-translate-y-1 transition-transform duration-300">
          <Avatar className="w-24 h-24 border-4 border-card shadow-lg">
            <AvatarFallback className={`text-white text-2xl font-bold ${
              theme === 'blue'
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                : 'bg-gradient-to-br from-emerald-500 to-teal-700'
            }`}>
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-[3px] border-card rounded-full flex items-center justify-center shadow-sm" title="Verified Professional">
            <CheckCircle className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>

      <h3 className="font-bold text-xl text-card-foreground relative z-20 group-hover:text-primary transition-colors">{name}</h3>
      <p className="text-sm font-semibold text-primary mb-3 relative z-20">{designation}</p>

      <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground font-medium mb-6 relative z-20">
        <Building className="w-4 h-4 text-primary/50" />
        <span>{company}</span>
        <span className="mx-1.5 opacity-50">•</span>
        <span>{experience}</span>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6 mt-auto relative z-20">
        {specialization.map((spec, i) => (
          <span key={i} className="px-2.5 py-1 bg-secondary text-secondary-foreground text-[10px] uppercase font-bold tracking-wider rounded-lg border border-border/50">
            {spec}
          </span>
        ))}
      </div>

      <div className="pt-5 border-t border-border/60 flex flex-col gap-4 relative z-20">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 py-1.5 px-3 rounded-lg mx-auto border border-emerald-500/20">
          <Calendar className="w-3.5 h-3.5" />
          {availability}
        </div>

        <Link href="/apply" className="w-full">
          <span className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-bold text-sm bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:opacity-90 hover:shadow-primary/30 transition-all duration-200 active:scale-95 cursor-pointer">
            <MessageSquare className="w-4 h-4" />
            Book Session
          </span>
        </Link>
      </div>
    </div>
  );
}
