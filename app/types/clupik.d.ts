export interface ClupikApiResponse<T, E = unknown, M = unknown> {
  data: T;
  included?: E[];
  meta: M;
}

export interface ClupikApiBaseEntity {
  type: string;
  id: string;
}

export interface ClupikApiEntity extends ClupikApiBaseEntity {
  type: string;
  id: string;
  attributes: {
    [key: string]: unknown;
  };
  meta: {
    [key: string]: unknown;
  };
  relationships: {
    [key: string]: { data: ClupikApiBaseEntity | ClupikApiBaseEntity[] | null };
  };
}

export enum ClupikGroupType {
  LEAGUE = 'league',
  PLAY_OFF = 'play_off',
}

/* ====== Attributes & Meta ====== */

export interface ClupikApiScoringCriterionAttributes {
  id: string;
  name: string;
  active: boolean;
  winning_points: number;
  losing_points: number;
  drawing_points: number;
  edit_points: boolean;
  result_type: 'manual' | 'periods_values' | 'periods_wins' | 'points' | 'stats';
  match_visible_stats: boolean;
  match_visible_minute_by_minute: boolean;
  match_visible_referees: boolean;
  match_visible_observations: boolean;
  match_visible_attendances: boolean;
  match_visible_scoreboard: boolean;
  duration: number | null;
  period_result_type: 'manual';
  period_winning_points: number;
  period_losing_points: number;
  period_drawing_points: number;
  show_periods: boolean;
  finish_signature: boolean;
  allow_referees_update_datetime_and_facility: boolean;
  allow_invited_players: boolean;
  allow_start_match_without_license: boolean;
  allow_manual_addition_of_unlicensed_players: boolean;
  created_at: string;
  updated_at: string;
  maximum_attendant_players_per_team: number | null;
  minimum_attendant_players_per_team: number | null;
  maximum_regular_players_per_team: number | null;
  minimum_regular_players_per_team: number | null;
}

export interface ClupikTournamentAttributes {
  id: string;
  name: string;
  gender: string;
}

export interface ClupikGroupAttributes {
  id: string;
  name: string;
  order: number;
  type: ClupikGroupType;
  group: string | null;
  promote: number;
  relegate: number;
  created_at: string;
  updated_at: string;
}

export interface ClupikRoundAttributes {
  name: string;
  start_date: string;
  end_date: string;
  order: number;
}

