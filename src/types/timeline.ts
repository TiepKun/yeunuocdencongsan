export type TimelinePhase =
  | "roots"
  | "search_path"
  | "ideological_turning_point"
  | "formation";

export type TimelineModelType =
  | "home"
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

export type TimelineModel3D = {
  src: string;
  timelineSrc?: string;
  label: string;
  fitSize?: number;
  showInTimeline?: boolean;
  showInPreview?: boolean;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  materialColor?: string;
  emissiveColor?: string;
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
  models3d?: TimelineModel3D[];
  missingModelDescription?: string;
  images: TimelineImage[];
};
