"use strict";

const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('address', {
    addr_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    addr_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    addr_detail: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    addr_lalitude: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    addr_longtitude: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    addr_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'address',
    schema: 'public',
    timestamps: false,
    indexes: [{
      name: "addr_id_pk",
      unique: true,
      fields: [{
        name: "addr_id"
      }]
    }]
  });
};
//# sourceMappingURL=address.js.map