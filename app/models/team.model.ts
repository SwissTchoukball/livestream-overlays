import type { ClupikTeam } from '~/types/clupik';
import type { DataSource } from '~/types/dataSource';
import type { JsonTeam } from '~/types/jsonData';

export default class Team {
  id!: string | undefined;
  name!: string;
  logo!: string;
  color: string = 'white';
  source!: DataSource;

  constructor(data: JsonTeam | ClupikTeam, source: DataSource) {
    this.source = source;

    if (source === 'json') {
      const jsonTeam = data as JsonTeam;

      // TODO: Add id?
      this.name = jsonTeam.name;
      this.logo = jsonTeam.logo;
      this.color = jsonTeam.color;
    }

    if (source === 'clupik') {
      const clupikTeam = data as ClupikTeam;

      this.id = clupikTeam.id;
      this.name = clupikTeam.name;
      this.logo = clupikTeam.meta.avatar.large;
    }
  }
}
