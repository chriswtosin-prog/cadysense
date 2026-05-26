import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Check, Crown, Star, ShieldCheck, ChevronDown, ArrowRight, Shield,
  Sparkles, Heart, Leaf, Smile,
} from "lucide-react";
import bottle1 from "@/assets/cadysense-bottle-1.webp";
import bottle3 from "@/assets/cadysense-bottle-3.webp";
import bottle5 from "@/assets/cadysense-bottle-5.webp";
import print1 from "@/assets/print-cliente-1.webp";
import print2 from "@/assets/print-cliente-2.webp";
import print3 from "@/assets/print-cliente-3.webp";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackCheckout(contentName: string, value: number) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", { content_name: contentName, value, currency: "BRL" });
  }
}

const OG_IMAGE = "https://cadysense.lovable.app/og-cadysense.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cadysense · Equilíbrio Íntimo Feminino Premium" },
      { name: "description", content: "Para mulheres que já cansaram de tratar e ver voltar." },
      { property: "og:title", content: "Cadysense · Equilíbrio Íntimo Feminino Premium" },
      { property: "og:description", content: "Para mulheres que já cansaram de tratar e ver voltar." },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "preconnect", href: "https://connect.facebook.net" },
      { rel: "dns-prefetch", href: "https://revitasense.mycartpanda.com" },
      { rel: "preload", as: "image", href: bottle1, fetchpriority: "high" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Jost:wght@300;400;500&display=swap" },
    ],
  }),
  component: Landing,
});

const CHECKOUT_1 = "https://revitasense.mycartpanda.com/checkout/208719730:1";
const CHECKOUT_3 = "https://revitasense.mycartpanda.com/checkout/208719732:1";
const CHECKOUT_5 = "https://revitasense.mycartpanda.com/checkout/208719733:1";
const ML_1 = "https://www.mercadolivre.com.br/cadysense--rotina-intima/up/MLBU3980674735";
const ML_3 = "https://www.mercadolivre.com.br/3-x-cadysense--rotina-intima/up/MLBU3994551764";
const WA = "https://wa.me/5541984486408";

/* ---------- Hooks ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useProgress() {
  const [w, setW] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setW(total > 0 ? (h.scrollTop / total) * 100 : 0);
      setShow(h.scrollTop > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { w, show };
}

function useStickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const target = document.getElementById("ofertas");
      const inOffers = target ? target.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setShow(window.scrollY > 400 && !inOffers);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return show;
}

function useExitIntent() {
  const [open, setOpen] = useState(false);
  const fired = useRef(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => { if (!fired.current) { fired.current = true; setOpen(true); } }, 30000);
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !fired.current) { fired.current = true; setOpen(true); }
    };
    reset();
    ["mousemove", "touchstart", "scroll", "keydown"].forEach(ev => window.addEventListener(ev, reset, { passive: true }));
    document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(timer);
      ["mousemove", "touchstart", "scroll", "keydown"].forEach(ev => window.removeEventListener(ev, reset));
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return { open, setOpen };
}

/* ---------- Small components ---------- */
function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display tracking-tight ${className}`}>
      <span style={{ color: "var(--gold)" }}>CADY</span>
      <span style={{ color: "var(--pink)" }}>SENSE</span>
    </span>
  );
}

function MLIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#FFE600" stroke="#1C1410" strokeWidth="0.5"/>
      <path d="M5 13c2-2 4-2 6 0 1 1 2 1 3 0 1.5-1.5 3-1.5 5 0" stroke="#2D3277" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function WAIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 003 18.6L1.5 23l4.5-1.2A11 11 0 1020.5 3.5zM12 20.5a8.5 8.5 0 01-4.4-1.2l-.3-.2-2.7.7.7-2.6-.2-.3A8.5 8.5 0 1112 20.5zm4.7-6.4c-.3-.1-1.5-.7-1.8-.8-.2-.1-.4-.1-.6.2-.2.3-.6.8-.8 1-.1.2-.3.2-.6.1-.3-.1-1.1-.4-2.1-1.3-.8-.7-1.3-1.6-1.5-1.8-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.2-.5.1-.2 0-.4 0-.5l-.7-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.7 4.3 3.7 1.7.7 2.2.6 2.6.6.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3z"/>
    </svg>
  );
}

function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`px-5 py-[60px] md:px-6 md:py-[80px] ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

