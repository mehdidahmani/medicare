module.exports = (sequelize, DataTypes) => {
  const RendezVous = sequelize.define("RendezVous", {
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
    },
    En_Urgence: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  RendezVous.associate = (models) => {
    RendezVous.belongsTo(models.Users, {
      foreignKey: 'Id_Patient'
    });
    RendezVous.belongsTo(models.Medcin, {
      foreignKey: 'Id_Medcin'
    });
    RendezVous.belongsTo(models.Heure, {
      foreignKey: 'Id_Heure'
    });  
  };

  return RendezVous;
};




