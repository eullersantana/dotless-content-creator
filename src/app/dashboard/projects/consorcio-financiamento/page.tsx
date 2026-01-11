"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft,
    Download,
    FileText,
    Pencil,
    Maximize2,
    Minimize2,
    ChevronLeft,
    ChevronRight,
    Users,
    Building2,
    Banknote,
    TrendingUp,
    Shield,
    Clock,
    Zap,
    Target,
    Lightbulb,
    Award,
    X
} from "lucide-react"
import Link from "next/link"
import pptxgen from "pptxgenjs"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

// Project: Consórcio vs Financiamento vs À Vista
const projectData = {
    id: "consorcio-financiamento-avista",
    name: "Consórcio, Financiamento e À Vista",
    subtitle: "Entenda os detalhes e principais diferenças",
    type: "SLIDE",
    status: "DRAFT",
    template: "Dotless Premium",
    slides: [
        { type: "cover" },
        { type: "agenda" },
        { type: "intro" },
        { type: "consorcio" },
        { type: "financiamento" },
        { type: "avista" },
        { type: "comparison" },
        { type: "numbers" },
        { type: "decision" },
        { type: "tips" },
        { type: "closing" }
    ]
}

// Dotless brand colors
const COLORS = {
    terracotta: "DD6B44",
    olive: "6C6D5E",
    teal: "5A7F7A",
    dark: "272727",
    darkBg: "1A1A1A",
    cream: "ECEBE7",
    lightCream: "F8F7F5",
    white: "FFFFFF"
}

