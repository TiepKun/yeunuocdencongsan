export type TimelinePhase =
  | "search_path"
  | "ideological_turning_point"
  | "formation";

export type TimelineModelType =
  | "ship"
  | "globe"
  | "paris"
  | "document"
  | "book"
  | "congress"
  | "newspaper"
  | "soviet"
  | "training"
  | "justice_book"
  | "road_book"
  | "community"
  | "torch";

export type TimelineImage = {
  src: string;
  caption: string;
  sourceNote: string;
};

export type TimelineEvent = {
  id: string;
  year: string;
  title: string;
  location: string;
  phase: TimelinePhase;
  shortDescription: string;
  detail: string;
  ideologicalMeaning: string;
  modelType: TimelineModelType;
  images: TimelineImage[];
};
