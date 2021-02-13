var DataTypes = require("sequelize").DataTypes;
var _accountType = require("./accountType");
var _login = require("./login");
var _users = require("./users");

function initModels(sequelize) {
  var accountType = _accountType(sequelize, DataTypes);
  var login = _login(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  login.belongsTo(accountType, { as: "accountType", foreignKey: "accountTypeId"});
  accountType.hasMany(login, { as: "logins", foreignKey: "accountTypeId"});

  return {
    accountType,
    login,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
