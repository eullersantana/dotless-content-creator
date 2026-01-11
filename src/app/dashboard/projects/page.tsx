"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
    FileText,
    Presentation,
    Clock,
    Eye,
    Pencil,
    MoreVertical
} from "lucide-react"
import Link from "next/link"

// Projects data
const projects = [
    {
        id: "consorcio-financiamento",
        name: "Consórcio, Financiamento e À Vista",
        type: "SLIDE",
        status: "DRAFT",
        updatedAt: "Agora",
        pages: 11,
        template: "Dotless Premium"
    }
]

const getStatusBadge = (status: string) => {
    switch (status) {
        case "DRAFT": return <Badge variant="warning">Rascunho</Badge>
        case "REVIEW": return <Badge variant="info">Em Revisão</Badge>
        case "PUBLISHED": return <Badge variant="success">Publicado</Badge>
        default: return <Badge variant="secondary">{status}</Badge>
    }
}

export default function ProjectsPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState<"all" | "PDF" | "SLIDE">("all")
    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)

    const filteredProjects = projects.filter(project => {
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

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProjects.map((project) => (
                                <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                                    <Card className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                                        <div className={`aspect-[16/9] relative ${project.type === "PDF" ? "bg-gradient-to-br from-red-400 to-red-600" : "bg-gradient-to-br from-[#dd6b44] to-[#c55a38]"} flex items-center justify-center`}>
                                            {/* Mini Preview */}
                                            <div className="absolute inset-2 bg-[#ecebe7] rounded-lg flex flex-col p-3">
                                                <div className="flex items-center gap-1 mb-2">
                                                    <div className="w-4 h-4 rounded-full bg-[#dd6b44]" />
                                                    <span className="text-[6px] font-bold text-[#272727]">DOTLESS</span>
                                                </div>
                                                <div className="space-y-1 flex-1">
                                                    <div className="h-2 bg-[#272727] rounded w-3/4" />
                                                    <div className="h-1.5 bg-[#6c6d5e] rounded w-1/2 opacity-40" />
                                                </div>
                                                <div className="h-0.5 bg-[#dd6b44] -mx-3 -mb-3 mt-2" />
                                            </div>

                                            <div className="absolute top-2 left-2">
                                                <Badge className="bg-white/90 text-[#272727] border-0 text-[10px]">
                                                    {project.type}
                                                </Badge>
                                            </div>

                                            {/* Hover Actions */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <Button size="sm" variant="secondary">
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    Abrir
                                                </Button>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium truncate">{project.name}</h3>
                                                    <div className="flex items-center gap-2 mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                                                        <Clock className="h-3 w-3" />
                                                        <span>{project.updatedAt}</span>
                                                        <span>•</span>
                                                        <span>{project.pages} slides</span>
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
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="p-0">
                                <div className="divide-y divide-[hsl(var(--border))]">
                                    {filteredProjects.map((project) => (
                                        <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                                            <div className="flex items-center gap-4 p-4 hover:bg-[hsl(var(--muted))] transition-colors cursor-pointer">
                                                <div className={`p-3 rounded-lg ${project.type === "PDF" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>
                                                    {project.type === "PDF" ? <FileText className="h-6 w-6" /> : <Presentation className="h-6 w-6" />}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium">{project.name}</h3>
                                                    <div className="flex items-center gap-2 mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                                                        <span>{project.pages} slides</span>
                                                        <span>•</span>
                                                        <span>{project.updatedAt}</span>
                                                        <span>•</span>
                                                        <span>{project.template}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    {getStatusBadge(project.status)}
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-4 rounded-full bg-[hsl(var(--muted))] mb-4">
                            <Presentation className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
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
