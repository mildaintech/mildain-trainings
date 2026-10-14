
"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Stepper({ className, children, ...props }: StepperProps) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      {children}
    </div>
  );
}

interface StepperItemProps extends React.HTMLAttributes<HTMLDivElement> {
    isCurrent?: boolean;
    isCompleted?: boolean;
}

export function StepperItem({ className, children, isCurrent, isCompleted, ...props }: StepperItemProps) {
  return (
    <div className={cn("flex flex-col items-center text-center space-y-2", className)} {...props}>
        <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center border-2",
            isCompleted ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground",
            isCurrent ? "border-primary" : ""
        )}>
            {isCompleted ? <Check className="h-5 w-5" /> : <div className={cn("h-2.5 w-2.5 rounded-full", isCurrent ? "bg-primary": "bg-muted-foreground/50")}></div>}
        </div>
        <div>{children}</div>
    </div>
  );
}

interface StepperSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    isDotted?: boolean;
}

export function StepperSeparator({ className, isDotted, ...props }: StepperSeparatorProps) {
    return (
      <div className={cn("flex-1 h-px", isDotted ? "bg-dotted" : "bg-muted-foreground", className)}
      style={isDotted ? {
          background: 'repeating-linear-gradient(to right, hsl(var(--muted-foreground)), hsl(var(--muted-foreground)) 2px, transparent 2px, transparent 6px))'
      } : {}}
      {...props}></div>
    );
  }
