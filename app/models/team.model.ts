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

  get logoUrl(): string | null {
    if (!this.logo) {
      return null;
    }

    // Hard-coded override for teams that have a different logo than their club
    let slug;
    if (this.name.includes('Geneva Dragons')) {
      slug = 'geneva_dragons';
    } else if (this.name.includes('Geneva Flames')) {
      slug = 'geneva_flames';
    } else if (this.name.includes('La Chaux-de-Fonds Beehives')) {
      slug = 'la_chaux-de-fonds_beehives';
    } else if (this.name.includes('Nyon Lakers')) {
      slug = 'nyon_lakers';
    } else if (this.name.includes('Delémont Blizzard')) {
      slug = 'delemont_blizzard';
    } else if (this.name.includes('Delémont Thunder')) {
      slug = 'delemont_thunder';
    } else if (this.name.includes('Delémont Storm')) {
      slug = 'delemont_storm';
    } else if (this.name.includes('Vernier Turtles B')) {
      slug = 'vernier_turtles_b';
    } else if (this.name.includes('Vernier Turtles')) {
      slug = 'vernier_turtles';
    } else if (this.name.includes('Team Vaud')) {
      slug = 'team_vaud';
    } else if (this.name.includes('Carouge Lions')) {
      slug = 'carouge_lions';
    }

    if (slug) {
      return `https://files.tchoukball.ch/static/competition-teams-logos/${slug}.500x500.jpg`;
    }

    return this.logo;
  }
}
