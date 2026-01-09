"use client"

import { useState, useRef, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Send,
    Sparkles,
    Palette,
    Type,
    Layout,
    Image,
    Undo2,
    Redo2,
    Download,
    FileText,
    Presentation,
    RefreshCw,
    CheckCircle2,
    XCircle
} from "lucide-react"

interface Message {
    id: string
    role: "user" | "assistant" | "system"
    content: string
    actions?: AIAction[]
    timestamp: Date
}

interface AIAction {
    type: "apply_style" | "add_element" | "modify_content" | "export"
    label: string
    status: "pending" | "applied" | "rejected"
}

// Mock messages for demonstration
const initialMessages: Message[] = [
    {
        id: "1",
        role: "system",
        content: "👋 Olá! Eu sou o AI Designer da Dotless. Posso ajudar você a criar e modificar o design dos seus slides e PDFs. Alguns comandos que você pode usar:\n\n• **Mudar cor de fundo para...** - Altera a cor de fundo\n• **Aplicar estilo minimalista** - Usa um preset de design\n• **Adicionar título...** - Insere um elemento de texto\n• **Aumentar espaçamento** - Ajusta o layout\n\nO que você gostaria de criar hoje?",
        timestamp: new Date()
    }
]

const suggestedCommands = [
    "Mudar cor de fundo para terracotta",
    "Aplicar estilo minimalista",
    "Adicionar título centralizado",
    "Aumentar espaçamento entre seções",
    "Trocar fonte para Inter",
    "Exportar como PDF"
]

