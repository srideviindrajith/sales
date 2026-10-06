import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Hero from '@/components/Hero';
import ProspectHeader from '@/components/ProspectHeader';
import DealJourney from '@/components/DealJourney';
import ConversationPanel from '@/components/ConversationPanel';
import IntelligencePanel from '@/components/IntelligencePanel';
import ObjectionHandler from '@/components/ObjectionHandler';
import OpportunityCreated from '@/components/OpportunityCreated';
import MeetingBooking from '@/components/MeetingBooking';
import OpportunityCard from '@/components/OpportunityCard';
import {
  conversation,
  prospect as initialProspect,
  intelligenceInsights,
  packageTiers,
  type ConversationTurn,
  type DealStageId,
  type SignalTag,
} from '@/data/deal';

type View = 'hero' | 'dealroom';
type BookingDetails = { date: string; time: string; timezone: string; type: string };

export default function App() {
  const [view, setView] = useState<View>('hero');
  const [turnIndex, setTurnIndex] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<ConversationTurn[]>([]);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [currentStage, setCurrentStage] = useState<DealStageId>('discover');
  const [allSignals, setAllSignals] = useState<SignalTag[]>([]);
  const [insightCount, setInsightCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [intentProgress, setIntentProgress] = useState(10);
  const [prospect, setProspect] = useState(initialProspect);
  const [showObjection, setShowObjection] = useState(false);
  const [showOpportunity, setShowOpportunity] = useState(false);
  const [opportunityDismissed, setOpportunityDismissed] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [meetingBooked, setMeetingBooked] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState<BookingDetails | undefined>(undefined);
  const [conversationComplete, setConversationComplete] = useState(false);

  // Auto-play the first prospect message on entering deal room
  useEffect(() => {
    if (view !== 'dealroom' || visibleMessages.length > 0) return;
    const timer = setTimeout(() => {
      processNextTurn();
    }, 800);
    return () => clearTimeout(timer);
  }, [view]);

  // After showing a prospect message, auto-trigger agent response
  useEffect(() => {
    if (visibleMessages.length === 0) return;
    const lastMsg = visibleMessages[visibleMessages.length - 1];
    if (lastMsg.sender === 'prospect' && !isAgentTyping && turnIndex < conversation.length) {
      const timer = setTimeout(() => {
        processNextTurn();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [visibleMessages, isAgentTyping, turnIndex]);

  const processNextTurn = useCallback(() => {
    if (turnIndex >= conversation.length) return;
    const turn = conversation[turnIndex];

    if (turn.sender === 'agent') {
      setIsAgentTyping(true);
      setIsAnalyzing(true);
      const typingDuration = Math.min(Math.max(turn.text.length * 18, 1500), 3500);
      setTimeout(() => {
        setIsAgentTyping(false);
        setVisibleMessages((prev) => [...prev, turn]);
        setTurnIndex((prev) => prev + 1);
        const turnSignals = turn.signals;
        if (turnSignals) {
          setAllSignals((prev) => [...prev, ...turnSignals]);
        }
        if (turn.advancesTo) {
          setCurrentStage(turn.advancesTo);
          updateIntent(turn.advancesTo);
        }
        // Reveal insights progressively
        setInsightCount((prev) => Math.min(prev + 1, intelligenceInsights.length));
        setIsAnalyzing(false);
      }, typingDuration);
    } else {
      // Prospect message
      setVisibleMessages((prev) => [...prev, turn]);
      setTurnIndex((prev) => prev + 1);
      const turnSignals = turn.signals;
      if (turnSignals) {
        setAllSignals((prev) => [...prev, ...turnSignals]);
      }
      if (turn.qualifiesLead) {
        setProspect((prev) => ({ ...prev, buyingIntent: 'High' }));
        setInsightCount((prev) => Math.min(prev + 2, intelligenceInsights.length));
      }
      if (turn.advancesTo) {
        setCurrentStage(turn.advancesTo);
        updateIntent(turn.advancesTo);
      }
      if (turn.triggersObjection) {
        setTimeout(() => setShowObjection(true), 1000);
      }
      if (turn.triggersOpportunity) {
        setProspect((prev) => ({ ...prev, buyingIntent: 'Very High' }));
        setIntentProgress(95);
        setInsightCount(intelligenceInsights.length);
        setCurrentStage('close');
        setTimeout(() => setShowOpportunity(true), 1200);
      }
    }
  }, [turnIndex]);

  const updateIntent = (stage: DealStageId) => {
    const stageProgress: Record<DealStageId, number> = {
      discover: 15,
      qualify: 35,
      demonstrate: 50,
      proposal: 60,
      negotiation: 75,
      close: 95,
    };
    setIntentProgress((prev) => Math.max(prev, stageProgress[stage]));
  };

  const handleAdvance = () => {
    if (isAgentTyping) return;
    processNextTurn();
  };

  const handleObjectionComplete = () => {
    setShowObjection(false);
    // Continue conversation — next turn is the agent's objection response
    if (turnIndex < conversation.length) {
      processNextTurn();
    }
  };

  const handleOpportunityBook = () => {
    setShowOpportunity(false);
    setOpportunityDismissed(true);
    setShowBooking(true);
  };

  const handleBookingConfirm = (details: BookingDetails) => {
    setMeetingDetails(details);
    setMeetingBooked(true);
    setShowBooking(false);
    setConversationComplete(true);
  };

  const canAdvance =
    !isAgentTyping &&
    !showObjection &&
    !showOpportunity &&
    !showBooking &&
    turnIndex < conversation.length &&
    visibleMessages.length > 0 &&
    visibleMessages[visibleMessages.length - 1].sender === 'agent';

  if (view === 'hero') {
    return <Hero onEnter={() => setView('dealroom')} />;
  }

  return (
    <div className="min-h-screen bg-navy-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(47,61,84,0.5) 0%, transparent 70%)' }}
      />

      {/* Top bar */}
      <header className="relative z-10 px-6 md:px-10 py-4 flex items-center justify-between border-b border-gold-500/10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setView('hero')}
            className="flex items-center gap-2 text-xs text-navy-300 hover:text-gold-300 transition-colors tracking-wide-2 uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Exit
          </button>
          <div className="w-px h-5 bg-navy-600/50" />
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg border border-gold-500/30 flex items-center justify-center">
              <span className="font-serif text-gold-400 text-base font-semibold">P</span>
            </div>
            <div>
              <div className="font-serif text-cream text-sm tracking-wide-2">PhoenixAI Studio</div>
              <div className="text-[9px] text-navy-400 tracking-luxe uppercase">Deal Room</div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span className="text-[10px] text-navy-300 tracking-wide-2 uppercase">AI Strategist Active</span>
          </div>
          {conversationComplete && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-emerald-300 tracking-wide-2 uppercase">Deal Complete</span>
            </div>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 px-6 md:px-10 py-6 max-w-[1600px] mx-auto">
        {/* Prospect header */}
        <ProspectHeader prospect={prospect} intentProgress={intentProgress} />

        {/* Deal journey */}
        <div className="mt-5 glass-navy rounded-lg p-5 md:p-6 animate-fade-up">
          <DealJourney currentStage={currentStage} />
        </div>

        {/* Three-column workspace */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 h-[calc(100vh-340px)] min-h-[500px]">
          {/* Conversation — widest */}
          <div className="lg:col-span-5 animate-fade-up">
            <ConversationPanel
              messages={visibleMessages}
              isAgentTyping={isAgentTyping}
              signals={allSignals}
              conversationActive={true}
              onAdvance={handleAdvance}
              canAdvance={canAdvance}
              showAdvanceHint={turnIndex < conversation.length}
            />
          </div>

          {/* Intelligence */}
          <div className="lg:col-span-4 animate-fade-up delay-100">
            <IntelligencePanel
              insights={intelligenceInsights}
              visibleCount={insightCount}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {/* Opportunity card */}
          <div className="lg:col-span-3 animate-fade-up delay-200">
            <OpportunityCard
              prospect={prospect}
              packages={packageTiers}
              currentStage={currentStage}
              meetingBooked={meetingBooked}
              meetingDetails={meetingDetails}
            />
          </div>
        </div>
      </div>

      {/* Overlays */}
      {showObjection && (
        <ObjectionHandler
          onClose={() => setShowObjection(false)}
          onComplete={handleObjectionComplete}
        />
      )}

      {showOpportunity && (
        <OpportunityCreated
          prospect={prospect}
          packages={packageTiers}
          onBookMeeting={handleOpportunityBook}
          onClose={() => {
            setShowOpportunity(false);
            setOpportunityDismissed(true);
          }}
        />
      )}

      {showBooking && (
        <MeetingBooking
          onConfirm={handleBookingConfirm}
          onClose={() => setShowBooking(false)}
        />
      )}

      {/* Book meeting button if opportunity was dismissed but meeting not booked */}
      {opportunityDismissed && !meetingBooked && !showBooking && !showOpportunity && (
        <button
          onClick={() => setShowBooking(true)}
          className="fixed bottom-6 right-6 z-20 px-5 py-3 rounded-md border border-gold-500/40 bg-navy-850/90 backdrop-blur-sm hover:bg-navy-800/90 hover:border-gold-500/60 transition-all duration-300 group gold-glow animate-fade-up"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-gold-200 tracking-wide-2 uppercase font-medium">Book Meeting</span>
          </div>
        </button>
      )}
    </div>
  );
}
