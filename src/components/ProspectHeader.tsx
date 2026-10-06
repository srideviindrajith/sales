import type { Prospect } from '@/data/deal';

type ProspectHeaderProps = {
  prospect: Prospect;
  intentProgress: number;
};

export default function ProspectHeader({ prospect, intentProgress }: ProspectHeaderProps) {
  return (
    <div className="glass-navy rounded-lg p-5 md:p-6 animate-fade-down">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] text-gold-500 tracking-luxe uppercase">Active Prospect</div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-navy-300 tracking-wide-2 uppercase">Live Session</span>
        </div>
      </div>

      <div className="flex items-center gap-5 mt-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full border border-gold-500/30 flex items-center justify-center bg-gradient-to-br from-navy-700 to-navy-850">
            <span className="font-serif text-gold-300 text-xl">{prospect.initials}</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-navy-850" />
        </div>

        {/* Identity */}
        <div className="flex-1 min-w-0">
          <div className="font-serif text-cream text-2xl font-medium truncate">{prospect.name}</div>
          <div className="text-sm text-navy-200 mt-0.5">{prospect.title} · {prospect.company}</div>
          <div className="text-xs text-navy-400 mt-1">{prospect.industry}</div>
        </div>

        {/* Intent gauge */}
        <div className="hidden md:flex flex-col items-end shrink-0">
          <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-1.5">Buying Intent</div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl text-gold-gradient font-medium">{prospect.buyingIntent}</span>
          </div>
          <div className="mt-2 w-32 h-1 bg-navy-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-300 transition-all duration-1000 ease-out"
              style={{ width: `${intentProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
