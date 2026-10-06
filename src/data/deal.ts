// Core domain types for PhoenixAI Deal Room

export type Sender = 'prospect' | 'agent' | 'system';

export type DealStageId = 'discover' | 'qualify' | 'demonstrate' | 'proposal' | 'negotiation' | 'close';

export type IntentLevel = 'Low' | 'Medium' | 'High' | 'Very High';

export type ConversationTurn = {
  id: number;
  sender: Sender;
  text: string;
  role?: string;
  timestamp: string;
  // Signals this turn surfaces
  signals?: SignalTag[];
  // Stage this turn advances to
  advancesTo?: DealStageId;
  // Triggers objection mode
  triggersObjection?: boolean;
  // Triggers opportunity creation
  triggersOpportunity?: boolean;
  // Triggers qualification state
  qualifiesLead?: boolean;
};

export type SignalTag = {
  label: string;
  type: 'positive' | 'negative' | 'neutral';
  weight: number;
};

export type Prospect = {
  name: string;
  title: string;
  company: string;
  industry: string;
  requirement: string;
  buyingIntent: IntentLevel;
  estimatedValue: string;
  stage: DealStageId;
  initials: string;
};

export type DealStage = {
  id: DealStageId;
  label: string;
  description: string;
  icon: string;
};

export type PackageTier = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  recommended?: boolean;
};

export type IntelligenceInsight = {
  label: string;
  value: string;
  detail: string;
  type: 'intent' | 'requirement' | 'stage' | 'action';
  intensity: number; // 0-100
};

// ---- Scripted conversation ----
export const conversation: ConversationTurn[] = [
  {
    id: 1,
    sender: 'prospect',
    text: "Hi, I'm exploring solutions for customer support automation. We handle 40k tickets per month and our current team is overwhelmed.",
    timestamp: '09:14',
    role: 'VP Operations',
    signals: [
      { label: 'Problem stated explicitly', type: 'positive', weight: 15 },
      { label: 'Scale quantified (40k/mo)', type: 'positive', weight: 10 },
    ],
    advancesTo: 'qualify',
    qualifiesLead: true,
  },
  {
    id: 2,
    sender: 'agent',
    text: "Good morning, Ms. Hartwell. 40,000 tickets per month is a significant volume — that's roughly 1,300 per day across a standard team. May I confirm: is the goal to reduce headcount pressure, improve response times, or both?",
    timestamp: '09:14',
    role: 'PhoenixAI Sales Strategist',
  },
  {
    id: 3,
    sender: 'prospect',
    text: "Both, frankly. We want to cut average resolution time in half and give our team breathing room to focus on complex escalations.",
    timestamp: '09:15',
    role: 'VP Operations',
    signals: [
      { label: 'Clear success criteria', type: 'positive', weight: 12 },
      { label: 'Budget implied (headcount ROI)', type: 'positive', weight: 8 },
    ],
    advancesTo: 'demonstrate',
  },
  {
    id: 4,
    sender: 'agent',
    text: "Understood. Our automation suite has reduced resolution time by 58% on average for enterprise clients at your scale. Would a focused demo of the ticket routing and auto-resolution workflows be valuable to you and your team?",
    timestamp: '09:15',
    role: 'PhoenixAI Sales Strategist',
  },
  {
    id: 5,
    sender: 'prospect',
    text: "Your package is expensive. We've looked at two competitors and the pricing gap is significant.",
    timestamp: '09:16',
    role: 'VP Operations',
    signals: [
      { label: 'Price concern raised', type: 'negative', weight: -5 },
      { label: 'Actively evaluating competitors', type: 'neutral', weight: 6 },
      { label: 'Engaged in evaluation stage', type: 'positive', weight: 10 },
    ],
    advancesTo: 'proposal',
    triggersObjection: true,
  },
  {
    id: 6,
    sender: 'agent',
    text: "I appreciate the directness, Ms. Hartwell. Let me share context on the value differential. At 40,000 tickets per month, our platform saves an average of 1,840 agent hours monthly — that's roughly $73,600 in labor costs alone at enterprise rates. Competitors at lower price points typically handle 40-60% automation coverage; ours maintains 91% across tier-one escalations. The gap in price reflects the gap in outcome. Shall I prepare a tailored proposal with the ROI breakdown for your finance team?",
    timestamp: '09:17',
    role: 'PhoenixAI Sales Strategist',
    signals: [
      { label: 'Objection addressed with data', type: 'positive', weight: 12 },
    ],
    advancesTo: 'negotiation',
  },
  {
    id: 7,
    sender: 'prospect',
    text: "That ROI framing is compelling. If the numbers hold, I'd want to bring this to our CTO next week. Can we set something up?",
    timestamp: '09:18',
    role: 'VP Operations',
    signals: [
      { label: 'Decision-maker engagement', type: 'positive', weight: 15 },
      { label: 'Buying intent: Very High', type: 'positive', weight: 10 },
      { label: 'Timeline confirmed (next week)', type: 'positive', weight: 8 },
    ],
    advancesTo: 'close',
    triggersOpportunity: true,
  },
  {
    id: 8,
    sender: 'agent',
    text: "Excellent. I'll prepare the opportunity brief and ROI summary for your CTO. Let's secure a meeting time that works for both of you — I can share available slots now.",
    timestamp: '09:18',
    role: 'PhoenixAI Sales Strategist',
  },
];

