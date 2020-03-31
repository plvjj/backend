import Sequelize, { Model } from 'sequelize';

class FrequencyStudent extends Model {
  static init(sequelize) {
    super.init(
      {
        id_frequency: Sequelize.INTEGER,
        id_student: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  // static associate(models) {
  //   this.belongsTo(models.Frequency, {
  //     foreignKey: 'id_frequency',
  //     as: 'frequency',
  //   });
  //   this.belongsTo(models.Student, {
  //     foreignKey: 'id_student',
  //     as: 'student',
  //   });
  // }
}

export default FrequencyStudent;
