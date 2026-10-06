import { useState } from 'react';
import { Calendar, Clock, Globe, Check, X, ChevronLeft, Video, MapPin } from 'lucide-react';
import { availableSlots, timezones, meetingTypes } from '@/data/deal';
import type { MeetingType } from '@/data/deal';

type MeetingBookingProps = {
  onConfirm: (details: BookingDetails) => void;
  onClose: () => void;
};

export type BookingDetails = {
  date: string;
  time: string;
  timezone: string;
  type: MeetingType;
};

export default function MeetingBooking({ onConfirm, onClose }: MeetingBookingProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timezone, setTimezone] = useState(timezones[0]);
  const [meetingType, setMeetingType] = useState<MeetingType>('Demo');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (selectedDay === null || !selectedTime) return;
    const day = availableSlots[selectedDay];
    setConfirmed(true);
    setTimeout(() => {
      onConfirm({
        date: `${day.day}, ${day.date}`,
        time: selectedTime,
        timezone,
        type: meetingType,
      });
    }, 2200);
  };

  const canConfirm = selectedDay !== null && selectedTime !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-navy-950/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-xl glass-navy-strong rounded-xl gold-glow overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto scroll-luxe">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gold-500/15 flex items-center justify-between sticky top-0 bg-navy-900/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-gold-500/25 flex items-center justify-center bg-navy-850">
              <Calendar className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <div className="font-serif text-cream text-xl">Executive Meeting</div>
              <div className="text-[10px] text-navy-300 tracking-luxe uppercase">Premium Booking</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-md border border-navy-600/40 flex items-center justify-center hover:border-gold-500/40 transition-colors">
            <X className="w-4 h-4 text-navy-300" />
          </button>
        </div>

        {confirmed ? (
          /* Confirmation screen */
          <div className="px-8 py-12 text-center animate-scale-in">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border border-gold-500/40 flex items-center justify-center gold-glow-strong">
                <Check className="w-10 h-10 text-gold-300" strokeWidth={1.5} />
              </div>
              <div className="absolute inset-0 rounded-full border border-gold-400/30" style={{ animation: 'expandRing 2s ease-out infinite' }} />
            </div>
            <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-2">Meeting Confirmed</div>
            <div className="font-serif text-cream text-3xl font-light mb-2">Your session is booked</div>
            <div className="gold-divider w-24 mx-auto mb-6" />

            <div className="space-y-3 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-navy-850/60 border border-navy-700/40">
                <Calendar className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-cream">{availableSlots[selectedDay!].day}, {availableSlots[selectedDay!].date}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-navy-850/60 border border-navy-700/40">
                <Clock className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-cream">{selectedTime} · {timezone}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-md bg-navy-850/60 border border-navy-700/40">
                <Video className="w-4 h-4 text-gold-400" />
                <span className="text-sm text-cream">{meetingType} Session</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-navy-300 leading-relaxed">
              Calendar invitations have been sent to all participants.<br />
              A PhoenixAI strategist will join the session with a tailored ROI brief.
            </div>
          </div>
        ) : (
          /* Booking form */
          <div className="px-6 py-5 space-y-5">
            {/* Meeting type */}
            <div>
              <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-2.5">Meeting Type</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {meetingTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setMeetingType(type)}
                    className={`px-3 py-2.5 rounded-md border text-xs transition-all duration-300 ${
                      meetingType === type
                        ? 'border-gold-500/50 bg-gold-500/10 text-gold-200'
                        : 'border-navy-600/40 bg-navy-850/40 text-navy-300 hover:border-gold-500/25'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Date selection */}
            <div>
              <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-2.5">Select Date</div>
              <div className="grid grid-cols-5 gap-2">
                {availableSlots.map((slot, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedDay(i); setSelectedTime(null); }}
                    className={`px-2 py-3 rounded-md border text-center transition-all duration-300 ${
                      selectedDay === i
                        ? 'border-gold-500/50 bg-gold-500/10'
                        : 'border-navy-600/40 bg-navy-850/40 hover:border-gold-500/25'
                    }`}
                  >
                    <div className={`text-[10px] tracking-wide-2 uppercase ${selectedDay === i ? 'text-gold-300' : 'text-navy-400'}`}>{slot.day}</div>
                    <div className={`text-sm mt-0.5 ${selectedDay === i ? 'text-gold-200' : 'text-navy-200'}`}>{slot.date.split(' ')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time selection */}
            {selectedDay !== null && (
              <div className="animate-fade-up">
                <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-2.5">Available Times</div>
                <div className="flex flex-wrap gap-2">
                  {availableSlots[selectedDay].times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-md border text-sm transition-all duration-300 ${
                        selectedTime === time
                          ? 'border-gold-500/50 bg-gold-500/10 text-gold-200'
                          : 'border-navy-600/40 bg-navy-850/40 text-navy-200 hover:border-gold-500/25'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Timezone */}
            <div>
              <div className="text-[10px] text-gold-500 tracking-luxe uppercase mb-2.5 flex items-center gap-1.5">
                <Globe className="w-3 h-3" /> Timezone
              </div>
              <div className="relative">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-navy-600/40 bg-navy-850/60 text-sm text-cream focus-gold appearance-none cursor-pointer transition-colors hover:border-gold-500/25"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz} className="bg-navy-850 text-cream">{tz}</option>
                  ))}
                </select>
                <ChevronLeft className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 rotate-90 pointer-events-none" />
              </div>
            </div>

            {/* Summary + confirm */}
            <div className="pt-2 border-t border-gold-500/10">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-navy-400 tracking-wide-2 uppercase">Summary</span>
                <span className="text-cream">
                  {selectedDay !== null && selectedTime
                    ? `${availableSlots[selectedDay].day} ${availableSlots[selectedDay].date} · ${selectedTime}`
                    : 'Select date & time'}
                </span>
              </div>
              <button
                onClick={handleConfirm}
                disabled={!canConfirm}
                className={`w-full py-3.5 rounded-md border transition-all duration-300 ${
                  canConfirm
                    ? 'border-gold-500/40 hover:border-gold-500/60 bg-navy-850/50 hover:bg-navy-800/50 cursor-pointer'
                    : 'border-navy-600/30 bg-navy-850/20 opacity-40 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center gap-2.5">
                  <Check className="w-4 h-4 text-gold-400" />
                  <span className="text-sm text-gold-200 tracking-wide-2 uppercase font-medium">Confirm Booking</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
