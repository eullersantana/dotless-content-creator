"use client"

import { useState, useCallback } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Search,
    Upload,
    Image as ImageIcon,
    FileImage,
    Palette,
    Folder,
    Grid3X3,
    List
} from "lucide-react"

export default function AssetsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [filterType, setFilterType] = useState<"all" | "image" | "logo" | "icon" | "pattern">("all")
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }, [])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        console.log("Dropped files:", files)
        // Handle file upload
    }, [])

    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Biblioteca"
                description="Gerencie seus assets e recursos"
                action={{
                    label: "Upload",
                    onClick: () => console.log("Upload")
                }}
            />

            <div className="p-6 space-y-6 animate-fade-in">
                {/* Upload Area */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragging
                            ? "border-[hsl(var(--dotless-terracotta))] bg-[hsl(var(--dotless-terracotta))]/5"
                            : "border-[hsl(var(--border))] hover:border-[hsl(var(--muted-foreground))]"
                        }`}
                >
                    <Upload className={`h-10 w-10 mx-auto mb-3 ${isDragging ? "text-[hsl(var(--dotless-terracotta))]" : "text-[hsl(var(--muted-foreground))]"}`} />
                    <h3 className="font-medium">Arraste arquivos aqui</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
                        ou <button className="text-[hsl(var(--primary))] hover:underline">clique para selecionar</button>
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2">
                        PNG, JPG, SVG, GIF até 10MB
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-2 flex-1">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                            <Input
                                placeholder="Buscar assets..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Tabs value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
                            <TabsList>
                                <TabsTrigger value="all">Todos</TabsTrigger>
                                <TabsTrigger value="image">Imagens</TabsTrigger>
                                <TabsTrigger value="logo">Logos</TabsTrigger>
                                <TabsTrigger value="icon">Ícones</TabsTrigger>
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

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                                <FileImage className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Imagens</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                                <Palette className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Logos</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-100 text-green-600">
                                <ImageIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Ícones</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                                <Folder className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Total</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="p-4 rounded-full bg-[hsl(var(--muted))] mb-4">
                        <ImageIcon className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
                    </div>
                    <h3 className="text-lg font-medium">Nenhum asset encontrado</h3>
                    <p className="text-[hsl(var(--muted-foreground))] mt-1">
                        Faça upload do seu primeiro arquivo
                    </p>
                </div>
            </div>
        </div>
    )
}
