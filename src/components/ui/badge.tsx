import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-[hsl(var(--primary))] text-white",
                secondary: "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]",
                success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
                warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
                info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
                terracotta: "bg-[hsl(var(--dotless-terracotta))] text-white",
                olive: "bg-[hsl(var(--dotless-olive))] text-white",
                outline: "border border-[hsl(var(--border))] text-[hsl(var(--foreground))]",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
