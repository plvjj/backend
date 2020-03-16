import Sequelize, { Model } from 'sequelize';

class Frequency extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: Sequelize.INTEGER,
        training_date: Sequelize.DATEONLY,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Frequency;
