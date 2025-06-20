
import React from "react";
import { cn } from "@/lib/utils";

interface FluentLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const FluentLayout = ({ children, className }: FluentLayoutProps) => {
  return (
    <div className={cn(
      "min-h-screen bg-background font-fluent",
      "flex flex-col",
      className
    )}>
      {children}
    </div>
  );
};

interface FluentPageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const FluentPageHeader = ({ 
  title, 
  subtitle, 
  actions, 
  className 
}: FluentPageHeaderProps) => {
  return (
    <div className={cn(
      "flex items-start justify-between gap-fluent-xl mb-fluent-xxxl",
      className
    )}>
      <div className="space-y-fluent-s">
        <h1 className="text-fluent-title font-semibold text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-fluent-body text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-fluent-l">
          {actions}
        </div>
      )}
    </div>
  );
};

interface FluentCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
}

export const FluentCard = ({ 
  children, 
  className, 
  padding = 'md',
  elevation = 'sm'
}: FluentCardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-fluent-xl',
    md: 'p-fluent-xxxl',
    lg: 'p-8'
  };

  const elevationClasses = {
    none: '',
    sm: 'shadow-fluent-2',
    md: 'shadow-fluent-4',
    lg: 'shadow-fluent-8'
  };

  return (
    <div className={cn(
      "rounded-fluent-lg border bg-card text-card-foreground transition-all duration-200 ease-out",
      paddingClasses[padding],
      elevationClasses[elevation],
      "hover:shadow-fluent-4",
      className
    )}>
      {children}
    </div>
  );
};
