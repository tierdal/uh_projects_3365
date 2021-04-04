var DataTypes = require("sequelize").DataTypes;
var _approverList = require("./approverList");
var _assetList = require("./assetList");
var _assetStatus = require("./assetStatus");
var _assetType = require("./assetType");
var _auditLog_access = require("./auditLog_access");
var _auditLog_approvals = require("./auditLog_approvals");
var _auditLog_changeRequests = require("./auditLog_changeRequests");
var _auditLog_incidents = require("./auditLog_incidents");
var _auditLog_tasks = require("./auditLog_tasks");
var _auditLog_tickets = require("./auditLog_tickets");
var _changeRequests = require("./changeRequests");
var _changeRequestStatus = require("./changeRequestStatus");
var _changeRequestType = require("./changeRequestType");
var _contracts = require("./contracts");
var _departments = require("./departments");
var _faqCategory = require("./faqCategory");
var _faqList = require("./faqList");
var _incidentLog = require("./incidentLog");
var _incidentResponseLog = require("./incidentResponseLog");
var _incidentStatus = require("./incidentStatus");
var _incidentType = require("./incidentType");
var _incidentUrgency = require("./incidentUrgency");
var _installStatusList = require("./installStatusList");
var _issueCategory = require("./issueCategory");
var _issueType = require("./issueType");
var _licenseKeys = require("./licenseKeys");
var _locations = require("./locations");
var _locations_countryList = require("./locations_countryList");
var _locations_us_stateList = require("./locations_us_stateList");
var _locations_us_zipList = require("./locations_us_zipList");
var _locationType = require("./locationType");
var _paymentTerms = require("./paymentTerms");
var _priorityList = require("./priorityList");
var _requestStatus = require("./requestStatus");
var _resolvedList = require("./resolvedList");
var _roles = require("./roles");
var _shippingMethods = require("./shippingMethods");
var _shippingStatus = require("./shippingStatus");
var _slaList = require("./slaList");
var _software_install_status = require("./software_install_status");
var _softwareAssets = require("./softwareAssets");
var _softwareStatus = require("./softwareStatus");
var _statuses = require("./statuses");
var _taskList = require("./taskList");
var _teamMembership = require("./teamMembership");
var _teams = require("./teams");
var _ticketLog = require("./ticketLog");
var _users = require("./users");
var _vendors = require("./vendors");
var _workLog = require("./workLog");

