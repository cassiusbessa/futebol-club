import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
// import { ITeams } from './entitites/ITeams';

class Teams extends Model {
  id!: number;
  teamName!: string;
}
Teams.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default Teams;
