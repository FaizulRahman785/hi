import React from 'react';
import { MapPin, Briefcase, IndianRupee, Clock, Building, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

interface OpportunityCardProps {
  id?: string;
  title: string;
  company: string;
  location: string;
  category: string;
  salary: string;
  employmentType: string;
  experience: string;
  deadline: string;
  tags?: string[];
  isInternship?: boolean;
}

export function OpportunityCard({
  title, company, location, salary, employmentType, experience, deadline, tags, isInternship
}: OpportunityCardProps) {
  return (
    <div
      className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm card-hover flex flex-col h-full group relative overflow-hidden"
      style={{ boxShadow: 'var(--card-shadow)' }}
      data-cursor="card"
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-300 pointer-events-none rounded-2xl" />

      {/* Header */}
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex-1 min-w-0 pr-3">
          <h3 className="font-bold text-lg text-card-foreground line-clamp-1 group-hover:text-primary transition-colors duration-200">{title}</h3>
          <div className="flex items-center gap-2 text-muted-foreground mt-1.5">
            <Building className="w-4 h-4 shrink-0" />
            <span className="text-sm font-medium truncate">{company}</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-xl uppercase shadow-sm">
          {company.substring(0, 1)}
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-y-3.5 gap-x-3 text-sm text-muted-foreground mb-5 relative z-10">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary/60 shrink-0" />
          <span className="truncate">{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-primary/60 shrink-0" />
          <span className="truncate">{salary}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary/60 shrink-0" />
          <span className="truncate">{experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary/60 shrink-0" />
          <span className="truncate">{employmentType}</span>
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto relative z-10">
          {tags.slice(0, 4).map((tag, i) => (
            <span key={i} className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-lg border border-border/40">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-border/60 mt-auto relative z-10 gap-3 sm:gap-0">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <Calendar className="w-3.5 h-3.5 text-primary/60" />
          <span>Apply by {new Date(deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        </div>

        <Link href="/apply">
          <Button
            size="sm"
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground border-0 shadow-md gap-1.5 group/btn btn-glow"
          >
            Apply Now
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
