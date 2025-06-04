module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      Id_Patient: {
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
      Date_Nai: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      Adresse: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Sexe: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Num_Tel: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
      }
    });
    return Users;
  };