import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}
Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team',
    references: { model: 'teams', key: 'id' },
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',
    references: { model: 'teams', key: 'id' },
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, {
  as: 'teamHome',
  foreignKey: 'homeTeam',
});

Matches.belongsTo(Teams, {
  as: 'teamAway',
  foreignKey: 'awayTeam',
});

Teams.hasMany(Matches, {
  as: 'matchHome',
  foreignKey: 'homeTeam',
});

Teams.hasMany(Matches, {
  as: 'matchAway',
  foreignKey: 'awayTeam',
});

export default Matches;
