import { create } from "zustand";

import { getTimelineIndex, timelineEvents } from "@/data/timeline";

type TimelineState = {
  selectedEventId: string;
  isAutoPlaying: boolean;
  reducedMotion: boolean;
  selectEvent: (id: string) => void;
  nextEvent: () => void;
  previousEvent: () => void;
  setAutoPlaying: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
};

export const useTimelineStore = create<TimelineState>((set, get) => ({
  selectedEventId: timelineEvents[0].id,
  isAutoPlaying: false,
  reducedMotion: false,
  selectEvent: (id) => set({ selectedEventId: id }),
  nextEvent: () => {
    const currentIndex = getTimelineIndex(get().selectedEventId);
    const nextIndex = (currentIndex + 1) % timelineEvents.length;
    set({ selectedEventId: timelineEvents[nextIndex].id });
  },
  previousEvent: () => {
    const currentIndex = getTimelineIndex(get().selectedEventId);
    const previousIndex =
      (currentIndex - 1 + timelineEvents.length) % timelineEvents.length;
    set({ selectedEventId: timelineEvents[previousIndex].id });
  },
  setAutoPlaying: (value) => set({ isAutoPlaying: value }),
  setReducedMotion: (value) => set({ reducedMotion: value })
}));
