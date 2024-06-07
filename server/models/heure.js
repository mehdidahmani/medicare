module.exports = (sequelize, DataTypes) => {
    const Heure = sequelize.define("Heure", {
      Id_Heure: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Heure: {
        type: DataTypes.TIME,
        allowNull: false
      }
    });

    return Heure;
};