/* ---------- Page ---------- */
function Landing() {
  useReveal();
  const progress = useProgress();
  const stickyShow = useStickyCta();
  const exit = useExitIntent();

  return (
    <div className="bg-cream text-deep overflow-x-hidden">
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[60] transition-opacity"
        style={{
          width: `${progress.w}%`,
          background: "linear-gradient(90deg, #E8187A, #C4956A)",
          opacity: progress.show ? 1 : 0,
        }}
      />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-cream/90 backdrop-blur-md border-b border-[rgba(196,149,106,0.18)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <a href="#"><Logo className="text-xl md:text-2xl font-semibold" /></a>
          <span className="hidden md:block text-[0.7rem] tracking-[0.25em] uppercase text-label">
            Bem-estar feminino premium
          </span>
          <a href="#ofertas" className="btn-pink px-4 md:px-5 py-2.5 rounded-full">
            Quero me sentir bem
          </a>
        </div>
      </header>

      {/* HERO */}
      <Hero />

      {/* AGITAÇÃO */}
      <Section className="bg-cream-rose">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] mb-5">
            Desconforto recorrente<br /><em className="text-pink not-italic">não é normal.</em>
          </h2>
          <p className="max-w-2xl mx-auto text-muted leading-relaxed">
            Você já sabe como isso termina. O desconforto volta, você trata, passa. E volta de novo. Esse ciclo tem solução — e você merece mais do que continuar convivendo com ele.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            [Heart, "O desconforto que volta não é azar.", "Seu equilíbrio íntimo precisa de atenção real — não de soluções temporárias."],
            [Leaf, "Seu corpo é fiel a você.", "Ele dá sinais porque quer que você cuide. Ignorar tem um custo que você já conhece."],
            [Sparkles, "Uma decisão muda tudo.", "Parar de aceitar o desconforto como normal é o primeiro passo."],
          ].map(([Icon, t, d], i) => {
            const I = Icon as React.ComponentType<{ className?: string }>;
            return (
              <div key={i} className="bg-white p-7 rounded-lg border border-[var(--border)] card-hover reveal">
                <div className="w-10 h-10 mb-4 rounded-full border border-[var(--pink)] flex items-center justify-center">
                  <I className="w-4 h-4 text-pink" />
                </div>
                <h3 className="font-display text-xl mb-2">{t as string}</h3>
                <p className="text-sm text-muted leading-relaxed">{d as string}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* BRIDGE escuro */}
      <div className="bg-deep px-5 py-5 text-center">
        <p className="font-display italic text-lg md:text-xl" style={{ color: "rgba(250,247,242,0.7)" }}>
          Mais de <span className="not-italic font-medium" style={{ color: "var(--gold-light)" }}>+ 4.800 mulheres</span> já escolheram o Cadysense para recuperar o equilíbrio.
        </p>
      </div>

      {/* OFERTA */}
      <Section id="ofertas" className="bg-cream">
        <div className="text-center mb-8 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] mb-3">
            Seu corpo já te disse<br /><em className="text-pink not-italic">o suficiente.</em>
          </h2>
          <p className="text-muted">Esse preço não é permanente. Aproveite enquanto está disponível.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-10 p-5 reveal" style={{ borderLeft: "2px solid var(--pink)", background: "rgba(232,24,122,0.03)" }}>
          <p className="text-sm italic text-muted">
            Uma consulta particular custa R$ 350. Uma rotina de 3 meses de Cadysense custa menos — e você usa todos os dias.
          </p>
        </div>

        <Offers />

        <p className="text-center text-xs tracking-widest uppercase text-label mt-8">
          🔒 Compra 100% segura · Frete grátis nos kits · Satisfação garantida
        </p>
        <p className="text-center text-[0.7rem] text-label mt-2">
          🔒 Ambiente 100% seguro · SSL · Dados protegidos
        </p>
      </Section>

      {/* PRINTS */}
      <Section className="bg-cream">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] mb-3">O que as clientes<br />estão dizendo.</h2>
          <p className="text-muted">Resultados reais de mulheres que decidiram parar de ignorar.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4 reveal">
          <div className="rounded-lg overflow-hidden border border-[var(--border)] bg-white">
            <img src={print1} alt="Print cliente principal" loading="lazy" decoding="async" width={400} height={300} className="w-full h-auto" />
          </div>
          <p className="text-center text-xs text-label italic">Cliente verificada — comprou o kit de 3 potes</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: print2, caption: "Cliente verificada — segunda compra" },
              { src: print3, caption: "Cliente verificada — usa há 2 meses" },
            ].map((item, i) => (
              <div key={i}>
                <div className="relative rounded-lg overflow-hidden border border-[var(--border)] bg-white" style={{ height: 200 }}>
                  <img src={item.src} alt={`Print cliente ${i + 2}`} loading="lazy" decoding="async" width={400} height={300} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to top, #fff, transparent)" }} />
                </div>
                <p className="text-center text-xs text-label italic mt-2">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs italic text-label mt-6">Resultados podem variar. Depoimentos de clientes reais.</p>
      </Section>

      {/* Bloco transição */}
      <div className="bg-cream-rose px-5 py-[18px] text-center" style={{ borderTop: "1px solid rgba(232,24,122,0.1)", borderBottom: "1px solid rgba(232,24,122,0.1)" }}>
        <p className="font-display italic text-lg md:text-xl text-deep/80">
          "Elas decidiram parar de ignorar. E mudou tudo."
        </p>
      </div>

      {/* BENEFÍCIOS */}
      <Section className="bg-white">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem]">
            Quando você recupera o equilíbrio…<br /><em className="text-pink not-italic">tudo muda.</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            [Smile, "Para de pensar nisso o tempo todo", "Leveza mental real. Sem a preocupação constante que drena sua energia."],
            [Leaf, "Equilíbrio da flora íntima feminina", "Sem o ciclo de desconforto recorrente que você já normalizou."],
            [Sparkles, "Confiança muda de patamar", "Quando você se sente bem por dentro, aparece em tudo."],
            [Heart, "Você para de adiar a vida", "Menos limitações. Mais presença em cada momento do seu dia."],
          ].map(([Icon, t, d], i) => {
            const I = Icon as React.ComponentType<{ className?: string }>;
            return (
              <div key={i} className="bg-cream p-6 rounded-lg border border-[var(--border)] card-hover reveal">
                <div className="w-10 h-10 mb-3 rounded-full border border-gold flex items-center justify-center">
                  <I className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-display text-xl mb-1">{t as string}</h3>
                <p className="text-sm text-muted leading-relaxed">{d as string}</p>
              </div>
            );
          })}
        </div>
        <p className="text-center mt-8 italic text-gold font-display text-lg">Powered by Complexo Cadysense™</p>
      </Section>

      {/* GARANTIA */}
      <Section className="bg-white">
        <div className="max-w-2xl mx-auto bg-white p-10 text-center reveal rounded-md"
          style={{ borderTop: "2px solid var(--pink)", borderBottom: "2px solid var(--gold)" }}>
          <div className="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-pink flex items-center justify-center">
            <Shield className="w-6 h-6 text-pink" />
          </div>
          <h2 className="font-display text-3xl mb-4">Você não tem nada a perder.</h2>
          <p className="text-muted leading-relaxed">
            Se em 30 dias você não sentir diferença, devolvemos seu dinheiro. Sem perguntas, sem burocracia, sem enrolação. A única coisa que você perde é o desconforto.
          </p>
        </div>
      </Section>

      {/* FÓRMULA */}
      <Section className="bg-deep text-cream">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] text-cream mb-4">
            Apresentando o<br /><em className="not-italic" style={{ color: "var(--gold-light)" }}>Complexo Cadysense™</em>
          </h2>
          <p className="max-w-2xl mx-auto text-cream/75">
            Cinco ingredientes para mulheres que decidiram recuperar o equilíbrio íntimo de verdade.
          </p>
        </div>
        <ol className="max-w-2xl mx-auto space-y-5">
          {[
            ["01", "Feno-grego", "240mg"],
            ["02", "Beta-glucana", "200mg"],
            ["03", "Cranberry", "300mg"],
            ["04", "Extrato de alho", "160mg"],
            ["05", "Própolis", "60mg"],
          ].map(([n, t, mg]) => (
            <li key={n} className="flex items-baseline gap-4 border-b border-cream/10 pb-4 reveal">
              <span className="font-display text-2xl text-gold w-10">{n}</span>
              <h3 className="font-display text-xl flex-1 text-cream">{t}</h3>
              <span className="text-xs tracking-widest text-cream/60">{mg}</span>
            </li>
          ))}
        </ol>
        <div className="max-w-2xl mx-auto mt-8 pl-5 reveal" style={{ borderLeft: "2px solid rgba(196,149,106,0.3)" }}>
          <p className="italic font-display text-lg text-cream/80">
            "Cada ingrediente foi escolhido por um motivo. Juntos, formam a rotina de cuidado íntimo que você estava precisando."
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-cream">
        <h2 className="font-display text-[2rem] md:text-[3rem] text-center mb-10 reveal">Perguntas frequentes</h2>
        <Faq />
      </Section>

      {/* FOOTER */}
      <footer className="bg-cream-rose py-12 px-5 text-center">
        <Logo className="text-2xl font-semibold block mb-6" />
        <p className="text-muted mb-3">Ainda com dúvidas?</p>
        <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-wa inline-flex items-center gap-2 px-6 py-3.5 rounded-full mb-8">
          <WAIcon /> Quero falar com o suporte
        </a>
        <p className="text-xs text-label max-w-xl mx-auto leading-relaxed">
          Este produto não substitui alimentação equilibrada e deve ser usado com orientação profissional.<br />
          © 2026 Revitasense. Todos os direitos reservados.
        </p>
      </footer>

      {/* Mobile sticky CTA */}
      <div
        className={`md:hidden fixed bottom-0 inset-x-0 z-[55] bg-pink text-white transition-transform duration-300 flex items-center justify-between px-4 h-16 ${stickyShow ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="flex flex-col leading-tight">
          <span className="text-[0.65rem] tracking-widest uppercase opacity-90">Comece por</span>
          <span className="font-display text-2xl">R$ 79,90</span>
        </div>
        <a href={CHECKOUT_1} target="_blank" rel="noopener noreferrer"
          className="bg-white text-pink font-medium tracking-[0.1em] uppercase text-[0.72rem] px-4 py-3 rounded-full flex items-center gap-1">
          Quero começar <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Exit intent */}
      {exit.open && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-5" onClick={() => exit.setOpen(false)}>
          <div className="bg-cream max-w-sm w-full rounded-lg p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-2xl mb-3">Espera — você ainda está aqui.</h3>
            <p className="text-muted mb-6 text-sm">Seu corpo deu sinais hoje. Você vai continuar ignorando?</p>
            <a href={CHECKOUT_1} target="_blank" rel="noopener noreferrer" className="btn-pink inline-flex items-center justify-center w-full py-3.5 rounded-full">
              Quero recuperar meu equilíbrio
            </a>
            <button onClick={() => exit.setOpen(false)} className="block mt-4 mx-auto text-xs underline text-label">
              Vou continuar ignorando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="pt-20 md:pt-28 pb-[40px] md:pb-[80px] px-5 md:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-5 md:gap-10 items-center">
        {/* Mobile: image first */}
        <div className="order-1 md:order-2 relative flex justify-center">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(232,24,122,0.18),transparent_60%)]" />
          <img
            src={bottle1}
            alt="Pote Cadysense 60 cápsulas sobre pedestal de mármore"
            className="relative animate-float-bottle max-h-[280px] md:max-h-none w-auto md:w-[440px] drop-shadow-[0_25px_40px_rgba(100,60,20,0.25)]"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={400}
            height={400}
          />
        </div>

        <div className="order-2 md:order-1">
          <div className="inline-block text-[0.7rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full mb-5 reveal"
            style={{ background: "rgba(232,24,122,0.07)", border: "1px solid rgba(232,24,122,0.22)", color: "var(--pink)" }}>
            Você não está exagerando. Seu corpo está pedindo equilíbrio.
          </div>
          <h1 className="font-display text-[2.4rem] md:text-[3.6rem] leading-[1.05] mb-4 reveal">
            Você aprendeu<br />
            a ignorar. <em className="text-pink not-italic">Mas</em><br />
            seu corpo não esqueceu.
          </h1>
          <p className="font-display italic text-pink text-lg md:text-xl mb-5 reveal">
            Para mulheres que já cansaram de tratar e ver voltar.
          </p>
          <p className="text-base md:text-lg text-muted leading-relaxed mb-6 max-w-xl reveal">
            Você faz tudo certo. Mas existe um desconforto íntimo que volta — e que afeta sua confiança em silêncio todos os dias.
          </p>

          <ul className="space-y-3 mb-6">
            {[
              "Você já tentou de tudo. O desconforto continua voltando.",
              "Seu corpo está pedindo equilíbrio. Há quanto tempo você está adiando?",
              "Tem momentos que você evita por causa disso.",
              "Isso afeta sua confiança mais do que você quer admitir.",
            ].map((t, i) => (
              <li key={i} className={`flex items-start gap-3 text-[0.95rem] reveal ${i >= 2 ? "hidden md:flex" : ""}`}>
                <span className="gold-line mt-3" />
                <span className="text-muted">{t}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 mb-5 reveal">
            <span className="text-gold tracking-wider">★★★★★</span>
            <span className="text-sm text-muted">Mais de 4.800 mulheres já pediram o kit</span>
          </div>

          <a href="#ofertas" className="btn-pink inline-flex items-center gap-2 px-7 py-4 rounded-full reveal">
            Quero recuperar meu equilíbrio <ArrowRight className="w-4 h-4" />
          </a>

          <div className="mt-5 flex flex-wrap gap-4 text-[0.7rem] tracking-widest uppercase text-label reveal">
            <span>✓ Compra segura</span>
            <span>✓ Frete grátis nos kits</span>
            <span>✓ Garantia total</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const items = [
    ["Em quanto tempo vou sentir diferença?", "A maioria relata percepção nas primeiras 2 a 3 semanas com uso contínuo."],
    ["Preciso tomar todo dia?", "Sim. 2 cápsulas por dia, mesmo horário. O Complexo Cadysense™ age de forma acumulativa."],
    ["E se eu não gostar?", "Garantia total. Devolvemos seu dinheiro sem perguntas."],
    ["Por que 3 potes e não 1?", "Equilíbrio real exige constância — e constância exige tempo."],
    ["O Cadysense tem contraindicações?", "É um suplemento alimentar natural. Recomendamos consultar um profissional em caso de gravidez, amamentação ou uso de medicamentos contínuos."],
  ];
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0, 2]));
  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };
  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {items.map(([q, a], i) => {
        const isOpen = openSet.has(i);
        return (
          <div key={i} className="bg-white rounded-lg border border-[var(--border)] reveal">
            <button onClick={() => toggle(i)} className="w-full flex items-center justify-between text-left px-5 py-4">
              <span className="font-display text-lg pr-4">{q}</span>
              <span className={`text-pink text-xl transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            {isOpen && <div className="px-5 pb-5 text-sm text-muted leading-relaxed">{a}</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Offers ---------- */
function Offers() {
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-5 items-start">
      {/* 1 POTE — destaque */}
      <div className="relative bg-white p-6 md:p-7 rounded-lg border-2 border-pink md:scale-[1.03] glow-pink order-1">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink text-white text-[0.65rem] tracking-widest uppercase px-3 py-1 rounded-full font-medium">
          ✦ Comece aqui
        </span>
        <span className="text-[0.7rem] tracking-widest uppercase text-label">A porta de entrada</span>
        <h3 className="font-display text-2xl mt-1">1 Pote</h3>
        <p className="text-sm text-muted mt-1 mb-3">O primeiro passo para recuperar o equilíbrio.</p>
        <p className="text-pink text-xs font-medium mb-3">🔥 Mais de 4.800 pedidos este mês</p>

        <div className="flex justify-center mb-4 h-[90px] md:h-[110px]">
          <img src={bottle1} alt="1 pote Cadysense" loading="lazy" decoding="async" width={400} height={400} className="h-full w-auto object-contain animate-float-bottle" style={{ filter: "drop-shadow(0 12px 24px rgba(100,60,20,0.2))" }} />
        </div>

        <div className="text-center mb-3">
          <p className="text-xs text-label line-through">De R$ 137,90</p>
          <p className="font-display text-5xl text-pink leading-none my-1">R$ 79,90</p>
          <p className="text-[0.7rem] text-label mt-1">ou 12x de R$7,32 no cartão</p>
        </div>

        <div className="divider-gold my-4" />

        <p className="text-[0.7rem] text-pink text-center mb-4">⚡ Promoção de lançamento — preço pode aumentar</p>

        <ul className="space-y-2 mb-5 text-sm">
          {["Ideal para conhecer a fórmula", "Primeiros resultados em semanas", "+4.800 mulheres começaram assim", "Satisfação garantida"].map((f, i) => (
            <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-gold mt-0.5 shrink-0" /><span>{f}</span></li>
          ))}
        </ul>

        <a href={CHECKOUT_1} target="_blank" rel="noopener noreferrer"
          onClick={() => trackCheckout("Cadysense 1 Pote", 79.90)}
          className="btn-pink w-full py-3.5 rounded-full inline-flex items-center justify-center mb-3">
          Quero começar agora
        </a>

        <p className="text-xs text-center text-label mb-2">Prefere comprar pelo Mercado Livre?</p>
        <a href={ML_1} target="_blank" rel="noopener noreferrer"
          onClick={() => trackCheckout("Cadysense 1 Pote ML", 79.90)}
          className="btn-ml w-full py-3 rounded-full inline-flex items-center justify-center gap-2">
          <MLIcon /> Comprar no Mercado Livre
        </a>

        <p className="text-xs italic text-label mt-4 text-center">
          Aviso: 1 pote dificilmente é suficiente para constância real. A maioria volta para o kit de 3.
        </p>

        <div className="mt-4 flex items-start gap-2" style={{ background: "rgba(196,149,106,0.07)", border: "1px solid rgba(196,149,106,0.2)", padding: "10px 12px", borderRadius: "4px" }}>
          <span style={{ fontSize: "14px", lineHeight: 1 }}>💡</span>
          <p style={{ fontFamily: "Arial", fontSize: "8px", color: "#5A4838", lineHeight: 1.4, margin: 1 }}>
            Dica: quem leva o <strong style={{ color: "#9E7250" }}>kit de 3 potes</strong> economiza <strong style={{ color: "#9E7250" }}>R$ 81,90</strong> e ganha frete grátis.
          </p>
        </div>
      </div>

      {/* 3 POTES */}
      <div className="relative bg-white p-6 md:p-7 rounded-lg border border-[var(--border)] card-hover order-2">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[0.65rem] tracking-widest uppercase px-3 py-1 rounded-full font-medium" style={{ background: "var(--gold)" }}>
          Para quem já decidiu
        </span>
        <span className="text-[0.7rem] tracking-widest uppercase text-label">Kit recomendado</span>
        <h3 className="font-display text-2xl mt-1">3 Potes</h3>
        <p className="text-sm text-muted mt-1 mb-3">Melhor custo-benefício para equilíbrio real.</p>

        <div className="flex justify-center mb-4 h-[90px] md:h-[110px]">
          <img src={bottle3} alt="3 potes Cadysense" loading="lazy" decoding="async" width={700} height={700} className="h-full w-auto object-contain" style={{ filter: "drop-shadow(0 12px 24px rgba(100,60,20,0.2))" }} />
        </div>

        <div className="text-center mb-3">
          <p className="text-xs text-label line-through">De R$ 279,80</p>
          <p className="font-display text-4xl text-gold leading-none my-1">R$ 197,90</p>
        </div>

        <div className="divider-gold my-4" />

        <p className="text-[0.72rem] text-gold text-center mb-1">Economize R$ 81,90 · Frete grátis</p>
        <p className="text-[0.7rem] text-pink text-center mb-4">⚡ Últimas unidades</p>

        <ul className="space-y-2 mb-5 text-sm">
          {["Tempo necessário para equilíbrio real", "Frete grátis incluso", "Escolha de quem quer constância"].map((f, i) => (
            <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-gold mt-0.5 shrink-0" /><span>{f}</span></li>
          ))}
        </ul>

        <a href={CHECKOUT_3} target="_blank" rel="noopener noreferrer"
          onClick={() => trackCheckout("Cadysense 3 Potes", 197.90)}
          className="btn-dark w-full py-3.5 rounded-full inline-flex items-center justify-center mb-3">
          Quero o kit completo
        </a>

        <p className="text-xs text-center text-label mb-2">Prefere comprar pelo Mercado Livre?</p>
        <a href={ML_3} target="_blank" rel="noopener noreferrer"
          onClick={() => trackCheckout("Cadysense 3 Potes ML", 197.90)}
          className="btn-ml w-full py-3 rounded-full inline-flex items-center justify-center gap-2">
          <MLIcon /> Comprar no Mercado Livre
        </a>
      </div>

      {/* 5 POTES — peso menor */}
      <div className="relative bg-white p-5 rounded-lg border border-[var(--border)] card-hover order-3">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-deep text-cream text-[0.6rem] tracking-widest uppercase px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
          <Crown className="w-3 h-3 text-gold" /> Melhor oferta
        </span>
        <span className="text-[0.68rem] tracking-widest uppercase text-label">Máxima economia</span>
        <h3 className="font-display text-xl mt-1">5 Potes</h3>
        <p className="text-sm text-muted mt-1 mb-3">Para quem já sabe que vai continuar.</p>

        <div className="flex justify-center mb-4 h-[90px] md:h-[100px]">
          <img src={bottle5} alt="5 potes Cadysense" loading="lazy" decoding="async" width={700} height={700} className="h-full w-auto object-contain" style={{ filter: "drop-shadow(0 12px 24px rgba(100,60,20,0.2))" }} />
        </div>

        <div className="text-center mb-3">
          <p className="text-xs text-label line-through">De R$ 499,90</p>
          <p className="font-display text-3xl text-deep leading-none my-1">R$ 297,90</p>
        </div>

        <div className="divider-gold my-3" />

        <p className="text-[0.7rem] text-gold text-center mb-4">Maior economia por unidade · Frete grátis</p>

        <ul className="space-y-2 mb-5 text-sm">
          {["Frete grátis", "Estoque garantido", "Constância prolongada"].map((f, i) => (
            <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-gold mt-0.5 shrink-0" /><span>{f}</span></li>
          ))}
        </ul>

        <a href={CHECKOUT_5} target="_blank" rel="noopener noreferrer"
          onClick={() => trackCheckout("Cadysense 5 Potes", 297.90)}
          className="btn-outline-dark w-full py-3.5 rounded-full inline-flex items-center justify-center">
          Quero a melhor oferta
        </a>
      </div>
    </div>
  );
}