export default function AIChatPage() {
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInputValue("")
        setIsLoading(true)

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = generateAIResponse(inputValue)
            setMessages(prev => [...prev, aiResponse])
            setIsLoading(false)
        }, 1500)
    }

    const generateAIResponse = (userInput: string): Message => {
        const input = userInput.toLowerCase()

        if (input.includes("cor") || input.includes("fundo") || input.includes("terracotta")) {
            return {
                id: Date.now().toString(),
                role: "assistant",
                content: "Perfeito! Vou aplicar a cor **Terracotta** (#dd6b44) como fundo. Esta é uma das cores principais da identidade Dotless, que traz sofisticação e calor ao design.",
                actions: [
                    { type: "apply_style", label: "Aplicar Terracotta como fundo", status: "pending" }
                ],
                timestamp: new Date()
            }
        }

        if (input.includes("minimalista") || input.includes("estilo")) {
            return {
                id: Date.now().toString(),
                role: "assistant",
                content: "Ótima escolha! O estilo **Minimalista Dotless** inclui:\n\n• Fundo Off-White (#ecebe7)\n• Tipografia Inter com hierarquia clara\n• Espaçamento generoso (grid 8px)\n• Acentos em Terracotta para CTAs\n• Sombras sutis de 2 níveis",
                actions: [
                    { type: "apply_style", label: "Aplicar estilo minimalista", status: "pending" }
                ],
                timestamp: new Date()
            }
        }

        if (input.includes("título") || input.includes("texto")) {
            return {
                id: Date.now().toString(),
                role: "assistant",
                content: "Posso adicionar um **título** ao seu design. Por favor, me diga:\n\n1. Qual o texto do título?\n2. Centralizado ou alinhado à esquerda?\n3. Tamanho grande (h1) ou médio (h2)?",
                timestamp: new Date()
            }
        }

        if (input.includes("exportar") || input.includes("pdf") || input.includes("pptx")) {
            return {
                id: Date.now().toString(),
                role: "assistant",
                content: "Preparando a exportação do seu projeto! Escolha o formato:",
                actions: [
                    { type: "export", label: "Exportar como PDF", status: "pending" },
                    { type: "export", label: "Exportar como PPTX", status: "pending" }
                ],
                timestamp: new Date()
            }
        }

        return {
            id: Date.now().toString(),
            role: "assistant",
            content: "Entendi! Posso ajudar você com:\n\n• **Cores e estilos** - Alterar paleta, aplicar presets\n• **Tipografia** - Fontes, tamanhos, hierarquia\n• **Layout** - Espaçamento, alinhamento\n• **Elementos** - Adicionar textos, imagens, formas\n• **Exportação** - Gerar PDF ou PPTX\n\nO que você gostaria de fazer?",
            timestamp: new Date()
        }
    }

    const handleActionClick = (messageId: string, actionIndex: number, status: "applied" | "rejected") => {
        setMessages(prev => prev.map(msg => {
            if (msg.id === messageId && msg.actions) {
                const newActions = [...msg.actions]
                newActions[actionIndex] = { ...newActions[actionIndex], status }
                return { ...msg, actions: newActions }
            }
            return msg
        }))
    }

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardHeader
                title="AI Designer"
                description="Crie e modifique designs com comandos naturais"
            />

            <div className="flex-1 flex gap-6 p-6 overflow-hidden">
                {/* Chat Panel */}
                <Card className="flex-1 flex flex-col overflow-hidden">
                    <CardHeader className="border-b border-[hsl(var(--border))]">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-base">Assistente de Design</CardTitle>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Powered by Gemini AI</p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                                            ? "bg-[hsl(var(--primary))] text-white"
                                            : message.role === "system"
                                                ? "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30"
                                                : "bg-[hsl(var(--muted))]"
                                        }`}
                                >
                                    <div
                                        className="text-sm whitespace-pre-wrap"
                                        dangerouslySetInnerHTML={{
                                            __html: message.content
                                                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                .replace(/\n/g, '<br/>')
                                        }}
                                    />

                                    {message.actions && message.actions.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {message.actions.map((action, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center gap-2 p-2 rounded-lg bg-white/50 dark:bg-black/20"
                                                >
                                                    {action.status === "pending" ? (
                                                        <>
                                                            <span className="flex-1 text-sm font-medium">{action.label}</span>
                                                            <Button
                                                                size="sm"
                                                                variant="secondary"
                                                                className="h-7 text-xs"
                                                                onClick={() => handleActionClick(message.id, idx, "applied")}
                                                            >
                                                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                                                Aplicar
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                className="h-7 text-xs"
                                                                onClick={() => handleActionClick(message.id, idx, "rejected")}
                                                            >
                                                                <XCircle className="h-3 w-3" />
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <span className={`flex items-center gap-2 text-sm ${action.status === "applied" ? "text-green-600" : "text-red-500"
                                                            }`}>
                                                            {action.status === "applied" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                                            {action.label}
                                                            <Badge variant={action.status === "applied" ? "success" : "danger"} className="text-[10px]">
                                                                {action.status === "applied" ? "Aplicado" : "Rejeitado"}
                                                            </Badge>
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-[hsl(var(--muted))] rounded-2xl px-4 py-3">
                                    <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        Pensando...
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </CardContent>

                    {/* Suggested Commands */}
                    <div className="px-4 py-2 border-t border-[hsl(var(--border))]">
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {suggestedCommands.slice(0, 4).map((cmd, idx) => (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    size="sm"
                                    className="whitespace-nowrap text-xs"
                                    onClick={() => setInputValue(cmd)}
                                >
                                    {cmd}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-[hsl(var(--border))]">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                            className="flex gap-2"
                        >
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Digite um comando de design..."
                                className="flex-1"
                                disabled={isLoading}
                            />
                            <Button type="submit" disabled={isLoading || !inputValue.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>
                </Card>

                {/* Preview/Tools Panel */}
                <div className="w-80 space-y-4 hidden lg:block">
                    {/* Preview */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="aspect-[4/3] rounded-lg bg-[hsl(var(--dotless-cream))] border border-[hsl(var(--border))] flex items-center justify-center">
                                <div className="text-center text-[hsl(var(--muted-foreground))]">
                                    <Presentation className="h-12 w-12 mx-auto mb-2 opacity-30" />
                                    <p className="text-sm">Selecione um projeto</p>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Undo2 className="h-4 w-4 mr-1" />
                                    Desfazer
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Redo2 className="h-4 w-4 mr-1" />
                                    Refazer
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Tools */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Ferramentas Rápidas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Palette className="h-4 w-4 text-[hsl(var(--dotless-terracotta))]" />
                                Paleta de Cores
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Type className="h-4 w-4 text-[hsl(var(--primary))]" />
                                Tipografia
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Layout className="h-4 w-4 text-[hsl(var(--dotless-olive))]" />
                                Layout
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Image className="h-4 w-4 text-[hsl(var(--secondary))]" />
                                Imagens
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Export */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Exportar</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="accent" className="w-full gap-2">
                                <FileText className="h-4 w-4" />
                                Exportar PDF
                            </Button>
                            <Button variant="outline" className="w-full gap-2">
                                <Download className="h-4 w-4" />
                                Exportar PPTX
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
