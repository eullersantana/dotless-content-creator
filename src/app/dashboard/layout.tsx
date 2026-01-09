"use client"

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-[hsl(var(--background))]">
            <DashboardSidebar />
            <main className="pl-64 transition-all duration-300">
                {children}
            </main>
        </div>
    )
}
