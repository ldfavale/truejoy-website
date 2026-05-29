import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  bgClass?: string;
  textClass?: string;
  className?: string;
  variant?: "solid" | "outline";
  borderClass?: string;
}

export function SectionTitle({
  children,
  bgClass = "bg-[#F5A623]",
  textClass = "text-white",
  className = "",
  variant = "solid",
  borderClass = "border-[#F5A623]",
}: SectionTitleProps) {
  const containerClasses = variant === "solid"
    ? `${bgClass} rounded-3xl p-8 md:p-12 text-center ${className}`
    : `bg-transparent border-4 ${borderClass} rounded-3xl p-8 md:p-12 text-center ${className}`;

  return (
    <div className={containerClasses}>
      <h2 className={`text-4xl md:text-5xl lg:text-6xl font-tt-milks ${textClass} m-0`}>
        {children}
      </h2>
    </div>
  );
}
