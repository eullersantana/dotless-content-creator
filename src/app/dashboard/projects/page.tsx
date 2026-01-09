"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Search,
    Filter,
    Grid3X3,
    List,
    MoreVertical,
    FileText,
    Presentation,
    Clock,
    Eye,
    Pencil,
    Trash2,
    Download,
    Copy
} from "lucide-react"

// Mock data
const mockProjects = [
    { id: "1", name: "Relatório Financeiro Q4 2025", type: "PDF", status: "DRAFT", updatedAt: "2026-01-09T15:30:00", pages: 12 },
    { id: "2", name: "Pitch Deck Startup", type: "SLIDE", status: "PUBLISHED", updatedAt: "2026-01-08T10:00:00", pages: 15 },
    { id: "3", name: "E-book Marketing Digital", type: "PDF", status: "REVIEW", updatedAt: "2026-01-07T14:00:00", pages: 45 },
    { id: "4", name: "Apresentação Comercial", type: "SLIDE", status: "DRAFT", updatedAt: "2026-01-06T09:00:00", pages: 20 },
    { id: "5", name: "Manual do Usuário", type: "PDF", status: "PUBLISHED", updatedAt: "2026-01-05T11:30:00", pages: 32 },
    { id: "6", name: "Onboarding Slides", type: "SLIDE", status: "REVIEW", updatedAt: "2026-01-04T16:00:00", pages: 10 },
]

const getStatusBadge = (status: string) => {
    switch (status) {
        case "DRAFT": return <Badge variant="warning">Rascunho</Badge>
        case "REVIEW": return <Badge variant="info">Em Revisão</Badge>
        case "PUBLISHED": return <Badge variant="success">Publicado</Badge>
        default: return <Badge variant="secondary">{status}</Badge>
    }
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Hoje"
    if (diffDays === 1) return "Ontem"
    if (diffDays < 7) return `${diffDays} dias atrás`
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState<"all" | "PDF" | "SLIDE">("all")
    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)

    const filteredProjects = mockProjects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = filterType === "all" || project.type === filterType
        return matchesSearch && matchesType
    })

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Projetos"
                description="Gerencie seus projetos de conteúdo"
                action={{
                    label: "Novo Projeto",
                    onClick: () => setIsNewProjectOpen(true)
                }}
            />

            <div className="p-6 space-y-6 animate-fade-in">
                {/* Filters Bar */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-2 flex-1">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                            <Input
                                placeholder="Buscar projetos..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Tabs value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
                            <TabsList>
                                <TabsTrigger value="all">Todos</TabsTrigger>
                                <TabsTrigger value="PDF">PDFs</TabsTrigger>
                                <TabsTrigger value="SLIDE">Slides</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <div className="flex border border-[hsl(var(--border))] rounded-lg overflow-hidden">
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="icon"
                                className="rounded-none"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid3X3 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="icon"
                                className="rounded-none"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Projects Grid/List */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredProjects.map((project) => (
                            <Card key={project.id} hover className="group overflow-hidden">
                                {/* Preview */}
                                <div className={`aspect-[4/3] relative ${project.type === "PDF" ? "bg-gradient-to-br from-red-400 to-red-600" : "bg-gradient-to-br from-blue-400 to-blue-600"}`}>
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        {project.type === "PDF" ? <FileText className="h-16 w-16 opacity-50" /> : <Presentation className="h-16 w-16 opacity-50" />}
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <Badge variant={project.type === "PDF" ? "danger" : "info"} className="text-xs">
                                            {project.type}
                                        </Badge>
                                    </div>
                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button size="icon" variant="secondary" className="h-10 w-10">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="h-10 w-10">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="h-10 w-10">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium truncate">{project.name}</h3>
                                            <div className="flex items-center gap-2 mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                                                <Clock className="h-3 w-3" />
                                                <span>{formatDate(project.updatedAt)}</span>
                                                <span>•</span>
                                                <span>{project.pages} páginas</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="mt-3">
                                        {getStatusBadge(project.status)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-0">
                            <div className="divide-y divide-[hsl(var(--border))]">
                                {filteredProjects.map((project) => (
                                    <div key={project.id} className="flex items-center gap-4 p-4 hover:bg-[hsl(var(--muted))] transition-colors">
                                        <div className={`p-3 rounded-lg ${project.type === "PDF" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                                            {project.type === "PDF" ? <FileText className="h-6 w-6" /> : <Presentation className="h-6 w-6" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-medium">{project.name}</h3>
                                            <div className="flex items-center gap-2 mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                                                <span>{project.pages} páginas</span>
                                                <span>•</span>
                                                <span>{formatDate(project.updatedAt)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {getStatusBadge(project.status)}
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-[hsl(var(--destructive))]">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-4 rounded-full bg-[hsl(var(--muted))] mb-4">
                            <FileText className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
                        </div>
                        <h3 className="text-lg font-medium">Nenhum projeto encontrado</h3>
                        <p className="text-[hsl(var(--muted-foreground))] mt-1">
                            {searchQuery ? "Tente ajustar sua busca" : "Comece criando seu primeiro projeto"}
                        </p>
                        <Button className="mt-4" onClick={() => setIsNewProjectOpen(true)}>
                            Criar Projeto
                        </Button>
                    </div>
                )}
            </div>

            {/* New Project Dialog */}
            <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Novo Projeto</DialogTitle>
                        <DialogDescription>
                            Escolha o tipo de conteúdo que deseja criar
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <button className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-[hsl(var(--border))] hover:border-[hsl(var(--dotless-terracotta))] hover:bg-[hsl(var(--muted))] transition-all">
                            <div className="p-4 rounded-full bg-red-100 text-red-600">
                                <FileText className="h-8 w-8" />
                            </div>
                            <span className="font-medium">PDF / E-book</span>
                        </button>
                        <button className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 border-[hsl(var(--border))] hover:border-[hsl(var(--dotless-terracotta))] hover:bg-[hsl(var(--muted))] transition-all">
                            <div className="p-4 rounded-full bg-blue-100 text-blue-600">
                                <Presentation className="h-8 w-8" />
                            </div>
                            <span className="font-medium">Apresentação</span>
                        </button>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsNewProjectOpen(false)}>
                            Cancelar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
