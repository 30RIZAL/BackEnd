var DataTypes = require("sequelize").DataTypes;
var _address = require("./address");
var _cart_line_items = require("./cart_line_items");
var _carts = require("./carts");
var _menu_type = require("./menu_type");
var _order_menu = require("./order_menu");
var _resto_addon = require("./resto_addon");
var _resto_category = require("./resto_category");
var _resto_menu = require("./resto_menu");
var _resto_reviews = require("./resto_reviews");
var _resto_shop = require("./resto_shop");
var _users = require("./users");

function initModels(sequelize) {
  var address = _address(sequelize, DataTypes);
  var cart_line_items = _cart_line_items(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);
  var menu_type = _menu_type(sequelize, DataTypes);
  var order_menu = _order_menu(sequelize, DataTypes);
  var resto_addon = _resto_addon(sequelize, DataTypes);
  var resto_category = _resto_category(sequelize, DataTypes);
  var resto_menu = _resto_menu(sequelize, DataTypes);
  var resto_reviews = _resto_reviews(sequelize, DataTypes);
  var resto_shop = _resto_shop(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  cart_line_items.belongsTo(carts, { as: "clit_cart", foreignKey: "clit_cart_id"});
  carts.hasMany(cart_line_items, { as: "cart_line_items", foreignKey: "clit_cart_id"});
  resto_menu.belongsTo(menu_type, { as: "reme_mety_name_menu_type", foreignKey: "reme_mety_name"});
  menu_type.hasMany(resto_menu, { as: "resto_menus", foreignKey: "reme_mety_name"});
  resto_shop.belongsTo(resto_category, { as: "reto_reca_name_resto_category", foreignKey: "reto_reca_name"});
  resto_category.hasMany(resto_shop, { as: "resto_shops", foreignKey: "reto_reca_name"});
  cart_line_items.belongsTo(resto_menu, { as: "clit_reme", foreignKey: "clit_reme_id"});
  resto_menu.hasMany(cart_line_items, { as: "cart_line_items", foreignKey: "clit_reme_id"});
  resto_addon.belongsTo(resto_menu, { as: "redon_reme", foreignKey: "redon_reme_id"});
  resto_menu.hasMany(resto_addon, { as: "resto_addons", foreignKey: "redon_reme_id"});
  carts.belongsTo(resto_shop, { as: "cart_reto", foreignKey: "cart_reto_id"});
  resto_shop.hasMany(carts, { as: "carts", foreignKey: "cart_reto_id"});
  resto_menu.belongsTo(resto_shop, { as: "reme_reto", foreignKey: "reme_reto_id"});
  resto_shop.hasMany(resto_menu, { as: "resto_menus", foreignKey: "reme_reto_id"});
  resto_reviews.belongsTo(resto_shop, { as: "rere_reto", foreignKey: "rere_reto_id"});
  resto_shop.hasMany(resto_reviews, { as: "resto_reviews", foreignKey: "rere_reto_id"});
  carts.belongsTo(users, { as: "cart_user", foreignKey: "cart_user_id"});
  users.hasMany(carts, { as: "carts", foreignKey: "cart_user_id"});
  order_menu.belongsTo(users, { as: "order_user", foreignKey: "order_user_id"});
  users.hasMany(order_menu, { as: "order_menus", foreignKey: "order_user_id"});
  resto_reviews.belongsTo(users, { as: "rere_user", foreignKey: "rere_user_id"});
  users.hasMany(resto_reviews, { as: "resto_reviews", foreignKey: "rere_user_id"});
  resto_shop.belongsTo(users, { as: "reto_user", foreignKey: "reto_user_id"});
  users.hasMany(resto_shop, { as: "resto_shops", foreignKey: "reto_user_id"});

  return {
    address,
    cart_line_items,
    carts,
    menu_type,
    order_menu,
    resto_addon,
    resto_category,
    resto_menu,
    resto_reviews,
    resto_shop,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