function initModels(sequelize) {
  var approverList = _approverList(sequelize, DataTypes);
  var assetList = _assetList(sequelize, DataTypes);
  var assetStatus = _assetStatus(sequelize, DataTypes);
  var assetType = _assetType(sequelize, DataTypes);
  var auditLog_access = _auditLog_access(sequelize, DataTypes);
  var auditLog_approvals = _auditLog_approvals(sequelize, DataTypes);
  var auditLog_changeRequests = _auditLog_changeRequests(sequelize, DataTypes);
  var auditLog_incidents = _auditLog_incidents(sequelize, DataTypes);
  var auditLog_tasks = _auditLog_tasks(sequelize, DataTypes);
  var auditLog_tickets = _auditLog_tickets(sequelize, DataTypes);
  var changeRequests = _changeRequests(sequelize, DataTypes);
  var changeRequestStatus = _changeRequestStatus(sequelize, DataTypes);
  var changeRequestType = _changeRequestType(sequelize, DataTypes);
  var contracts = _contracts(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var faqCategory = _faqCategory(sequelize, DataTypes);
  var faqList = _faqList(sequelize, DataTypes);
  var incidentLog = _incidentLog(sequelize, DataTypes);
  var incidentResponseLog = _incidentResponseLog(sequelize, DataTypes);
  var incidentStatus = _incidentStatus(sequelize, DataTypes);
  var incidentType = _incidentType(sequelize, DataTypes);
  var incidentUrgency = _incidentUrgency(sequelize, DataTypes);
  var installStatusList = _installStatusList(sequelize, DataTypes);
  var issueCategory = _issueCategory(sequelize, DataTypes);
  var issueType = _issueType(sequelize, DataTypes);
  var licenseKeys = _licenseKeys(sequelize, DataTypes);
  var locations = _locations(sequelize, DataTypes);
  var locations_countryList = _locations_countryList(sequelize, DataTypes);
  var locations_us_stateList = _locations_us_stateList(sequelize, DataTypes);
  var locations_us_zipList = _locations_us_zipList(sequelize, DataTypes);
  var locationType = _locationType(sequelize, DataTypes);
  var paymentTerms = _paymentTerms(sequelize, DataTypes);
  var priorityList = _priorityList(sequelize, DataTypes);
  var requestStatus = _requestStatus(sequelize, DataTypes);
  var resolvedList = _resolvedList(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var shippingMethods = _shippingMethods(sequelize, DataTypes);
  var shippingStatus = _shippingStatus(sequelize, DataTypes);
  var slaList = _slaList(sequelize, DataTypes);
  var software_install_status = _software_install_status(sequelize, DataTypes);
  var softwareAssets = _softwareAssets(sequelize, DataTypes);
  var softwareStatus = _softwareStatus(sequelize, DataTypes);
  var statuses = _statuses(sequelize, DataTypes);
  var taskList = _taskList(sequelize, DataTypes);
  var teamMembership = _teamMembership(sequelize, DataTypes);
  var teams = _teams(sequelize, DataTypes);
  var ticketLog = _ticketLog(sequelize, DataTypes)
  var users = _users(sequelize, DataTypes);
  var vendors = _vendors(sequelize, DataTypes);
  var workLog = _workLog(sequelize, DataTypes);


  departments.hasMany(users, {foreignKey: "departmentId"})
  roles.hasMany(users, {foreignKey: "roleId"})
  statuses.hasMany(users, {foreignKey: "statusId"})

  //not sure about this one
  //issueType.hasMany(users, {foreignKey: "issueTypeId"})

  approverList.belongsTo(users, {foreignkey: "user_getsapproved"});
  approverList.belongsTo(users, {foreignkey: "user_approver"});
  assetList.belongsTo(assetStatus, {foreignkey: "assetStatusId"});
  assetList.belongsTo(assetType, {foreignkey: "assetTypeId"});
  assetList.belongsTo(vendors, {foreignkey: "vendorId"});
  assetList.belongsTo(users, {foreignkey: "userId"});
  auditLog_access.belongsTo(users, {foreignkey: "auditLog_access_userId"});
  auditLog_approvals.belongsTo(users, {foreignkey: "auditLog_approvals_userId"});
  auditLog_changeRequests.belongsTo(users, {foreignkey: "auditLog_changeRequests_userId"});
  auditLog_changeRequests.belongsTo(changeRequests, {foreignkey: "auditLog_changeRequests_requestId"});
  auditLog_incidents.belongsTo(users, {foreignkey: "auditLog_incidents_userId"});
  auditLog_incidents.belongsTo(incidentLog, {foreignkey: "auditLog_incidents_incidentId"});
  auditLog_tasks.belongsTo(users, {foreignkey: "auditLog_tasks_userId"});
  auditLog_tasks.belongsTo(taskList, {foreignkey: "auditLog_tasks_taskId"});
  auditLog_tickets.belongsTo(users, {foreignkey: "auditLog_tickets_userId"});
  auditLog_tickets.belongsTo(ticketLog, {foreignkey: "auditLog_tickets_ticketId"});
  changeRequests.belongsTo(changeRequestType, {foreignkey: "changeRequestTypeId"});
  changeRequests.belongsTo(users, {foreignkey: "changeRequest_owner"});
  changeRequests.belongsTo(users, {foreignkey: "changeRequest_approver"});
  changeRequests.belongsTo(changeRequestStatus, {foreignkey: "changeRequestStatusId"});
  contracts.belongsTo(vendors, {foreignkey: "vendorId"});
  faqList.belongsTo(faqCategory, {foreignkey: "faq_categoryId"});
  incidentLog.belongsTo(users, {foreignkey: "incident_assignedUser"});
  incidentLog.belongsTo(users, {foreignkey: "incident_createdBy"});
  incidentLog.belongsTo(incidentStatus, {foreignkey: "incidentStatusId"});
  incidentLog.belongsTo(incidentType, {foreignkey: "incident_typeId"});
  incidentLog.belongsTo(incidentUrgency, {foreignkey: "incidentUrgencyId"});
  incidentLog.belongsTo(locations, {foreignkey: "incident_location"});
  incidentLog.belongsTo(teams, {foreignkey: "incident_assignedTeam"});
  incidentResponseLog.belongsTo(incidentLog, {foreignkey: "incidentId"});
  incidentResponseLog.belongsTo(users, {foreignkey: "incidentResponseLog_user"});
  incidentType.belongsTo(teams, {foreignkey: "incidentType_responsible"});
  incidentUrgency.belongsTo(slaList, {foreignkey: "incidentUrgency_sla"});
  issueType.belongsTo(issueCategory, {foreignkey: "issueCategoryId"});
  licenseKeys.belongsTo(softwareAssets, {foreignkey: "softwareId"});
  licenseKeys.belongsTo(users, {foreignkey: "userId"});
  priorityList.belongsTo(slaList, {foreignkey: "priority_sla_id"});
  software_install_status.belongsTo(installStatusList, {foreignkey: "installStatusId"});
  software_install_status.belongsTo(softwareAssets, {foreignkey: "softwareId"});
  software_install_status.belongsto(users, {foreignkey: "userId"});
  softwareAssets.belongsTo(softwareStatus, {foreignkey: "softwareStatusId"});
  softwareAssets.belongsTo(vendors, {foreignkey: "vendorId"});
  taskList.belongsTo(users, {foreignkey: "task_approver"});
  taskList.belongsTo(users, {foreignkey: "task_owner"});
  taskList.belongsTo(requestStatus, {foreignkey: "requestStatusId"});
  taskList.belongsTo(locations, {foreignkey: "shippingLocationId"});
  tasklist.belongsTo(shippingMethods, {foreignkey: "shippingMethodId"});
  taskList.belongsTo(ticketLog, {foreignkey: "ticketId"});
  teamMembership.belongsTo(teams, {foreignkey: "teamId"});
  teamMembership.belongsTo(users, {foreignkey: "userId"});
  ticketLog.belongsTo(users, {foreignkey: "assigned_user"});
  ticketLog.belongsTo(users, {foreignkey: "created_by"});
  ticketLog.belongsTo(assetList, {foreignkey: "assetId"});
  ticketLog.belongsTo(issueCategory, {foreignkey: "issueCategoryId"});
  ticketLog.belongsTo(issueType, {foreignkey: "issueId"});
  ticketLog.belongsTo(locations, {foreignkey: "locationId"});
  ticketLog.belongsTo(priorityList, {foreignkey: "priorityId"});
  ticketLog.belongsTo(requestStatus, {foreignkey: "requestStatusId"});
  ticketLog.belongsTo(resolvedList, {foreignkey: "resolvedId"});
  ticketLog.belongsTo(softwareAssets, {foreignkey: "softwareId"});
  ticketLog.belongsTo(teams, {foreignkey: "teamId"});
  users.belongsTo(departments, {foreignKey: "departmentId"});
  users.belongsTo(roles, {foreignKey: "roleId"});
  users.belongsTo(statuses, {foreignKey: "statusId"});
  vendors.belongsTo(locations, {foreignkey: "locationId"});
  vendors.belongsTo(paymentTerms, {foreignkey: "paymentTermId"});
  workLog.belongsTo(ticketLog, {foreignkey: "ticketId"});
  workLog.belongsTo(users, {foreignkey: "userId"});



  return {
    approverList,
    assetList,
    assetStatus,
    assetType,
    auditLog_access,
    auditLog_approvals,
    auditLog_changeRequests,
    auditLog_incidents,
    auditLog_tasks,
    auditLog_tickets,
    changeRequests,
    changeRequestStatus,
    changeRequestType,
    contracts,
    departments,
    faqCategory,
    faqList,
    incidentLog,
    incidentResponseLog,
    incidentStatus,
    incidentType,
    incidentUrgency,
    installStatusList,
    issueCategory,
    issueType,
    licenseKeys,
    locations,
    locations_countryList,
    locations_us_stateList,
    locations_us_zipList,
    locationType,
    paymentTerms,
    priorityList,
    requestStatus,
    resolvedList,
    roles,
    shippingMethods,
    shippingStatus,
    slaList,
    software_install_status,
    softwareAssets,
    softwareStatus,
    statuses,
    taskList,
    teamMembership,
    teams,
    ticketLog,
    users,
    vendors,
    workLog
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