export interface ClupikMatchAttributes {
  id: string;
  date: string;
  datetime: string;
  name: string;
  display_timezone: string;
  finished: boolean;
  canceled: boolean;
  postponed: boolean;
  rest: boolean;
  report: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClupikMatchMeta {
  home_team: string | null;
  away_team: string | null;
}

export interface ClupikResultAttributes {
  id: string;
  value: number | null;
  score: number | null;
  team: ClupikTeam | null;
}

export interface ClupikPeriodAttributes {
  id: string;
  finished: boolean;
  name: string;
  order: number;
  created_at: string;
  updated_at: string;
  periodable: unknown[];
  results: unknown[];
}

export interface ClupikFaceoffAttributes {
  id: string;
  first_text: string | null;
  second_text: string | null;
  winner: 'first' | 'second' | null;
  created_at: string;
  updated_at: string;
}

export interface ClupikTeamAttributes {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ClupikTeamMeta {
  avatar: {
    large: string;
  };
}

export interface ClupikFacilityAttributes {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  postal_code: string;
  city: string;
  created_at: string;
  updated_at: string;
}

export interface ClupikProfileAttributes {
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
}

export interface ClupikLicenseAttributes {
  type: 'executive' | 'player' | 'referee' | 'staff';
  number: number | null;
}

export interface ClupikMatchRefereeAttributes {
  attendance: 'confirmed' | 'pending' | 'rejected';
  published: boolean;
  created_at: string;
  updated_at: string;
}

/* ====== Deserialized entities ====== */

export interface ClupikTournament extends ClupikTournamentAttributes {
  type: 'tournament';
  id: string;
  gender: string;
  modality: 'teams';
  name: string;
  order: number | null;
  status: 'in_progress';
  created_at: string;
  updated_at: string;
  category: { type: string; id: string };
  delegation: null;
  discipline: { type: string; id: string };
  manager: { type: string; id: string };
  scoringcriterion: ClupikApiScoringCriterionAttributes | null;
  season: { type: string; id: string };
  relationshipNames: string[];
}

export interface ClupikGroup extends ClupikGroupAttributes {
  tournament: ClupikTournament;
  relationshipNames: string[];
}

export interface ClupikRound extends ClupikRoundAttributes {
  type: 'round';
  group: ClupikGroup;
  relationshipNames: string[];
}

export interface ClupikMatch extends ClupikMatchAttributes {
  type: 'match';
  meta: ClupikMatchMeta;
  faceoff: ClupikFaceoff | null;
  facility: ClupikFacility | null;
  round: ClupikRound;
  matchreferees: ClupikMatchReferee[];
  periods: ClupikPeriod[];
  results: ClupikResult[];
  teams: ClupikTeam[];
  relationshipNames: string[];
}

export interface ClupikResult extends ClupikResultAttributes {
  type: 'result';
  relationshipNames: string[];
}

export interface ClupikPeriod extends ClupikPeriodAttributes {
  type: 'period';
  results: ClupikResult[];
  relationshipNames: string[];
}

export interface ClupikFaceoff extends ClupikFaceoffAttributes {
  type: 'faceoff';
  first_previous_faceoff: string | null;
  first_team: ClupikTeam;
  second_previous_faceoff: string | null;
  second_team: ClupikTeam;
  round: ClupikRound;
  relationshipNames: string[];
}

export interface ClupikTeam extends ClupikTeamAttributes {
  type: 'team';
  meta: ClupikTeamMeta;
  relationshipNames: string[];
}

export interface ClupikFacility extends ClupikFacilityAttributes {
  type: 'facility';
  relationshipNames: string[];
}

export interface ClupikProfile extends ClupikProfileAttributes {
  type: 'profile';
  relationshipNames: string[];
}

export interface ClupikLicense extends ClupikLicenseAttributes {
  type: 'license';
  profile: ClupikProfile;
  relationshipNames: string[];
}

export interface ClupikMatchReferee extends ClupikMatchRefereeAttributes {
  type: 'matchreferee';
  license: ClupikLicense;
  relationshipNames: string[];
}

/* ====== API entities ====== */

export interface ClupikApiTournament extends ClupikApiEntity {
  type: 'tournament';
  attributes: ClupikTournamentAttributes;
  relationships: {
    season: {
      data: ClupikApiBaseEntity;
    };
  };
  // There is more. Only the base and what we need is specified here.
}

export interface ClupikApiGroup extends ClupikApiEntity {
  type: 'group';
  attributes: ClupikGroupAttributes;
  relationships: {
    tournament: {
      data: ClupikApiBaseEntity;
    };
  };
  // There is more. Only the base and what we need is specified here.
}

export interface ClupikApiMatch extends ClupikApiEntity {
  type: 'match';
  attributes: ClupikMatchAttributes;
  meta: ClupikMatchMeta;
  relationships: {
    round: {
      data: ClupikApiBaseEntity;
    };
    facility: {
      data: ClupikApiBaseEntity | null;
    };
    faceoff: {
      data: ClupikApiBaseEntity | null;
    };
    teams: {
      data: ClupikApiBaseEntity[] | null;
    };
    periods: {
      data: ClupikApiBaseEntity[] | null;
    };
    results: {
      data: ClupikApiBaseEntity[] | null;
    };
    matchreferees: {
      data: ClupikApiBaseEntity[] | null;
    };
  };
  // There is more. Only the base and what we need is specified here.
}

export interface ClupikApiPeriod extends ClupikApiEntity {
  type: 'period';
  attributes: ClupikPeriodAttributes;
  relationships: {
    periodable: {
      data: ClupikApiBaseEntity;
    };
    results: {
      data: ClupikApiBaseEntity[];
    };
  };
}

export interface ClupikApiFaceoff extends ClupikApiEntity {
  type: 'faceoff';
  attributes: ClupikFaceoffAttributes;
  relationships: {
    first_team: {
      data: ClupikApiBaseEntity | null;
    };
    second_team: {
      data: ClupikApiBaseEntity | null;
    };
    round: {
      data: ClupikApiBaseEntity;
    };
    matches: {
      data: ClupikApiBaseEntity[];
    };
  };
}

export interface ClupikApiRound extends ClupikApiEntity {
  type: 'round';
  attributes: ClupikRoundAttributes;
  relationships: {
    group: {
      data: ClupikApiBaseEntity;
    };
  };
}

export interface ClupikApiTeam extends ClupikApiEntity {
  type: 'team';
  attributes: ClupikTeamAttributes;
  meta: {
    avatar: {
      large: string;
    };
  };
  relationships: {
    registrable: {
      data: ClupikApiBaseEntity;
    };
  };
}

export interface ClupikApiFacility extends ClupikApiEntity {
  type: 'facility';
  attributes: ClupikFacilityAttributes;
}

export interface ClupikApiResult extends ClupikApiEntity {
  type: 'result';
  attributes: {
    value: number | null;
    score: number | null;
  };
  relationships: {
    match: {
      data: ClupikApiBaseEntity;
    };
    team: {
      data: ClupikApiBaseEntity;
    };
    parent: {
      data: ClupikApiBaseEntity;
    };
    period: {
      data: ClupikApiBaseEntity | null;
    };
  };
}

export interface ClupikApiMatchReferee extends ClupikApiEntity {
  type: 'matchreferee';
  attributes: ClupikMatchRefereeAttributes;
  relationships: {
    match: {
      data: ClupikApiBaseEntity;
    };
    license: {
      data: ClupikApiBaseEntity;
    };
  };
}

export interface ClupikApiLicense extends ClupikApiEntity {
  type: 'license';
  attributes: ClupikLicenseAttributes;
  relationships: {
    category: {
      data: ClupikApiBaseEntity | null;
    };
    club: {
      data: ClupikApiBaseEntity | null;
    };
    form: {
      data: ClupikApiBaseEntity;
    };
    profile: {
      data: ClupikApiBaseEntity;
    };
    refereecategory?: {
      data: ClupikApiBaseEntity;
    };
    season: {
      data: ClupikApiBaseEntity | null;
    };
  };
}

export interface ClupikApiProfile extends ClupikApiEntity {
  type: 'profile';
  attributes: ClupikProfileAttributes;
}
