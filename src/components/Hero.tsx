import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Shield, TrendingUp, Brain } from 'lucide-react';

type HeroProps = {
  onEnter: () => void;
};

export default function Hero({ onEnter }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute inset-0 radial-glow opacity-60" />
      <div
        className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-30 animate-glow-pulse"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(47,61,84,0.6) 0%, transparent 70%)' }}
      />

      {/* Top bar */}
      <header className={`relative z-10 px-8 md:px-16 py-6 flex items-center justify-between transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border border-gold-500/30 flex items-center justify-center gold-glow">
            <span className="font-serif text-gold-400 text-xl font-semibold">P</span>
          </div>
          <div>
            <div className="font-serif text-cream text-lg tracking-wide-2">PhoenixAI</div>
            <div className="text-[10px] text-navy-300 tracking-luxe uppercase">Studio</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs text-navy-200 tracking-wide-2 uppercase">
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-gold-500" /> Enterprise Grade</span>
          <span className="flex items-center gap-1.5"><Brain className="w-3.5 h-3.5 text-gold-500" /> AI Powered</span>
        </div>
      </header>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-16 pt-16 md:pt-24 pb-16 max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <div className={`mb-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/20 bg-navy-850/60 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs text-gold-200 tracking-luxe uppercase">AI Sales Strategist</span>
          </div>
        </div>

        {/* Title */}
        <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl font-light text-cream leading-[1.05] mb-6 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          THE DEAL ROOM
        </h1>

        {/* Gold divider */}
        <div className={`flex items-center gap-3 mb-8 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold-500/50" />
        </div>

        {/* Subtitle */}
        <p className={`text-lg md:text-xl text-navy-200 font-light max-w-2xl leading-relaxed mb-4 transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Where artificial intelligence transforms a sales conversation into a qualified opportunity — with the precision of private banking and the insight of enterprise intelligence.
        </p>

        {/* Flow indicator */}
        <div className={`flex items-center gap-2 md:gap-4 mt-6 mb-12 transition-all duration-700 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          {['Conversation', 'Qualification', 'Signal', 'Opportunity', 'Strategy', 'Meeting'].map((step, i) => (
            <div key={step} className="flex items-center gap-2 md:gap-4">
              <span className="text-[10px] md:text-xs text-navy-300 tracking-wide-2 uppercase font-medium whitespace-nowrap">
                {step}
              </span>
              {i < 5 && <ArrowRight className="w-3 h-3 text-gold-600/40" />}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onEnter}
          className={`group relative px-10 py-4 transition-all duration-700 delay-800 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="absolute inset-0 border border-gold-500/40 rounded-sm group-hover:border-gold-500/70 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-gold-600/0 via-gold-600/10 to-gold-600/0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute -inset-px rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 40px -8px rgba(201,168,76,0.5)' }} />
          <div className="relative flex items-center gap-3">
            <span className="font-serif text-lg text-gold-200 tracking-wide-2">Enter Deal Room</span>
            <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </button>

        {/* Feature highlights */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-px mt-20 w-full max-w-3xl transition-all duration-700 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { icon: TrendingUp, label: 'Buying Intent Detection', desc: 'AI analyzes every message for purchase readiness' },
            { icon: Brain, label: 'Objection Intelligence', desc: 'Real-time value context and response generation' },
            { icon: Shield, label: 'Opportunity Creation', desc: 'Qualified leads transform into structured deals' },
          ].map((feat, i) => (
            <div key={i} className="glass-navy p-6 text-left hover-lift">
              <feat.icon className="w-5 h-5 text-gold-400 mb-3" />
              <div className="text-sm text-cream font-medium mb-1.5">{feat.label}</div>
              <div className="text-xs text-navy-300 leading-relaxed">{feat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-navy-950 to-transparent pointer-events-none" />
    </div>
  );
}
