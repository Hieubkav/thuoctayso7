"use client";

import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Input, type InputProps } from "./input";

type PasswordInputProps = InputProps & {
  toggleAriaLabel?: string;
};

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, toggleAriaLabel = "Hiển thị mật khẩu", ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref}
          type={isVisible ? "text" : "password"}
          className={cn("pr-10", className)}
          autoComplete={props.autoComplete ?? "current-password"}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={toggleAriaLabel}
          className="absolute inset-y-0 right-1 h-8 w-8"
          onClick={() => setIsVisible((prev) => !prev)}
          tabIndex={-1}
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";