// Function to download PPTX
async function downloadPPTX() {
    const pptx = new pptxgen()

    // Get base URL for images
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const logoDark = `${baseUrl}/assets/dotless-logo-dark.png`
    const logoWhite = `${baseUrl}/assets/dotless-logo.png`

    // Set presentation properties
    pptx.author = "Dotless"
    pptx.title = projectData.name
    pptx.subject = projectData.subtitle
    pptx.company = "Dotless"
    pptx.layout = "LAYOUT_16x9"

    // ====================================
    // SLIDE 1: COVER
    // ====================================
    const slide1 = pptx.addSlide()
    slide1.background = { color: COLORS.darkBg }

    // Decorative gradient simulation
    slide1.addShape("rect", {
        x: 6.5, y: -1.5, w: 5, h: 5,
        fill: { color: COLORS.terracotta, transparency: 80 }
    })

    // Badge
    slide1.addText("Guia Completo", {
        x: 0, y: 2, w: "100%", h: 0.4,
        fontSize: 12, color: COLORS.terracotta, bold: true,
        align: "center", fontFace: "Arial"
    })

    // Title
    slide1.addText("Consórcio, Financiamento\ne À Vista", {
        x: 0.5, y: 2.5, w: 9, h: 1.5,
        fontSize: 44, color: COLORS.white, bold: true,
        align: "center", fontFace: "Arial"
    })

    // Subtitle
    slide1.addText("Entenda os detalhes e principais diferenças para tomar decisões financeiras inteligentes", {
        x: 1.5, y: 4.2, w: 7, h: 0.6,
        fontSize: 16, color: "999999",
        align: "center", fontFace: "Arial"
    })

    // Bottom accent line
    slide1.addShape("rect", {
        x: 0, y: 5.45, w: 10, h: 0.08,
        fill: { color: COLORS.terracotta }
    })

    // Logo (white version)
    slide1.addImage({
        path: logoWhite,
        x: 4, y: 1.3, w: 2, h: 0.5
    })

    // ====================================
    // SLIDE 2: AGENDA
    // ====================================
    const slide2 = pptx.addSlide()
    slide2.background = { color: COLORS.cream }

    slide2.addText("Agenda", {
        x: 0.5, y: 0.3, w: 3, h: 0.3,
        fontSize: 12, color: COLORS.terracotta, bold: true, fontFace: "Arial"
    })

    slide2.addText("O que você vai aprender", {
        x: 0.5, y: 0.6, w: 6, h: 0.5,
        fontSize: 28, color: COLORS.dark, bold: true, fontFace: "Arial"
    })

    const agendaItems = [
        "01  Por que entender as formas de pagamento",
        "02  Consórcio: como funciona",
        "03  Financiamento: prós e contras",
        "04  Pagamento à vista: vantagens",
        "05  Comparativo detalhado",
        "06  Qual escolher para seu perfil"
    ]

    agendaItems.forEach((item, i) => {
        const row = Math.floor(i / 2)
        const col = i % 2
        slide2.addShape("roundRect", {
            x: 0.5 + col * 4.5, y: 1.3 + row * 1.2, w: 4.2, h: 1,
            fill: { color: COLORS.white, transparency: 40 },
            line: { color: COLORS.white, width: 1 }
        })
        slide2.addText(item, {
            x: 0.7 + col * 4.5, y: 1.5 + row * 1.2, w: 3.8, h: 0.6,
            fontSize: 13, color: COLORS.dark, fontFace: "Arial"
        })
    })

    // Bottom accent
    slide2.addShape("rect", {
        x: 0, y: 5.45, w: 10, h: 0.08,
        fill: { color: COLORS.terracotta }
    })

    // Logo (dark version)
    slide2.addImage({
        path: logoDark,
        x: 0.5, y: 5, w: 1.5, h: 0.35
    })

    // ====================================
    // SLIDE 3: INTRO - Por que importa
    // ====================================
    const slide3 = pptx.addSlide()
    slide3.background = { color: COLORS.darkBg }

    slide3.addShape("roundRect", {
        x: 4.3, y: 1.2, w: 1.4, h: 1.2,
        fill: { color: COLORS.terracotta }
    })
    slide3.addText("?", {
        x: 4.3, y: 1.35, w: 1.4, h: 1,
        fontSize: 48, color: COLORS.white, bold: true,
        align: "center", fontFace: "Arial"
    })

    slide3.addText("Por que isso importa?", {
        x: 0, y: 2.5, w: "100%", h: 0.6,
        fontSize: 36, color: COLORS.white, bold: true,
        align: "center", fontFace: "Arial"
    })

    slide3.addText("A escolha entre consorcio, financiamento ou pagamento a vista pode representar uma diferenca de milhares de reais no seu bolso - e anos na sua vida financeira.", {
        x: 1, y: 3.3, w: 8, h: 0.9,
        fontSize: 18, color: "AAAAAA",
        align: "center", fontFace: "Arial"
    })

    slide3.addShape("roundRect", {
        x: 1.5, y: 4.4, w: 7, h: 0.6,
        fill: { color: COLORS.terracotta, transparency: 80 },
        line: { color: COLORS.terracotta, width: 1 }
    })
    slide3.addText("Decisoes financeiras inteligentes comecam com conhecimento.", {
        x: 1.5, y: 4.5, w: 7, h: 0.5,
        fontSize: 14, color: COLORS.white, align: "center", fontFace: "Arial"
    })

    // ====================================
    // SLIDE 4: CONSÓRCIO
    // ====================================
    const slide4 = pptx.addSlide()
    slide4.background = { color: COLORS.cream }

    slide4.addText("Autofinanciamento Coletivo", {
        x: 0.5, y: 0.5, w: 4, h: 0.3,
        fontSize: 11, color: COLORS.olive, bold: true, fontFace: "Arial"
    })

    slide4.addText("O que é\nConsórcio?", {
        x: 0.5, y: 0.9, w: 4, h: 1,
        fontSize: 32, color: COLORS.dark, bold: true, fontFace: "Arial"
    })

    slide4.addText("Um sistema onde um grupo de pessoas contribui mensalmente para um fundo comum, com contemplação por sorteio ou lance.", {
        x: 0.5, y: 2, w: 4, h: 0.8,
        fontSize: 14, color: COLORS.olive, fontFace: "Arial"
    })

    // Stat box
    slide4.addShape("roundRect", {
        x: 0.5, y: 3.8, w: 4, h: 1.2,
        fill: { color: COLORS.white },
        shadow: { type: "outer", blur: 4, offset: 2, angle: 45, opacity: 0.1 }
    })
    slide4.addText("0%", {
        x: 1.5, y: 4, w: 2, h: 0.5,
        fontSize: 28, color: COLORS.dark, bold: true, fontFace: "Arial"
    })
    slide4.addText("de juros compostos", {
        x: 1.5, y: 4.5, w: 2.5, h: 0.3,
        fontSize: 12, color: COLORS.olive, fontFace: "Arial"
    })

    // Features
    const consorcioFeatures = [
        "Sem juros - apenas taxa de administracao",
        "Contemplacao por sorteio ou lance",
        "Prazo definido (60 a 200 meses)",
        "Carta de credito no valor contratado",
        "Ideal para quem pode esperar"
    ]

    consorcioFeatures.forEach((feat, i) => {
        slide4.addShape("roundRect", {
            x: 5, y: 0.8 + i * 0.9, w: 4.5, h: 0.75,
            fill: { color: COLORS.white, transparency: 20 }
        })
        slide4.addText("*  " + feat, {
            x: 5.2, y: 0.95 + i * 0.9, w: 4.2, h: 0.5,
            fontSize: 12, color: COLORS.dark, fontFace: "Arial"
        })
    })

    slide4.addShape("rect", {
        x: 0, y: 5.45, w: 10, h: 0.08,
        fill: { color: COLORS.olive }
    })

    // Logo
    slide4.addImage({
        path: logoDark,
        x: 0.5, y: 0.4, w: 1.5, h: 0.35
    })

    // ====================================
    // SLIDE 5: FINANCIAMENTO
    // ====================================
    const slide5 = pptx.addSlide()
    slide5.background = { color: COLORS.cream }

    slide5.addText("Crédito Bancário", {
        x: 0.5, y: 0.5, w: 4, h: 0.3,
        fontSize: 11, color: COLORS.terracotta, bold: true, fontFace: "Arial"
    })

    slide5.addText("O que é\nFinanciamento?", {
        x: 0.5, y: 0.9, w: 4, h: 1,
        fontSize: 32, color: COLORS.dark, bold: true, fontFace: "Arial"
    })

    slide5.addText("Emprestimo bancario para aquisicao imediata de um bem, com pagamento parcelado acrescido de juros.", {
        x: 0.5, y: 2, w: 4, h: 0.8,
        fontSize: 14, color: COLORS.olive, fontFace: "Arial"
    })

    // Stat box
    slide5.addShape("roundRect", {
        x: 0.5, y: 3.8, w: 4, h: 1.2,
        fill: { color: COLORS.white },
        shadow: { type: "outer", blur: 4, offset: 2, angle: 45, opacity: 0.1 }
    })
    slide5.addText("+60%", {
        x: 1.5, y: 4, w: 2, h: 0.5,
        fontSize: 28, color: COLORS.dark, bold: true, fontFace: "Arial"
    })
    slide5.addText("custo total tipico com juros", {
        x: 1.5, y: 4.5, w: 2.5, h: 0.3,
        fontSize: 12, color: COLORS.olive, fontFace: "Arial"
    })

    const financiamentoFeatures = [
        "Acesso imediato ao bem",
        "Juros compostos (CET pode dobrar valor)",
        "Parcelas fixas ou variaveis",
        "Bem fica alienado ate quitacao",
        "Exige analise de credito rigorosa"
    ]

    financiamentoFeatures.forEach((feat, i) => {
        slide5.addShape("roundRect", {
            x: 5, y: 0.8 + i * 0.9, w: 4.5, h: 0.75,
            fill: { color: COLORS.white, transparency: 20 }
        })
        slide5.addText("*  " + feat, {
            x: 5.2, y: 0.95 + i * 0.9, w: 4.2, h: 0.5,
            fontSize: 12, color: COLORS.dark, fontFace: "Arial"
        })
    })

    slide5.addShape("rect", {
        x: 0, y: 5.45, w: 10, h: 0.08,
        fill: { color: COLORS.terracotta }
    })

    // Logo
    slide5.addImage({
        path: logoDark,
        x: 0.5, y: 0.4, w: 1.5, h: 0.35
    })

    // ====================================
    // SLIDE 6: À VISTA
    // ====================================
    const slide6 = pptx.addSlide()
    slide6.background = { color: COLORS.cream }

    slide6.addText("Pagamento Integral", {
        x: 0.5, y: 0.5, w: 4, h: 0.3,
        fontSize: 11, color: COLORS.teal, bold: true, fontFace: "Arial"
    })

    slide6.addText("Pagamento\nA Vista", {
        x: 0.5, y: 0.9, w: 4, h: 1,
        fontSize: 32, color: COLORS.dark, bold: true, fontFace: "Arial"
    })

    slide6.addText("Aquisicao do bem com pagamento integral no ato da compra, utilizando recursos proprios acumulados.", {
        x: 0.5, y: 2, w: 4, h: 0.8,
        fontSize: 14, color: COLORS.olive, fontFace: "Arial"
    })

    // Stat box
    slide6.addShape("roundRect", {
        x: 0.5, y: 3.8, w: 4, h: 1.2,
        fill: { color: COLORS.white },
        shadow: { type: "outer", blur: 4, offset: 2, angle: 45, opacity: 0.1 }
    })
    slide6.addText("-20%", {
        x: 1.5, y: 4, w: 2, h: 0.5,
        fontSize: 28, color: COLORS.dark, bold: true, fontFace: "Arial"
    })
    slide6.addText("desconto potencial negociando", {
        x: 1.5, y: 4.5, w: 2.8, h: 0.3,
        fontSize: 12, color: COLORS.olive, fontFace: "Arial"
    })

    const avistaFeatures = [
        "Descontos significativos (5% a 20%)",
        "Sem compromisso futuro",
        "Patrimonio livre de dividas",
        "Poder de negociacao maximo",
        "Requer disciplina de poupanca previa"
    ]

    avistaFeatures.forEach((feat, i) => {
        slide6.addShape("roundRect", {
            x: 5, y: 0.8 + i * 0.9, w: 4.5, h: 0.75,
            fill: { color: COLORS.white, transparency: 20 }
        })
        slide6.addText("*  " + feat, {
            x: 5.2, y: 0.95 + i * 0.9, w: 4.2, h: 0.5,
            fontSize: 12, color: COLORS.dark, fontFace: "Arial"
        })
    })

    slide6.addShape("rect", {
        x: 0, y: 5.45, w: 10, h: 0.08,
        fill: { color: COLORS.teal }
    })

    // Logo
    slide6.addImage({
        path: logoDark,
        x: 0.5, y: 0.4, w: 1.5, h: 0.35
    })

    // ====================================
    // SLIDE 7: COMPARISON TABLE
    // ====================================
    const slide7 = pptx.addSlide()
    slide7.background = { color: COLORS.lightCream }

    slide7.addText("Comparativo Lado a Lado", {
        x: 0.5, y: 0.4, w: 6, h: 0.5,
        fontSize: 24, color: COLORS.dark, bold: true, fontFace: "Arial"
    })

    // Table
    const tableData = [
        [{ text: "Criterio", options: { fill: "EEEEEE", bold: true } },
        { text: "Consorcio", options: { fill: COLORS.olive, color: "FFFFFF", bold: true } },
        { text: "Financiamento", options: { fill: COLORS.terracotta, color: "FFFFFF", bold: true } },
        { text: "A Vista", options: { fill: COLORS.teal, color: "FFFFFF", bold: true } }],
        [{ text: "Custo Total" }, { text: "Menor (so taxa adm.)" }, { text: "Maior (+60% tipico)" }, { text: "Minimo (-desconto)" }],
        [{ text: "Tempo para ter bem" }, { text: "Incerto (sorteio)" }, { text: "Imediato" }, { text: "Imediato" }],
        [{ text: "Risco Financeiro" }, { text: "Baixo" }, { text: "Alto" }, { text: "Zero" }],
        [{ text: "Flexibilidade" }, { text: "Media" }, { text: "Alta" }, { text: "Maxima" }],
        [{ text: "Ideal para" }, { text: "Quem pode esperar" }, { text: "Quem precisa agora" }, { text: "Quem tem reserva" }]
    ]

    slide7.addTable(tableData, {
        x: 0.3, y: 1.1, w: 9.4,
        fontSize: 11,
        fontFace: "Arial",
        color: COLORS.dark,
        border: { type: "solid", pt: 0.5, color: "DDDDDD" },
        align: "center",
        valign: "middle",
        rowH: 0.6
    })

    slide7.addShape("rect", {
        x: 0, y: 5.45, w: 3.33, h: 0.08,
        fill: { color: COLORS.olive }
    })
    slide7.addShape("rect", {
        x: 3.33, y: 5.45, w: 3.34, h: 0.08,
        fill: { color: COLORS.terracotta }
    })
    slide7.addShape("rect", {
        x: 6.67, y: 5.45, w: 3.33, h: 0.08,
        fill: { color: COLORS.teal }
    })

    // ====================================
    // SLIDE 8: NUMBERS - Impacto Real
    // ====================================
    const slide8 = pptx.addSlide()
    slide8.background = { color: COLORS.darkBg }

    slide8.addText("O Impacto Real nos Números", {
        x: 0.5, y: 0.4, w: 6, h: 0.5,
        fontSize: 24, color: COLORS.white, bold: true, fontFace: "Arial"
    })

    slide8.addText("Exemplo prático: Carro de R$ 80.000", {
        x: 0.5, y: 0.9, w: 6, h: 0.3,
        fontSize: 14, color: "888888", fontFace: "Arial"
    })

    // À Vista card
    slide8.addShape("roundRect", {
        x: 0.4, y: 1.5, w: 3, h: 3.5,
        fill: { color: COLORS.teal }
    })
    slide8.addText("À Vista", {
        x: 0.6, y: 1.7, w: 2.5, h: 0.3,
        fontSize: 14, color: "FFFFFF", fontFace: "Arial", transparency: 30
    })
    slide8.addText("R$ 72.000", {
        x: 0.6, y: 2.5, w: 2.5, h: 0.6,
        fontSize: 32, color: "FFFFFF", bold: true, fontFace: "Arial"
    })
    slide8.addText("com 10% de desconto", {
        x: 0.6, y: 3.1, w: 2.5, h: 0.3,
        fontSize: 11, color: "FFFFFF", transparency: 40, fontFace: "Arial"
    })
    slide8.addText("[OK] Economia de R$ 8.000", {
        x: 0.6, y: 4.2, w: 2.5, h: 0.3,
        fontSize: 12, color: "FFFFFF", fontFace: "Arial"
    })

    // Consórcio card
    slide8.addShape("roundRect", {
        x: 3.5, y: 1.5, w: 3, h: 3.5,
        fill: { color: COLORS.olive }
    })
    slide8.addText("Consórcio", {
        x: 3.7, y: 1.7, w: 2.5, h: 0.3,
        fontSize: 14, color: "FFFFFF", fontFace: "Arial", transparency: 30
    })
    slide8.addText("R$ 92.000", {
        x: 3.7, y: 2.5, w: 2.5, h: 0.6,
        fontSize: 32, color: "FFFFFF", bold: true, fontFace: "Arial"
    })
    slide8.addText("taxa de 15% em 60 meses", {
        x: 3.7, y: 3.1, w: 2.5, h: 0.3,
        fontSize: 11, color: "FFFFFF", transparency: 40, fontFace: "Arial"
    })
    slide8.addText("[+] +R$ 12.000 vs. a vista", {
        x: 3.7, y: 4.2, w: 2.5, h: 0.3,
        fontSize: 12, color: "FFFFFF", fontFace: "Arial"
    })

    // Financiamento card
    slide8.addShape("roundRect", {
        x: 6.6, y: 1.5, w: 3, h: 3.5,
        fill: { color: COLORS.terracotta }
    })
    slide8.addText("Financiamento", {
        x: 6.8, y: 1.7, w: 2.5, h: 0.3,
        fontSize: 14, color: "FFFFFF", fontFace: "Arial", transparency: 30
    })
    slide8.addText("R$ 128.000", {
        x: 6.8, y: 2.5, w: 2.5, h: 0.6,
        fontSize: 32, color: "FFFFFF", bold: true, fontFace: "Arial"
    })
    slide8.addText("juros de 1.5% a.m. em 48x", {
        x: 6.8, y: 3.1, w: 2.5, h: 0.3,
        fontSize: 11, color: "FFFFFF", transparency: 40, fontFace: "Arial"
    })
    slide8.addText("[!] +R$ 56.000 vs. a vista", {
        x: 6.8, y: 4.2, w: 2.5, h: 0.3,
        fontSize: 12, color: "FFFFFF", fontFace: "Arial"
    })

    // ====================================
    // SLIDE 9: DECISION - Qual Escolher
    // ====================================
    const slide9 = pptx.addSlide()
    slide9.background = { color: COLORS.lightCream }

    slide9.addText("Qual Escolher?", {
        x: 0.5, y: 0.4, w: 6, h: 0.5,
        fontSize: 24, color: COLORS.dark, bold: true, fontFace: "Arial"
    })

    // Consórcio column
    slide9.addShape("roundRect", {
        x: 0.4, y: 1.1, w: 3, h: 0.6,
        fill: { color: COLORS.olive }
    })
    slide9.addText("Escolha Consórcio", {
        x: 0.5, y: 1.2, w: 2.8, h: 0.4,
        fontSize: 14, color: "FFFFFF", bold: true, fontFace: "Arial"
    })

    const consorcioReasons = ["Você não tem pressa", "Quer fugir dos juros", "Tem disciplina para parcelas", "Planeja médio/longo prazo"]
    consorcioReasons.forEach((r, i) => {
        slide9.addText("●  " + r, {
            x: 0.5, y: 1.9 + i * 0.45, w: 2.8, h: 0.4,
            fontSize: 11, color: COLORS.dark, fontFace: "Arial"
        })
    })

    // Financiamento column
    slide9.addShape("roundRect", {
        x: 3.5, y: 1.1, w: 3, h: 0.6,
        fill: { color: COLORS.terracotta }
    })
    slide9.addText("Escolha Financiamento", {
        x: 3.6, y: 1.2, w: 2.8, h: 0.4,
        fontSize: 14, color: "FFFFFF", bold: true, fontFace: "Arial"
    })

    const finReasons = ["Precisa do bem agora", "Tem renda para juros", "Bem gera retorno", "Não tem reserva"]
    finReasons.forEach((r, i) => {
        slide9.addText("●  " + r, {
            x: 3.6, y: 1.9 + i * 0.45, w: 2.8, h: 0.4,
            fontSize: 11, color: COLORS.dark, fontFace: "Arial"
        })
    })

    // À Vista column
    slide9.addShape("roundRect", {
        x: 6.6, y: 1.1, w: 3, h: 0.6,
        fill: { color: COLORS.teal }
    })
    slide9.addText("Escolha À Vista", {
        x: 6.7, y: 1.2, w: 2.8, h: 0.4,
        fontSize: 14, color: "FFFFFF", bold: true, fontFace: "Arial"
    })

    const avistaReasons = ["Tem reserva disponível", "Mantém emergência", "Consegue descontos", "Quer liberdade imediata"]
    avistaReasons.forEach((r, i) => {
        slide9.addText("●  " + r, {
            x: 6.7, y: 1.9 + i * 0.45, w: 2.8, h: 0.4,
            fontSize: 11, color: COLORS.dark, fontFace: "Arial"
        })
    })

    slide9.addShape("rect", {
        x: 0, y: 5.45, w: 3.33, h: 0.08,
        fill: { color: COLORS.olive }
    })
    slide9.addShape("rect", {
        x: 3.33, y: 5.45, w: 3.34, h: 0.08,
        fill: { color: COLORS.terracotta }
    })
    slide9.addShape("rect", {
        x: 6.67, y: 5.45, w: 3.33, h: 0.08,
        fill: { color: COLORS.teal }
    })

    // ====================================
    // SLIDE 10: TIPS - Dicas de Ouro
    // ====================================
    const slide10 = pptx.addSlide()
    slide10.background = { color: COLORS.cream }

    slide10.addText("DICAS DE OURO", {
        x: 0.5, y: 0.4, w: 6, h: 0.5,
        fontSize: 24, color: COLORS.dark, bold: true, fontFace: "Arial"
    })

    const tips = [
        { num: "01", text: "Sempre calcule o CET (Custo Efetivo Total) antes de financiar", color: COLORS.terracotta },
        { num: "02", text: "No consorcio, pesquise a reputacao da administradora no Banco Central", color: COLORS.olive },
        { num: "03", text: "Para compras a vista, negocie - vendedores adoram liquidez", color: COLORS.teal },
        { num: "04", text: "Nunca comprometa mais de 30% da renda liquida com parcelas", color: COLORS.terracotta },
        { num: "05", text: "Se financiar, faca amortizacoes extras sempre que possivel", color: COLORS.olive }
    ]

    tips.forEach((tip, i) => {
        slide10.addShape("roundRect", {
            x: 0.5, y: 1 + i * 0.85, w: 9, h: 0.75,
            fill: { color: COLORS.white },
            shadow: { type: "outer", blur: 2, offset: 1, angle: 45, opacity: 0.1 }
        })
        slide10.addShape("roundRect", {
            x: 0.6, y: 1.08 + i * 0.85, w: 0.6, h: 0.6,
            fill: { color: tip.color }
        })
        slide10.addText(tip.num, {
            x: 0.6, y: 1.18 + i * 0.85, w: 0.6, h: 0.4,
            fontSize: 14, color: "FFFFFF", bold: true, align: "center", fontFace: "Arial"
        })
        slide10.addText(tip.text, {
            x: 1.4, y: 1.2 + i * 0.85, w: 7.8, h: 0.5,
            fontSize: 13, color: COLORS.dark, fontFace: "Arial"
        })
    })

    slide10.addShape("rect", {
        x: 0, y: 5.45, w: 3.33, h: 0.08,
        fill: { color: COLORS.terracotta }
    })
    slide10.addShape("rect", {
        x: 3.33, y: 5.45, w: 3.34, h: 0.08,
        fill: { color: COLORS.olive }
    })
    slide10.addShape("rect", {
        x: 6.67, y: 5.45, w: 3.33, h: 0.08,
        fill: { color: COLORS.teal }
    })

    // ====================================
    // SLIDE 11: CLOSING
    // ====================================
    const slide11 = pptx.addSlide()
    slide11.background = { color: COLORS.terracotta }

    slide11.addText("Tome Decisões\nFinanceiras Inteligentes", {
        x: 0, y: 1.5, w: "100%", h: 1.5,
        fontSize: 40, color: COLORS.white, bold: true,
        align: "center", fontFace: "Arial"
    })

    slide11.addText("O melhor método de pagamento é aquele que se alinha com sua realidade, seus objetivos e seu momento de vida.", {
        x: 1, y: 3.2, w: 8, h: 0.7,
        fontSize: 16, color: "FFFFFF", transparency: 20,
        align: "center", fontFace: "Arial"
    })

    slide11.addShape("roundRect", {
        x: 2.5, y: 4.1, w: 5, h: 0.7,
        fill: { color: COLORS.white }
    })
    slide11.addText("Fale com um especialista Dotless →", {
        x: 2.5, y: 4.2, w: 5, h: 0.5,
        fontSize: 14, color: COLORS.terracotta, bold: true,
        align: "center", fontFace: "Arial"
    })

    slide11.addText("contato@dotless.io  •  www.dotless.io", {
        x: 0, y: 5, w: "100%", h: 0.3,
        fontSize: 11, color: "FFFFFF", transparency: 40,
        align: "center", fontFace: "Arial"
    })

    // Generate and download
    await pptx.writeFile({ fileName: `${projectData.name.replace(/[^a-zA-Z0-9]/g, "_")}.pptx` })
}

