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
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Search,
    Plus,
    LayoutTemplate,
    Star,
    Presentation,
    Download,
    Eye,
    Copy,
    Users,
    Building2,
    Banknote,
    Target,
    Lightbulb,
    ChevronRight
} from "lucide-react"

// ============================================
// SLIDE HEADER COMPONENT - Consistent branding
// ============================================
interface SlideHeaderProps {
    variant?: 'light' | 'dark'
    showPageNumber?: boolean
    currentPage?: number
    totalPages?: number
}

function SlideHeader({ variant = 'light', showPageNumber = true, currentPage = 1, totalPages = 5 }: SlideHeaderProps) {
    const isDark = variant === 'dark'

    return (
        <header className="flex items-center justify-between py-4 px-6 border-b border-transparent"
            style={{
                borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(39,39,39,0.08)',
                minHeight: '56px'
            }}
        >
            {/* Logo */}
            <div className="flex items-center">
                <img
                    src={isDark ? "/assets/dotless-logo.png" : "/assets/dotless-logo-dark.png"}
                    alt="Dotless"
                    className={`h-5 ${isDark ? 'brightness-0 invert opacity-80' : ''}`}
                />
            </div>

            {/* Page Number */}
            {showPageNumber && (
                <div className={`flex items-center gap-2 text-xs font-medium ${isDark ? 'text-white/50' : 'text-[#6c6d5e]'}`}>
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-[#272727]/5'}`}>
                        {String(currentPage).padStart(2, '0')}
                    </span>
                    <span className="opacity-50">/</span>
                    <span className="opacity-50">{String(totalPages).padStart(2, '0')}</span>
                </div>
            )}
        </header>
    )
}

// ============================================
// SLIDE FOOTER COMPONENT - Consistent branding
// ============================================
interface SlideFooterProps {
    variant?: 'solid' | 'gradient' | 'minimal'
    color?: string
}

function SlideFooter({ variant = 'solid', color = '#dd6b44' }: SlideFooterProps) {
    if (variant === 'minimal') {
        return (
            <footer className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-current to-transparent"
                style={{ color: color }}
            />
        )
    }

    if (variant === 'gradient') {
        return (
            <footer className="absolute bottom-0 left-0 right-0">
                <div className="h-1.5 bg-gradient-to-r from-[#dd6b44] via-[#6c6d5e] to-[#5a7f7a]" />
            </footer>
        )
    }

    return (
        <footer className="absolute bottom-0 left-0 right-0">
            <div className="h-1.5" style={{ backgroundColor: color }} />
        </footer>
    )
}

// Dotless Template - Pre-configured
const dotlessTemplate = {
    id: "dotless-premium",
    name: "Dotless Premium",
    type: "SLIDE",
    category: "Apresentações",
    description: "Template profissional com a identidade visual Dotless",
    isDefault: true,
    slides: [
        { type: "cover", title: "Capa" },
        { type: "agenda", title: "Agenda" },
        { type: "content", title: "Conteúdo" },
        { type: "quote", title: "Citação" },
        { type: "closing", title: "Encerramento" },
    ]
}

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [filterType, setFilterType] = useState<"all" | "PDF" | "SLIDE">("all")
    const [previewOpen, setPreviewOpen] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

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

                {/* Templates Padrão */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-[hsl(var(--dotless-terracotta))]" />
                        Templates Padrão
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {/* Dotless Premium Template */}
                        <Card className="group overflow-hidden hover:shadow-lg transition-all">
                            {/* Template Preview - Premium Dark */}
                            <div className="aspect-[16/9] relative overflow-hidden">
                                {/* Premium gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#272727] to-[#1a1a1a]" />

                                {/* Decorative glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#dd6b44]/30 rounded-full blur-[40px]" />

                                {/* Grid pattern */}
                                <div className="absolute inset-0 opacity-10" style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px'
                                }} />

                                {/* Mini slide content */}
                                <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-center">
                                    <div className="w-8 h-8 rounded-full bg-[#dd6b44]/20 flex items-center justify-center mb-2">
                                        <div className="w-4 h-4 rounded-full bg-[#dd6b44]" />
                                    </div>
                                    <div className="h-2 bg-white rounded w-20 mb-1.5" />
                                    <div className="h-1.5 bg-white/50 rounded w-14" />
                                </div>

                                {/* Bottom accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dd6b44] to-transparent" />

                                {/* Badges */}
                                <div className="absolute top-2 left-2 flex gap-1">
                                    <Badge className="bg-[#dd6b44] text-white border-0 text-[10px]">
                                        SLIDE
                                    </Badge>
                                </div>
                                <div className="absolute top-2 right-2">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                </div>

                                {/* Hover Actions */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button size="sm" variant="secondary" onClick={() => setPreviewOpen(true)}>
                                        <Eye className="h-4 w-4 mr-1" />
                                        Ver
                                    </Button>
                                    <Button size="sm" variant="secondary">
                                        <Copy className="h-4 w-4 mr-1" />
                                        Usar
                                    </Button>
                                </div>
                            </div>

                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="font-semibold">{dotlessTemplate.name}</h3>
                                        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                                            {dotlessTemplate.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <Badge variant="outline" className="text-xs">{dotlessTemplate.category}</Badge>
                                    <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                        {dotlessTemplate.slides.length} slides
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Meus Templates */}
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
                    </div>
                </div>
            </div>

            {/* Template Preview Dialog - Premium Design */}
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-[#1a1a1a] border-white/10">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-white">
                            <Presentation className="h-5 w-5 text-[#dd6b44]" />
                            {dotlessTemplate.name}
                        </DialogTitle>
                        <DialogDescription className="text-white/60">
                            Preview dos slides do template
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Main Slide Preview */}
                        <div className="aspect-[16/9] rounded-xl overflow-hidden border border-white/10 shadow-2xl">

                            {/* ============================================ */}
                            {/* SLIDE 1: COVER - Premium Hero (No header/footer) */}
                            {/* ============================================ */}
                            {currentSlide === 0 && (
                                <div className="w-full h-full relative overflow-hidden">
                                    {/* Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]" />

                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#dd6b44]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#6c6d5e]/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />

                                    {/* Grid Pattern */}
                                    <div className="absolute inset-0 opacity-5" style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                                        backgroundSize: '40px 40px'
                                    }} />

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
                                        <div className="mb-8">
                                            <img
                                                src="/assets/dotless-logo.png"
                                                alt="Dotless"
                                                className="h-8 brightness-0 invert opacity-80"
                                            />
                                        </div>

                                        <div className="mb-6">
                                            <span className="px-3 py-1.5 bg-[#dd6b44]/20 border border-[#dd6b44]/30 rounded-full text-[#dd6b44] text-xs font-medium tracking-wider uppercase">
                                                Guia Completo
                                            </span>
                                        </div>

                                        <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
                                            Título da
                                            <span className="block text-[#dd6b44]">
                                                Apresentação
                                            </span>
                                        </h1>

                                        <p className="mt-4 text-base text-white/60 max-w-lg">
                                            Subtítulo ou descrição breve sobre o conteúdo da apresentação
                                        </p>
                                    </div>

                                    {/* Cover uses minimal footer */}
                                    <SlideFooter variant="minimal" color="#dd6b44" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 2: AGENDA - With proper header/footer */}
                            {/* ============================================ */}
                            {currentSlide === 1 && (
                                <div className="w-full h-full relative overflow-hidden bg-[#ecebe7]">
                                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#dd6b44]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                                    <div className="relative h-full flex flex-col">
                                        {/* Standardized Header */}
                                        <SlideHeader variant="light" currentPage={2} totalPages={5} />

                                        {/* Content Area - With safe padding to avoid header/footer */}
                                        <main className="flex-1 px-8 py-4 overflow-hidden">
                                            <div className="mb-4">
                                                <span className="text-xs font-semibold text-[#dd6b44] tracking-wider uppercase">Agenda</span>
                                                <h2 className="text-2xl font-bold text-[#272727] mt-1">O que você vai aprender</h2>
                                            </div>

                                            <div className="grid grid-cols-2 gap-3">
                                                {[
                                                    { num: "01", text: "Introdução e contexto", icon: Target },
                                                    { num: "02", text: "Desenvolvimento", icon: Users },
                                                    { num: "03", text: "Análise detalhada", icon: Building2 },
                                                    { num: "04", text: "Conclusões", icon: Lightbulb }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex items-center justify-center shadow-lg shadow-[#dd6b44]/20">
                                                            <item.icon className="h-5 w-5 text-white" />
                                                        </div>
                                                        <div>
                                                            <span className="text-[10px] font-bold text-[#dd6b44]">{item.num}</span>
                                                            <p className="text-[#272727] font-medium text-sm">{item.text}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </main>

                                        {/* Standardized Footer */}
                                        <SlideFooter variant="gradient" />
                                    </div>
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 3: CONTENT - With proper header/footer */}
                            {/* ============================================ */}
                            {currentSlide === 2 && (
                                <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#ecebe7] to-[#e0dfd9]">
                                    <div className="absolute -right-20 -top-20 w-[300px] h-[300px] bg-[#6c6d5e]/20 rounded-full blur-[60px]" />

                                    <div className="relative h-full flex flex-col">
                                        {/* Standardized Header */}
                                        <SlideHeader variant="light" currentPage={3} totalPages={5} />

                                        {/* Content Area - Split layout */}
                                        <main className="flex-1 px-8 py-4 flex gap-6 overflow-hidden">
                                            <div className="w-1/2 flex flex-col">
                                                <div className="mb-auto">
                                                    <div className="inline-flex items-center gap-2 px-2 py-1 bg-[#6c6d5e]/20 rounded-full mb-3">
                                                        <Users className="h-3 w-3 text-[#6c6d5e]" />
                                                        <span className="text-xs font-medium text-[#6c6d5e]">Tópico</span>
                                                    </div>

                                                    <h2 className="text-2xl font-bold text-[#272727] mb-3">
                                                        Título do
                                                        <span className="block text-[#6c6d5e]">Conteúdo</span>
                                                    </h2>

                                                    <p className="text-sm text-[#6c6d5e] leading-relaxed">
                                                        Descrição detalhada do conteúdo que será apresentado neste slide.
                                                    </p>
                                                </div>

                                                <div className="p-4 bg-white rounded-xl shadow-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-lg bg-[#6c6d5e]/10 flex items-center justify-center">
                                                            <Target className="h-6 w-6 text-[#6c6d5e]" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-bold text-[#272727]">100%</p>
                                                            <p className="text-xs text-[#6c6d5e]">Destaque numérico</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-1/2 flex flex-col justify-center gap-2">
                                                {[
                                                    "Ponto importante número um",
                                                    "Segundo ponto relevante",
                                                    "Terceiro item da lista",
                                                    "Conclusão do tópico"
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-lg border border-white shadow-sm">
                                                        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#6c6d5e] to-[#5c5d4e] flex items-center justify-center shadow">
                                                            <Banknote className="h-4 w-4 text-white" />
                                                        </div>
                                                        <p className="text-[#272727] font-medium text-sm">{item}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </main>

                                        {/* Standardized Footer */}
                                        <SlideFooter variant="solid" color="#6c6d5e" />
                                    </div>
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 4: QUOTE - Dark with minimal header */}
                            {/* ============================================ */}
                            {currentSlide === 3 && (
                                <div className="w-full h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#272727] via-[#1a1a1a] to-[#272727]" />

                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/10 rounded-full" />

                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-[#dd6b44]/30 rounded-full blur-[60px]" />

                                    <div className="relative h-full flex flex-col">
                                        {/* Dark Header */}
                                        <SlideHeader variant="dark" currentPage={4} totalPages={5} />

                                        {/* Quote Content */}
                                        <main className="flex-1 flex flex-col items-center justify-center px-10 text-center">
                                            <div className="text-[#dd6b44] text-6xl font-serif mb-4">"</div>

                                            <p className="text-xl text-white/90 max-w-2xl leading-relaxed italic">
                                                Uma citação inspiradora ou destaque importante que você quer que a audiência lembre.
                                            </p>

                                            <p className="text-[#6c6d5e] mt-6">— Autor da Citação</p>
                                        </main>

                                        {/* Minimal Footer for quote */}
                                        <SlideFooter variant="minimal" color="#dd6b44" />
                                    </div>
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 5: CLOSING - Full brand (no header) */}
                            {/* ============================================ */}
                            {currentSlide === 4 && (
                                <div className="w-full h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#dd6b44] via-[#c55a38] to-[#b54a28]" />

                                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
                                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[60px] translate-x-1/2 translate-y-1/2" />

                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                        backgroundSize: '24px 24px'
                                    }} />

                                    <div className="relative h-full flex flex-col items-center justify-center p-10 text-center">
                                        <div className="mb-8">
                                            <img
                                                src="/assets/dotless-logo.png"
                                                alt="Dotless"
                                                className="h-8 brightness-0 invert"
                                            />
                                        </div>

                                        <h2 className="text-3xl font-bold text-white mb-4">
                                            Obrigado!
                                        </h2>

                                        <p className="text-base text-white/80 max-w-lg mb-8">
                                            Mensagem de encerramento ou call to action
                                        </p>

                                        <button className="px-6 py-2.5 bg-white text-[#dd6b44] font-bold rounded-lg shadow-xl flex items-center gap-2 text-sm">
                                            Entrar em Contato
                                            <ChevronRight className="h-4 w-4" />
                                        </button>

                                        <p className="mt-6 text-white/60 text-xs">
                                            contato@dotless.io
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Slide Navigation */}
                        <div className="flex items-center justify-center gap-2">
                            {dotlessTemplate.slides.map((slide, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-24 h-14 rounded-lg overflow-hidden transition-all ${currentSlide === idx
                                            ? "ring-2 ring-[#dd6b44] ring-offset-2 ring-offset-[#1a1a1a]"
                                            : "opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <div className={`w-full h-full flex items-center justify-center text-[9px] font-medium ${idx === 3 ? "bg-gradient-to-br from-[#272727] to-[#1a1a1a] text-white" :
                                            idx === 4 ? "bg-gradient-to-br from-[#dd6b44] to-[#c55a38] text-white" :
                                                idx === 0 ? "bg-gradient-to-br from-[#272727] to-[#1a1a1a] text-white" :
                                                    "bg-[#ecebe7] text-[#272727]"
                                        }`}>
                                        {slide.title}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                            <Button variant="outline" onClick={() => setPreviewOpen(false)} className="border-white/20 text-white hover:bg-white/10">
                                Fechar
                            </Button>
                            <Button className="bg-[#dd6b44] hover:bg-[#dd6b44]/90">
                                <Download className="h-4 w-4 mr-2" />
                                Baixar PPTX
                            </Button>
                            <Button className="bg-white text-[#272727] hover:bg-white/90">
                                <Copy className="h-4 w-4 mr-2" />
                                Usar Template
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
