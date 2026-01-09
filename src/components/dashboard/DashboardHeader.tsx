"use client"

import { Search, Bell, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
    title: string
    description?: string
    action?: {
        label: string
        onClick: () => void
    }
}

export function DashboardHeader({ title, description, action }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60 px-6">
            <div>
                <h1 className="text-xl font-semibold text-[hsl(var(--foreground))]">{title}</h1>
                {description && (
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{description}</p>
                )}
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <Input
                        placeholder="Buscar..."
                        className="w-64 pl-9"
                    />
                </div>

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(var(--dotless-terracotta))] text-[10px] text-white">
                        3
                    </span>
                </Button>

                {/* Action Button */}
                {action && (
                    <Button onClick={action.onClick} className="gap-2">
                        <Plus className="h-4 w-4" />
                        {action.label}
                    </Button>
                )}
            </div>
        </header>
    )
}
