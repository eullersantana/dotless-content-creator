"use client"

import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    User,
    Palette,
    Key,
    Bell,
    Globe,
    HelpCircle
} from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="min-h-screen">
            <DashboardHeader
                title="Configurações"
                description="Gerencie suas preferências"
            />

            <div className="p-6 space-y-6 animate-fade-in">
                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="profile" className="gap-2">
                            <User className="h-4 w-4" />
                            Perfil
                        </TabsTrigger>
                        <TabsTrigger value="design" className="gap-2">
                            <Palette className="h-4 w-4" />
                            Design
                        </TabsTrigger>
                        <TabsTrigger value="api" className="gap-2">
                            <Key className="h-4 w-4" />
                            API
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="gap-2">
                            <Bell className="h-4 w-4" />
                            Notificações
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações do Perfil</CardTitle>
                                <CardDescription>Atualize suas informações pessoais</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Nome</label>
                                        <Input placeholder="Seu nome" defaultValue="Euler Santana" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <Input placeholder="seu@email.com" defaultValue="euler@dotless.io" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Bio</label>
                                    <Textarea placeholder="Uma breve descrição sobre você..." rows={3} />
                                </div>
                                <Button>Salvar Alterações</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="design" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preferências de Design</CardTitle>
                                <CardDescription>Personalize as configurações padrão de design</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-medium">Paleta de Cores Padrão</h4>
                                    <div className="flex gap-3">
                                        {[
                                            { name: "Cream", color: "#ecebe7" },
                                            { name: "Graphite", color: "#272727" },
                                            { name: "Terracotta", color: "#dd6b44" },
                                            { name: "Olive", color: "#6c6d5e" },
                                            { name: "Sand", color: "#d3cfc6" },
                                        ].map((c) => (
                                            <div key={c.name} className="text-center">
                                                <div
                                                    className="h-12 w-12 rounded-lg border-2 border-[hsl(var(--border))] cursor-pointer hover:scale-110 transition-transform"
                                                    style={{ backgroundColor: c.color }}
                                                />
                                                <span className="text-xs text-[hsl(var(--muted-foreground))] mt-1 block">{c.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium">Fonte Padrão</h4>
                                    <div className="flex gap-2">
                                        {["Inter", "Roboto", "Open Sans", "Lato"].map((font) => (
                                            <Badge
                                                key={font}
                                                variant={font === "Inter" ? "default" : "outline"}
                                                className="cursor-pointer"
                                            >
                                                {font}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium">Formato de Exportação Padrão</h4>
                                    <div className="flex gap-2">
                                        <Badge variant="default" className="cursor-pointer">PDF</Badge>
                                        <Badge variant="outline" className="cursor-pointer">PPTX</Badge>
                                    </div>
                                </div>

                                <Button>Salvar Preferências</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="api" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Chaves de API</CardTitle>
                                <CardDescription>Gerencie suas integrações</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Gemini API Key</label>
                                    <div className="flex gap-2">
                                        <Input type="password" defaultValue="sk-..." className="font-mono" />
                                        <Button variant="outline">Mostrar</Button>
                                    </div>
                                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                                        Usada para o AI Designer. <a href="#" className="text-[hsl(var(--primary))] hover:underline">Obter chave</a>
                                    </p>
                                </div>
                                <Button>Atualizar Chaves</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preferências de Notificação</CardTitle>
                                <CardDescription>Controle como você recebe notificações</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { label: "Projetos exportados", description: "Quando um projeto é exportado com sucesso" },
                                    { label: "Novos templates", description: "Quando novos templates estão disponíveis" },
                                    { label: "Atualizações do sistema", description: "Novidades e melhorias da plataforma" },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between p-4 rounded-lg border border-[hsl(var(--border))]">
                                        <div>
                                            <p className="font-medium">{item.label}</p>
                                            <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.description}</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="h-5 w-5 accent-[hsl(var(--primary))]" />
                                    </div>
                                ))}
                                <Button>Salvar Notificações</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
