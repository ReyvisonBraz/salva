/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import Lenis from 'lenis';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Plus, 
  Users, 
  TrendingUp, 
  RefreshCcw, 
  BarChart3,
  LayoutPanelLeft,
  Globe,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  CreditCard,
  Timer,
  Zap,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

const SITE_CONTENT = {
  images: {
    hero: [
      "https://lh3.googleusercontent.com/d/1ojccxv17NrczwTfYoLhQEG3DnesxeQ5Z",
      "https://lh3.googleusercontent.com/d/1E5ttJnf6ysqWjJiqvJ3DdyQVDQ6Zz3_m"
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
    ]
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroImageIdx, setHeroImageIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const orb1X = useTransform(smoothYProgress, [0, 1], ['-10%', '20%']);
  const orb1Y = useTransform(smoothYProgress, [0, 1], ['-10%', '40%']);
  const orb2X = useTransform(smoothYProgress, [0, 1], ['-10%', '-30%']);
  const orb2Y = useTransform(smoothYProgress, [0, 1], ['-10%', '60%']);
  const bgHue = useTransform(smoothYProgress, [0, 0.5, 1], ['0deg', '45deg', '15deg']);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const interval = setInterval(() => {
      setHeroImageIdx(prev => (prev + 1) % SITE_CONTENT.images.hero.length);
    }, 6000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName('group');
      for (const card of cards) {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup Lenis on unmount
    return () => {
      clearInterval(interval);
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const plans = [
    {
      name: "Plano Essencial",
      tagline: 'O "Start" Digital',
      description: "Ideal para quem precisa organizar a casa e começar a atrair clientes de forma profissional.",
      features: [
        { text: "Presença nas Redes Sociais", trigger: "Autoridade e Consistência" },
        { text: "Anúncios no Google e Instagram", trigger: "Urgência e Oportunidade" },
        { text: "Destaque no Google (Local)", trigger: "Prova Social e Conveniência" },
        { text: "Atendimento Automático no WhatsApp", trigger: "Agilidade e Não Perda" },
        { text: "Identidade Visual e Design", trigger: "Estética e Profissionalismo" }
      ],
      icon: <Globe className="w-6 h-6" />,
      highlight: false
    },
    {
      name: "Plano Completo",
      tagline: "Aceleração de Vendas",
      description: "Para empresas que querem profissionalismo total e processos que rodam sozinhos.",
      features: [
        { text: "Site Profissional (Landing Page)", trigger: "Credibilidade e Conversão" },
        { text: "Vídeos Profissionais", trigger: "Engajamento e Conexão" },
        { text: "Estratégia de Vendas Dedicada", trigger: "Especialização e Segurança" },
        { text: "Automação de Renovação e Gestão", trigger: "Eficiência e Previsibilidade" }
      ],
      icon: <Rocket className="w-6 h-6" />,
      highlight: true
    },
    {
      name: "Plano Elite",
      tagline: "Gestão e Automação Total",
      description: "A solução completa para quem quer delegar toda a parte técnica e focar apenas no fechamento.",
      features: [
        { text: "Sincronização de Sistemas", trigger: "Integração e Fluxo" },
        { text: "Painel de Resultados Real-Time", trigger: "Controle e Transparência" },
        { text: "Robôs de Prospecção Automática", trigger: "Inovação e Escalabilidade" },
        { text: "Suporte Prioritário e Consultoria", trigger: "Exclusividade e Segurança" }
      ],
      icon: <ShieldCheck className="w-6 h-6" />,
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden relative" ref={containerRef}>
      {/* Cinematic Noise Overlay */}
      <div className="fixed inset-0 z-[200] pointer-events-none opacity-[0.03] contrast-150 brightness-150" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Scroll Progress Bar at the Top */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[150] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Cinematic Background Orbs - Controlled by Scroll */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          style={{ x: orb1X, y: orb1Y, filter: 'blur(150px)', rotate: bgHue }}
          className="absolute top-0 left-0 w-[60%] h-[60%] rounded-full bg-orange-600/10" 
        />
        <motion.div 
          style={{ x: orb2X, y: orb2Y, filter: 'blur(120px)' }}
          className="absolute bottom-0 right-0 w-[50%] h-[50%] rounded-full bg-red-600/10" 
        />
        <motion.div 
          style={{ 
            opacity: useTransform(smoothYProgress, [0.4, 0.6, 0.8], [0, 1, 0]),
            scale: useTransform(smoothYProgress, [0.4, 0.8], [0.8, 1.2]) 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-orange-500/[0.03] blur-[100px]" 
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${scrolled ? 'py-4 bg-black/60 backdrop-blur-[20px] border-b border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]' : 'py-6 md:py-8'}`}>
        {scrolled && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"
          />
        )}
        <div className="container mx-auto px-6 flex justify-between items-center relative">
          <div className="flex items-center gap-2 group cursor-pointer z-[120]">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-600 to-red-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.3)]">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <span className="text-xl font-bold tracking-tight font-display text-white">SALVA</span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/50">
            {['Home', 'Planos', 'Por que Salva', 'Diferenciais', 'Contato'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white transition-colors relative group">
                {item === 'Home' ? (
                  <span className="px-5 py-2 bg-orange-600/20 border border-orange-500/30 text-orange-500 rounded-full font-semibold shadow-[0_0_15px_rgba(234,88,12,0.1)] transition-transform hover:scale-105 active:scale-95 block">Solicitar Diagnóstico</span>
                ) : item}
              </a>
            ))}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex lg:hidden items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group z-[120]"
          >
            <span className="text-xs font-medium text-white">{isMenuOpen ? 'Fechar' : 'Menu'}</span>
            {isMenuOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <div className="grid grid-cols-2 gap-1 text-white">
                <div className="w-1 h-1 bg-white rounded-full" />
                <div className="w-1 h-1 bg-white rounded-full" />
                <div className="w-1 h-1 bg-white rounded-full" />
                <div className="w-1 h-1 bg-white rounded-full" />
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[110] lg:hidden"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute inset-0 bg-[#050505] flex flex-col justify-center p-12"
            >
              <div className="space-y-8">
                {['Home', 'Planos', 'Por que Salva', 'Diferenciais', 'Contato'].map((item, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={item}
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-4xl font-bold font-display hover:text-orange-500 transition-colors"
                  >
                    {item === 'Home' ? 'Diagnóstico' : item}
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-20 pt-20 border-t border-white/5 space-y-6">
                <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/20">Siga a SALVA</p>
                <div className="flex gap-6">
                  {['Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                    <a key={social} href="#" className="text-sm font-bold text-white/40 hover:text-white transition-colors">{social}</a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-20 md:pb-20 overflow-hidden min-h-screen flex items-center">
        {/* Background Ambient Light */}
        <div className="absolute top-1/4 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-orange-600/10 blur-[120px] md:blur-[180px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="lg:col-span-5 xl:col-span-4 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full w-fit mb-8 group transition-all hover:border-orange-500/30 mx-auto lg:ml-0">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full shadow-[0_0_8px_#f97316]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 group-hover:text-orange-400 transition-colors">Estratégia Digital & Automação</span>
            </div>

            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-[6.5rem] font-bold tracking-tighter font-display leading-[0.85] mb-8 md:mb-10"
            >
              {["SALVA:", "O Poder de", "Expandir."].map((text, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`block ${i === 1 ? 'text-white/40' : i === 2 ? 'text-orange-600 drop-shadow-[0_0_30px_rgba(234,88,12,0.4)]' : ''}`}
                >
                  {text}
                </motion.span>
              ))}
            </motion.h1>

            <p className="text-lg md:text-xl text-white/50 max-w-sm font-light mb-10 md:mb-12 leading-relaxed mx-auto lg:ml-0">
              Cansado de apagar incêndios e ver seu negócio estagnado? Multiplique seus resultados no piloto automático.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(234, 88, 12, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-4 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full overflow-hidden shadow-[0_0_25px_rgba(234,88,12,0.3)] mx-auto lg:ml-0"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="font-bold text-base md:text-lg">Quero começar já</span>
              <div className="w-7 h-7 md:w-8 md:h-8 bg-black/20 rounded-full flex items-center justify-center">
                <Plus className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-500 group-hover:rotate-180" />
              </div>
            </motion.button>
          </motion.div>

          {/* Right Image / Hero Visual */}
          <div className="lg:col-span-7 xl:col-span-8 relative pt-4 lg:pt-0 perspective-[2000px]">
            <motion.div 
              initial={{ opacity: 0, rotateY: 5 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-0"
            >
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[16/10] w-full ml-auto rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={heroImageIdx}
                    src={SITE_CONTENT.images.hero[heroImageIdx]} 
                    initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px) grayscale(1)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px) grayscale(0.2)' }}
                    exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px) grayscale(1)' }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    alt="SALVA Strategic Expert"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-70" />
                
                {/* Statistics Cards - Floating Style */}
                <motion.div 
                  initial={{ opacity: 0, x: 50, translateZ: 100 }}
                  animate={{ opacity: 1, x: 0, translateZ: 100 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  whileHover={{ translateZ: 150, scale: 1.02 }}
                  className="absolute bottom-10 right-10 z-20 w-[240px] md:w-[320px] p-8 md:p-10 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] hidden md:block"
                >
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Motor de Escala</p>
                    <Zap className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-4xl md:text-6xl font-bold font-display tracking-tighter">42.5%</p>
                      <p className="text-[9px] uppercase tracking-widest font-bold text-white/20 mt-2">Redução de Custo de Aquisição (CPA)</p>
                    </div>
                    <div className="h-px w-full bg-white/5" />
                    <div className="flex items-center gap-4">
                       <div className="flex -space-x-3">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gradient-to-tr from-orange-600 to-red-500 overflow-hidden" />
                         ))}
                       </div>
                       <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">+12 Parceiros Ativos</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Imagine Section - Reinvented as "The Core Transition" */}
      <section className="py-24 md:py-48 relative z-20 border-t border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <h2 className="text-5xl md:text-8xl font-bold font-display tracking-tighter leading-tight mb-8">
                  A Nova <br />
                  <span className="text-orange-600">Realidade.</span>
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-transparent mb-8" />
                <p className="text-xl text-white/40 font-light leading-relaxed max-w-md">
                  Não é apenas sobre fazer mais. É sobre ser <span className="text-white">estratégico</span> enquanto a tecnologia trabalha para você.
                </p>
              </motion.div>

              <div className="space-y-4 md:space-y-6">
                {[
                  { title: "Tempo Infinito", desc: "Sua agenda livre para o que realmente importa.", icon: Timer },
                  { title: "Escala Absoluta", desc: "Crescimento sem overhead operacional.", icon: Rocket },
                ].map((item, i) => (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    key={i}
                    className="flex items-center gap-6 p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-orange-500/30 transition-all group"
                  >
                    <div className="w-14 h-14 bg-orange-600/10 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold font-display mb-1">{item.title}</h4>
                      <p className="text-sm text-white/40">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cinematic Floating Cards - Improved for Mobile */}
            <div className="relative h-[450px] md:h-[700px] flex items-center justify-center w-full max-w-full overflow-hidden md:overflow-visible">
              {/* Central Energy Core */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-orange-600/20 blur-[80px] md:blur-[100px] rounded-full animate-pulse" />
              
              <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md h-full flex flex-col md:block items-center justify-center gap-8 perspective-[2000px]">
                {/* Card: Libertar */}
                <motion.div
                  style={{ rotateX: 10, rotateY: -10 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  initial={{ x: -20, opacity: 0 }}
                  whileHover={{ rotateX: 0, rotateY: 0, scale: 1.05, translateZ: 50 }}
                  className="static md:absolute md:-top-20 md:-left-12 z-20 w-full md:w-[320px] aspect-[16/10] md:aspect-[4/5] bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-8 flex flex-col justify-between shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-600/20 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                      <Timer className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
                    </div>
                    <p className="text-3xl md:text-5xl font-bold font-display leading-none tracking-tighter mb-2 md:mb-4">Libertar</p>
                    <div className="h-px w-10 md:w-12 bg-orange-600 mb-4" />
                    <p className="text-[10px] md:text-sm text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">Processos Autônomos</p>
                  </div>
                  <div className="relative z-10 flex items-center justify-between text-[8px] md:text-[10px] text-white/20 font-bold tracking-widest uppercase">
                    <span>Alpha v.4</span>
                    <RefreshCcw className="w-3 h-3 md:w-4 md:h-4 animate-spin-slow" />
                  </div>
                </motion.div>

                {/* Card: Multiplicar */}
                <motion.div
                  style={{ rotateX: -10, rotateY: 10 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  initial={{ x: 20, opacity: 0 }}
                  whileHover={{ rotateX: 0, rotateY: 0, scale: 1.05, translateZ: 50 }}
                  className="static md:absolute md:-bottom-20 md:-right-12 z-10 w-full md:w-[320px] aspect-[16/10] md:aspect-[4/5] bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-8 flex flex-col justify-between shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-tl from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600/20 rounded-xl flex items-center justify-center mb-4 md:mb-6">
                      <Rocket className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                    </div>
                    <p className="text-3xl md:text-5xl font-bold font-display leading-none tracking-tighter mb-2 md:mb-4">Multiplicar</p>
                    <div className="h-px w-10 md:w-12 bg-red-600 mb-4" />
                    <p className="text-[10px] md:text-sm text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">ROI Exponencial</p>
                  </div>
                  <div className="relative z-10 flex items-center justify-between text-[8px] md:text-[10px] text-white/20 font-bold tracking-widest uppercase">
                    <span>Scale.up</span>
                    <Zap className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase / Portfolio Section */}
      <section className="py-24 md:py-48 bg-black relative overflow-hidden" id="trabalhos">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 md:mb-32">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="w-2 h-2 bg-orange-500 rounded-full" />
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-white/40">Nosso Arsenal Digital</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-7xl font-bold font-display tracking-tight leading-[1.1]"
              >
                Projetos que <br />
                <span className="text-orange-600 italic">Redefinem</span> o Jogo.
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="hidden md:block"
            >
              <button className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest group">
                <span className="text-white/40 group-hover:text-white transition-colors">Explorar Todos</span>
                <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all">
                  <ArrowRight className="w-5 h-5 text-orange-500" />
                </div>
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 perspective-[2000px]">
            {[
              {
                title: "Fintech Ultra",
                category: "Dashboard & Automação",
                image: SITE_CONTENT.images.portfolio[0],
                stats: "2.4s Load Time"
              },
              {
                title: "Nexus Realty",
                category: "Lead Machine Pro",
                image: SITE_CONTENT.images.portfolio[1],
                stats: "400% ROI"
              },
              {
                title: "Crypto Sentinel",
                category: "Inteligência Artificial",
                image: SITE_CONTENT.images.portfolio[2],
                stats: "AI Driven"
              }
            ].map((work, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -20, rotateX: 5, rotateY: -5 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                key={i}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/11] mb-10 overflow-hidden rounded-[3rem] bg-[#050505] border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] perspective-[1000px]">
                  <motion.img 
                    src={work.image} 
                    alt={work.title} 
                    whileHover={{ scale: 1.2, rotate: 2 }}
                    className="w-full h-full object-cover transition-all duration-1000 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Cinematic Scanline Effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-700" />
                  
                  <div className="absolute bottom-8 left-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="px-3 py-1 bg-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white">
                      {work.stats}
                    </div>
                  </div>

                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                    <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-px w-8 bg-orange-600/50" />
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">{work.category}</p>
                  </div>
                  <h3 className="text-3xl font-bold font-display group-hover:text-orange-500 transition-colors tracking-tight">{work.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 md:hidden">
            <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-xs">
              Ver Todos os Projetos
            </button>
          </div>
        </div>
      </section>

      {/* Why SALVA Section (Bento Grid Redesign) */}
      <section className="py-24 md:py-48 relative overflow-hidden bg-[#0a0a0a]" id="por-que-salva">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-orange-600/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit mx-auto mb-8"
            >
              <ShieldCheck className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-white/50">O Diferencial SALVA</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold font-display mb-8 max-w-4xl mx-auto leading-[1.1] tracking-tight"
            >
              A Precisão da <span className="text-orange-600">Psicologia</span> <br className="hidden md:block" />
              encontra a <span className="text-white/40 italic">Alta Tecnologia.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-light px-4"
            >
              Não somos apenas uma agência. Somos engenheiros de tempo e arquitetos de lucros exponenciais.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[300px] perspective-[2000px]">
            {/* Main Feature: Engenharia Social */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ rotateY: -3, rotateX: 2, translateZ: 20 }}
              className="md:col-span-8 md:row-span-2 group relative overflow-hidden p-6 md:p-12 bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col justify-between shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.15),transparent_70%)]" />
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-orange-600/20 rounded-2xl flex items-center justify-center mb-8 border border-orange-500/20 group-hover:scale-110 transition-transform duration-500">
                   <Users className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-3xl md:text-5xl font-bold font-display mb-6 tracking-tight">Engenharia Social <br /><span className="text-white/30">Versatilidade Humana.</span></h3>
                <p className="text-lg text-white/40 max-w-md leading-relaxed">
                  Mapeamos o comportamento do seu cliente para criar fluxos de conversão que não parecem automações, mas sim uma experiência VIP personalizada.
                </p>
              </div>

              <div className="relative z-10 pt-8 flex gap-3 md:gap-4 overflow-x-auto no-scrollbar">
                {['Neuro-Marketing', 'Gatilhos Mentais', 'UX Estratégico'].map((tag, i) => (
                  <span key={i} className="whitespace-nowrap px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Feature 2: Automação 24/7 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ translateZ: 30, scale: 1.02 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-4 md:row-span-1 group relative overflow-hidden p-8 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex flex-col justify-center transition-all duration-500 shadow-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center border border-red-500/20">
                    <RefreshCcw className="w-5 h-5 text-red-500" />
                 </div>
                 <div className="flex flex-col">
                   <p className="text-[10px] uppercase tracking-widest font-bold text-red-500/80">Monitoramento Vivo</p>
                   <p className="text-lg font-bold font-display">Automação 24/7</p>
                 </div>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Nossos sistemas realizam o trabalho de uma equipe inteira, sem erros e sem pausas.
              </p>
            </motion.div>

            {/* Feature 3: Foco no Core */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ translateZ: 30, scale: 1.02 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 md:row-span-1 group relative overflow-hidden p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col justify-end transition-all duration-500 shadow-xl"
            >
              <div className="absolute top-6 right-6">
                 <BarChart3 className="w-12 h-12 text-white/5 group-hover:text-orange-500/20 transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-bold font-display mb-3">Foco no Core Business</h3>
              <p className="text-sm text-white/40">
                Você volta a ser o CEO. Nós cuidamos da tração técnica e operacional.
              </p>
            </motion.div>
          </div>

          {/* Social Proof Bar - HUD Style Metrics */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 py-10 md:py-16 border-y border-white/5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.05),transparent_70%)] pointer-events-none" />
            
            <div className="flex flex-col items-center md:items-start group">
               <div className="flex items-center gap-2 mb-2">
                 <TrendingUp className="w-3 h-3 text-orange-500" />
                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 group-hover:text-white transition-colors">Conversão em Contratos</p>
               </div>
               <p className="text-4xl md:text-6xl font-bold font-display tracking-tighter text-orange-600">32.8%</p>
               <div className="w-12 h-0.5 bg-orange-600 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
            
            <div className="hidden md:block w-[1px] h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            
            <div className="flex flex-col items-center md:items-start group">
               <div className="flex items-center gap-2 mb-2">
                 <Users className="w-3 h-3 text-orange-500" />
                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 group-hover:text-white transition-colors">Volume de Leads/Mês</p>
               </div>
               <p className="text-4xl md:text-6xl font-bold font-display tracking-tighter">+4.2k</p>
               <div className="w-12 h-0.5 bg-orange-600 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
            
            <div className="hidden md:block w-[1px] h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            
            <div className="flex flex-col items-center md:items-start group">
               <div className="flex items-center gap-2 mb-2">
                 <Rocket className="w-3 h-3 text-orange-500" />
                 <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 group-hover:text-white transition-colors">Aumento de Receita</p>
               </div>
               <p className="text-4xl md:text-6xl font-bold font-display tracking-tighter">4.5x</p>
               <div className="w-12 h-0.5 bg-orange-600 mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Section - The SALVA Engine */}
      <section className="py-24 md:py-48 bg-black relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div className="md:w-1/3 space-y-8 sticky top-32 h-fit">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="h-px w-12 bg-orange-600" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-orange-500">Engrenagem Salva</span>
              </motion.div>
              <h2 className="text-5xl md:text-7xl font-bold font-display tracking-tighter leading-tight">Como <br /> <span className="text-white/30 italic">Escalamos.</span></h2>
              <p className="text-white/40 leading-relaxed font-light">Quatro estágios de precisão absoluta para transformar seu negócio em uma máquina de resultados ultra-previsíveis.</p>
            </div>

            <div className="md:w-2/3 space-y-12 md:space-y-32">
              {[
                { 
                  num: "01", 
                  title: "Imersão & Diagnóstico", 
                  desc: "Mapeamento comportamental profundo do seu público e identificação de gargalos operacionais.",
                  icon: BarChart3
                },
                { 
                  num: "02", 
                  title: "Arquitetura Digital", 
                  desc: "Construção de ecossistemas automatizados e ativos digitais de alta conversão.",
                  icon: LayoutPanelLeft
                },
                { 
                  num: "03", 
                  title: "Ativação & Tração", 
                  desc: "Implementação de robôs de prospecção e funis de psicologia aplicada nas redes.",
                  icon: Rocket
                },
                { 
                  num: "04", 
                  title: "Escala Sustentável", 
                  desc: "Otimização contínua baseada em dados e expansão de infraestrutura para lucros exponenciais.",
                  icon: TrendingUp
                }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group flex flex-col md:flex-row gap-8 items-start"
                >
                  <div className="flex-shrink-0">
                    <span className="text-7xl md:text-8xl font-black font-display text-white/5 group-hover:text-orange-500/20 transition-colors duration-700">{step.num}</span>
                  </div>
                  <div className="pt-4 md:pt-12">
                    <h3 className="text-3xl md:text-4xl font-bold font-display mb-4 flex items-center gap-4 group-hover:text-orange-500 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-lg md:text-xl text-white/40 leading-relaxed max-w-xl group-hover:text-white/60 transition-colors">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 md:py-40 relative z-20" id="planos">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24 px-4">
            <h2 className="text-4xl sm:text-5xl md:text-[6rem] font-bold font-display tracking-tight leading-none mb-6">
              Acelere Seu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">Crescimento</span>
            </h2>
            <p className="text-white/40 uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold text-[10px] md:text-sm">Passo a Passo Para o Próximo Nível</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-12 items-stretch perspective-[2000px] max-w-full overflow-visible">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ rotateY: i === 0 ? 8 : i === 2 ? -8 : 0, rotateX: 5, scale: 1.05, translateZ: 50 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col p-8 md:p-14 rounded-[3.5rem] border transition-all duration-700 relative overflow-hidden group ${
                  plan.highlight 
                    ? 'bg-gradient-to-b from-orange-600 to-red-600 border-none shadow-[0_50px_100px_rgba(234,88,12,0.3)]' 
                    : 'bg-white/[0.02] backdrop-blur-3xl border-white/5 hover:border-orange-500/40 hover:bg-white/[0.05]'
                }`}
              >
                {/* Spotlight Cursor Effect (Simulated via hover classes) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,255,255,0.08),transparent_80%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {plan.highlight && (
                  <div className="absolute top-8 right-10 px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                    🏆 Mais Vendido
                  </div>
                )}
                
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-8 md:mb-12 shadow-2xl ${
                  plan.highlight ? 'bg-white/20' : 'bg-orange-600/10'
                }`}>
                  <div className={`${plan.highlight ? 'text-white' : 'text-orange-500'} group-hover:scale-110 transition-transform duration-500`}>
                    {plan.icon}
                  </div>
                </div>

                <div className="mb-8 md:mb-10">
                  <h3 className="text-3xl md:text-5xl font-bold font-display mb-2 tracking-tighter leading-none">{plan.name}</h3>
                  <p className={`text-[11px] md:text-sm font-bold uppercase tracking-[0.3em] ${
                    plan.highlight ? 'text-white/60' : 'text-orange-500'
                  }`}>
                    {plan.tagline}
                  </p>
                </div>

                <p className={`text-sm md:text-base leading-relaxed mb-10 md:mb-12 font-medium ${
                  plan.highlight ? 'text-white/80' : 'text-white/40 group-hover:text-white/70 transition-colors'
                }`}>
                  {plan.description}
                </p>

                <div className="space-y-5 md:space-y-6 mb-12 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="group/feat">
                      <div className="flex items-start gap-4">
                        <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${plan.highlight ? 'bg-white' : 'bg-orange-600 shadow-[0_0_8px_rgba(234,88,12,0.8)]'}`} />
                        <span className={`text-[13px] md:text-base font-bold tracking-tight ${plan.highlight ? 'text-white' : 'text-white/80'}`}>
                          {feature.text}
                        </span>
                      </div>
                      <div className={`h-px w-0 group-hover/feat:w-full transition-all duration-700 bg-current opacity-20 mt-2 ${plan.highlight ? 'text-white' : 'text-orange-500'}`} />
                    </div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 md:py-7 rounded-[1.8rem] md:rounded-[2.5rem] font-black text-xs md:text-sm transition-all flex items-center justify-center gap-4 group/btn ${
                    plan.highlight 
                      ? 'bg-white text-[#ee5a1a] hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)]' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-orange-500/50'
                  }`}
                >
                  Falar com Especialista
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center group-hover/btn:translate-x-2 transition-transform ${plan.highlight ? 'bg-[#ee5a1a]/10' : 'bg-white/10'}`}>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-current" />
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Section - Improved Mobile Padding */}
      <section className="py-24 md:py-48 bg-[#050505] border-t border-white/5" id="diferenciais">
        <div className="container mx-auto px-6">
          <div className="p-8 md:p-20 lg:p-32 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 rounded-[3rem] md:rounded-[4rem] relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.4)]">
            {/* Cinematic background light */}
            <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-orange-600/10 blur-[120px] md:blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-block px-4 py-2 bg-orange-600/20 border border-orange-500/30 rounded-full mb-6 md:mb-8 font-bold text-[10px] tracking-widest text-orange-400 uppercase"
                >
                  Oportunidade Única
                </motion.div>
                <h2 className="text-4xl md:text-7xl font-bold font-display tracking-tighter leading-[1.1] mb-6 md:mb-12">
                  Um Convite <br className="hidden md:block" />
                  à <span className="text-orange-600">Exclusividade.</span>
                </h2>
                <p className="text-base md:text-xl text-white/40 max-w-md font-light mb-8 md:mb-16 mx-auto lg:ml-0 leading-relaxed">
                  Estamos selecionando apenas 5 novos parceiros este mês para garantir o padrão de entrega SALVA. Sua vez chegou.
                </p>

                <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-sm mx-auto lg:ml-0">
                   <div className="space-y-1 md:space-y-2">
                     <p className="text-[10px] md:text-xs font-bold text-orange-500 uppercase tracking-widest">Ativação</p>
                     <p className="text-xl md:text-3xl font-bold font-display">Imediata</p>
                     <div className="h-px w-6 md:w-8 bg-orange-600/50" />
                   </div>
                   <div className="space-y-1 md:space-y-2">
                     <p className="text-[10px] md:text-xs font-bold text-orange-500 uppercase tracking-widest">Garanta Sua</p>
                     <p className="text-xl md:text-3xl font-bold font-display">Vaga</p>
                     <div className="h-px w-6 md:w-8 bg-orange-600/50" />
                   </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                 {[
                   { title: "Flexibilidade Premium", desc: "Concilie seu investimento em 12x.", icon: CreditCard, color: "white" },
                   { title: "Prioridade PIX", desc: "10% de desconto e setup prioritário.", icon: Zap, color: "orange" }
                 ].map((box, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ scale: 1.02, x: 10 }}
                     className={`p-6 md:p-12 ${box.color === 'orange' ? 'bg-orange-600' : 'bg-white/[0.03] backdrop-blur-3xl border border-white/10'} rounded-[2rem] md:rounded-[3rem] flex items-center gap-6 md:gap-8 shadow-2xl transition-all duration-500`}
                   >
                    <div className={`w-12 h-12 md:w-16 md:h-16 ${box.color === 'orange' ? 'bg-white/20' : 'bg-white/5'} rounded-xl md:rounded-2xl flex items-center justify-center shrink-0`}>
                      <box.icon className={`w-6 h-6 md:w-8 md:h-8 ${box.color === 'orange' ? 'text-white' : 'text-orange-500'}`} />
                    </div>
                    <div>
                      <p className={`text-lg md:text-xl font-bold mb-1 md:mb-2 ${box.color === 'orange' ? 'text-white' : 'text-white'}`}>{box.title}</p>
                      <p className={`text-[12px] md:text-sm ${box.color === 'orange' ? 'text-white/70' : 'text-white/40'}`}>{box.desc}</p>
                    </div>
                   </motion.div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Cinematic Finale */}
      <section className="py-32 md:py-64 relative overflow-hidden bg-[#050505]" id="contato">
        {/* Massive Ambient Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 blur-[200px] rounded-full pointer-events-none animate-pulse" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-orange-600 font-bold uppercase tracking-[0.5em] text-xs md:text-sm mb-12">O Futuro Começa Agora</p>
            <h2 className="text-5xl sm:text-7xl md:text-[9rem] font-bold font-display tracking-tighter leading-[0.85] mb-16">
              Assuma o <br />
              <span className="text-white italic">Controle.</span>
            </h2>
            
            <div className="relative inline-block perspective-[1000px]">
              <motion.button
                whileHover={{ 
                  scale: 1.1, 
                  rotateX: 10,
                  boxShadow: "0 0 100px rgba(234, 88, 12, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-7 md:px-20 md:py-10 bg-orange-600 text-white font-black text-xl md:text-3xl rounded-full transition-all flex items-center justify-center gap-6 mx-auto group shadow-[0_30px_60px_rgba(234,88,12,0.3)]"
              >
                Inicie Sua Evolução
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                  <ArrowRight className="w-5 h-5 md:w-7 md:h-7" />
                </div>
              </motion.button>
            </div>

            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto border-t border-white/5 pt-20">
               {[
                 { label: "Mentoria", val: "Especializada" },
                 { label: "Suporte", val: "Prioritário" },
                 { label: "Contrato", val: "Transparente" },
                 { label: "Foco", val: "Exponencial" }
               ].map((item, i) => (
                 <div key={i} className="text-center">
                    <p className="text-[10px] uppercase tracking-widest text-white/20 font-bold mb-2">{item.label}</p>
                    <p className="text-sm md:text-lg font-bold text-white/60">{item.val}</p>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Premium Dark */}
      <footer className="py-20 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20 mb-24 md:mb-32">
             <div className="md:col-span-4">
                <div className="flex items-center gap-3 mb-8 group cursor-pointer w-fit">
                  <div className="w-10 h-10 bg-gradient-to-tr from-orange-600 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-5 h-5 bg-white rounded-full" />
                  </div>
                  <span className="text-2xl font-bold tracking-tighter font-display uppercase">SALVA</span>
                </div>
                <p className="text-white/40 leading-relaxed max-w-xs mb-10">
                  Engenharia Social & Estratégia Digital para negócios que buscam liberdade e escala absoluta.
                </p>
                <div className="flex gap-4">
                  {['IG', 'LN', 'YT', 'TW'].map(s => (
                    <div key={s} className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:border-orange-500/50 hover:bg-orange-500/10 transition-all cursor-pointer text-xs font-bold text-white/40 hover:text-orange-500">
                      {s}
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
                <div className="space-y-6">
                   <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white">Navegação</p>
                   <ul className="space-y-4 text-sm font-medium text-white/40">
                      <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                      <li><a href="#planos" className="hover:text-white transition-colors">Planos</a></li>
                      <li><a href="#trabalhos" className="hover:text-white transition-colors">Portfólio</a></li>
                      <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
                   </ul>
                </div>
                <div className="space-y-6">
                   <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white">Especialidades</p>
                   <ul className="space-y-4 text-sm font-medium text-white/40">
                      <li>Automação</li>
                      <li>Engenharia Social</li>
                      <li>UX Estratégico</li>
                      <li>Escala em Ads</li>
                   </ul>
                </div>
                <div className="col-span-2 md:col-span-1 space-y-6">
                   <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white">Newsletter VIP</p>
                   <div className="flex gap-2">
                      <input className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs w-full focus:outline-none focus:border-orange-500/50" placeholder="Seu melhor e-mail" />
                      <button className="p-3 bg-orange-600 rounded-xl hover:bg-orange-500 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
             <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 SALVA. ALL RIGHTS RESERVED.</p>
             <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
               <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
               <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
               <span className="cursor-pointer hover:text-white transition-colors">Legal</span>
             </div>
          </div>
        </div>
      </footer>
      
      <div className="mt-12 md:mt-16 text-[15vw] md:text-[18vw] font-black text-white/[0.02] whitespace-nowrap leading-none select-none pointer-events-none">
        SALVA • GROW • AUTOMATE • EXCEL • SALVA
      </div>
    </div>
  );
}
