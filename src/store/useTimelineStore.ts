import { create } from "zustand";

import { getTimelineIndex, timelineEvents } from "@/data/timeline";

export type MuseumTheme = "dark" | "light";

type TimelineState = {
  selectedEventId: string;
  isAutoPlaying: boolean;
  isDetailOpen: boolean;
  reducedMotion: boolean;
  theme: MuseumTheme;
  selectEvent: (id: string) => void;
  nextEvent: () => void;
  previousEvent: () => void;
  openDetail: (id?: string) => void;
  closeDetail: () => void;
  setAutoPlaying: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setTheme: (theme: MuseumTheme) => void;
};

export const useTimelineStore = create<TimelineState>((set, get) => ({
  selectedEventId: timelineEvents[0].id,
  isAutoPlaying: false,
  isDetailOpen: false,
  reducedMotion: false,
  theme: "dark",
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
  openDetail: (id) =>
    set((state) => ({
      selectedEventId: id ?? state.selectedEventId,
      isDetailOpen: true
    })),
  closeDetail: () => set({ isDetailOpen: false }),
  setAutoPlaying: (value) => set({ isAutoPlaying: value }),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setTheme: (theme) => set({ theme })
}));
