import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

interface CategoryCardProps {
  name: string;
  count: number;
  icon: React.ElementType;
  delay?: number;
}

export function CategoryCard({ name, count, icon: Icon, delay = 0 }: CategoryCardProps) {
  return (
    <Link href={`/jobs?category=${name}`} data-cursor="pointer">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-card p-6 rounded-2xl border border-border/60 transition-all text-center flex flex-col items-center gap-4 cursor-pointer group relative overflow-hidden h-full"
        style={{ boxShadow: 'var(--card-shadow)' }}
      >
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none" />
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-accent/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 relative z-10 border border-border/50">
          <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <div className="relative z-10 w-full">
          <h4 className="font-bold text-card-foreground group-hover:text-primary transition-colors text-base line-clamp-1">{name}</h4>
          <p className="text-sm font-medium text-muted-foreground mt-1.5">{count} Jobs</p>
        </div>
      </motion.div>
    </Link>
  );
}