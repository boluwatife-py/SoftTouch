import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-2 sm:p-3 md:p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[380px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 sm:space-x-4 overflow-hidden rounded-md border p-3 sm:p-4 md:p-6 pr-6 sm:pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border border-[#1A2332] bg-[#0D1525] text-[#D9E1E8]",
        success: "border border-green-700 bg-green-900/50 text-green-300",
        info: "border border-[#00B2FF]/30 bg-[#1A2332] text-[#00B2FF]",
        warning: "border border-yellow-700 bg-yellow-900/50 text-yellow-300",
        destructive: "border border-red-700 bg-red-900/50 text-red-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-7 sm:h-8 shrink-0 items-center justify-center rounded-md border border-[#1A2332] bg-[#0D1525] px-2 sm:px-3 text-xs sm:text-sm font-medium text-[#00B2FF] transition-colors hover:bg-[#00B2FF]/10 focus:outline-none focus:ring-2 focus:ring-[#00B2FF]/40 disabled:pointer-events-none disabled:opacity-50 group-[.success]:border-green-700 group-[.success]:text-green-300 group-[.success]:hover:bg-green-900 group-[.info]:border-[#00B2FF]/30 group-[.info]:text-[#00B2FF] group-[.info]:hover:bg-[#00B2FF]/10 group-[.warning]:border-yellow-700 group-[.warning]:text-yellow-300 group-[.warning]:hover:bg-yellow-900 group-[.destructive]:border-red-700 group-[.destructive]:text-red-300 group-[.destructive]:hover:bg-red-900",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 sm:right-2 top-1 sm:top-2 rounded-md p-0.5 sm:p-1 text-[#D9E1E8]/50 opacity-0 transition-opacity hover:text-[#00B2FF] focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#00B2FF]/40 group-hover:opacity-100 group-[.success]:text-green-300 group-[.success]:hover:text-green-50 group-[.success]:focus:ring-green-400 group-[.info]:text-[#00B2FF] group-[.info]:hover:text-[#00D4FF] group-[.info]:focus:ring-[#00B2FF]/40 group-[.warning]:text-yellow-300 group-[.warning]:hover:text-yellow-50 group-[.warning]:focus:ring-yellow-400 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-3 w-3 sm:h-4 sm:w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-xs sm:text-sm font-semibold text-[#00B2FF] group-[.success]:text-green-300 group-[.info]:text-[#00B2FF] group-[.warning]:text-yellow-300 group-[.destructive]:text-red-300", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-xs sm:text-sm opacity-90 text-[#D9E1E8]", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
