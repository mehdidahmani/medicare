module.exports = (sequelize, DataTypes) => {
  const Medcin = sequelize.define("Medcin", {
    Id_Medcin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Specialite_Medcin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProfileImage: {
      type: DataTypes.BLOB,
      allowNull: true,
    }
  });
  
  return Medcin;
};
