"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    FolderKanban,
    LayoutTemplate,
    Image,
    MessageSquareText,
    Settings,
    Menu,
    X,
    Sun,
    Moon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projetos", href: "/dashboard/projects", icon: FolderKanban },
    { name: "Templates", href: "/dashboard/templates", icon: LayoutTemplate },
    { name: "Biblioteca", href: "/dashboard/assets", icon: Image },
    { name: "AI Designer", href: "/dashboard/ai-chat", icon: MessageSquareText },
    { name: "Configurações", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
    }, [])

    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark')
        setIsDark(!isDark)
    }

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen border-r border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-300",
                isCollapsed ? "w-16" : "w-64"
            )}
        >
            <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex h-16 items-center justify-between border-b border-[hsl(var(--border))] px-4">
                    {!isCollapsed && (
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-[hsl(var(--dotless-terracotta))] flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DC</span>
                            </div>
                            <span className="font-semibold text-[hsl(var(--foreground))]">
                                Dotless Creator
                            </span>
                        </Link>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="ml-auto"
                    >
                        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-2 py-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-[hsl(var(--primary))] text-white"
                                        : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]",
                                    isCollapsed && "justify-center px-2"
                                )}
                                title={isCollapsed ? item.name : undefined}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                {!isCollapsed && <span>{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-[hsl(var(--border))] p-4">
                    <Button
                        variant="ghost"
                        size={isCollapsed ? "icon" : "default"}
                        onClick={toggleDarkMode}
                        className={cn("w-full", !isCollapsed && "justify-start gap-3")}
                    >
                        {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        {!isCollapsed && (isDark ? "Modo Claro" : "Modo Escuro")}
                    </Button>
                </div>
            </div>
        </aside>
    )
}
