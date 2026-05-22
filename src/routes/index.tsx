import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Check, Crown, Star, ShieldCheck, Truck, Lock, Award, Headphones, Users,
  ChevronDown, MessageCircle, Image as ImageIcon, Shield, ArrowRight,
} from "lucide-react";
import bottle1 from "@/assets/cadysense-bottle-1.png";
import bottle3 from "@/assets/cadysense-bottle-3.png";
import bottle5 from "@/assets/cadysense-bottle-5.png";
import logo from "@/assets/cadysense-logo.png";
import print1 from "@/assets/print-cliente-1.png";
import print2 from "@/assets/print-cliente-2.png";
import print3 from "@/assets/print-cliente-3.png";

const OG_IMAGE = "https://cadysense.lovable.app/og-cadysense.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cadysense · Equilíbrio Íntimo Feminino Premium" },
      { name: "description", content: "O desconforto que você aprendeu a ignorar tem solução." },
      { property: "og:title", content: "Cadysense · Equilíbrio Íntimo Feminino Premium" },
      { property: "og:description", content: "O desconforto que você aprendeu a ignorar tem solução." },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" },
    ],
  }),
  component: Landing,
});

const CHECKOUT_1 = "https://revitasense.mycartpanda.com/checkout/208719730:1";
const CHECKOUT_3 = "https://revitasense.mycartpanda.com/checkout/208719732:1";
const CHECKOUT_5 = "https://revitasense.mycartpanda.com/checkout/208719733:1";
const ML_1 = "https://www.mercadolivre.com.br/cadysense--rotina-intima/up/MLBU3980674735";
const ML_3 = "https://www.mercadolivre.com.br/3-x-cadysense--rotina-intima/up/MLBU3994551764";

