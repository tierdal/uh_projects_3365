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

  departments.hasMany(users,{foreignKey: "department_id"})
  roles.hasMany(users,{foreignKey: "role_id"})
  status.hasMany(users,{foreignKey: "status_id"})
  users.belongsTo(departments, { as: "Department", foreignKey: "department_id"});
  users.belongsTo(roles, { as: "Role", foreignKey: "role_id"});
  users.belongsTo(status, { as: "Status", foreignKey: "status_id"});



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
