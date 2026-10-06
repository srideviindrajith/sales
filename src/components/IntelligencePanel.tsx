import { TrendingUp, Target, Compass, Zap } from 'lucide-react';
import type { IntelligenceInsight } from '@/data/deal';

type IntelligencePanelProps = {
  insights: IntelligenceInsight[];
  visibleCount: number;
  isAnalyzing: boolean;
};

const iconForType: Record<string, typeof TrendingUp> = {
  intent: TrendingUp,
  requirement: Target,
  stage: Compass,
  action: Zap,
};

const colorForType: Record<string, string> = {
  intent: 'text-emerald-300/90 border-emerald-500/20 bg-emerald-500/5',
  requirement: 'text-gold-300/90 border-gold-500/20 bg-gold-500/5',
  stage: 'text-sky-300/90 border-sky-500/20 bg-sky-500/5',
  action: 'text-amber-300/90 border-amber-500/20 bg-amber-500/5',
};

const barColorForType: Record<string, string> = {
  intent: 'from-emerald-600 to-emerald-300',
  requirement: 'from-gold-600 to-gold-300',
  stage: 'from-sky-600 to-sky-300',
  action: 'from-amber-600 to-amber-300',
};

export default function IntelligencePanel({ insights, visibleCount, isAnalyzing }: IntelligencePanelProps) {
  return (
    <div className="glass-navy rounded-lg flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gold-500/10 flex items-center justify-between shrink-0">
        <div>
          <div className="font-serif text-cream text-base">AI Intelligence</div>
          <div className="text-[10px] text-navy-400 tracking-wide-2 uppercase">Real-time Analysis</div>
        </div>
        {isAnalyzing && (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[10px] text-gold-400/70 tracking-wide-2 uppercase">Analyzing</span>
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="flex-1 overflow-y-auto scroll-luxe px-5 py-4 space-y-3">
        {insights.slice(0, visibleCount).map((insight, i) => {
          const Icon = iconForType[insight.type] || Target;
          return (
            <div
              key={insight.label}
              className={`rounded-md border p-4 animate-fade-up ${colorForType[insight.type]}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md border border-current/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-luxe uppercase opacity-60 mb-1">{insight.label}</div>
                  <div className="font-serif text-cream text-lg leading-tight">{insight.value}</div>
                  <div className="text-xs text-navy-300 mt-1.5 leading-relaxed">{insight.detail}</div>

                  {/* Intensity bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-0.5 bg-navy-700/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${barColorForType[insight.type]} transition-all duration-1000 ease-out`}
                        style={{ width: `${insight.intensity}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-navy-400 tabular-nums">{insight.intensity}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {visibleCount === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-10 h-10 rounded-full border border-gold-500/20 flex items-center justify-center mb-3 animate-float">
              <TrendingUp className="w-4 h-4 text-gold-500/50" />
            </div>
            <div className="text-xs text-navy-300">Monitoring conversation for signals</div>
          </div>
        )}
      </div>
    </div>
  );
}