export default function ProjectViewPage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPresentationMode, setIsPresentationMode] = useState(false)
    const [isExporting, setIsExporting] = useState(false)
    const slideRef = useRef<HTMLDivElement>(null)
    const totalSlides = projectData.slides.length

    const nextSlide = useCallback(() => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1)), [totalSlides])
    const prevSlide = useCallback(() => setCurrentSlide(prev => Math.max(prev - 1, 0)), [])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault()
                nextSlide()
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault()
                prevSlide()
            } else if (e.key === 'Escape') {
                setIsPresentationMode(false)
            } else if (e.key === 'f' || e.key === 'F') {
                setIsPresentationMode(prev => !prev)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [nextSlide, prevSlide])

    // Fullscreen API
    const togglePresentationMode = () => {
        if (!isPresentationMode) {
            document.documentElement.requestFullscreen?.()
            setIsPresentationMode(true)
        } else {
            document.exitFullscreen?.()
            setIsPresentationMode(false)
        }
    }

    // Download as PDF function - uses native print for best compatibility
    const downloadPDF = async () => {
        if (isExporting) return

        setIsExporting(true)

        try {
            // Create a new window with all slides for printing
            const printWindow = window.open('', '_blank')
            if (!printWindow) {
                alert('Por favor, permita pop-ups para baixar o PDF.')
                setIsExporting(false)
                return
            }

            // Get the current slide container content for each slide
            const slideContents: string[] = []
            const originalSlide = currentSlide

            // Capture each slide's HTML
            for (let i = 0; i < totalSlides; i++) {
                setCurrentSlide(i)
                await new Promise(resolve => setTimeout(resolve, 100))

                if (slideRef.current) {
                    slideContents.push(slideRef.current.outerHTML)
                }
            }

            setCurrentSlide(originalSlide)

            // Build the print document
            const printContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>${projectData.name}</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        @page { 
                            size: landscape; 
                            margin: 0; 
                        }
                        @media print {
                            body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                            .slide-page { page-break-after: always; page-break-inside: avoid; }
                            .slide-page:last-child { page-break-after: auto; }
                        }
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            background: #1a1a1a;
                        }
                        .slide-page {
                            width: 100vw;
                            height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #1a1a1a;
                        }
                        .slide-container {
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                        }
                    </style>
                </head>
                <body>
                    ${slideContents.map((content, i) => `
                        <div class="slide-page">
                            <div class="slide-container">${content}</div>
                        </div>
                    `).join('')}
                    <script>
                        // Copy styles from parent
                        const styles = Array.from(window.opener.document.querySelectorAll('style, link[rel="stylesheet"]'));
                        styles.forEach(s => document.head.appendChild(s.cloneNode(true)));
                        
                        // Print after styles loaded
                        setTimeout(() => {
                            window.print();
                            window.close();
                        }, 1000);
                    </script>
                </body>
                </html>
            `

            printWindow.document.write(printContent)
            printWindow.document.close()

        } catch (error) {
            console.error('Error generating PDF:', error)
            alert('Erro ao gerar PDF: ' + (error instanceof Error ? error.message : 'Erro desconhecido'))
        } finally {
            setIsExporting(false)
        }
    }

    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsPresentationMode(false)
            }
        }
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }, [])

    const slide = projectData.slides[currentSlide]

    return (
        <div className="min-h-screen flex flex-col bg-[#1a1a1a]">
            <DashboardHeader
                title={projectData.name}
                description={`Projeto • ${projectData.template}`}
            />

            <div className="flex-1 p-6 flex flex-col gap-4">
                {/* Toolbar */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild className="text-white/70 hover:text-white">
                            <Link href="/dashboard/projects">
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                Voltar
                            </Link>
                        </Button>
                        <Badge variant="warning">Rascunho</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                            <Pencil className="h-4 w-4 mr-1" />
                            Editar
                        </Button>
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10" onClick={togglePresentationMode}>
                            <Maximize2 className="h-4 w-4 mr-1" />
                            Apresentar
                        </Button>
                        <Button size="sm" className="bg-[#dd6b44] hover:bg-[#dd6b44]/90" onClick={downloadPPTX}>
                            <Download className="h-4 w-4 mr-1" />
                            Baixar PPTX
                        </Button>
                    </div>
                </div>

                {/* Main Slide View */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-full max-w-6xl">
                        <div ref={slideRef} className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">

                            {/* ============================================ */}
                            {/* SLIDE 1: COVER - Premium Hero */}
                            {/* ============================================ */}
                            {slide.type === "cover" && (
                                <div className="w-full h-full relative overflow-hidden">
                                    {/* Animated Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]" />

                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#dd6b44]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6c6d5e]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />

                                    {/* Grid Pattern Overlay */}
                                    <div className="absolute inset-0 opacity-5" style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                                        backgroundSize: '50px 50px'
                                    }} />

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col items-center justify-center p-16 text-center">
                                        {/* Logo */}
                                        <div className="mb-12">
                                            <img
                                                src="/assets/dotless-logo.png"
                                                alt="Dotless"
                                                className="h-10 brightness-0 invert opacity-80"
                                            />
                                        </div>

                                        {/* Badge */}
                                        <div className="mb-8">
                                            <span className="px-4 py-2 bg-[#dd6b44]/20 border border-[#dd6b44]/30 rounded-full text-[#dd6b44] text-sm font-medium tracking-wider uppercase">
                                                Guia Completo
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h1 className="text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
                                            Consórcio, Financiamento
                                            <br />
                                            <span className="text-[#dd6b44]">
                                                e À Vista
                                            </span>
                                        </h1>

                                        {/* Subtitle */}
                                        <p className="mt-8 text-xl text-white/60 max-w-2xl leading-relaxed">
                                            Entenda os detalhes e principais diferenças para tomar
                                            <span className="text-white font-medium"> decisões financeiras inteligentes</span>
                                        </p>

                                        {/* Decorative Line */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dd6b44] to-transparent" />
                                    </div>
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 2: AGENDA - Timeline Style */}
                            {/* ============================================ */}
                            {slide.type === "agenda" && (
                                <div className="w-full h-full relative overflow-hidden bg-[#ecebe7]">
                                    {/* Decorative */}
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#dd6b44]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                                    <div className="relative h-full p-12">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-12">
                                            <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                            <span className="text-sm text-[#6c6d5e] font-medium">01 / 11</span>
                                        </div>

                                        {/* Title */}
                                        <div className="mb-10">
                                            <span className="text-sm font-semibold text-[#dd6b44] tracking-wider uppercase">Agenda</span>
                                            <h2 className="text-4xl font-bold text-[#272727] mt-2">O que você vai aprender</h2>
                                        </div>

                                        {/* Timeline Items */}
                                        <div className="grid grid-cols-2 gap-6">
                                            {[
                                                { num: "01", text: "Por que entender as formas de pagamento", icon: Target },
                                                { num: "02", text: "Consórcio: como funciona", icon: Users },
                                                { num: "03", text: "Financiamento: prós e contras", icon: Building2 },
                                                { num: "04", text: "Pagamento à vista: vantagens", icon: Banknote },
                                                { num: "05", text: "Comparativo detalhado", icon: TrendingUp },
                                                { num: "06", text: "Qual escolher para seu perfil", icon: Lightbulb }
                                            ].map((item, i) => (
                                                <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300">
                                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex items-center justify-center shadow-lg shadow-[#dd6b44]/20">
                                                        <item.icon className="h-6 w-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-bold text-[#dd6b44]">{item.num}</span>
                                                        <p className="text-[#272727] font-medium">{item.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dd6b44] via-[#6c6d5e] to-[#dd6b44]" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 3: INTRO - Impact Statement */}
                            {/* ============================================ */}
                            {slide.type === "intro" && (
                                <div className="w-full h-full relative overflow-hidden">
                                    {/* Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#272727] via-[#1a1a1a] to-[#272727]" />

                                    {/* Decorative Circles */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />

                                    {/* Accent Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#dd6b44]/30 rounded-full blur-[80px]" />

                                    <div className="relative h-full flex flex-col items-center justify-center p-16 text-center">
                                        {/* Question Mark Icon */}
                                        <div className="mb-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex items-center justify-center shadow-2xl shadow-[#dd6b44]/30">
                                            <span className="text-4xl font-bold text-white">?</span>
                                        </div>

                                        <h2 className="text-5xl font-bold text-white mb-8">Por que isso importa?</h2>

                                        <p className="text-2xl text-white/70 max-w-3xl leading-relaxed mb-10">
                                            A escolha entre consórcio, financiamento ou pagamento à vista pode representar uma diferença de
                                            <span className="text-[#dd6b44] font-semibold"> milhares de reais </span>
                                            no seu bolso — e
                                            <span className="text-[#dd6b44] font-semibold"> anos na sua vida financeira</span>.
                                        </p>

                                        {/* Highlight Box */}
                                        <div className="px-8 py-5 bg-gradient-to-r from-[#dd6b44]/20 to-[#dd6b44]/10 border border-[#dd6b44]/30 rounded-2xl backdrop-blur-sm">
                                            <p className="text-xl text-white font-medium flex items-center gap-3">
                                                <Zap className="h-6 w-6 text-[#dd6b44]" />
                                                Decisões financeiras inteligentes começam com conhecimento.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dd6b44] to-transparent" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 4: CONSÓRCIO */}
                            {/* ============================================ */}
                            {slide.type === "consorcio" && (
                                <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#ecebe7] to-[#e0dfd9]">
                                    {/* Decorative */}
                                    <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-[#6c6d5e]/20 rounded-full blur-[80px]" />

                                    <div className="relative h-full p-12 flex">
                                        {/* Left Side */}
                                        <div className="w-1/2 pr-8 flex flex-col">
                                            <div className="flex items-center justify-between mb-8">
                                                <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                            </div>

                                            <div className="mb-auto">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6c6d5e]/20 rounded-full mb-4">
                                                    <Users className="h-4 w-4 text-[#6c6d5e]" />
                                                    <span className="text-sm font-medium text-[#6c6d5e]">Autofinanciamento Coletivo</span>
                                                </div>

                                                <h2 className="text-4xl font-bold text-[#272727] mb-4">
                                                    O que é
                                                    <span className="block text-[#6c6d5e]">Consórcio?</span>
                                                </h2>

                                                <p className="text-lg text-[#6c6d5e] leading-relaxed">
                                                    Um sistema onde um grupo de pessoas contribui mensalmente para um fundo comum,
                                                    com contemplação por sorteio ou lance.
                                                </p>
                                            </div>

                                            {/* Key Stat */}
                                            <div className="p-6 bg-white rounded-2xl shadow-lg border border-white">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl bg-[#6c6d5e]/10 flex items-center justify-center">
                                                        <Shield className="h-8 w-8 text-[#6c6d5e]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-3xl font-bold text-[#272727]">0%</p>
                                                        <p className="text-[#6c6d5e]">de juros compostos</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Feature Cards */}
                                        <div className="w-1/2 pl-8 flex flex-col justify-center gap-3">
                                            {[
                                                { icon: Shield, text: "Sem juros — apenas taxa de administração" },
                                                { icon: Award, text: "Contemplação por sorteio ou lance" },
                                                { icon: Clock, text: "Prazo definido (60 a 200 meses)" },
                                                { icon: Banknote, text: "Carta de crédito no valor contratado" },
                                                { icon: Target, text: "Ideal para quem pode esperar" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6c6d5e] to-[#5c5d4e] flex items-center justify-center shadow-lg">
                                                        <item.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <p className="text-[#272727] font-medium">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#6c6d5e]" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 5: FINANCIAMENTO */}
                            {/* ============================================ */}
                            {slide.type === "financiamento" && (
                                <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#ecebe7] to-[#e0dfd9]">
                                    {/* Decorative */}
                                    <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] bg-[#dd6b44]/20 rounded-full blur-[80px]" />

                                    <div className="relative h-full p-12 flex">
                                        {/* Left Side */}
                                        <div className="w-1/2 pr-8 flex flex-col">
                                            <div className="flex items-center justify-between mb-8">
                                                <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                            </div>

                                            <div className="mb-auto">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#dd6b44]/20 rounded-full mb-4">
                                                    <Building2 className="h-4 w-4 text-[#dd6b44]" />
                                                    <span className="text-sm font-medium text-[#dd6b44]">Crédito Bancário</span>
                                                </div>

                                                <h2 className="text-4xl font-bold text-[#272727] mb-4">
                                                    O que é
                                                    <span className="block text-[#dd6b44]">Financiamento?</span>
                                                </h2>

                                                <p className="text-lg text-[#6c6d5e] leading-relaxed">
                                                    Empréstimo bancário para aquisição imediata de um bem,
                                                    com pagamento parcelado acrescido de juros.
                                                </p>
                                            </div>

                                            {/* Key Stat */}
                                            <div className="p-6 bg-white rounded-2xl shadow-lg border border-white">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl bg-[#dd6b44]/10 flex items-center justify-center">
                                                        <TrendingUp className="h-8 w-8 text-[#dd6b44]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-3xl font-bold text-[#272727]">+60%</p>
                                                        <p className="text-[#6c6d5e]">custo total típico com juros</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Feature Cards */}
                                        <div className="w-1/2 pl-8 flex flex-col justify-center gap-3">
                                            {[
                                                { icon: Zap, text: "Acesso imediato ao bem" },
                                                { icon: TrendingUp, text: "Juros compostos (CET pode dobrar o valor)" },
                                                { icon: Shield, text: "Parcelas fixas ou variáveis" },
                                                { icon: Building2, text: "Bem fica alienado até quitação" },
                                                { icon: Target, text: "Exige análise de crédito rigorosa" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex items-center justify-center shadow-lg">
                                                        <item.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <p className="text-[#272727] font-medium">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#dd6b44]" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 6: À VISTA */}
                            {/* ============================================ */}
                            {slide.type === "avista" && (
                                <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#ecebe7] to-[#e0dfd9]">
                                    {/* Decorative */}
                                    <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-[#5a7f7a]/20 rounded-full blur-[80px]" />

                                    <div className="relative h-full p-12 flex">
                                        {/* Left Side */}
                                        <div className="w-1/2 pr-8 flex flex-col">
                                            <div className="flex items-center justify-between mb-8">
                                                <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                            </div>

                                            <div className="mb-auto">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#5a7f7a]/20 rounded-full mb-4">
                                                    <Banknote className="h-4 w-4 text-[#5a7f7a]" />
                                                    <span className="text-sm font-medium text-[#5a7f7a]">Pagamento Integral</span>
                                                </div>

                                                <h2 className="text-4xl font-bold text-[#272727] mb-4">
                                                    Pagamento
                                                    <span className="block text-[#5a7f7a]">À Vista</span>
                                                </h2>

                                                <p className="text-lg text-[#6c6d5e] leading-relaxed">
                                                    Aquisição do bem com pagamento integral no ato da compra,
                                                    utilizando recursos próprios acumulados.
                                                </p>
                                            </div>

                                            {/* Key Stat */}
                                            <div className="p-6 bg-white rounded-2xl shadow-lg border border-white">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl bg-[#5a7f7a]/10 flex items-center justify-center">
                                                        <Award className="h-8 w-8 text-[#5a7f7a]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-3xl font-bold text-[#272727]">-20%</p>
                                                        <p className="text-[#6c6d5e]">desconto potencial negociando</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Feature Cards */}
                                        <div className="w-1/2 pl-8 flex flex-col justify-center gap-3">
                                            {[
                                                { icon: Award, text: "Descontos significativos (5% a 20%)" },
                                                { icon: Shield, text: "Sem compromisso futuro" },
                                                { icon: Banknote, text: "Patrimônio livre de dívidas" },
                                                { icon: Zap, text: "Poder de negociação máximo" },
                                                { icon: Target, text: "Requer disciplina de poupança prévia" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5a7f7a] to-[#4a6f6a] flex items-center justify-center shadow-lg">
                                                        <item.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <p className="text-[#272727] font-medium">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#5a7f7a]" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 7: COMPARISON TABLE */}
                            {/* ============================================ */}
                            {slide.type === "comparison" && (
                                <div className="w-full h-full relative overflow-hidden bg-[#f8f7f5]">
                                    <div className="relative h-full p-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                        </div>

                                        <h2 className="text-3xl font-bold text-[#272727] mb-8">Comparativo Lado a Lado</h2>

                                        {/* Premium Table */}
                                        <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                                            <table className="w-full">
                                                <thead>
                                                    <tr>
                                                        <th className="p-4 text-left font-bold text-[#272727] bg-gray-50 w-[20%]">Critério</th>
                                                        <th className="p-4 text-center font-bold text-white bg-[#6c6d5e] w-[26%]">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Users className="h-5 w-5" />
                                                                Consórcio
                                                            </div>
                                                        </th>
                                                        <th className="p-4 text-center font-bold text-white bg-[#dd6b44] w-[26%]">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Building2 className="h-5 w-5" />
                                                                Financiamento
                                                            </div>
                                                        </th>
                                                        <th className="p-4 text-center font-bold text-white bg-[#5a7f7a] w-[26%]">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <Banknote className="h-5 w-5" />
                                                                À Vista
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm">
                                                    {[
                                                        ["Custo Total", "Menor (só taxa adm.)", "Maior (+60% típico)", "Mínimo (-desconto)"],
                                                        ["Tempo para ter o bem", "Incerto (sorteio)", "Imediato", "Imediato"],
                                                        ["Risco Financeiro", "Baixo", "Alto", "Zero"],
                                                        ["Flexibilidade", "Média", "Alta", "Máxima"],
                                                        ["Ideal para", "Quem pode esperar", "Quem precisa agora", "Quem tem reserva"]
                                                    ].map((row, i) => (
                                                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                                                            <td className="p-4 font-semibold text-[#272727] border-r border-gray-100">{row[0]}</td>
                                                            <td className="p-4 text-center text-[#272727] border-r border-gray-100">{row[1]}</td>
                                                            <td className="p-4 text-center text-[#272727] border-r border-gray-100">{row[2]}</td>
                                                            <td className="p-4 text-center text-[#272727]">{row[3]}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6c6d5e] via-[#dd6b44] to-[#5a7f7a]" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 8: NUMBERS IMPACT */}
                            {/* ============================================ */}
                            {slide.type === "numbers" && (
                                <div className="w-full h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#272727] via-[#1f1f1f] to-[#272727]" />

                                    {/* Decorative Grid */}
                                    <div className="absolute inset-0 opacity-5" style={{
                                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                                        backgroundSize: '40px 40px'
                                    }} />

                                    <div className="relative h-full p-10 flex flex-col">
                                        <div className="flex items-center justify-between mb-6">
                                            <img src="/assets/dotless-logo.png" alt="Dotless" className="h-8 brightness-0 invert opacity-80" />
                                        </div>

                                        <h2 className="text-3xl font-bold text-white mb-2">O Impacto Real nos Números</h2>
                                        <p className="text-lg text-white/60 mb-10">Exemplo prático: Carro de <span className="text-[#dd6b44] font-bold">R$ 80.000</span></p>

                                        <div className="flex-1 grid grid-cols-3 gap-6">
                                            {/* À Vista */}
                                            <div className="rounded-2xl p-6 bg-gradient-to-br from-[#5a7f7a] to-[#4a6f6a] flex flex-col shadow-2xl">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Banknote className="h-6 w-6 text-white/80" />
                                                    <span className="text-white/80 font-medium">À Vista</span>
                                                </div>
                                                <p className="text-5xl font-bold text-white mb-2">R$ 72.000</p>
                                                <p className="text-white/70 text-sm mb-auto">com 10% de desconto</p>
                                                <div className="p-3 bg-white/10 rounded-xl mt-4">
                                                    <p className="text-white font-semibold flex items-center gap-2">
                                                        <Award className="h-5 w-5 text-emerald-300" />
                                                        Economia de R$ 8.000
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Consórcio */}
                                            <div className="rounded-2xl p-6 bg-gradient-to-br from-[#6c6d5e] to-[#5c5d4e] flex flex-col shadow-2xl">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Users className="h-6 w-6 text-white/80" />
                                                    <span className="text-white/80 font-medium">Consórcio</span>
                                                </div>
                                                <p className="text-5xl font-bold text-white mb-2">R$ 92.000</p>
                                                <p className="text-white/70 text-sm mb-auto">taxa de 15% em 60 meses</p>
                                                <div className="p-3 bg-white/10 rounded-xl mt-4">
                                                    <p className="text-white font-semibold flex items-center gap-2">
                                                        <Clock className="h-5 w-5 text-amber-300" />
                                                        +R$ 12.000 vs. à vista
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Financiamento */}
                                            <div className="rounded-2xl p-6 bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex flex-col shadow-2xl">
                                                <div className="flex items-center gap-3 mb-6">
                                                    <Building2 className="h-6 w-6 text-white/80" />
                                                    <span className="text-white/80 font-medium">Financiamento</span>
                                                </div>
                                                <p className="text-5xl font-bold text-white mb-2">R$ 128.000</p>
                                                <p className="text-white/70 text-sm mb-auto">juros de 1.5% a.m. em 48x</p>
                                                <div className="p-3 bg-white/10 rounded-xl mt-4">
                                                    <p className="text-white font-semibold flex items-center gap-2">
                                                        <TrendingUp className="h-5 w-5 text-red-300" />
                                                        +R$ 56.000 vs. à vista
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7f7a] via-[#6c6d5e] to-[#dd6b44]" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 9: DECISION GUIDE */}
                            {/* ============================================ */}
                            {slide.type === "decision" && (
                                <div className="w-full h-full relative overflow-hidden bg-[#f8f7f5]">
                                    <div className="relative h-full p-10 flex flex-col">
                                        <div className="flex items-center justify-between mb-6">
                                            <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                        </div>

                                        <h2 className="text-3xl font-bold text-[#272727] mb-8">Qual Escolher?</h2>

                                        <div className="flex-1 grid grid-cols-3 gap-6">
                                            {/* Consórcio */}
                                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                                <div className="p-6 bg-[#6c6d5e]">
                                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                        <Users className="h-5 w-5" />
                                                        Escolha Consórcio
                                                    </h3>
                                                </div>
                                                <div className="p-6 bg-white space-y-3">
                                                    {["Você não tem pressa", "Quer fugir dos juros", "Tem disciplina para manter parcelas", "Planeja para médio/longo prazo"].map((item, i) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <div className="mt-1 w-5 h-5 rounded-full bg-[#6c6d5e]/10 flex items-center justify-center flex-shrink-0">
                                                                <div className="w-2 h-2 rounded-full bg-[#6c6d5e]" />
                                                            </div>
                                                            <span className="text-[#272727] text-sm">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Financiamento */}
                                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                                <div className="p-6 bg-[#dd6b44]">
                                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                        <Building2 className="h-5 w-5" />
                                                        Escolha Financiamento
                                                    </h3>
                                                </div>
                                                <div className="p-6 bg-white space-y-3">
                                                    {["Precisa do bem agora", "Tem renda para parcelas + juros", "O bem gera retorno (trabalho)", "Não tem reserva ainda"].map((item, i) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <div className="mt-1 w-5 h-5 rounded-full bg-[#dd6b44]/10 flex items-center justify-center flex-shrink-0">
                                                                <div className="w-2 h-2 rounded-full bg-[#dd6b44]" />
                                                            </div>
                                                            <span className="text-[#272727] text-sm">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* À Vista */}
                                            <div className="rounded-2xl overflow-hidden shadow-lg">
                                                <div className="p-6 bg-[#5a7f7a]">
                                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                        <Banknote className="h-5 w-5" />
                                                        Escolha À Vista
                                                    </h3>
                                                </div>
                                                <div className="p-6 bg-white space-y-3">
                                                    {["Tem a reserva disponível", "Mantém emergência intacta", "Consegue negociar descontos", "Quer liberdade imediata"].map((item, i) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <div className="mt-1 w-5 h-5 rounded-full bg-[#5a7f7a]/10 flex items-center justify-center flex-shrink-0">
                                                                <div className="w-2 h-2 rounded-full bg-[#5a7f7a]" />
                                                            </div>
                                                            <span className="text-[#272727] text-sm">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6c6d5e] via-[#dd6b44] to-[#5a7f7a]" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 10: TIPS */}
                            {/* ============================================ */}
                            {slide.type === "tips" && (
                                <div className="w-full h-full relative overflow-hidden bg-[#ecebe7]">
                                    {/* Decorative */}
                                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#dd6b44]/10 rounded-full blur-[100px]" />

                                    <div className="relative h-full p-10 flex flex-col">
                                        <div className="flex items-center justify-between mb-6">
                                            <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                        </div>

                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex items-center justify-center shadow-lg">
                                                <Lightbulb className="h-6 w-6 text-white" />
                                            </div>
                                            <h2 className="text-3xl font-bold text-[#272727]">Dicas de Ouro</h2>
                                        </div>

                                        <div className="flex-1 grid grid-cols-1 gap-4">
                                            {[
                                                { num: "01", text: "Sempre calcule o CET (Custo Efetivo Total) antes de financiar", color: "#dd6b44" },
                                                { num: "02", text: "No consórcio, pesquise a reputação da administradora no Banco Central", color: "#6c6d5e" },
                                                { num: "03", text: "Para compras à vista, negocie — vendedores adoram liquidez", color: "#5a7f7a" },
                                                { num: "04", text: "Nunca comprometa mais de 30% da renda líquida com parcelas", color: "#dd6b44" },
                                                { num: "05", text: "Se financiar, faça amortizações extras sempre que possível", color: "#6c6d5e" }
                                            ].map((tip, i) => (
                                                <div key={i} className="flex items-center gap-6 p-5 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-white">
                                                    <div
                                                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0"
                                                        style={{ background: `linear-gradient(135deg, ${tip.color}, ${tip.color}dd)` }}
                                                    >
                                                        {tip.num}
                                                    </div>
                                                    <p className="text-[#272727] font-medium text-lg">{tip.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dd6b44] via-[#6c6d5e] to-[#5a7f7a]" />
                                </div>
                            )}

                            {/* ============================================ */}
                            {/* SLIDE 11: CLOSING - Premium CTA */}
                            {/* ============================================ */}
                            {slide.type === "closing" && (
                                <div className="w-full h-full relative overflow-hidden">
                                    {/* Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#dd6b44] via-[#c55a38] to-[#b54a28]" />

                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />

                                    {/* Pattern Overlay */}
                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                        backgroundSize: '32px 32px'
                                    }} />

                                    <div className="relative h-full flex flex-col items-center justify-center p-16 text-center">
                                        {/* Logo */}
                                        <div className="mb-12">
                                            <img
                                                src="/assets/dotless-logo.png"
                                                alt="Dotless"
                                                className="h-12 brightness-0 invert"
                                            />
                                        </div>

                                        {/* Title */}
                                        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                                            Tome Decisões
                                            <br />
                                            Financeiras Inteligentes
                                        </h2>

                                        {/* Message */}
                                        <p className="text-xl text-white/80 max-w-2xl mb-12 leading-relaxed">
                                            O melhor método de pagamento é aquele que se alinha com
                                            <span className="text-white font-medium"> sua realidade</span>,
                                            <span className="text-white font-medium"> seus objetivos</span> e
                                            <span className="text-white font-medium"> seu momento de vida</span>.
                                        </p>

                                        {/* CTA Button */}
                                        <button className="group px-10 py-4 bg-white text-[#dd6b44] font-bold text-lg rounded-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center gap-3">
                                            Fale com um especialista Dotless
                                            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        {/* Contact Info */}
                                        <p className="mt-8 text-white/60 text-sm">
                                            contato@dotless.io • www.dotless.io
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex items-center gap-1.5">
                        {projectData.slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentSlide(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx
                                    ? "w-8 bg-[#dd6b44]"
                                    : "w-2 bg-white/30 hover:bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        className="border-white/20 text-white hover:bg-white/10 disabled:opacity-30"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>

                    <span className="text-sm text-white/50 ml-4 font-medium">
                        {currentSlide + 1} / {totalSlides}
                    </span>
                </div>

                {/* Slide Thumbnails */}
                <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 px-4">
                    {projectData.slides.map((s, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`flex-shrink-0 w-28 h-16 rounded-lg overflow-hidden transition-all duration-300 ${currentSlide === idx
                                ? "ring-2 ring-[#dd6b44] ring-offset-2 ring-offset-[#1a1a1a] scale-105"
                                : "opacity-60 hover:opacity-100"
                                }`}
                        >
                            <div className={`w-full h-full flex items-center justify-center text-[9px] font-medium p-1 text-center ${s.type === "closing" ? "bg-gradient-to-br from-[#dd6b44] to-[#c55a38] text-white" :
                                s.type === "intro" || s.type === "cover" || s.type === "numbers" ? "bg-gradient-to-br from-[#272727] to-[#1a1a1a] text-white" :
                                    "bg-[#ecebe7] text-[#272727]"
                                }`}>
                                {s.type === "cover" ? "Capa" :
                                    s.type === "agenda" ? "Agenda" :
                                        s.type === "intro" ? "Introdução" :
                                            s.type === "consorcio" ? "Consórcio" :
                                                s.type === "financiamento" ? "Financiamento" :
                                                    s.type === "avista" ? "À Vista" :
                                                        s.type === "comparison" ? "Comparativo" :
                                                            s.type === "numbers" ? "Números" :
                                                                s.type === "decision" ? "Decisão" :
                                                                    s.type === "tips" ? "Dicas" :
                                                                        "Encerramento"}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* ============================================ */}
            {/* PRESENTATION MODE OVERLAY */}
            {/* ============================================ */}
            {isPresentationMode && (
                <div className="fixed inset-0 z-50 bg-[#1a1a1a] flex items-center justify-center">
                    {/* Exit Button */}
                    <button
                        onClick={togglePresentationMode}
                        className="absolute top-4 right-4 z-[60] p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6 text-white" />
                    </button>

                    {/* Slide Counter */}
                    <div className="absolute top-4 left-4 z-[60] px-4 py-2 bg-white/10 rounded-full text-white text-sm font-medium">
                        {currentSlide + 1} / {totalSlides}
                    </div>

                    {/* Hint */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-white/10 rounded-full text-white/60 text-xs">
                        Setas para navegar • ESC para sair • F para tela cheia
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft className="h-8 w-8 text-white" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <ChevronRight className="h-8 w-8 text-white" />
                    </button>

                    {/* Full Screen Slide - Reuses the same slide from main view */}
                    <div className="w-full h-full flex items-center justify-center p-8">
                        <div
                            className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                            style={{
                                width: 'min(calc(100vw - 64px), calc((100vh - 64px) * 16 / 9))',
                                height: 'min(calc(100vh - 64px), calc((100vw - 64px) * 9 / 16))',
                            }}
                        >
                            {/* All slide content renders here - same as main view */}
                            {slide.type === "cover" && (
                                <div className="w-full h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]" />
                                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#dd6b44]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#6c6d5e]/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3" />
                                    <div className="absolute inset-0 opacity-5" style={{
                                        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                                        backgroundSize: '50px 50px'
                                    }} />
                                    <div className="relative h-full flex flex-col items-center justify-center p-16 text-center">
                                        <div className="mb-12">
                                            <img src="/assets/dotless-logo.png" alt="Dotless" className="h-10 w-auto object-contain brightness-0 invert opacity-80" />
                                        </div>
                                        <div className="mb-8">
                                            <span className="px-4 py-2 bg-[#dd6b44]/20 border border-[#dd6b44]/30 rounded-full text-[#dd6b44] text-lg font-medium tracking-wider uppercase">
                                                Guia Completo
                                            </span>
                                        </div>
                                        <h1 className="text-7xl font-bold text-white leading-tight tracking-tight max-w-4xl">
                                            Consórcio, Financiamento
                                            <br />
                                            <span className="text-[#dd6b44]">e À Vista</span>
                                        </h1>
                                        <p className="mt-8 text-2xl text-white/60 max-w-2xl leading-relaxed">
                                            Entenda os detalhes e principais diferenças para tomar
                                            <span className="text-white font-medium"> decisões financeiras inteligentes</span>
                                        </p>
                                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#dd6b44] to-transparent" />
                                    </div>
                                </div>
                            )}

                            {slide.type === "closing" && (
                                <div className="w-full h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#dd6b44] via-[#c55a38] to-[#b54a28]" />
                                    <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />
                                    <div className="absolute inset-0 opacity-10" style={{
                                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                        backgroundSize: '32px 32px'
                                    }} />
                                    <div className="relative h-full flex flex-col items-center justify-center p-16 text-center">
                                        <div className="mb-12">
                                            <img src="/assets/dotless-logo.png" alt="Dotless" className="h-12 w-auto object-contain brightness-0 invert" />
                                        </div>
                                        <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
                                            Tome Decisões<br />Financeiras Inteligentes
                                        </h2>
                                        <p className="text-2xl text-white/80 max-w-2xl mb-12 leading-relaxed">
                                            O melhor método de pagamento é aquele que se alinha com
                                            <span className="text-white font-medium"> sua realidade</span>,
                                            <span className="text-white font-medium"> seus objetivos</span> e
                                            <span className="text-white font-medium"> seu momento de vida</span>.
                                        </p>
                                        <button className="group px-12 py-5 bg-white text-[#dd6b44] font-bold text-xl rounded-xl shadow-2xl flex items-center gap-3">
                                            Fale com um especialista Dotless
                                            <ChevronRight className="h-6 w-6" />
                                        </button>
                                        <p className="mt-8 text-white/60">contato@dotless.io • www.dotless.io</p>
                                    </div>
                                </div>
                            )}

                            {slide.type === "agenda" && (
                                <div className="w-full h-full relative overflow-hidden bg-[#ecebe7]">
                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#dd6b44]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                                    <div className="relative h-full p-12">
                                        <div className="flex items-center justify-between mb-10">
                                            <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8 w-auto object-contain" />
                                            <span className="text-sm text-[#6c6d5e] font-medium">02 / 11</span>
                                        </div>
                                        <div className="mb-8">
                                            <span className="text-sm font-semibold text-[#dd6b44] tracking-wider uppercase">Agenda</span>
                                            <h2 className="text-4xl font-bold text-[#272727] mt-2">O que você vai aprender</h2>
                                        </div>
                                        <div className="grid grid-cols-2 gap-5">
                                            {[
                                                { num: "01", text: "Por que entender as formas de pagamento", icon: Target },
                                                { num: "02", text: "Consórcio: como funciona", icon: Users },
                                                { num: "03", text: "Financiamento: prós e contras", icon: Building2 },
                                                { num: "04", text: "Pagamento à vista: vantagens", icon: Banknote },
                                                { num: "05", text: "Comparativo detalhado", icon: TrendingUp },
                                                { num: "06", text: "Qual escolher para seu perfil", icon: Lightbulb }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
                                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex items-center justify-center shadow-lg">
                                                        <item.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <span className="text-xs font-bold text-[#dd6b44]">{item.num}</span>
                                                        <p className="text-[#272727] font-medium">{item.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dd6b44] via-[#6c6d5e] to-[#dd6b44]" />
                                </div>
                            )}

                            {slide.type === "intro" && (
                                <div className="w-full h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#272727] via-[#1a1a1a] to-[#272727]" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-[#dd6b44]/30 rounded-full blur-[80px]" />
                                    <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
                                        <div className="mb-6 w-16 h-16 rounded-xl bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex items-center justify-center shadow-2xl">
                                            <span className="text-3xl font-bold text-white">?</span>
                                        </div>
                                        <h2 className="text-4xl font-bold text-white mb-6">Por que isso importa?</h2>
                                        <p className="text-xl text-white/70 max-w-3xl leading-relaxed mb-8">
                                            A escolha entre consórcio, financiamento ou pagamento à vista pode representar uma diferença de
                                            <span className="text-[#dd6b44] font-semibold"> milhares de reais </span>
                                            no seu bolso.
                                        </p>
                                        <div className="px-6 py-4 bg-gradient-to-r from-[#dd6b44]/20 to-[#dd6b44]/10 border border-[#dd6b44]/30 rounded-xl backdrop-blur-sm">
                                            <p className="text-lg text-white font-medium flex items-center gap-3">
                                                <Zap className="h-5 w-5 text-[#dd6b44]" />
                                                Decisões financeiras inteligentes começam com conhecimento.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#dd6b44] to-transparent" />
                                </div>
                            )}

                            {slide.type === "consorcio" && (
                                <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#ecebe7] to-[#e0dfd9]">
                                    {/* Decorative */}
                                    <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-[#6c6d5e]/20 rounded-full blur-[80px]" />

                                    <div className="relative h-full p-12 flex">
                                        {/* Left Side */}
                                        <div className="w-1/2 pr-8 flex flex-col">
                                            <div className="flex items-center justify-between mb-8">
                                                <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                            </div>

                                            <div className="mb-auto">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6c6d5e]/20 rounded-full mb-4">
                                                    <Users className="h-4 w-4 text-[#6c6d5e]" />
                                                    <span className="text-sm font-medium text-[#6c6d5e]">Autofinanciamento Coletivo</span>
                                                </div>

                                                <h2 className="text-4xl font-bold text-[#272727] mb-4">
                                                    O que é
                                                    <span className="block text-[#6c6d5e]">Consórcio?</span>
                                                </h2>

                                                <p className="text-lg text-[#6c6d5e] leading-relaxed">
                                                    Um sistema onde um grupo de pessoas contribui mensalmente para um fundo comum,
                                                    com contemplação por sorteio ou lance.
                                                </p>
                                            </div>

                                            {/* Key Stat */}
                                            <div className="p-6 bg-white rounded-2xl shadow-lg border border-white">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl bg-[#6c6d5e]/10 flex items-center justify-center">
                                                        <Shield className="h-8 w-8 text-[#6c6d5e]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-3xl font-bold text-[#272727]">0%</p>
                                                        <p className="text-[#6c6d5e]">de juros compostos</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Feature Cards */}
                                        <div className="w-1/2 pl-8 flex flex-col justify-center gap-3">
                                            {[
                                                { icon: Shield, text: "Sem juros — apenas taxa de administração" },
                                                { icon: Award, text: "Contemplação por sorteio ou lance" },
                                                { icon: Clock, text: "Prazo definido (60 a 200 meses)" },
                                                { icon: Banknote, text: "Carta de crédito no valor contratado" },
                                                { icon: Target, text: "Ideal para quem pode esperar" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6c6d5e] to-[#5c5d4e] flex items-center justify-center shadow-lg">
                                                        <item.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <p className="text-[#272727] font-medium">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#6c6d5e]" />
                                </div>
                            )}

                            {slide.type === "financiamento" && (
                                <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#ecebe7] to-[#e0dfd9]">
                                    {/* Decorative */}
                                    <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] bg-[#dd6b44]/20 rounded-full blur-[80px]" />

                                    <div className="relative h-full p-12 flex">
                                        {/* Left Side */}
                                        <div className="w-1/2 pr-8 flex flex-col">
                                            <div className="flex items-center justify-between mb-8">
                                                <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                            </div>

                                            <div className="mb-auto">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#dd6b44]/20 rounded-full mb-4">
                                                    <Building2 className="h-4 w-4 text-[#dd6b44]" />
                                                    <span className="text-sm font-medium text-[#dd6b44]">Crédito Bancário</span>
                                                </div>

                                                <h2 className="text-4xl font-bold text-[#272727] mb-4">
                                                    O que é
                                                    <span className="block text-[#dd6b44]">Financiamento?</span>
                                                </h2>

                                                <p className="text-lg text-[#6c6d5e] leading-relaxed">
                                                    Empréstimo bancário para aquisição imediata de um bem,
                                                    com pagamento parcelado acrescido de juros.
                                                </p>
                                            </div>

                                            {/* Key Stat */}
                                            <div className="p-6 bg-white rounded-2xl shadow-lg border border-white">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl bg-[#dd6b44]/10 flex items-center justify-center">
                                                        <TrendingUp className="h-8 w-8 text-[#dd6b44]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-3xl font-bold text-[#272727]">+60%</p>
                                                        <p className="text-[#6c6d5e]">custo total típico com juros</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Feature Cards */}
                                        <div className="w-1/2 pl-8 flex flex-col justify-center gap-3">
                                            {[
                                                { icon: Zap, text: "Acesso imediato ao bem" },
                                                { icon: TrendingUp, text: "Juros compostos (CET pode dobrar o valor)" },
                                                { icon: Shield, text: "Parcelas fixas ou variáveis" },
                                                { icon: Building2, text: "Bem fica alienado até quitação" },
                                                { icon: Target, text: "Exige análise de crédito rigorosa" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex items-center justify-center shadow-lg">
                                                        <item.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <p className="text-[#272727] font-medium">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#dd6b44]" />
                                </div>
                            )}

                            {slide.type === "avista" && (
                                <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#ecebe7] to-[#e0dfd9]">
                                    {/* Decorative */}
                                    <div className="absolute -right-20 -bottom-20 w-[400px] h-[400px] bg-[#5a7f7a]/20 rounded-full blur-[80px]" />

                                    <div className="relative h-full p-12 flex">
                                        {/* Left Side */}
                                        <div className="w-1/2 pr-8 flex flex-col">
                                            <div className="flex items-center justify-between mb-8">
                                                <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-8" />
                                            </div>

                                            <div className="mb-auto">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#5a7f7a]/20 rounded-full mb-4">
                                                    <Banknote className="h-4 w-4 text-[#5a7f7a]" />
                                                    <span className="text-sm font-medium text-[#5a7f7a]">Pagamento Integral</span>
                                                </div>

                                                <h2 className="text-4xl font-bold text-[#272727] mb-4">
                                                    Pagamento
                                                    <span className="block text-[#5a7f7a]">À Vista</span>
                                                </h2>

                                                <p className="text-lg text-[#6c6d5e] leading-relaxed">
                                                    Aquisição do bem com pagamento integral no ato da compra,
                                                    utilizando recursos próprios acumulados.
                                                </p>
                                            </div>

                                            {/* Key Stat */}
                                            <div className="p-6 bg-white rounded-2xl shadow-lg border border-white">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-xl bg-[#5a7f7a]/10 flex items-center justify-center">
                                                        <Award className="h-8 w-8 text-[#5a7f7a]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-3xl font-bold text-[#272727]">-20%</p>
                                                        <p className="text-[#6c6d5e]">desconto potencial negociando</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side - Feature Cards */}
                                        <div className="w-1/2 pl-8 flex flex-col justify-center gap-3">
                                            {[
                                                { icon: Award, text: "Descontos significativos (5% a 20%)" },
                                                { icon: Shield, text: "Sem compromisso futuro" },
                                                { icon: Banknote, text: "Patrimônio livre de dívidas" },
                                                { icon: Zap, text: "Poder de negociação máximo" },
                                                { icon: Target, text: "Requer disciplina de poupança prévia" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-white shadow-sm hover:shadow-md hover:translate-x-1 transition-all duration-300">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5a7f7a] to-[#4a6f6a] flex items-center justify-center shadow-lg">
                                                        <item.icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <p className="text-[#272727] font-medium">{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#5a7f7a]" />
                                </div>
                            )}

                            {slide.type === "comparison" && (
                                <div className="w-full h-full relative overflow-hidden bg-[#f8f7f5]">
                                    <div className="relative h-full p-8">
                                        <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-7 w-auto object-contain mb-4" />
                                        <h2 className="text-2xl font-bold text-[#272727] mb-4">Comparativo Lado a Lado</h2>
                                        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-100">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr>
                                                        <th className="p-3 text-left font-bold text-[#272727] bg-gray-50">Critério</th>
                                                        <th className="p-3 text-center font-bold text-white bg-[#6c6d5e]">Consórcio</th>
                                                        <th className="p-3 text-center font-bold text-white bg-[#dd6b44]">Financiamento</th>
                                                        <th className="p-3 text-center font-bold text-white bg-[#5a7f7a]">À Vista</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {[
                                                        ["Custo Total", "Menor", "Maior (+60%)", "Mínimo"],
                                                        ["Tempo", "Incerto", "Imediato", "Imediato"],
                                                        ["Risco", "Baixo", "Alto", "Zero"],
                                                        ["Flexibilidade", "Média", "Alta", "Máxima"],
                                                        ["Ideal para", "Quem pode esperar", "Quem precisa agora", "Quem tem reserva"]
                                                    ].map((row, i) => (
                                                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                                                            <td className="p-3 font-semibold text-[#272727]">{row[0]}</td>
                                                            <td className="p-3 text-center text-[#272727]">{row[1]}</td>
                                                            <td className="p-3 text-center text-[#272727]">{row[2]}</td>
                                                            <td className="p-3 text-center text-[#272727]">{row[3]}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6c6d5e] via-[#dd6b44] to-[#5a7f7a]" />
                                </div>
                            )}

                            {slide.type === "numbers" && (
                                <div className="w-full h-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#272727] via-[#1f1f1f] to-[#272727]" />
                                    <div className="relative h-full p-8 flex flex-col">
                                        <img src="/assets/dotless-logo.png" alt="Dotless" className="h-7 w-auto object-contain brightness-0 invert opacity-80 mb-4" />
                                        <h2 className="text-2xl font-bold text-white mb-1">O Impacto Real nos Números</h2>
                                        <p className="text-base text-white/60 mb-6">Carro de <span className="text-[#dd6b44] font-bold">R$ 80.000</span></p>
                                        <div className="flex-1 grid grid-cols-3 gap-4">
                                            <div className="rounded-xl p-5 bg-gradient-to-br from-[#5a7f7a] to-[#4a6f6a] flex flex-col">
                                                <div className="flex items-center gap-2 mb-4"><Banknote className="h-5 w-5 text-white/80" /><span className="text-white/80 font-medium text-sm">À Vista</span></div>
                                                <p className="text-4xl font-bold text-white mb-1">R$ 72.000</p>
                                                <p className="text-white/70 text-xs mb-auto">com 10% de desconto</p>
                                                <div className="p-2 bg-white/10 rounded-lg mt-3"><p className="text-white font-medium text-sm flex items-center gap-2"><Award className="h-4 w-4 text-emerald-300" />Economia de R$ 8.000</p></div>
                                            </div>
                                            <div className="rounded-xl p-5 bg-gradient-to-br from-[#6c6d5e] to-[#5c5d4e] flex flex-col">
                                                <div className="flex items-center gap-2 mb-4"><Users className="h-5 w-5 text-white/80" /><span className="text-white/80 font-medium text-sm">Consórcio</span></div>
                                                <p className="text-4xl font-bold text-white mb-1">R$ 92.000</p>
                                                <p className="text-white/70 text-xs mb-auto">taxa de 15% em 60 meses</p>
                                                <div className="p-2 bg-white/10 rounded-lg mt-3"><p className="text-white font-medium text-sm flex items-center gap-2"><Clock className="h-4 w-4 text-amber-300" />+R$ 12.000 vs. à vista</p></div>
                                            </div>
                                            <div className="rounded-xl p-5 bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex flex-col">
                                                <div className="flex items-center gap-2 mb-4"><Building2 className="h-5 w-5 text-white/80" /><span className="text-white/80 font-medium text-sm">Financiamento</span></div>
                                                <p className="text-4xl font-bold text-white mb-1">R$ 128.000</p>
                                                <p className="text-white/70 text-xs mb-auto">juros de 1.5% a.m. em 48x</p>
                                                <div className="p-2 bg-white/10 rounded-lg mt-3"><p className="text-white font-medium text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4 text-red-300" />+R$ 56.000 vs. à vista</p></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5a7f7a] via-[#6c6d5e] to-[#dd6b44]" />
                                </div>
                            )}

                            {slide.type === "decision" && (
                                <div className="w-full h-full relative overflow-hidden bg-[#f8f7f5]">
                                    <div className="relative h-full p-8 flex flex-col">
                                        <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-7 w-auto object-contain mb-4" />
                                        <h2 className="text-2xl font-bold text-[#272727] mb-6">Qual Escolher?</h2>
                                        <div className="flex-1 grid grid-cols-3 gap-4">
                                            {[
                                                { color: "#6c6d5e", title: "Consórcio", icon: Users, items: ["Você não tem pressa", "Quer fugir dos juros", "Tem disciplina", "Planeja longo prazo"] },
                                                { color: "#dd6b44", title: "Financiamento", icon: Building2, items: ["Precisa do bem agora", "Tem renda para juros", "Bem gera retorno", "Não tem reserva"] },
                                                { color: "#5a7f7a", title: "À Vista", icon: Banknote, items: ["Tem a reserva", "Mantém emergência", "Negocia descontos", "Quer liberdade"] }
                                            ].map((opt, i) => (
                                                <div key={i} className="rounded-xl overflow-hidden shadow-lg">
                                                    <div className="p-4" style={{ backgroundColor: opt.color }}>
                                                        <h3 className="text-lg font-bold text-white flex items-center gap-2"><opt.icon className="h-5 w-5" />Escolha {opt.title}</h3>
                                                    </div>
                                                    <div className="p-4 bg-white space-y-2">
                                                        {opt.items.map((item, j) => (
                                                            <div key={j} className="flex items-start gap-2">
                                                                <div className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: opt.color }} />
                                                                <span className="text-[#272727] text-sm">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#6c6d5e] via-[#dd6b44] to-[#5a7f7a]" />
                                </div>
                            )}

                            {slide.type === "tips" && (
                                <div className="w-full h-full relative overflow-hidden bg-[#ecebe7]">
                                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#dd6b44]/10 rounded-full blur-[80px]" />
                                    <div className="relative h-full p-8 flex flex-col">
                                        <img src="/assets/dotless-logo-dark.png" alt="Dotless" className="h-7 w-auto object-contain mb-4" />
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#dd6b44] to-[#c55a38] flex items-center justify-center shadow-lg">
                                                <Lightbulb className="h-5 w-5 text-white" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-[#272727]">Dicas de Ouro</h2>
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 gap-3">
                                            {[
                                                { num: "01", text: "Sempre calcule o CET antes de financiar", color: "#dd6b44" },
                                                { num: "02", text: "No consórcio, pesquise a administradora no BC", color: "#6c6d5e" },
                                                { num: "03", text: "À vista, negocie — vendedores adoram liquidez", color: "#5a7f7a" },
                                                { num: "04", text: "Nunca comprometa mais de 30% da renda", color: "#dd6b44" },
                                                { num: "05", text: "Se financiar, faça amortizações extras", color: "#6c6d5e" }
                                            ].map((tip, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: `linear-gradient(135deg, ${tip.color}, ${tip.color}dd)` }}>
                                                        {tip.num}
                                                    </div>
                                                    <p className="text-[#272727] font-medium">{tip.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dd6b44] via-[#6c6d5e] to-[#5a7f7a]" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
