import { Compass, Filter, Play, FileText, Handshake, CheckCircle } from 'lucide-react';
import type { DealStageId } from '@/data/deal';

type DealJourneyProps = {
  currentStage: DealStageId;
  onStageClick?: (id: DealStageId) => void;
};

const iconMap: Record<string, typeof Compass> = {
  Compass,
  Filter,
  Play,
  FileText,
  Handshake,
  CheckCircle,
};

const stages: { id: DealStageId; label: string; description: string; icon: string }[] = [
  { id: 'discover', label: 'Discover', description: 'Initial contact', icon: 'Compass' },
  { id: 'qualify', label: 'Qualify', description: 'Validate fit', icon: 'Filter' },
  { id: 'demonstrate', label: 'Demonstrate', description: 'Product showcase', icon: 'Play' },
  { id: 'proposal', label: 'Proposal', description: 'Pricing & terms', icon: 'FileText' },
  { id: 'negotiation', label: 'Negotiation', description: 'Final alignment', icon: 'Handshake' },
  { id: 'close', label: 'Close', description: 'Contract & commit', icon: 'CheckCircle' },
];

export default function DealJourney({ currentStage }: DealJourneyProps) {
  const currentIndex = stages.findIndex((s) => s.id === currentStage);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-1">Deal Journey</div>
          <div className="font-serif text-cream text-lg">Executive Pipeline</div>
        </div>
        <div className="text-xs text-navy-300">
          Stage <span className="text-gold-400 font-medium">{currentIndex + 1}</span> of {stages.length}
        </div>
      </div>

      {/* Journey track */}
      <div className="relative">
        {/* SVG path */}
        <svg className="absolute top-[22px] left-0 w-full h-2 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 4">
          <line x1="2" y1="2" x2="98" y2="2" stroke="rgba(201,168,76,0.12)" strokeWidth="0.3" />
          <line
            x1="2"
            y1="2"
            x2={2 + (96 * (currentIndex + 1)) / stages.length}
            y2="2"
            stroke="url(#goldGrad)"
            strokeWidth="0.5"
            strokeLinecap="round"
            style={{ transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}
          />
          <defs>
            <linearGradient id="goldGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#b8943f" />
              <stop offset="100%" stopColor="#e0c977" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative flex items-start justify-between">
          {stages.map((stage, i) => {
            const Icon = iconMap[stage.icon] || Compass;
            const isComplete = i < currentIndex;
            const isCurrent = i === currentIndex;
            const isFuture = i > currentIndex;

            return (
              <div key={stage.id} className="flex flex-col items-center group cursor-pointer" style={{ width: `${100 / stages.length}%` }}>
                {/* Node */}
                <div
                  className={`relative w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    isCurrent
                      ? 'border-gold-500 bg-navy-800 gold-glow-strong animate-pulse-gold'
                      : isComplete
                        ? 'border-gold-600/50 bg-navy-800'
                        : 'border-navy-600/50 bg-navy-850'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full border border-gold-400/30" style={{ animation: 'expandRing 2s ease-out infinite' }} />
                  )}
                  <Icon
                    className={`w-4.5 h-4.5 transition-colors duration-500 ${
                      isCurrent ? 'text-gold-300' : isComplete ? 'text-gold-500/70' : 'text-navy-400'
                    }`}
                    size={18}
                  />
                  {isComplete && (
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-gold-600/30 border border-navy-800 flex items-center justify-center">
                      <CheckCircle className="w-2.5 h-2.5 text-gold-400" />
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="mt-3 text-center">
                  <div
                    className={`text-[11px] font-medium tracking-wide-2 uppercase transition-colors duration-500 ${
                      isCurrent ? 'text-gold-300' : isComplete ? 'text-cream/70' : 'text-navy-400'
                    }`}
                  >
                    {stage.label}
                  </div>
                  <div className={`text-[9px] mt-0.5 transition-colors duration-500 ${isCurrent ? 'text-navy-200' : 'text-navy-400/60'}`}>
                    {stage.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