// ---------- Hooks ----------
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCountUp(target: number, duration = 1800) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setVal(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function useProgress() {
  const [w, setW] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? (h.scrollTop / total) * 100 : 0;
      setW(p);
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
      timer = setTimeout(() => {
        if (!fired.current) { fired.current = true; setOpen(true); }
      }, 30000);
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

// ---------- Small components ----------
function MLIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#FFE600" stroke="#1C1410" strokeWidth="0.5"/>
      <path d="M5 13c2-2 4-2 6 0 1 1 2 1 3 0 1.5-1.5 3-1.5 5 0" stroke="#2D3277" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
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

// ---------- Page ----------
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
          background: "var(--gold)",
          opacity: progress.show ? 1 : 0,
        }}
      />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-cream/85 backdrop-blur-md border-b border-[rgba(196,149,106,0.18)]">
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <a href="#" className="font-display text-xl md:text-2xl font-semibold tracking-tight">Cadysense</a>
          <span className="hidden md:block text-[0.7rem] tracking-[0.25em] uppercase text-[var(--gold-dark)]">
            Bem-estar feminino premium
          </span>
          <a href="#ofertas" className="btn-gold px-4 md:px-5 py-2.5 rounded-full">
            Quero me sentir bem
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-24 md:pt-28 pb-[60px] md:pb-[80px] px-5 md:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Mobile: image first */}
          <div className="order-1 md:order-2 relative flex justify-center">
            <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_50%_40%,rgba(196,149,106,0.35),transparent_60%)]" />
            <img
              src={bottle1}
              alt="Pote Cadysense 60 cápsulas"
              className="relative animate-float-bottle w-[260px] md:w-[400px] drop-shadow-[0_25px_40px_rgba(100,60,20,0.25)]"
              fetchPriority="high"
              width={400}
              height={400}
            />
            <span className="hidden md:block absolute top-6 right-2 bg-white border border-[var(--border)] text-[0.7rem] tracking-widest uppercase px-3 py-1.5 rounded-full text-[var(--gold-dark)]">60 cápsulas</span>
            <span className="hidden md:block absolute bottom-10 left-0 bg-deep text-cream text-[0.7rem] tracking-widest uppercase px-3 py-1.5 rounded-full">Fórmula Premium</span>
          </div>

          <div className="order-2 md:order-1">
            <div className="inline-block text-[0.7rem] tracking-[0.22em] uppercase text-[var(--gold-dark)] border border-[var(--gold)]/40 px-3 py-1.5 rounded-full mb-6 reveal">
              Você não está exagerando. Seu corpo está pedindo equilíbrio.
            </div>
            <h1 className="font-display text-[2.4rem] md:text-[3.6rem] leading-[1.05] mb-5 reveal">
              Você aprendeu a ignorar.<br />
              <em className="text-[var(--gold-dark)] not-italic">Mas seu corpo</em><br />
              não esqueceu.
            </h1>
            <p className="text-base md:text-lg text-[#5b4a3e] leading-relaxed mb-7 max-w-xl reveal">
              Você faz tudo certo. Cuida da casa, do trabalho, de todo mundo. Mas existe um desconforto que volta, que você tenta resolver — e que continua afetando sua confiança e sua rotina em silêncio.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Você já tentou de tudo. O desconforto continua voltando.",
                "Seu corpo está pedindo equilíbrio. Há quanto tempo você está adiando?",
                "Tem momentos que você evita por causa disso.",
                "Isso afeta sua confiança mais do que você gostaria de admitir.",
              ].map((t, i) => (
                <li key={i} className={`flex items-start gap-3 text-[0.95rem] reveal ${i >= 2 ? "hidden md:flex" : ""}`}>
                  <span className="gold-line mt-3" />
                  <span className="text-[#4b3d33]">{t}</span>
                </li>
              ))}
            </ul>

            <a href="#ofertas" className="btn-gold inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium reveal">
              Quero recuperar meu equilíbrio <ArrowRight className="w-4 h-4" />
            </a>

            <div className="mt-6 flex flex-wrap gap-4 text-[0.72rem] tracking-widest uppercase text-[var(--gold-dark)] reveal">
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Compra segura</span>
              <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Frete grátis nos kits</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Satisfação garantida</span>
            </div>
          </div>
        </div>
      </section>

      {/* AGITAÇÃO */}
      <Section className="bg-cream-2">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] mb-6">
            Desconforto íntimo<br />
            recorrente não é normal.<br />
            <em className="text-[var(--gold-dark)] not-italic">Seu corpo está pedindo equilíbrio</em> —<br />
            não mais uma solução temporária.
          </h2>
          <p className="max-w-2xl mx-auto text-[#5b4a3e]">
            Você já sabe como isso termina. O desconforto volta, você trata, passa. E volta de novo. Esse ciclo tem solução — e você merece mais do que continuar convivendo com ele.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "O desconforto que volta não é azar.", d: "É o sinal de que seu equilíbrio íntimo precisa de atenção real — não de soluções temporárias que só mascaram o problema." },
            { t: "Seu corpo é fiel a você.", d: "Ele dá sinais porque quer que você cuide. Ignorar esses sinais tem um custo que você já conhece bem." },
            { t: "Uma decisão muda tudo.", d: "Não é sobre perfeição. É sobre parar de aceitar o desconforto recorrente como parte normal da vida feminina." },
          ].map((c, i) => (
            <div key={i} className="bg-white p-7 rounded-lg border border-[var(--border)] card-hover reveal">
              <div className="w-10 h-10 mb-4 rounded-full border border-[var(--gold)] flex items-center justify-center">
                <Star className="w-4 h-4 text-[var(--gold)]" />
              </div>
              <h3 className="font-display text-xl mb-2">{c.t}</h3>
              <p className="text-sm text-[#5b4a3e] leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BENEFÍCIOS */}
      <Section className="bg-white">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] mb-5">
            Quando você recupera<br />o equilíbrio…<br />
            <em className="text-[var(--gold-dark)] not-italic">tudo ao redor muda também.</em>
          </h2>
          <p className="max-w-2xl mx-auto text-[#5b4a3e]">
            Não é sobre suplemento. É sobre o que você passa a viver quando para de carregar esse peso em silêncio.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ["Você para de pensar nisso o tempo todo", "Leveza mental real. Sem a preocupação constante com o desconforto que drena sua energia e seu foco."],
            ["Equilíbrio da flora íntima feminina", "Seu corpo em harmonia. Sem aquele ciclo de desconforto recorrente que você já normalizou sem precisar."],
            ["Sua confiança muda de patamar", "Quando você se sente bem por dentro, isso aparece na forma como você se apresenta ao mundo."],
            ["Você volta a viver sem limitações", "Momentos que você evitava. Situações que te deixavam insegura. Tudo isso muda quando o equilíbrio volta."],
            ["Você para de adiar a vida", "Menos desculpas. Menos restrições. Mais presença em cada momento do seu dia."],
            ["Uma rotina de cuidado real", "Apenas 2 cápsulas por dia. O Complexo Cadysense™ trabalhando pelo seu equilíbrio todos os dias."],
          ].map(([t, d], i) => (
            <div key={i} className="bg-cream p-6 rounded-lg border border-[var(--border)] card-hover reveal">
              <div className="w-9 h-9 mb-4 rounded-full border border-[var(--gold)] flex items-center justify-center">
                <Check className="w-4 h-4 text-[var(--gold)]" />
              </div>
              <h3 className="font-display text-lg mb-2">{t}</h3>
              <p className="text-sm text-[#5b4a3e] leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROVA SOCIAL */}
      <SocialProof />

      {/* PRINTS */}
      <Section className="bg-cream">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] mb-3">O que as clientes<br />estão dizendo.</h2>
          <p className="text-[#5b4a3e]">Resultados reais de mulheres que decidiram parar de ignorar.</p>
        </div>
        <PrintsCarousel />
        <p className="text-center text-xs italic text-[#7a6a5d] mt-6">Resultados podem variar. Depoimentos de clientes reais.</p>
      </Section>

      {/* FÓRMULA */}
      <Section className="bg-deep text-cream">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] mb-4 text-cream">
            Apresentando o<br /><em className="text-[var(--gold)] not-italic">Complexo Cadysense™</em>
          </h2>
          <p className="max-w-2xl mx-auto text-cream/75">
            Cinco ingredientes selecionados com critério para mulheres que decidiram recuperar o equilíbrio íntimo de verdade.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-10">
          <ol className="md:col-span-3 space-y-6">
            {[
              ["01", "Feno-grego", "240mg", "Tradicionalmente usado em rotinas femininas de equilíbrio e bem-estar íntimo há gerações."],
              ["02", "Beta-glucana", "200mg", "Componente moderno que apoia o equilíbrio da flora e o cuidado contínuo do organismo feminino."],
              ["03", "Cranberry", "300mg", "O ingrediente mais reconhecido no suporte à saúde íntima feminina premium."],
              ["04", "Extrato de alho", "160mg", "Proteção natural diária para quem quer uma rotina de cuidado inteligente e consistente."],
              ["05", "Própolis", "60mg", "O toque final de uma fórmula pensada de ponta a ponta para o bem-estar feminino."],
            ].map(([n, t, mg, d]) => (
              <li key={n} className="border-b border-cream/10 pb-5 reveal">
                <div className="flex items-baseline gap-4 mb-1">
                  <span className="font-display text-2xl text-[var(--gold)]">{n}</span>
                  <h3 className="font-display text-xl text-cream">{t}</h3>
                  <span className="text-xs tracking-widest text-cream/60">· {mg}</span>
                </div>
                <p className="text-cream/70 text-sm leading-relaxed pl-12">{d}</p>
              </li>
            ))}
          </ol>
          <aside className="md:col-span-2 md:sticky md:top-24 self-start bg-cream/5 border border-[var(--gold)]/30 rounded-lg p-7 reveal">
            <span className="text-[0.7rem] tracking-[0.22em] uppercase text-[var(--gold)]">Por que o Complexo Cadysense™</span>
            <h3 className="font-display text-2xl mt-3 mb-4 text-cream">"Não é um suplemento qualquer."</h3>
            <p className="text-sm text-cream/75 leading-relaxed mb-5">
              É a diferença entre continuar no ciclo de desconforto e finalmente recuperar o equilíbrio. Cada ingrediente tem um papel. Cada dose foi pensada. Nada aqui é por acaso.
            </p>
            <div className="inline-block bg-[var(--gold)] text-deep text-xs tracking-widest uppercase px-3 py-1.5 rounded-full font-medium">
              Porção diária: 2 cápsulas
            </div>
            <p className="mt-5 italic text-cream/60 text-sm font-display">"Feito para mulheres que decidiram se priorizar de verdade."</p>
          </aside>
        </div>
      </Section>

      {/* DESEJO */}
      <Section className="bg-cream-2">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] mb-4">
            Pare um segundo.<br />
            <em className="text-[var(--gold-dark)] not-italic">E imagine como seria</em><br />
            se você resolvesse isso hoje.
          </h2>
          <p className="text-[#5b4a3e]">Não amanhã. Não "quando der". Hoje.</p>
          <p className="max-w-2xl mx-auto text-[#5b4a3e] mt-4">
            Você não precisa conviver com esse desconforto para sempre. Esse ciclo que se repete tem causa — e tem solução. O Complexo Cadysense™ foi feito exatamente para esse momento.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            ["Imagine acordar sabendo que esse desconforto não vai te acompanhar hoje.", "Leveza que você esqueceu que era possível sentir. De novo, todo dia."],
            ["Imagine parar de evitar certos momentos por causa disso.", "Conforto e liberdade de viver sem aquele peso silencioso que você já normalizou."],
          ].map(([t, d], i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-[var(--border)] card-hover reveal">
              <p className="font-display italic text-lg mb-2">"{t}"</p>
              <p className="text-sm text-[#5b4a3e]">{d}</p>
            </div>
          ))}
          <div className="md:col-span-2 bg-deep text-cream p-8 rounded-lg text-center reveal">
            <p className="font-display italic text-xl md:text-2xl">
              "Quando você recupera o equilíbrio, tudo muda. Sua presença muda. Sua confiança muda. <span className="text-[var(--gold)]">Você muda.</span>"
            </p>
          </div>
          {[
            ["Imagine olhar para o espelho sabendo que está cuidando de você de verdade.", "Autocuidado real não é luxo. É o mínimo que você merece."],
            ["Imagine não ter mais que planejar sua vida em torno desse desconforto.", "Liberdade que você perdeu sem perceber. É hora de recuperar."],
          ].map(([t, d], i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-[var(--border)] card-hover reveal">
              <p className="font-display italic text-lg mb-2">"{t}"</p>
              <p className="text-sm text-[#5b4a3e]">{d}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 reveal">
          <a href="#ofertas" className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full">
            Chega de adiar <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Section>

      {/* CREDIBILIDADE */}
      <Section className="bg-white">
        <h2 className="font-display text-[2rem] md:text-[3rem] text-center mb-12 reveal">
          Tudo para que sua<br />única preocupação seja<br /><em className="text-[var(--gold-dark)] not-italic">começar.</em>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            [Lock, "Checkout 100% protegido", "Ambiente seguro, criptografado, sem risco nenhum."],
            [Truck, "Frete grátis nos kits", "Do nosso estoque direto para sua porta, sem custo extra."],
            [ShieldCheck, "Garantia de satisfação", "Se não sentir diferença, a gente resolve. Sem burocracia."],
            [Award, "Complexo Cadysense™", "Padrão internacional. Produzido com rigor e cuidado."],
            [Headphones, "Suporte dedicado", "Equipe pronta para acompanhar sua jornada. Você não está sozinha."],
            [Users, "Escolha de milhares", "Cadysense já faz parte da rotina de mulheres em todo o Brasil."],
          ].map(([Icon, t, d], i) => {
            const I = Icon as React.ComponentType<{ className?: string }>;
            return (
              <div key={i} className="p-5 reveal">
                <div className="w-10 h-10 mb-3 rounded-full border border-[var(--gold)] flex items-center justify-center">
                  <I className="w-4 h-4 text-[var(--gold)]" />
                </div>
                <h3 className="font-display text-lg mb-1">{t as string}</h3>
                <p className="text-sm text-[#5b4a3e]">{d as string}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* GARANTIA */}
      <Section className="bg-white">
        <div className="max-w-2xl mx-auto bg-white border-2 border-[var(--gold)] rounded-lg p-10 text-center reveal">
          <div className="w-14 h-14 mx-auto mb-5 rounded-full border-2 border-[var(--gold)] flex items-center justify-center">
            <Shield className="w-6 h-6 text-[var(--gold)]" />
          </div>
          <h2 className="font-display text-3xl mb-4">Você não tem nada a perder.</h2>
          <p className="text-[#5b4a3e] leading-relaxed">
            Se em 30 dias você não sentir diferença no seu equilíbrio e bem-estar, devolvemos seu dinheiro. Sem perguntas, sem burocracia, sem enrolação. A única coisa que você perde é o desconforto.
          </p>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-cream">
        <h2 className="font-display text-[2rem] md:text-[3rem] text-center mb-10 reveal">Perguntas frequentes</h2>
        <Faq />
      </Section>

      {/* TENSÃO PRÉ-OFERTA */}
      <Section className="bg-deep text-cream">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="font-display italic text-[1.8rem] md:text-[2.6rem] leading-tight text-cream">
            Você leu até aqui.<br />
            Seu corpo já te disse o suficiente.<br />
            A única pergunta que resta é:<br />
            <span className="text-[var(--gold)]">quando você vai agir?</span>
          </p>
          <a href="#ofertas" className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full mt-8">
            Quero recuperar meu equilíbrio <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </Section>

      {/* OFERTA */}
      <Section id="ofertas" className="bg-cream">
        <div className="text-center mb-10 reveal">
          <h2 className="font-display text-[2rem] md:text-[3rem] mb-3">
            Você chegou até aqui<br />por algum motivo.<br />
            <em className="text-[var(--gold-dark)] not-italic">Seu corpo já te disse</em><br />o suficiente.
          </h2>
          <p className="text-[#5b4a3e] mt-3">Esse preço não é permanente. Aproveite enquanto está disponível.</p>
          <p className="text-xs italic text-[#7a6a5d] mt-5 max-w-xl mx-auto">
            Uma consulta particular custa R$ 350. Uma rotina de 3 meses de Cadysense custa menos que isso — e você usa todos os dias.
          </p>
          <p className="text-sm text-[var(--gold-dark)] mt-3 tracking-wide">Mais mulheres estão escolhendo o kit de 3 potes. E não é por acaso.</p>
        </div>

        <Offers />

        <p className="text-center text-xs tracking-widest uppercase text-[var(--gold-dark)] mt-8">
          🔒 Compra 100% segura · Frete grátis nos kits · Satisfação garantida
        </p>
      </Section>

      {/* FOOTER */}
      <footer className="bg-cream-2 py-12 px-5 text-center">
        <img src={logo} alt="Cadysense" className="h-10 mx-auto mb-4 opacity-90" />
        <a
          href="https://wa.me/5500000000000"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--gold-dark)] hover:text-deep mb-6"
        >
          <MessageCircle className="w-4 h-4" /> Dúvidas? Fale com a gente →
        </a>
        <p className="text-xs text-[#7a6a5d] max-w-xl mx-auto leading-relaxed">
          Este produto não substitui alimentação equilibrada e deve ser usado com orientação profissional.<br />
          © 2026 Revitasense. Todos os direitos reservados.
        </p>
      </footer>

      {/* Mobile sticky CTA */}
      <a
        href={CHECKOUT_1}
        target="_blank" rel="noopener noreferrer"
        className={`md:hidden fixed bottom-0 inset-x-0 z-[55] h-14 flex items-center justify-center bg-deep text-cream font-sans tracking-[0.12em] text-[0.72rem] uppercase transition-transform duration-300 ${stickyShow ? "translate-y-0" : "translate-y-full"}`}
      >
        Quero recuperar meu equilíbrio — R$ 79,90 →
      </a>

      {/* Exit intent */}
      {exit.open && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-5" onClick={() => exit.setOpen(false)}>
          <div className="bg-cream max-w-sm w-full rounded-lg p-8 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-2xl mb-3">Espera — você ainda está aqui.</h3>
            <p className="text-[#5b4a3e] mb-6 text-sm">Seu corpo deu sinais hoje. Você vai continuar ignorando?</p>
            <a href={CHECKOUT_1} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex items-center justify-center w-full py-3.5 rounded-full">
              Quero recuperar meu equilíbrio
            </a>
            <button onClick={() => exit.setOpen(false)} className="block mt-4 mx-auto text-xs underline text-[#7a6a5d]">
              Vou continuar ignorando
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------- Social Proof ----------
function SocialProof() {
  const n1 = useCountUp(4800);
  const n2 = useCountUp(49);
  const n3 = useCountUp(97);
  const [idx, setIdx] = useState(0);
  const testimonials = [
    { initial: "M", name: "M.", city: "São Paulo", text: "Esse desconforto voltava toda hora. Depois que comecei o Cadysense, minha rotina mudou completamente. Já estou no segundo kit." },
    { initial: "A", name: "A.", city: "Belo Horizonte", text: "Não esperava que algo tão simples resolvesse algo que me incomodava há tanto tempo. Minha confiança voltou." },
    { initial: "C", name: "C.", city: "Curitiba", text: "Comprei o kit de 3 potes na segunda compra. Faz todo o sentido pra quem quer resultado de verdade." },
  ];

  return (
    <Section className="bg-white">
      <div className="grid md:grid-cols-3 gap-0 mb-12">
        {[
          { ref: n1.ref, val: `${n1.val.toLocaleString("pt-BR")}+`, label: "Mulheres que já recuperaram o equilíbrio com Cadysense" },
          { ref: n2.ref, val: `${(n2.val / 10).toFixed(1)}★`, label: "Avaliação média das clientes" },
          { ref: n3.ref, val: `${n3.val}%`, label: "Relatam diferença na rotina após uso contínuo" },
        ].map((s, i) => (
          <div key={i} className={`text-center px-6 py-6 reveal ${i < 2 ? "md:border-r border-[var(--gold)]/30" : ""}`}>
            <div className="font-display text-5xl text-[var(--gold-dark)] mb-2">
              <span ref={s.ref}>{s.val}</span>
            </div>
            <p className="text-sm text-[#5b4a3e] max-w-[220px] mx-auto">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Desktop grid / mobile carousel */}
      <div className="hidden md:grid grid-cols-3 gap-5">
        {testimonials.map((t, i) => <TestimonialCard key={i} {...t} />)}
      </div>
      <div className="md:hidden">
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 no-scrollbar -mx-5 px-5"
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / el.clientWidth);
            setIdx(i);
          }}>
          {testimonials.map((t, i) => (
            <div key={i} className="snap-center shrink-0 w-[88%]"><TestimonialCard {...t} /></div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i === idx ? "bg-[var(--gold)]" : "bg-[var(--gold)]/30"}`} />
          ))}
        </div>
      </div>

      <div className="mt-10 text-center bg-[#2a1d15] text-[var(--gold)] py-4 px-6 text-xs tracking-[0.2em] uppercase reveal">
        ✦ 23 mulheres estão vendo esta página agora · Kit de 3 potes é o mais pedido hoje ✦
      </div>
    </Section>
  );
}

function TestimonialCard({ initial, name, city, text }: { initial: string; name: string; city: string; text: string }) {
  return (
    <div className="bg-cream p-6 rounded-lg border border-[var(--border)] card-hover h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[var(--gold)] text-white flex items-center justify-center font-display text-lg">{initial}</div>
        <div>
          <div className="font-medium text-sm">{name} · {city}</div>
          <div className="text-[var(--gold)] text-sm tracking-wider">★★★★★</div>
        </div>
      </div>
      <p className="font-display italic text-[1.05rem] text-deep/85 leading-relaxed">"{text}"</p>
    </div>
  );
}

// ---------- Prints ----------
function PrintsCarousel() {
  const prints = [print1, print2, print3];
  const [idx, setIdx] = useState(0);
  return (
    <>
      <div className="hidden md:grid grid-cols-3 gap-5">
        {prints.map((p, i) => <PrintCard key={i} src={p} />)}
      </div>
      <div className="md:hidden">
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 no-scrollbar -mx-5 px-5"
          onScroll={(e) => {
            const el = e.currentTarget;
            setIdx(Math.round(el.scrollLeft / el.clientWidth));
          }}>
          {prints.map((p, i) => (
            <div key={i} className="snap-center shrink-0 w-[88%]"><PrintCard src={p} /></div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {prints.map((_, i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i === idx ? "bg-[var(--gold)]" : "bg-[var(--gold)]/30"}`} />
          ))}
        </div>
      </div>
    </>
  );
}

