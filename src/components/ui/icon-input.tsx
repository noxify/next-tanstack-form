// Source: https://github.com/shadcn-ui/ui/discussions/1552#discussioncomment-12584660
// Author: https://github.com/markjaniczak
// License: unknown
import type { VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

export type InputRootProps = React.ComponentProps<"div">

function InputRoot({ children, className, ...props }: InputRootProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
}

function InputIcon({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Slot
      role="presentation"
      className={cn(
        "pointer-events-none absolute top-2 right-3 bottom-2 size-5 [&~input]:pl-11",
        className,
      )}
    >
      {children}
    </Slot>
  )
}

const inputVariants = cva(
  "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default: "border-input shadow-xs focus-visible:ring-ring",
        destructive:
          "border-destructive shadow-xs focus-visible:ring-destructive",
        ghost: "-mx-3 -my-1 border-transparent focus-visible:ring-ring",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {
  ref?: React.ForwardedRef<HTMLInputElement>
}

function Input({ className, type, ref, variant, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
}

export { Input, InputIcon, InputRoot, inputVariants }
