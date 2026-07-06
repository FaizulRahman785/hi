import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export function TestimonialCard({ name, role, company, quote, image }: TestimonialCardProps) {
  const { theme } = useTheme();

  return (
    <div 
      className="bg-card border border-border/60 rounded-3xl p-8 md:p-10 shadow-sm flex flex-col h-full relative group hover:shadow-xl transition-all duration-300"
      style={{ boxShadow: 'var(--card-shadow)' }}
      data-cursor="card"
    >
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none rounded-3xl z-0" />
      
      <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 rotate-180 group-hover:text-primary/20 transition-colors z-10" />
      
      <div className="flex-1 text-foreground italic mb-8 relative z-10 text-lg leading-relaxed font-medium">
        "{quote}"
      </div>
      
      <div className="flex items-center gap-5 mt-auto relative z-10">
        <Avatar className="w-14 h-14 border-[3px] border-card shadow-md group-hover:scale-110 transition-transform duration-300">
          <AvatarFallback className={`text-white font-bold text-lg ${
            theme === 'blue' 
              ? 'bg-gradient-to-br from-blue-500 to-cyan-400' 
              : 'bg-gradient-to-br from-emerald-500 to-green-400'
          }`}>{image}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-bold text-card-foreground text-lg">{name}</h4>
          <p className="text-sm text-muted-foreground font-medium">{role} at <span className="text-primary font-bold">{company}</span></p>
        </div>
      </div>
    </div>
  );
}