import { useEffect, useRef } from 'react';
import { Brain, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import type { ConversationTurn, SignalTag } from '@/data/deal';

type ConversationPanelProps = {
  messages: ConversationTurn[];
  isAgentTyping: boolean;
  signals: SignalTag[];
  conversationActive: boolean;
  onAdvance: () => void;
  canAdvance: boolean;
  showAdvanceHint: boolean;
};

function SignalChip({ signal }: { signal: SignalTag }) {
  const icon =
    signal.type === 'positive' ? TrendingUp : signal.type === 'negative' ? AlertCircle : Sparkles;
  const Icon = icon;
  const color =
    signal.type === 'positive'
      ? 'border-emerald-500/30 text-emerald-300/90 bg-emerald-500/5'
      : signal.type === 'negative'
        ? 'border-rose-500/30 text-rose-300/90 bg-rose-500/5'
        : 'border-gold-500/25 text-gold-300/90 bg-gold-500/5';

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] tracking-wide-2 uppercase font-medium ${color} animate-slide-right`}>
      <Icon className="w-3 h-3" />
      {signal.label}
      <span className="opacity-50">{signal.weight > 0 ? '+' : ''}{signal.weight}</span>
    </div>
  );
}

export default function ConversationPanel({
  messages,
  isAgentTyping,
  signals,
  conversationActive,
  onAdvance,
  canAdvance,
  showAdvanceHint,
}: ConversationPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isAgentTyping]);

  return (
    <div className="glass-navy rounded-lg flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gold-500/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold-500/20 flex items-center justify-center bg-navy-850">
            <Brain className="w-4 h-4 text-gold-400" />
          </div>
          <div>
            <div className="font-serif text-cream text-base">Conversation</div>
            <div className="text-[10px] text-navy-400 tracking-wide-2 uppercase">AI Sales Strategist · Live</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-navy-300 tracking-wide-2 uppercase">Recording</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-luxe px-5 py-4 space-y-4 min-h-[300px]">
        {messages.length === 0 && !isAgentTyping && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-12 h-12 rounded-full border border-gold-500/20 flex items-center justify-center mb-3 animate-float">
              <Brain className="w-5 h-5 text-gold-500/60" />
            </div>
            <div className="text-sm text-navy-300">Awaiting prospect engagement</div>
            <div className="text-xs text-navy-400 mt-1">The AI strategist is standing by</div>
          </div>
        )}

        {messages.map((msg) => {
          const isProspect = msg.sender === 'prospect';
          const isAgent = msg.sender === 'agent';

          return (
            <div key={msg.id} className={`flex gap-3 ${isProspect ? 'justify-start' : 'justify-end'} animate-fade-up`}>
              {isProspect && (
                <div className="w-8 h-8 rounded-full border border-navy-600/40 flex items-center justify-center bg-navy-800 shrink-0 mt-0.5">
                  <span className="text-[10px] text-navy-200 font-medium">EH</span>
                </div>
              )}

              <div className={`max-w-[75%] ${isAgent ? 'items-end' : ''}`}>
                <div className={`flex items-center gap-2 mb-1 ${isProspect ? '' : 'flex-row-reverse'}`}>
                  <span className="text-[10px] text-navy-300 font-medium">{msg.role}</span>
                  <span className="text-[10px] text-navy-400">{msg.timestamp}</span>
                </div>
                <div
                  className={`px-4 py-3 rounded-lg text-sm leading-relaxed transition-all ${
                    isAgent
                      ? 'bg-gradient-to-br from-navy-700/80 to-navy-800/80 border border-gold-500/15 text-cream rounded-tr-sm'
                      : 'bg-navy-850/80 border border-navy-600/30 text-navy-100 rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Signal tags */}
                {msg.signals && msg.signals.length > 0 && (
                  <div className={`flex flex-wrap gap-1.5 mt-2 ${isProspect ? '' : 'justify-end'}`}>
                    {msg.signals.map((sig, i) => (
                      <SignalChip key={i} signal={sig} />
                    ))}
                  </div>
                )}
              </div>

              {isAgent && (
                <div className="w-8 h-8 rounded-full border border-gold-500/25 flex items-center justify-center bg-navy-800 shrink-0 mt-0.5">
                  <Brain className="w-4 h-4 text-gold-400" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isAgentTyping && (
          <div className="flex gap-3 justify-end animate-fade-in">
            <div className="px-4 py-3.5 rounded-lg bg-gradient-to-br from-navy-700/80 to-navy-800/80 border border-gold-500/15 rounded-tr-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 typing-dot" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 typing-dot" />
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 typing-dot" />
            </div>
            <div className="w-8 h-8 rounded-full border border-gold-500/25 flex items-center justify-center bg-navy-800 shrink-0 mt-0.5">
              <Brain className="w-4 h-4 text-gold-400" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div className="px-5 py-3.5 border-t border-gold-500/10 shrink-0">
        {conversationActive && canAdvance ? (
          <button
            onClick={onAdvance}
            className="w-full group relative py-2.5 rounded-md border border-gold-500/30 hover:border-gold-500/50 bg-navy-850/50 hover:bg-navy-800/50 transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs text-gold-200 tracking-wide-2 uppercase font-medium">Continue Conversation</span>
            </div>
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-gold-500/40" />
              <div className="w-1 h-1 rounded-full bg-gold-500/30" />
              <div className="w-1 h-1 rounded-full bg-gold-500/20" />
            </div>
            <span className="text-[10px] text-navy-400 tracking-wide-2 uppercase">
              {isAgentTyping ? 'AI is responding' : showAdvanceHint ? 'Awaiting next exchange' : 'Session in progress'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
