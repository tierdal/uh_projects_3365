var DataTypes = require("sequelize").DataTypes;
var _assetStatus = require("./assetStatus");
var _assetType = require("./assetType");
var _changeRequestStatus = require("./changeRequestStatus");
var _changeRequestType = require("./changeRequestType");
var _departments = require("./departments");
var _faqCategory = require("./faqCategory");
var _incidentStatus = require("./incidentStatus");
var _installStatusList = require("./installStatusList");
var _issueCategory = require("./issueCategory");
var _issueType = require("./issueType");
var _locations = require("./locations");
var _locations_countryList = require("./locations_countryList");
var _locations_us_stateList = require("./locations_us_stateList");
var _locations_us_zipList = require("./locations_us_zipList");
var _locationType = require("./locationType");
var _paymentTerms = require("./paymentTerms");
var _requestStatus = require("./requestStatus");
var _resolvedList = require("./resolvedList");
var _roles = require("./roles");
var _shippingMethods = require("./shippingMethods");
var _shippingStatus = require("./shippingStatus");
var _slaList = require("./slaList");
var _softwareStatus = require("./softwareStatus");
var _statuses = require("./statuses");
var _teams = require("./teams");
var _users = require("./users");

function initModels(sequelize) {
  var assetStatus = _assetStatus(sequelize, DataTypes);
  var assetType = _assetType(sequelize, DataTypes);
  var changeRequestStatus = _changeRequestStatus(sequelize, DataTypes);
  var changeRequestType = _changeRequestType(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var faqCategory = _faqCategory(sequelize, DataTypes);
  var incidentStatus = _incidentStatus(sequelize, DataTypes);
  var installStatusList = _installStatusList(sequelize, DataTypes);
  var issueCategory = _issueCategory(sequelize, DataTypes);
  var issueType = _issueType(sequelize, DataTypes);
  var locations = _locations(sequelize, DataTypes);
  var locations_countryList = _locations_countryList(sequelize, DataTypes);
  var locations_us_stateList = _locations_us_stateList(sequelize, DataTypes);
  var locations_us_zipList = _locations_us_zipList(sequelize, DataTypes);
  var locationType = _locationType(sequelize, DataTypes);
  var paymentTerms = _paymentTerms(sequelize, DataTypes);
  var requestStatus = _requestStatus(sequelize, DataTypes);
  var resolvedList = _resolvedList(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var shippingMethods = _shippingMethods(sequelize, DataTypes);
  var shippingStatus = _shippingStatus(sequelize, DataTypes);
  var slaList = _slaList(sequelize, DataTypes);
  var softwareStatus = _softwareStatus(sequelize, DataTypes);
  var statuses = _statuses(sequelize, DataTypes);
  var teams = _teams(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  departments.hasMany(users, {foreignKey: "departmentId"})
  roles.hasMany(users, {foreignKey: "roleId"})
  statuses.hasMany(users, {foreignKey: "statusId"})

  //not sure about this one
  //issueType.hasMany(users, {foreignKey: "issueTypeId"})
  
  users.belongsTo(departments, {foreignKey: "departmentId"});
  users.belongsTo(roles, {foreignKey: "roleId"});
  users.belongsTo(statuses, {foreignKey: "statusId"});



  return {
    assetStatus,
    assetType,
    changeRequestStatus,
    changeRequestType,
    departments,
    faqCategory,
    incidentStatus,
    installStatusList,
    issueCategory,
    issueType,
    locations,
    locations_countryList,
    locations_us_stateList,
    locations_us_zipList,
    locationType,
    paymentTerms,
    requestStatus,
    resolvedList,
    roles,
    shippingMethods,
    shippingStatus,
    slaList,
    softwareStatus,
    statuses,
    teams,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
