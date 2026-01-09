"use client"

import { useState, useCallback } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Search,
    Upload,
    Image as ImageIcon,
    FileImage,
    Palette,
    Folder,
    Grid3X3,
    List,
    MoreVertical,
    Download,
    Trash2,
    Copy,
    Tag
} from "lucide-react"

// Mock assets
const mockAssets = [
    { id: "1", name: "Logo Dotless", type: "logo", url: "/assets/logo.png", tags: ["branding", "logo"], size: "24 KB" },
    { id: "2", name: "Hero Background", type: "image", url: "/assets/hero.jpg", tags: ["background", "hero"], size: "256 KB" },
    { id: "3", name: "Icon Pack", type: "icon", url: "/assets/icons.svg", tags: ["icons", "ui"], size: "12 KB" },
    { id: "4", name: "Team Photo", type: "image", url: "/assets/team.jpg", tags: ["people", "about"], size: "180 KB" },
    { id: "5", name: "Pattern 01", type: "pattern", url: "/assets/pattern1.png", tags: ["pattern", "background"], size: "45 KB" },
    { id: "6", name: "Product Shot", type: "image", url: "/assets/product.jpg", tags: ["product", "marketing"], size: "320 KB" },
]

const assetColors = {
    image: "bg-blue-100 text-blue-600",
    logo: "bg-purple-100 text-purple-600",
    icon: "bg-green-100 text-green-600",
    pattern: "bg-amber-100 text-amber-600",
}

export default function AssetsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [filterType, setFilterType] = useState<"all" | "image" | "logo" | "icon" | "pattern">("all")
    const [isDragging, setIsDragging] = useState(false)

    const filteredAssets = mockAssets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        const matchesType = filterType === "all" || asset.type === filterType
        return matchesSearch && matchesType
    })

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
                                <p className="text-2xl font-bold">{mockAssets.filter(a => a.type === "image").length}</p>
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
                                <p className="text-2xl font-bold">{mockAssets.filter(a => a.type === "logo").length}</p>
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
                                <p className="text-2xl font-bold">{mockAssets.filter(a => a.type === "icon").length}</p>
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
                                <p className="text-2xl font-bold">{mockAssets.length}</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Total</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Assets Grid/List */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                        {filteredAssets.map((asset) => (
                            <Card key={asset.id} hover className="group overflow-hidden">
                                <div className="aspect-square relative bg-[hsl(var(--muted))] flex items-center justify-center">
                                    <ImageIcon className="h-12 w-12 text-[hsl(var(--muted-foreground))] opacity-30" />
                                    <div className="absolute top-2 left-2">
                                        <Badge variant="secondary" className="text-[10px]">{asset.type}</Badge>
                                    </div>
                                    {/* Hover Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button size="icon" variant="secondary" className="h-8 w-8">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="h-8 w-8">
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                        <Button size="icon" variant="destructive" className="h-8 w-8">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-3">
                                    <p className="font-medium text-sm truncate">{asset.name}</p>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{asset.size}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-0">
                            <div className="divide-y divide-[hsl(var(--border))]">
                                {filteredAssets.map((asset) => (
                                    <div key={asset.id} className="flex items-center gap-4 p-4 hover:bg-[hsl(var(--muted))] transition-colors">
                                        <div className={`p-3 rounded-lg ${assetColors[asset.type as keyof typeof assetColors] || "bg-gray-100 text-gray-600"}`}>
                                            <ImageIcon className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium">{asset.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {asset.tags.map(tag => (
                                                    <Badge key={tag} variant="outline" className="text-[10px]">
                                                        <Tag className="h-2 w-2 mr-1" />
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-sm text-[hsl(var(--muted-foreground))]">{asset.size}</div>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-[hsl(var(--destructive))]">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {filteredAssets.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-4 rounded-full bg-[hsl(var(--muted))] mb-4">
                            <ImageIcon className="h-8 w-8 text-[hsl(var(--muted-foreground))]" />
                        </div>
                        <h3 className="text-lg font-medium">Nenhum asset encontrado</h3>
                        <p className="text-[hsl(var(--muted-foreground))] mt-1">
                            {searchQuery ? "Tente ajustar sua busca" : "Faça upload do seu primeiro arquivo"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
