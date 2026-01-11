"use client"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    FolderKanban,
    LayoutTemplate,
    FileText,
    Presentation,
    ArrowRight,
    Sparkles,
    Plus
} from "lucide-react"
import Link from "next/link"

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
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Total de Projetos</p>
                                    <p className="text-3xl font-bold mt-1">0</p>
                                </div>
                                <div className="p-3 rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--primary))]">
                                    <FolderKanban className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Templates</p>
                                    <p className="text-3xl font-bold mt-1">0</p>
                                </div>
                                <div className="p-3 rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--dotless-terracotta))]">
                                    <LayoutTemplate className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">PDFs Gerados</p>
                                    <p className="text-3xl font-bold mt-1">0</p>
                                </div>
                                <div className="p-3 rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--secondary))]">
                                    <FileText className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">Slides Criados</p>
                                    <p className="text-3xl font-bold mt-1">0</p>
                                </div>
                                <div className="p-3 rounded-xl bg-[hsl(var(--muted))] text-[hsl(var(--dotless-olive))]">
                                    <Presentation className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Projects - Empty State */}
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
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="p-4 rounded-full bg-[hsl(var(--muted))] mb-4">
                                    <FolderKanban className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
                                </div>
                                <h3 className="text-lg font-medium">Nenhum projeto ainda</h3>
                                <p className="text-[hsl(var(--muted-foreground))] mt-1">
                                    Comece criando seu primeiro projeto
                                </p>
                                <Button className="mt-4">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Criar Projeto
                                </Button>
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
                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4" asChild>
                                <Link href="/dashboard/projects">
                                    <div className="p-2 rounded-lg bg-red-100 text-red-600">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">Novo PDF</p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Criar documento</p>
                                    </div>
                                </Link>
                            </Button>

                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4" asChild>
                                <Link href="/dashboard/projects">
                                    <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                                        <Presentation className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">Nova Apresentação</p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Criar slides</p>
                                    </div>
                                </Link>
                            </Button>

                            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4" asChild>
                                <Link href="/dashboard/ai-chat">
                                    <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-medium">AI Designer</p>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Criar com IA</p>
                                    </div>
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Templates Section - Empty State */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Templates</CardTitle>
                            <CardDescription>Use um template pronto para começar rapidamente</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard/templates" className="gap-1">
                                Ver todos <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 rounded-full bg-[hsl(var(--muted))] mb-4">
                                <LayoutTemplate className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
                            </div>
                            <h3 className="text-lg font-medium">Nenhum template ainda</h3>
                            <p className="text-[hsl(var(--muted-foreground))] mt-1">
                                Crie templates personalizados para seus projetos
                            </p>
                            <Button className="mt-4" asChild>
                                <Link href="/dashboard/templates">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Criar Template
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
