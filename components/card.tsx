import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: string;
  textColor?: string;
}

export function Card({ 
  children, 
  bgColor = "#E5E5E5", 
  textColor = "#8B8B8B", 
  className = "",
  style,
  ...props
}: CardProps) {
  return (
    <div 
      className={`rounded-3xl p-8 md:p-12 flex items-center ${className}`}
      style={{ backgroundColor: bgColor, color: textColor, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