function PrintCard({ src }: { src?: string }) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-lg p-4 card-hover" style={{ boxShadow: "0 4px 20px rgba(100,60,20,0.08)" }}>
      <div className="bg-cream-2 rounded-md flex items-center justify-center" style={{ minHeight: 300 }}>
        {src ? (
          <img src={src} alt="Print de cliente" loading="lazy" className="w-full h-auto object-contain max-h-[400px]" />
        ) : (
          <div className="flex flex-col items-center text-[var(--gold-dark)] py-12 border border-dashed border-[var(--gold)] rounded-md w-full">
            <ImageIcon className="w-8 h-8 mb-2" />
            <span className="text-xs">Adicionar print de cliente</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------- FAQ ----------
function Faq() {
  const items = [
    ["Em quanto tempo vou sentir diferença?", "A maioria das mulheres relata percepção de equilíbrio nas primeiras 2 a 3 semanas com uso contínuo. Por isso o kit de 3 potes faz sentido — tempo suficiente para constância real."],
    ["Preciso tomar todo dia?", "Sim. A constância é o que garante resultado. 2 cápsulas por dia, no mesmo horário. O Complexo Cadysense™ age de forma acumulativa."],
    ["E se eu não gostar?", "Garantia total de satisfação. Você não corre nenhum risco. Se não sentir diferença, devolvemos seu dinheiro."],
    ["Por que 3 potes e não 1?", "1 pote é um começo. Equilíbrio real exige constância — e constância exige tempo. Quem escolhe 3 potes mantém resultado muito além do primeiro mês."],
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {items.map(([q, a], i) => (
        <div key={i} className="bg-white rounded-lg border border-[var(--border)] reveal">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left px-5 py-4"
          >
            <span className="font-display text-lg">{q}</span>
            <ChevronDown className={`w-4 h-4 text-[var(--gold-dark)] transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-[#5b4a3e] leading-relaxed">{a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ---------- Offers ----------
function Offers() {
  const [bump, setBump] = useState(false);
  return (
    <div className="grid md:grid-cols-3 gap-6 md:gap-5 items-start">
      {/* 1 POTE — destaque */}
      <div className="relative bg-white p-6 md:p-7 rounded-lg border-2 border-[var(--gold)] md:scale-[1.03] glow-gold order-1 md:order-1">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-white text-[0.65rem] tracking-widest uppercase px-3 py-1 rounded-full">
          ✦ Comece aqui
        </span>
        <span className="text-[0.7rem] tracking-widest uppercase text-[var(--gold-dark)]">A porta de entrada</span>
        <h3 className="font-display text-2xl mt-1">1 Pote</h3>
        <p className="text-sm text-[#5b4a3e] mt-1 mb-4">O primeiro passo para recuperar o equilíbrio.</p>

        <div className="flex justify-center mb-4 h-[120px] md:h-[160px]">
          <img src={bottle1} alt="1 pote Cadysense" loading="lazy" className="h-full w-auto animate-float-bottle" style={{ filter: "drop-shadow(0 12px 24px rgba(100,60,20,0.2))" }} />
        </div>

        <div className="text-center mb-4">
          <p className="text-xs text-[#7a6a5d] line-through">De R$ 137,90</p>
          <p className="font-display text-4xl text-[var(--gold-dark)]">R$ 79,90</p>
          <p className="text-[0.7rem] text-[var(--gold-dark)] tracking-wide mt-1">⚡ Promoção de lançamento — preço pode aumentar sem aviso</p>
        </div>

        <ul className="space-y-2 mb-5 text-sm">
          {["Ideal para conhecer a fórmula", "Primeiros resultados em semanas", "Mais de 4.800 mulheres começaram assim", "Satisfação garantida"].map((f, i) => (
            <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--gold)] mt-0.5" /><span>{f}</span></li>
          ))}
        </ul>

        <div className="space-y-3">
          <a href={CHECKOUT_1} target="_blank" rel="noopener noreferrer" className="btn-gold w-full py-3.5 rounded-full inline-flex items-center justify-center">
            Quero começar agora
          </a>
          <a href={ML_1} target="_blank" rel="noopener noreferrer" className="btn-ml w-full py-3.5 rounded-full inline-flex items-center justify-center gap-2">
            <MLIcon /> Comprar no Mercado Livre
          </a>
        </div>

        <p className="text-xs italic text-[#7a6a5d] mt-4 text-center">
          Aviso: 1 pote dificilmente é suficiente para constância real. A maioria volta para o kit de 3 na segunda semana.
        </p>

        <div className="mt-5 pt-5 border-t border-[var(--border)]">
          <label className="flex items-start gap-2 cursor-pointer text-xs text-[#5b4a3e]">
            <input type="checkbox" checked={bump} onChange={(e) => setBump(e.target.checked)} className="mt-0.5 accent-[var(--gold)]" />
            <span>+ Sim, quero adicionar 2 potes por R$ 118,00 — e garantir constância real com frete grátis</span>
          </label>
        </div>
      </div>

      {/* 3 POTES */}
      <div className="bg-white p-6 md:p-7 rounded-lg border border-[var(--border)] card-hover order-2">
        <span className="text-[0.7rem] tracking-widest uppercase text-[var(--gold-dark)]">Para quem já decidiu</span>
        <h3 className="font-display text-2xl mt-1">3 Potes</h3>
        <p className="text-sm text-[#5b4a3e] mt-1 mb-4">Melhor custo-benefício para equilíbrio real.</p>

        <div className="flex justify-center mb-4 h-[120px] md:h-[160px]">
          <img src={bottle3} alt="3 potes Cadysense" loading="lazy" className="h-full w-auto object-contain animate-float-bottle" style={{ filter: "drop-shadow(0 12px 24px rgba(100,60,20,0.2))" }} />
        </div>

        <div className="text-center mb-4">
          <p className="text-xs text-[#7a6a5d] line-through">De R$ 279,80</p>
          <p className="font-display text-4xl text-[var(--gold-dark)]">R$ 197,90</p>
          <p className="text-[0.72rem] text-[var(--gold-dark)] mt-1">Economize R$ 81,90 · Frete grátis</p>
          <p className="text-[0.7rem] text-[var(--gold-dark)] mt-1">⚡ Últimas unidades neste preço</p>
        </div>

        <ul className="space-y-2 mb-5 text-sm">
          {["Tempo necessário para equilíbrio real", "Frete grátis incluso", "Escolha de quem quer constância"].map((f, i) => (
            <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--gold)] mt-0.5" /><span>{f}</span></li>
          ))}
        </ul>

        <div className="space-y-3">
          <a href={CHECKOUT_3} target="_blank" rel="noopener noreferrer" className="btn-outline-dark w-full py-3.5 rounded-full inline-flex items-center justify-center">
            Quero o kit completo
          </a>
          <a href={ML_3} target="_blank" rel="noopener noreferrer" className="btn-ml w-full py-3.5 rounded-full inline-flex items-center justify-center gap-2">
            <MLIcon /> Comprar no Mercado Livre
          </a>
        </div>
      </div>

      {/* 5 POTES */}
      <div className="bg-white p-6 md:p-7 rounded-lg border border-[var(--border)] card-hover order-3 relative">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-deep text-cream text-[0.65rem] tracking-widest uppercase px-3 py-1 rounded-full inline-flex items-center gap-1">
          <Crown className="w-3 h-3 text-[var(--gold)]" /> Melhor oferta
        </span>
        <span className="text-[0.7rem] tracking-widest uppercase text-[var(--gold-dark)]">Máxima economia</span>
        <h3 className="font-display text-2xl mt-1">5 Potes</h3>
        <p className="text-sm text-[#5b4a3e] mt-1 mb-4">Para quem já sabe que vai querer continuar.</p>

        <div className="flex justify-center mb-4 h-[120px] md:h-[160px]">
          <img src={bottle5} alt="5 potes Cadysense" loading="lazy" className="h-full w-auto object-contain animate-float-bottle" style={{ filter: "drop-shadow(0 12px 24px rgba(100,60,20,0.2))" }} />
        </div>

        <div className="text-center mb-4">
          <p className="text-xs text-[#7a6a5d] line-through">De R$ 499,90</p>
          <p className="font-display text-4xl text-[var(--gold-dark)]">R$ 297,90</p>
          <p className="text-[0.72rem] text-[var(--gold-dark)] mt-1">Maior economia por unidade</p>
        </div>

        <ul className="space-y-2 mb-5 text-sm">
          {["Frete grátis", "Estoque garantido", "Quem tem constância vê muito mais resultado"].map((f, i) => (
            <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-[var(--gold)] mt-0.5" /><span>{f}</span></li>
          ))}
        </ul>

        <a href={CHECKOUT_5} target="_blank" rel="noopener noreferrer" className="btn-outline-dark w-full py-3.5 rounded-full inline-flex items-center justify-center">
          Quero a melhor oferta
        </a>
      </div>
    </div>
  );
}
