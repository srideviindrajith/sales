import { useEffect, useState } from 'react';
import { AlertTriangle, FileSearch, MessageSquareReply, Check, X, ShieldAlert } from 'lucide-react';
import { objectionFlow } from '@/data/deal';

type ObjectionHandlerProps = {
  onClose: () => void;
  onComplete: () => void;
};

type Phase = 0 | 1 | 2 | 3;

const phases = [
  { key: 'concern', icon: AlertTriangle, label: 'Concern', ...objectionFlow.concern },
  { key: 'context', icon: FileSearch, label: 'Context', ...objectionFlow.context },
  { key: 'response', icon: MessageSquareReply, label: 'Response', ...objectionFlow.response },
];

export default function ObjectionHandler({ onClose, onComplete }: ObjectionHandlerProps) {
  const [phase, setPhase] = useState<Phase>(0);
  const [phaseProgress, setPhaseProgress] = useState(0);

  // Auto-advance through phases 0→1→2
  useEffect(() => {
    if (phase >= 3) return;
    const progressTimer = setInterval(() => {
      setPhaseProgress((p) => {
        if (p >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return p + 4;
      });
    }, 40);

    const advanceTimer = setTimeout(() => {
      setPhase((prev) => (prev + 1) as Phase);
      setPhaseProgress(0);
    }, 2600);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(advanceTimer);
    };
  }, [phase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl glass-navy-strong rounded-xl gold-glow-strong animate-scale-in overflow-hidden">
        {/* Scan line effect */}
        {phase < 3 && (
          <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent scan-line" />
          </div>
        )}

        {/* Header */}
        <div className="px-6 py-5 border-b border-gold-500/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-rose-500/30 bg-rose-500/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-rose-300" />
            </div>
            <div>
              <div className="font-serif text-cream text-xl">Objection Handling Mode</div>
              <div className="text-[10px] text-navy-300 tracking-luxe uppercase">AI Intervention Activated</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-md border border-navy-600/40 flex items-center justify-center hover:border-gold-500/40 transition-colors">
            <X className="w-4 h-4 text-navy-300" />
          </button>
        </div>

        {/* Phase progress */}
        <div className="px-6 pt-5">
          <div className="flex items-center justify-between mb-2">
            {phases.map((p, i) => {
              const Icon = p.icon;
              const isDone = phase > i;
              const isActive = phase === i;
              return (
                <div key={p.key} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isDone
                          ? 'border-gold-500/50 bg-gold-500/10'
                          : isActive
                            ? 'border-gold-400 bg-navy-800 gold-glow animate-pulse-gold'
                            : 'border-navy-600/40 bg-navy-850'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-4 h-4 text-gold-400" />
                      ) : (
                        <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-gold-300' : 'text-navy-400'}`} />
                      )}
                    </div>
                    <span className={`text-[10px] tracking-wide-2 uppercase hidden md:inline ${isActive || isDone ? 'text-gold-300' : 'text-navy-400'}`}>
                      {p.label}
                    </span>
                  </div>
                  {i < phases.length - 1 && (
                    <div className="flex-1 h-px mx-3 bg-navy-700/60 relative">
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-500"
                        style={{ width: phase > i ? '100%' : isActive ? `${phaseProgress}%` : '0%' }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase content */}
        <div className="px-6 py-6 min-h-[200px]">
          {phase < 3 && (
            <div key={phase} className="animate-fade-up">
              <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-2">
                {phases[phase].subtitle}
              </div>
              <div className="font-serif text-cream text-2xl mb-4">{phases[phase].title}</div>
              <p className="text-sm text-navy-200 leading-relaxed mb-5">{phases[phase].summary}</p>
              <div className="space-y-2">
                {phases[phase].details.map((detail, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md bg-navy-850/60 border border-navy-700/40 animate-fade-up"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    <div className={`w-1 h-1 rounded-full ${phase === 0 ? 'bg-rose-400' : phase === 1 ? 'bg-sky-400' : 'bg-gold-400'}`} />
                    <span className="text-xs text-navy-100">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {phase >= 3 && (
            <div className="animate-scale-in text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full border border-gold-500/40 bg-gold-500/10 flex items-center justify-center mb-4 gold-glow-strong">
                <Check className="w-8 h-8 text-gold-300" />
              </div>
              <div className="font-serif text-cream text-2xl mb-2">Objection Resolved</div>
              <div className="text-sm text-navy-200 max-w-md mx-auto">
                The AI strategist has addressed the prospect's concern with quantified value context. The conversation may now continue toward qualification.
              </div>
              <button
                onClick={onComplete}
                className="mt-6 px-8 py-3 rounded-md border border-gold-500/40 hover:border-gold-500/60 bg-navy-850/50 hover:bg-navy-800/50 transition-all duration-300 group"
              >
                <span className="text-sm text-gold-200 tracking-wide-2 uppercase font-medium">Resume Conversation</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
