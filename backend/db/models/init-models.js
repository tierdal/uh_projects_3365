var DataTypes = require("sequelize").DataTypes;
var _departments = require("./departments");
var _users = require("./users");
var _roles = require("./roles");
var _statuses = require("./statuses");
var _issueType = require("./issueType");

function initModels(sequelize) {
  var departments = _departments(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var statuses = _statuses(sequelize, DataTypes);
  var issueType = _issueType(sequelize, DataTypes);

  departments.hasMany(users, {foreignKey: "departmentId"})
  roles.hasMany(users, {foreignKey: "roleId"})
  statuses.hasMany(users, {foreignKey: "statusId"})

  //not sure about this one
  //issueType.hasMany(users, {foreignKey: "issueTypeId"})
  
  users.belongsTo(departments, {foreignKey: "departmentId"});
  users.belongsTo(roles, {foreignKey: "roleId"});
  users.belongsTo(statuses, {foreignKey: "statusId"});



  return {
    departments,
    users,
    roles,
    statuses,
    issueType,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
