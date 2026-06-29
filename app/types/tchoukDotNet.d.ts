export type TchoukNetOrganisation = {
  name: string;
  id: string;

  theme_color_background?: string;
  theme_color_text?: string;
  theme_background_image_url?: string;
  theme_icon_url?: string;
};

export type TchoukNetCompetition = {
  id: string;
  name: string;
  organisation?: TchoukNetOrganisation;
  event?: TchoukNetEvent;
  participations: TchoukNetParticipation[];
  phases?: TchoukNetCompetitionPhase[];
};

export type TchoukNetCompetitionPhase = {
  id: string;
  name: string;
  competition?: TchoukNetCompetition;
};

export type TchoukNetEvent = {
  id: string;
  name: string;
  organisation: TchoukNetOrganisation;
  competitions: Pick<TchoukNetCompetition, 'id' | 'name'>[];
};

export type TchoukNetCountry = {
  id: string;
  ioc_code: string;
  iso_code2: string;
  name: string;
  emoji: string;
};

export type TchoukNetParticipation = {
  team: TchoukNetTeam;
  competition?: TchoukNetCompetition;
  id: string;
};

export type TchoukNetTeamEntity = {
  id: string;
  current_name: string;
  team_type: TchoukNetTeamType;
  countries: TchoukNetCountry[];
};

export type TchoukNetTeamType = {
  id: string;
  name: string;
  code: string;
};

export type TchoukNetTeam = {
  id: string;
  name: string;
  team_entity_identifier: string;
  team_entity: TchoukNetTeamEntity;
};

export interface TchoukNetGameTeam {
  name: string;
  team: TchoukNetTeam;
  total_points: number;
  period_points: {
    '1': number;
    '2': number;
    '3': number;
  };
  id: string;
}

export interface TchoukNetCoordinates {
  latitude: number;
  longitude: number;
}

export interface TchoukNetVenue {
  id: string;
  name: string;
  address: string;
  city: string;
  coordinates: TchoukNetCoordinates;
}

export interface TchoukNetField {
  id: string;
  name: string;
  code_name: string;
  has_own_name: boolean;
  venue: TchoukNetVenue;
}

export interface TchoukNetGameLog {
  id: string;
  timestamp: number;
  period: number;
  log_type: 'time_game_start' | 'score_point_scored' | 'score_point_correction';
}

export interface TchoukNetGame {
  id: string;
  name?: string;
  code?: string;
  selection_a?: TchoukNetGameTeam;
  selection_b?: TchoukNetGameTeam;
  label_a?: string;
  label_b?: string;
  start_at?: string;
  logs?: TchoukNetGameLog[];
  link_youtube_url?: string;
  is_playing?: boolean;
  has_ended?: boolean;
  status: 'announced' | 'planned' | 'started' | 'ended' | 'cancelled' | 'forfeited';
  field?: TchoukNetField;
  organisation?: TchoukNetOrganisation;
  competition_phase?: TchoukNetCompetitionPhase;
}
