'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  UserRoles.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // Assuming you have a User model
          key: 'id',
        },
      },
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Role', // Assuming you have a Role model
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserRoles',
      timestamps: false, // You can adjust this based on your needs
    }
  );

  return UserRoles;
};
