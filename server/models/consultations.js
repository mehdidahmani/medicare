module.exports = (sequelize, DataTypes) => {
    const Consultations = sequelize.define("Consultations", {
      Id_Medcin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Id_Heure: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Date: {
        type: DataTypes.DATEONLY,
        primaryKey: true,
      },
      Id_Patient: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Details: {
        type: DataTypes.STRING,
      }
    });
  
    Consultations.associate = (models) => {
      Consultations.belongsTo(models.Users, {
        foreignKey: 'Id_Patient'
      });
      Consultations.belongsTo(models.Medcin, {
        foreignKey: 'Id_Medcin'
      });
      Consultations.belongsTo(models.Heure, {
        foreignKey: 'Id_Heure'
      });  
    };
  
    return Consultations;
  };
  