// ---- Prospect profile ----
export const prospect: Prospect = {
  name: 'Eleanor Hartwell',
  title: 'VP Operations',
  company: 'Meridian Logistics',
  industry: 'Logistics & Supply Chain',
  requirement: 'Customer Support Automation',
  buyingIntent: 'High',
  estimatedValue: '$180,000',
  stage: 'discover',
  initials: 'EH',
};

export const dealStages: DealStage[] = [
  { id: 'discover', label: 'Discover', description: 'Initial contact & needs', icon: 'Compass' },
  { id: 'qualify', label: 'Qualify', description: 'Validate fit & authority', icon: 'Filter' },
  { id: 'demonstrate', label: 'Demonstrate', description: 'Product showcase', icon: 'Play' },
  { id: 'proposal', label: 'Proposal', description: 'Pricing & terms', icon: 'FileText' },
  { id: 'negotiation', label: 'Negotiation', description: 'Final alignment', icon: 'Handshake' },
  { id: 'close', label: 'Close', description: 'Contract & commit', icon: 'CheckCircle' },
];

export const intelligenceInsights: IntelligenceInsight[] = [
  {
    label: 'Buying Intent',
    value: 'High',
    detail: 'Prospect has quantified pain, stated timeline, and named decision-maker. Active evaluation with competitors.',
    type: 'intent',
    intensity: 78,
  },
  {
    label: 'Primary Requirement',
    value: 'Customer Support Automation',
    detail: '40,000 tickets/month. Goal: 50% reduction in resolution time + headcount relief for complex escalations.',
    type: 'requirement',
    intensity: 85,
  },
  {
    label: 'Decision Stage',
    value: 'Evaluation',
    detail: 'Actively comparing solutions. Two competitors in consideration. CTO is final approver.',
    type: 'stage',
    intensity: 65,
  },
  {
    label: 'Next Best Action',
    value: 'Schedule Demo',
    detail: 'Arrange CTO + VP Ops joint demo with ROI breakdown tailored for finance review.',
    type: 'action',
    intensity: 72,
  },
];

export const objectionFlow = {
  concern: {
    title: 'Concern Detected',
    subtitle: 'Price sensitivity raised',
    summary: 'Prospect has explicitly flagged cost as a barrier and referenced competitor pricing.',
    details: [
      'Objection type: Price / Value',
      'Competitors referenced: 2',
      'Engagement context: Active evaluation',
      'Risk level: Manageable — buying signals remain strong',
    ],
  },
  context: {
    title: 'Value Context Prepared',
    subtitle: 'ROI & differentiation analysis',
    summary: 'Quantified value position assembled from prospect\'s own operational data.',
    details: [
      'Monthly labor savings: 1,840 agent hours',
      'Cost savings: ~$73,600/month at enterprise rates',
      'Automation coverage: 91% vs. competitor 40-60%',
      'Resolution time reduction: 58% (exceeds prospect goal of 50%)',
    ],
  },
  response: {
    title: 'Response Generated',
    subtitle: 'Objection-handling recommendation',
    summary: 'Acknowledge concern directly, reframe around outcome differential, and anchor to prospect\'s stated ROI goals.',
    details: [
      'Open: Acknowledge pricing gap honestly',
      'Pivot: Anchor to 1,840 hours saved monthly',
      'Differentiate: 91% vs 40-60% automation coverage',
      'Close: Offer tailored ROI proposal for finance team',
    ],
  },
};

export const packageTiers: PackageTier[] = [
  {
    name: 'Business',
    price: '$4,900/mo',
    tagline: 'For growing teams entering automated sales',
    features: [
      'Lead qualification engine',
      'Appointment scheduling',
      'Calendar integration',
      'Conversation analytics',
      'Single AI agent',
    ],
  },
  {
    name: 'Enterprise',
    price: '$12,400/mo',
    tagline: 'For organizations with complex sales workflows',
    features: [
      'Everything in Business',
      'CRM & email integration',
      'Custom workflow builder',
      'Multiple AI agents',
      'Dedicated success manager',
      'SSO & advanced security',
    ],
    recommended: true,
  },
];

export type MeetingType = 'Demo' | 'Discovery' | 'Strategy Session' | 'Closing Review';

export const meetingTypes: MeetingType[] = ['Demo', 'Discovery', 'Strategy Session', 'Closing Review'];

export const availableSlots = [
  { day: 'Mon', date: 'Oct 7', times: ['10:00', '14:00', '16:30'] },
  { day: 'Tue', date: 'Oct 8', times: ['09:30', '13:00', '15:00'] },
  { day: 'Wed', date: 'Oct 9', times: ['11:00', '14:30', '17:00'] },
  { day: 'Thu', date: 'Oct 10', times: ['10:30', '13:30'] },
  { day: 'Fri', date: 'Oct 11', times: ['09:00', '12:00', '15:30'] },
];

export const timezones = [
  'America/New_York (ET)',
  'America/Chicago (CT)',
  'America/Los_Angeles (PT)',
  'Europe/London (GMT)',
  'Europe/Paris (CET)',
  'Asia/Tokyo (JST)',
];
