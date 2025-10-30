import * as React from "react";

import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string;
}

export function Avatar({ initials, className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary",
        className,
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
