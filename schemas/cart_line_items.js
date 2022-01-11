const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart_line_items', {
    clit_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    clit_reme_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resto_menu',
        key: 'reme_id'
      }
    },
    clit_redon_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    clit_qty: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    clit_status: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    clit_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    clit_sutotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    clit_order_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    clit_cart_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'carts',
        key: 'cart_id'
      }
    }
  }, {
    sequelize,
    tableName: 'cart_line_items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clit_id_pk",
        unique: true,
        fields: [
          { name: "clit_id" },
        ]
      },
    ]
  });
};
