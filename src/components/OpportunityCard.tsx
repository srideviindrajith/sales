import { Building2, Factory, Package, DollarSign, Gauge, Layers, Check } from 'lucide-react';
import type { Prospect, PackageTier, DealStageId } from '@/data/deal';

type OpportunityCardProps = {
  prospect: Prospect;
  packages: PackageTier[];
  currentStage: DealStageId;
  meetingBooked: boolean;
  meetingDetails?: { date: string; time: string; timezone: string; type: string };
};

const stageLabels: Record<DealStageId, string> = {
  discover: 'Discovery',
  qualify: 'Qualified',
  demonstrate: 'Demonstrating',
  proposal: 'Proposal Sent',
  negotiation: 'Negotiating',
  close: 'Closed',
};

export default function OpportunityCard({ prospect, packages, currentStage, meetingBooked, meetingDetails }: OpportunityCardProps) {
  const recommended = packages.find((p) => p.recommended) || packages[1];

  return (
    <div className="glass-navy rounded-lg flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gold-500/10 shrink-0">
        <div className="text-[10px] text-gold-500 tracking-luxe uppercase">Opportunity</div>
        <div className="font-serif text-cream text-base mt-0.5">Deal Summary</div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scroll-luxe px-5 py-4 space-y-4">
        {/* Deal fields */}
        <div className="space-y-2.5">
          {[
            { icon: Building2, label: 'Company', value: prospect.company },
            { icon: Factory, label: 'Industry', value: prospect.industry },
            { icon: Package, label: 'Requirement', value: prospect.requirement },
            { icon: Gauge, label: 'Buying Intent', value: prospect.buyingIntent, highlight: true },
            { icon: DollarSign, label: 'Estimated Value', value: prospect.estimatedValue, highlight: true },
            { icon: Layers, label: 'Stage', value: stageLabels[currentStage] },
          ].map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.label} className="flex items-center justify-between py-2 border-b border-navy-700/30 last:border-0">
                <div className="flex items-center gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-navy-400" />
                  <span className="text-[10px] text-navy-400 tracking-wide-2 uppercase">{field.label}</span>
                </div>
                <span className={`text-sm font-medium ${field.highlight ? 'text-gold-300' : 'text-cream'}`}>
                  {field.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Meeting status */}
        {meetingBooked && meetingDetails && (
          <div className="rounded-md border border-emerald-500/25 bg-emerald-500/5 p-3.5 animate-fade-up">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] text-emerald-300 tracking-wide-2 uppercase">Meeting Scheduled</span>
            </div>
            <div className="text-xs text-cream leading-relaxed">
              {meetingDetails.type} · {meetingDetails.date} at {meetingDetails.time}
            </div>
            <div className="text-[10px] text-navy-300 mt-0.5">{meetingDetails.timezone}</div>
          </div>
        )}

        {/* Package recommendation */}
        <div>
          <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-2.5">Recommended Package</div>
          <div className="rounded-md border border-gold-500/25 bg-gradient-to-br from-gold-500/8 to-transparent p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-serif text-gold-200 text-lg">{recommended.name}</span>
              {recommended.recommended && (
                <span className="text-[9px] px-2 py-0.5 rounded-full border border-gold-500/30 text-gold-300 tracking-wide-2 uppercase">Recommended</span>
              )}
            </div>
            <div className="text-xl text-cream font-light mb-1">{recommended.price}</div>
            <div className="text-[10px] text-navy-300 mb-3">{recommended.tagline}</div>
            <div className="space-y-1.5">
              {recommended.features.slice(0, 4).map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-gold-500 shrink-0" />
                  <span className="text-[11px] text-navy-200">{feat}</span>
                </div>
              ))}
              {recommended.features.length > 4 && (
                <div className="text-[10px] text-navy-400 ml-5">+ {recommended.features.length - 4} more</div>
              )}
            </div>
          </div>
        </div>

        {/* Package comparison */}
        <div>
          <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-2.5">Package Comparison</div>
          <div className="space-y-2">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-md border p-3 transition-all ${
                  pkg.recommended
                    ? 'border-gold-500/25 bg-gold-500/5'
                    : 'border-navy-600/30 bg-navy-850/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${pkg.recommended ? 'text-gold-200' : 'text-cream'}`}>{pkg.name}</span>
                  <span className="text-xs text-navy-300">{pkg.price}</span>
                </div>
                <div className="text-[10px] text-navy-400 mt-1">{pkg.tagline}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
