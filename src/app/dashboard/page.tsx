"use client"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    FolderKanban,
    LayoutTemplate,
    FileText,
    Presentation,
    TrendingUp,
    Clock,
    ArrowRight,
    Sparkles
} from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const recentProjects = [
    { id: "1", name: "Relatório Mensal Q4", type: "PDF", status: "DRAFT", updatedAt: "2h atrás" },
    { id: "2", name: "Apresentação Pitch Deck", type: "SLIDE", status: "REVIEW", updatedAt: "5h atrás" },
    { id: "3", name: "E-book Marketing Digital", type: "PDF", status: "PUBLISHED", updatedAt: "1 dia atrás" },
]

const stats = [
    { name: "Total de Projetos", value: "24", icon: FolderKanban, trend: "+12%", color: "text-[hsl(var(--primary))]" },
    { name: "Templates", value: "8", icon: LayoutTemplate, trend: "+3", color: "text-[hsl(var(--dotless-terracotta))]" },
    { name: "PDFs Gerados", value: "156", icon: FileText, trend: "+28%", color: "text-[hsl(var(--secondary))]" },
    { name: "Slides Criados", value: "89", icon: Presentation, trend: "+15%", color: "text-[hsl(var(--dotless-olive))]" },
]

const getStatusBadge = (status: string) => {
    switch (status) {
        case "DRAFT": return <Badge variant="warning">Rascunho</Badge>
        case "REVIEW": return <Badge variant="info">Em Revisão</Badge>
        case "PUBLISHED": return <Badge variant="success">Publicado</Badge>
        default: return <Badge variant="secondary">{status}</Badge>
    }
}

export default function DashboardPage() {
    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Dashboard"
                description="Visão geral do seu conteúdo"
                action={{
                    label: "Novo Projeto",
                    onClick: () => console.log("Create new project")
                }}
            />

            <div className="p-6 space-y-6 animate-fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <Card key={stat.name} className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">{stat.name}</p>
                                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                                        <div className="flex items-center gap-1 mt-2 text-sm text-[hsl(var(--secondary))]">
                                            <TrendingUp className="h-3 w-3" />
                                            <span>{stat.trend}</span>
                                        </div>
                                    </div>
                                    <div className={`p-3 rounded-xl bg-[hsl(var(--muted))] ${stat.color}`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Projects */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Projetos Recentes</CardTitle>
                                <CardDescription>Seus projetos mais recentes</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/dashboard/projects" className="gap-1">
                                    Ver todos <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentProjects.map((project) => (
                                    <div
                                        key={project.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2 rounded-lg ${project.type === "PDF" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                                                {project.type === "PDF" ? <FileText className="h-5 w-5" /> : <Presentation className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <p className="font-medium">{project.name}</p>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                                                    <Clock className="h-3 w-3" />
                                                    {project.updatedAt}
                                                </div>
                                            </div>
                                        </div>
                                        {getStatusBadge(project.status)}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Ações Rápidas</CardTitle>
                            <CardDescription>Comece algo novo</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                                <div className="p-2 rounded-lg bg-red-100 text-red-600">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium">Novo PDF</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Criar documento</p>
                                </div>
                            </Button>

                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                                    <Presentation className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium">Nova Apresentação</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Criar slides</p>
                                </div>
                            </Button>

                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium">AI Designer</p>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Criar com IA</p>
                                </div>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Templates Section */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Templates Populares</CardTitle>
                            <CardDescription>Use um template pronto para começar rapidamente</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard/templates" className="gap-1">
                                Ver todos <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: "Pitch Deck", type: "SLIDE", color: "from-blue-500 to-blue-600" },
                                { name: "Relatório Executivo", type: "PDF", color: "from-red-500 to-red-600" },
                                { name: "E-book", type: "PDF", color: "from-purple-500 to-purple-600" },
                                { name: "Proposta Comercial", type: "PDF", color: "from-green-500 to-green-600" },
                            ].map((template) => (
                                <div
                                    key={template.name}
                                    className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer card-hover"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${template.color}`} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                                        {template.type === "PDF" ? <FileText className="h-8 w-8 mb-2" /> : <Presentation className="h-8 w-8 mb-2" />}
                                        <p className="font-medium text-center text-sm">{template.name}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
