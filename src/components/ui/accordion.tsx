"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

function Accordion({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>) {
  return (
    <>
      <AccordionPrimitive.Root
        data-slot="accordion"
        className={cn("lg:hidden", className)}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>

      <div className={cn("hidden lg:block", className)}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              forceOpen: true,
            })
          }
          return child
        })}
      </div>
    </>
  )
}

type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Item
> & {
  forceOpen?: boolean
}

function AccordionItem({ className, children, forceOpen, ...props }: AccordionItemProps) {
  if (forceOpen) {
    return (
      <div
        data-slot="accordion-item"
        className={cn("border-b last:border-b-0", className)}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              forceOpen: true,
            })
          }
          return child
        })}
      </div>
    )
  }

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  )
}

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  forceOpen?: boolean
}

function AccordionTrigger({
  className,
  children,
  forceOpen,
  ...props
}: AccordionTriggerProps) {
  if (forceOpen) {
    return (
      <div className="flex">
        <div
          data-slot="accordion-trigger"
          className={cn(
            "text-[17px] flex flex-1 items-start justify-between gap-4 py-4 text-left font-medium",
            className
          )}
        >
          {children}
        </div>
      </div>
    )
  }

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "text-[17px] flex flex-1 items-start justify-between gap-4 py-4 text-left font-medium transition-all outline-none cursor-pointer hover:underline [&[data-state=open]>.plus-icon]:hidden [&[data-state=open]>.minus-icon]:block [&[data-state=closed]>.plus-icon]:block [&[data-state=closed]>.minus-icon]:hidden",
          className
        )}
        {...props}
      >
        {children}
        <Plus className="plus-icon size-4 shrink-0 transition-transform duration-200" />
        <Minus className="minus-icon size-4 shrink-0 transition-transform duration-200 hidden" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Content
> & {
  forceOpen?: boolean
}

function AccordionContent({
  className,
  children,
  forceOpen,
  ...props
}: AccordionContentProps) {
  if (forceOpen) {
    return (
      <div data-slot="accordion-content" className="text-sm">
        <div className={cn("pt-0 pb-4", className)}>{children}</div>
      </div>
    )
  }

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
        className
      )}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

// ----------------------
// Exports
// ----------------------
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
