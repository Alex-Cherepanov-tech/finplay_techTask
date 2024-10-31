export type GameType = {
  id: number;
  name: string;
  provider: number;
  cover: string;
  coverLarge: string;
  date: string;
};

export type FilterType = {
  name: string;
  provider: number[];
  groups: number[];
};

export type ProviderType = {
  id: number;
  name: string;
  logo: string;
};

export type GroupType = {
  id: number;
  name: string;
  games: number[];
};
