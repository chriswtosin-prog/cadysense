import { createFileRoute } from "@tanstack/react-router";
import bottle from "@/assets/cadysense-bottle.jpeg";
import { Check, Sparkles, Crown, Star, Heart, Leaf, ShieldCheck, Clock, Truck, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cadysense — Suplemento Feminino Premium de Equilíbrio e Bem-Estar" },
      { name: "description", content: "Cadysense é o suplemento feminino premium desenvolvido para mulheres que desejam recuperar equilíbrio, conforto e confiança no dia a dia." },
      { property: "og:title", content: "Cadysense — Pare de aceitar desconfortos como algo normal." },
      { property: "og:description", content: "Fórmula premium para mulheres que querem se sentir equilibradas, confortáveis e seguras todos os dias." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  component: Landing,
});

const CHECKOUT_1 = "https://revitasense.mycartpanda.com/checkout/208719730:1";
const CHECKOUT_3 = "https://revitasense.mycartpanda.com/checkout/208719732:1";
const CHECKOUT_5 = "https://revitasense.mycartpanda.com/checkout/208719733:1";

function Landing() {
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-premium flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">Cadysense</span>
          </div>
          <a href="#ofertas" className="btn-premium px-5 py-2.5 rounded-full text-sm font-medium hidden sm:inline-flex items-center">
            Quero me sentir bem novamente
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-32 bg-gradient-hero">
        <div className="particle w-72 h-72 top-10 -left-20 blur-3xl" />
        <div className="particle w-96 h-96 bottom-0 -right-32 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border/60 shadow-soft mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[color:var(--gold)]" />
              <span className="text-xs tracking-wider uppercase text-muted-foreground">Bem-estar feminino premium</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] mb-6">
              Tem coisas que você sente… <br />
              <span className="italic text-gradient-rose">mas aprende a fingir</span> que não incomodam.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-4 leading-relaxed">
              Pequenos desconfortos começam aos poucos… até fazerem parte da sua rotina, da sua confiança e até da forma como você se sente no próprio corpo.
            </p>
            <p className="text-base text-muted-foreground max-w-xl mb-6 leading-relaxed italic">
              E muitas mulheres passam tempo demais tentando simplesmente ignorar isso.
            </p>
            <div className="space-y-2 mb-8">
              {[
                "Você pensa nisso mais do que gostaria.",
                "Você tenta seguir normalmente… mas sente.",
                "Tem dias que isso afeta até sua confiança.",
                "Seu corpo dá sinais o tempo inteiro."
              ].map((b, i) => (
                <p key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-[color:var(--rose)] mt-0.5">·</span>
                  {b}
                </p>
              ))}
            </div>
            <a href="#ofertas" className="btn-premium inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold tracking-wide animate-pulse-glow text-sm md:text-base">
              QUERO VOLTAR A ME SENTIR BEM
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs uppercase tracking-[0.25em] text-[color:var(--rose)] mt-4 font-medium">
              ✦ Milhares de mulheres já decidiram priorizar o próprio bem-estar
            </p>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[color:var(--gold)]" /> Compra segura</div>
              <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-[color:var(--gold)]" /> Frete grátis nos kits</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-gold opacity-30 blur-3xl rounded-full" />
            <div className="absolute inset-0 bg-gradient-rose opacity-20 blur-3xl rounded-full scale-75" />
            <div className="relative animate-float-soft">
              <div className="absolute -inset-10 rounded-[3rem] bg-gradient-to-br from-[color:var(--cream)] via-white to-[color:var(--gold-soft)]/40 shadow-premium" />
              <img src={bottle} alt="Cadysense suplemento feminino premium" className="relative w-full max-w-md mx-auto rounded-[2.5rem] object-cover" />
              <div className="absolute -bottom-4 -left-4 bg-card/95 backdrop-blur px-4 py-3 rounded-2xl shadow-soft border border-border/60">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Contém</div>
                <div className="font-display text-2xl font-semibold">60 cápsulas</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-gradient-premium text-white px-4 py-3 rounded-2xl shadow-premium">
                <div className="text-[10px] uppercase tracking-widest opacity-80">Fórmula</div>
                <div className="font-display text-lg font-semibold">Premium</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMOCIONAL */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.95_0.03_15_/_0.5),transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <span className="text-xs tracking-[0.3em] uppercase text-[color:var(--rose)] mb-6 block">Seu corpo sente sua rotina</span>
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight mb-6">
            Imagine parar de pensar <br />
            <span className="italic text-gradient-rose">nisso o tempo todo.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed">
            Quando você começa a se sentir bem novamente… tudo ao redor muda também.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Imagine voltar a se sentir confortável", text: "Pequenos desconfortos não precisam fazer parte do seu dia." },
              { icon: Sparkles, title: "Quando você se sente bem, sua energia muda", text: "Você percebe diferença até na forma como se olha." },
              { icon: Leaf, title: "Você volta a se sentir segura", text: "Segurança e leveza que só quem viveu sabe o valor." },
            ].map((c, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-premium transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-gold flex items-center justify-center mb-5 mx-auto">
                  <c.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display text-xl mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULAÇÃO */}
      <section className="py-24 bg-gradient-to-b from-transparent via-[color:var(--cream)] to-transparent">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[color:var(--gold)] mb-4 block">Fórmula Premium</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight mb-5 max-w-3xl mx-auto">
              A combinação que está transformando <span className="italic text-gradient-rose">a rotina de milhares de mulheres</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ingredientes cuidadosamente selecionados para mulheres que decidiram voltar a priorizar o próprio bem-estar.
            </p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-4 italic">
              Não é apenas um suplemento. É uma nova relação com sua rotina.
            </p>
            <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-card border border-border">
              <Clock className="w-4 h-4 text-[color:var(--gold)]" />
              <span className="text-sm">Porção diária: <strong>2 cápsulas</strong></span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: "Feno-grego", dose: "240mg", desc: "Tradicionally presente em rotinas femininas de equilíbrio e bem-estar." },
              { name: "Beta-glucana", dose: "200mg", desc: "Componente sofisticado amplamente utilizado em fórmulas modernas de cuidado contínuo." },
              { name: "Cranberry", dose: "300mg", desc: "Um dos ingredientes mais reconhecidos em rotinas íntimas femininas premium." },
              { name: "Extrato de Alho", dose: "160mg", desc: "Ingrediente natural selecionado para estratégias de cuidado diário inteligente." },
              { name: "Própolis", dose: "60mg", desc: "Componente tradicional associado ao autocuidado contínuo de mulheres que se priorizam." },
            ].map((ing, i) => (
              <div key={i} className="group relative p-7 rounded-3xl bg-card border border-border/60 hover:border-[color:var(--gold)]/50 transition-all duration-500 hover:shadow-premium overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-gold opacity-10 blur-2xl rounded-full group-hover:opacity-25 transition-opacity" />
                <div className="relative flex items-start justify-between mb-3">
                  <h3 className="font-display text-2xl font-semibold">{ing.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-gradient-gold text-white text-xs font-semibold tracking-wider">{ing.dose}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed relative">{ing.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOCO IMPACTO */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-premium opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,oklch(0.85_0.12_88_/_0.25),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
          <Sparkles className="w-8 h-8 mx-auto mb-6 text-[color:var(--gold-soft)]" />
          <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight mb-6">
            Você merece voltar <br />
            <span className="italic text-gradient-gold">a se sentir bem.</span>
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            O primeiro passo é parar de ignorar os sinais. Pequenos hábitos criam grandes mudanças.
          </p>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.3em] uppercase text-[color:var(--rose)] mb-4 block">Benefícios</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium">Mais do que cuidado. <span className="italic text-gradient-rose">Sensação.</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Heart, title: "Mais conforto e leveza no dia a dia", text: "Sinta a diferença em como você vive cada momento." },
              { icon: Sparkles, title: "Sensação de equilíbrio novamente", text: "Recupere aquela sensação de estar no controle." },
              { icon: Clock, title: "Mais confiança na própria rotina", text: "Siga seus dias com tranquilidade e segurança." },
              { icon: Leaf, title: "Pare de ignorar sinais que afetam como você se sente", text: "Seu corpo merece atenção e cuidado verdadeiro." },
              { icon: Crown, title: "Fórmula premium feminina", text: "Ingredientes selecionados com cuidado para você." },
              { icon: ShieldCheck, title: "Pequenos hábitos que fazem grande diferença", text: "Apenas 2 cápsulas por dia para uma nova rotina." },
            ].map((b, i) => (
              <div key={i} className="group p-7 rounded-3xl bg-card border border-border/60 hover:border-[color:var(--rose)]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-premium">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[color:var(--cream)] to-[color:var(--gold-soft)]/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <b.icon className="w-5 h-5 text-[color:var(--rose-deep)]" />
                </div>
                <h3 className="font-display text-xl mb-1.5">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFERTAS */}
      <section id="ofertas" className="py-24 bg-gradient-to-b from-[color:var(--cream)]/40 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.3em] uppercase text-[color:var(--gold)] mb-4 block">Escolha inteligente</span>
            <h2 className="font-display text-4xl md:text-5xl font-medium mb-4">Comece sua nova <span className="italic text-gradient-rose">rotina</span> hoje</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Quanto maior o kit, maior a economia — e mais consistente a sensação de bem-estar.</p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-2 italic">Mais mulheres estão escolhendo o kit de 3 potes.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-5 items-stretch">
            {/* CARD 1 */}
            <div className="relative order-2 lg:order-1 flex">
              <div className="relative w-full p-7 rounded-3xl bg-card border border-border/60 flex flex-col lg:hover:animate-float-button transition-all opacity-95">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Teste inicial</div>
                <h3 className="font-display text-3xl mb-1">1 Pote</h3>
                <p className="text-sm text-muted-foreground mb-2">Ideal apenas para começar.</p>
                <p className="text-xs text-muted-foreground mb-5">Para quem deseja apenas testar.</p>
                <div className="mb-5">
                  <div className="text-xs text-muted-foreground line-through">De R$ 137,90</div>
                  <div className="font-display text-4xl font-semibold">R$ 79,90</div>
                </div>
                <ul className="space-y-2 mb-6 text-sm flex-1">
                  {["Entrada básica", "Para conhecer apenas", "Teste rápido"].map(b => (
                    <li key={b} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-[color:var(--gold)]" /> {b}
                    </li>
                  ))}
                </ul>
                <a href={CHECKOUT_1} className="w-full text-center py-3 rounded-full border border-border hover:border-[color:var(--rose)]/40 hover:bg-secondary transition-all text-sm font-medium">
                  QUERO CONHECER
                </a>
              </div>
            </div>

            {/* CARD 2 - PRINCIPAL */}
            <div className="relative order-1 lg:order-2 flex lg:scale-110 lg:-my-4">
              <div className="absolute -inset-1 bg-gradient-premium rounded-[2rem] opacity-70 blur-md animate-pulse-glow" />
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-gradient-premium text-white px-5 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-premium flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-current" /> ⭐ MAIS ESCOLHIDO
                </div>
              </div>
              <div className="relative w-full p-8 rounded-3xl bg-card border-2 border-[color:var(--gold)]/50 shadow-premium flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-gold opacity-25 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-rose opacity-15 blur-3xl rounded-full" />
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-gold" />
                <div className="relative">
                  <div className="text-xs uppercase tracking-widest text-[color:var(--rose)] font-semibold mb-2">A decisão inteligente</div>
                  <h3 className="font-display text-4xl font-semibold mb-1">3 Potes</h3>
                  <p className="text-sm text-muted-foreground mb-2">A melhor escolha das mulheres.</p>
                  <p className="text-xs text-muted-foreground mb-5">Mais indicado para rotina contínua.</p>
                  <div className="mb-2">
                    <div className="text-xs text-muted-foreground line-through">De R$ 279,80</div>
                    <div className="font-display text-5xl font-semibold text-gradient-rose">R$ 197,90</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[color:var(--gold-soft)]/30 text-[color:var(--rose-deep)] text-xs font-semibold">
                      <Sparkles className="w-3 h-3" /> Economize R$ 81,90
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-gold text-white text-xs font-semibold">
                      ✨ Melhor custo-benefício
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[color:var(--rose)]/20 text-[color:var(--rose-deep)] text-xs font-semibold">
                      ⭐ Maior escolha das clientes
                    </div>
                  </div>
                  <ul className="space-y-2.5 mb-6 text-sm flex-1">
                    {["Frete grátis", "Melhor investimento", "Rotina contínua recomendada", "Quem escolhe 3 potes costuma manter muito mais constância."].map(b => (
                      <li key={b} className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a href={CHECKOUT_3} className="btn-premium block text-center py-4 rounded-full font-bold tracking-wide">
                    QUERO MINHA ROTINA COMPLETA
                  </a>
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="relative order-3 flex">
              <div className="absolute -inset-0.5 bg-gradient-gold rounded-[2rem] opacity-50 blur-sm" />
              <div className="relative w-full p-7 rounded-3xl bg-card border border-[color:var(--gold)]/50 shadow-soft flex flex-col overflow-hidden">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-gold text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-gold-glow">
                    <Crown className="w-3.5 h-3.5 fill-current" /> MELHOR OFERTA
                  </div>
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-[color:var(--gold)] font-semibold mb-2">Rotina contínua</div>
                <h3 className="font-display text-3xl mb-1">5 Potes</h3>
                <p className="text-sm text-muted-foreground mb-5">Para quem quer constância real.</p>
                <div className="mb-2">
                  <div className="text-xs text-muted-foreground line-through">De R$ 499,90</div>
                  <div className="font-display text-4xl font-semibold">R$ 297,90</div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[color:var(--gold-soft)]/30 text-[color:var(--rose-deep)] text-xs font-semibold mb-5 w-fit">
                  <Crown className="w-3 h-3" /> Maior economia por unidade
                </div>
                <ul className="space-y-2 mb-6 text-sm flex-1">
                  {["Frete grátis", "Maior economia", "Constância prolongada", "Quem mantém constância percebe muito mais valor."].map(b => (
                    <li key={b} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[color:var(--gold)]" /> {b}
                    </li>
                  ))}
                </ul>
                <a href={CHECKOUT_5} className="btn-gold block text-center py-3.5 rounded-full font-semibold tracking-wide">
                  Garantir constância
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[color:var(--gold)]" /> Compra 100% segura</div>
            <div className="flex items-center gap-2"><Truck className="w-4 h-4 text-[color:var(--gold)]" /> Frete grátis nos kits</div>
            <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[color:var(--gold)]" /> A escolha mais indicada para rotina contínua</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-border/60 pb-28 lg:pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-full bg-gradient-premium flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display text-lg font-semibold">Cadysense</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            Este produto não substitui uma alimentação equilibrada e seu consumo deve ser orientado por um profissional de saúde. © {new Date().getFullYear()} Revitasense.
          </p>
        </div>
      </footer>

      {/* CTA FIXO GLOBAL */}
      <div
        className={`fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:bottom-6 z-40 transition-all duration-500 ${
          showSticky ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <a
          href="#ofertas"
          className="btn-premium flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold tracking-wide shadow-premium animate-pulse-glow text-sm md:text-base"
        >
          QUERO MINHA ROTINA
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
