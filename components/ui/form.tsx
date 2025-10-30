"use client";

import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export const Form = FormProvider;

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>;

export const FormField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  ...props
}: FormFieldProps<TFieldValues, TName>) => <Controller {...props} />;

export type FormItemProps = React.HTMLAttributes<HTMLDivElement>;

export const FormItem = ({ className, ...props }: FormItemProps) => (
  <div className={cn("space-y-2", className)} {...props} />
);

export type FormLabelProps = React.ComponentProps<typeof Label>;

export const FormLabel = ({ className, ...props }: FormLabelProps) => (
  <Label className={cn(className)} {...props} />
);

export type FormControlProps = React.ComponentProps<typeof Slot>;

export const FormControl = ({ className, ...props }: FormControlProps) => (
  <Slot className={className} {...props} />
);

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormDescription = ({ className, ...props }: FormDescriptionProps) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

export const FormMessage = ({ className, children, ...props }: FormMessageProps) => {
  if (!children) return null;
  return (
    <p className={cn("text-sm font-medium text-destructive", className)} {...props}>
      {children}
    </p>
  );
};
