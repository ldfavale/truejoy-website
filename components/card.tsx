import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: string;
  textColor?: string;
}

export function Card({ 
  children, 
  bgColor = "var(--true-neutral)", 
  textColor = "var(--true-gray)", 
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
