"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Search,
    FileText,
    Presentation,
    Star,
    Clock,
    Copy,
    Pencil,
    Trash2,
    Plus,
    LayoutTemplate
} from "lucide-react"

// Mock templates
const mockTemplates = [
    {
        id: "1",
        name: "Pitch Deck Moderno",
        type: "SLIDE",
        category: "Negócios",
        isDefault: true,
        uses: 45,
        color: "from-blue-500 to-indigo-600"
    },
    {
        id: "2",
        name: "Relatório Executivo",
        type: "PDF",
        category: "Relatórios",
        isDefault: true,
        uses: 38,
        color: "from-red-500 to-pink-600"
    },
    {
        id: "3",
        name: "E-book Minimalista",
        type: "PDF",
        category: "E-books",
        isDefault: false,
        uses: 22,
        color: "from-purple-500 to-violet-600"
    },
    {
        id: "4",
        name: "Proposta Comercial",
        type: "PDF",
        category: "Vendas",
        isDefault: true,
        uses: 67,
        color: "from-green-500 to-emerald-600"
    },
    {
        id: "5",
        name: "Apresentação Criativa",
        type: "SLIDE",
        category: "Marketing",
        isDefault: false,
        uses: 31,
        color: "from-amber-500 to-orange-600"
    },
    {
        id: "6",
        name: "Onboarding Pack",
        type: "SLIDE",
        category: "RH",
        isDefault: true,
        uses: 19,
        color: "from-teal-500 to-cyan-600"
    },
]

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState<"all" | "PDF" | "SLIDE">("all")

    const filteredTemplates = mockTemplates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = filterType === "all" || template.type === filterType
        return matchesSearch && matchesType
    })

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Templates"
                description="Gerencie e crie templates para seus projetos"
                action={{
                    label: "Novo Template",
                    onClick: () => console.log("Create new template")
                }}
            />

            <div className="p-6 space-y-6 animate-fade-in">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                        <Input
                            placeholder="Buscar templates..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Tabs value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
                        <TabsList>
                            <TabsTrigger value="all">Todos</TabsTrigger>
                            <TabsTrigger value="PDF">PDFs</TabsTrigger>
                            <TabsTrigger value="SLIDE">Slides</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Default Templates Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-[hsl(var(--dotless-terracotta))]" />
                        Templates Padrão
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredTemplates.filter(t => t.isDefault).map((template) => (
                            <Card key={template.id} hover className="group overflow-hidden">
                                <div className={`aspect-[4/3] relative bg-gradient-to-br ${template.color}`}>
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        {template.type === "PDF" ? <FileText className="h-12 w-12 opacity-50" /> : <Presentation className="h-12 w-12 opacity-50" />}
                                    </div>
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                                            {template.type}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-3 right-3">
                                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    </div>
                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button size="sm" variant="secondary">
                                            <Copy className="h-4 w-4 mr-2" />
                                            Usar
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-medium">{template.name}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <Badge variant="outline" className="text-xs">{template.category}</Badge>
                                        <span className="text-sm text-[hsl(var(--muted-foreground))]">{template.uses} usos</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Custom Templates Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <LayoutTemplate className="h-5 w-5 text-[hsl(var(--primary))]" />
                        Meus Templates
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {/* Create New Template Card */}
                        <Card className="border-2 border-dashed hover:border-[hsl(var(--dotless-terracotta))] transition-colors cursor-pointer">
                            <CardContent className="aspect-[4/3] flex flex-col items-center justify-center gap-3 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--dotless-terracotta))] transition-colors">
                                <div className="p-4 rounded-full border-2 border-current">
                                    <Plus className="h-8 w-8" />
                                </div>
                                <span className="font-medium">Criar Template</span>
                            </CardContent>
                        </Card>

                        {filteredTemplates.filter(t => !t.isDefault).map((template) => (
                            <Card key={template.id} hover className="group overflow-hidden">
                                <div className={`aspect-[4/3] relative bg-gradient-to-br ${template.color}`}>
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        {template.type === "PDF" ? <FileText className="h-12 w-12 opacity-50" /> : <Presentation className="h-12 w-12 opacity-50" />}
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                                            {template.type}
                                        </Badge>
                                    </div>
                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button size="icon" variant="secondary" className="h-9 w-9">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="h-9 w-9">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="destructive" className="h-9 w-9">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-medium">{template.name}</h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <Badge variant="outline" className="text-xs">{template.category}</Badge>
                                        <span className="text-sm text-[hsl(var(--muted-foreground))]">{template.uses} usos</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
