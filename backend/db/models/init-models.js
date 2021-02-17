var DataTypes = require("sequelize").DataTypes;
var _departments = require("./departments");
var _users = require("./users");
var _roles = require("./roles");
var _status = require("./status");

function initModels(sequelize) {
  var departments = _departments(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);

  users.belongsTo(departments, { as: "departments", foreignKey: "FK_users_departments"});
  users.belongsTo(roles, { as: "roles", foreignKey: "FK_users_roles"});
  users.belongsTo(status, { as: "status", foreignKey: "FK_users_status"});

  return {
    departments,
    users,
    roles,
    status,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
