import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        birth: Sequelize.STRING,
        belt: Sequelize.STRING,
        weight: Sequelize.STRING,
        address: Sequelize.STRING,
        phone: Sequelize.STRING,
        responsible: Sequelize.STRING,
        responsible_phone: Sequelize.STRING,
        note: Sequelize.STRING,
        avatar_id: Sequelize.INTEGER,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}

export default Student;
