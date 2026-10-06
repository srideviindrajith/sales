import { useEffect, useState } from 'react';
import { Check, Building2, Target, TrendingUp, Package, ArrowRight, Calendar, X } from 'lucide-react';
import type { Prospect, PackageTier } from '@/data/deal';

type OpportunityCreatedProps = {
  prospect: Prospect;
  packages: PackageTier[];
  onBookMeeting: () => void;
  onClose: () => void;
};

export default function OpportunityCreated({ prospect, packages, onBookMeeting, onClose }: OpportunityCreatedProps) {
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    [300, 600, 900, 1200, 1500].forEach((delay, i) => {
      timers.push(setTimeout(() => setRevealStep(i + 1), delay));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const recommended = packages.find((p) => p.recommended) || packages[1];

  const fields = [
    { icon: Building2, label: 'Customer', value: prospect.company },
    { icon: Target, label: 'Requirement', value: prospect.requirement },
    { icon: TrendingUp, label: 'Intent', value: prospect.buyingIntent },
    { icon: Package, label: 'Recommended Package', value: recommended.name },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop with radial gold glow */}
      <div className="absolute inset-0 bg-navy-950/85 backdrop-blur-md" />
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,168,76,0.2) 0%, transparent 60%)' }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass-navy-strong rounded-xl gold-glow-strong overflow-hidden animate-scale-in">
        {/* Decorative top line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="px-8 py-10 text-center">
          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-md border border-navy-600/40 flex items-center justify-center hover:border-gold-500/40 transition-colors">
            <X className="w-4 h-4 text-navy-300" />
          </button>

          {/* Success badge */}
          <div className={`relative w-20 h-20 mx-auto mb-6 transition-all duration-700 ${revealStep >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className="absolute inset-0 rounded-full border border-gold-500/40 flex items-center justify-center gold-glow-strong">
              <Check className="w-10 h-10 text-gold-300" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-0 rounded-full border border-gold-400/30" style={{ animation: 'expandRing 2s ease-out infinite' }} />
            <div className="absolute inset-0 rounded-full border border-gold-400/20" style={{ animation: 'expandRing 2s ease-out 1s infinite' }} />
          </div>

          {/* Title */}
          <div className={`transition-all duration-500 ${revealStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-2">Opportunity Created</div>
            <div className="font-serif text-cream text-3xl font-light mb-2">A new deal has emerged</div>
            <div className="gold-divider w-24 mx-auto mb-6" />
          </div>

          {/* Fields */}
          <div className="space-y-2.5 text-left">
            {fields.map((field, i) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.label}
                  className={`flex items-center gap-4 px-4 py-3 rounded-md bg-navy-850/60 border border-navy-700/40 transition-all duration-500 ${
                    revealStep >= i + 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="w-9 h-9 rounded-md border border-gold-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-gold-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-navy-400 tracking-wide-2 uppercase">{field.label}</div>
                    <div className="text-sm text-cream font-medium truncate">{field.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next action */}
          <div className={`mt-6 transition-all duration-500 ${revealStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="flex items-center justify-center gap-2 text-xs text-navy-300 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
              <span className="tracking-wide-2 uppercase">Next Action: Schedule Demo</span>
            </div>

            <button
              onClick={onBookMeeting}
              className="group relative w-full py-3.5 rounded-md border border-gold-500/40 hover:border-gold-500/60 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold-600/0 via-gold-600/10 to-gold-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />
              <div className="relative flex items-center justify-center gap-2.5">
                <Calendar className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-gold-200 tracking-wide-2 uppercase font-medium">Book Executive Meeting</span>
                <ArrowRight className="w-4 h-4 text-gold-400 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
