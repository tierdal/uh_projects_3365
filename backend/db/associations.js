module.exports = {
  associate: models => {

    //users
    models.departments.hasMany(models.users, {foreignKey: "departmentId"})
    models.roles.hasMany(models.users, {foreignKey: "roleId"})
    models.statuses.hasMany(models.users, {foreignKey: "statusId"})
    models.users.belongsTo(models.departments, {foreignKey: "departmentId"});
    models.users.belongsTo(models.roles, {foreignKey: "roleId"});
    models.users.belongsTo(models.statuses, {foreignKey: "statusId"});

    //faqList
    models.faqCategory.hasMany(models.faqList, {foreignKey: "faq_categoryId"});
    models.faqList.belongsTo(models.faqCategory, {foreignKey: "faq_categoryId"});

    //locations
    models.locationType.hasMany(models.locations, {foreignKey: "locationTypeId"});
    models.locations.belongsTo(models.locationType, {foreignKey: "locationTypeId"});

    //vendors
    models.locations.hasMany(models.vendors, {foreignKey: "locationId"});
    models.paymentTerms.hasMany(models.vendors, {foreignKey: "paymentTermId"});
    models.vendors.belongsTo(models.locations, {foreignKey: "locationId"});
    models.vendors.belongsTo(models.paymentTerms, {foreignKey: "paymentTermId"});

    //contracts
    models.vendors.hasMany(models.contracts, {foreignKey: "vendorId"});
    models.contracts.belongsTo(models.vendors, {foreignKey: "vendorId"});

    //priorityList
    models.slaList.hasMany(models.priorityList, {foreignKey: "priority_sla_id"});
    models.priorityList.belongsTo(models.slaList, {foreignKey: "priority_sla_id"});

    //approverList
    models.users.hasMany(models.approverList, {foreignKey: "user_getsapproved"});
    models.users.hasMany(models.approverList, {foreignKey: "user_approver"});
    models.approverList.belongsTo(models.users, {foreignKey: "user_getsapproved"});
    models.approverList.belongsTo(models.users, {foreignKey: "user_approver"});

    //assetList
    models.assetStatus.hasMany(models.assetList, {foreignKey: "assetStatusId"});
    models.assetType.hasMany(models.assetList, {foreignKey: "assetTypeId"});
    models.vendors.hasMany(models.assetList, {foreignKey: "vendorId"});
    models.users.hasMany(models.assetList, {foreignKey: "userId"});
    models.assetList.belongsTo(models.assetStatus, {foreignKey: "assetStatusId"});
    models.assetList.belongsTo(models.assetType, {foreignKey: "assetTypeId"});
    models.assetList.belongsTo(models.vendors, {foreignKey: "vendorId"});
    models.assetList.belongsTo(models.users, {foreignKey: "userId"});

    //auditLog_access
    models.users.hasMany(models.auditLog_access, {foreignKey: "auditLog_access_userId"});
    models.auditLog_access.belongsTo(models.users, {foreignKey: "auditLog_access_userId"});

    //teamMembership
    models.teams.hasMany(models.teamMembership, {foreignKey: "teamId"});
    models.users.hasMany(models.teamMembership, {foreignKey: "userId"});
    models.teamMembership.belongsTo(models.teams, {foreignKey: "teamId"});
    models.teamMembership.belongsTo(models.users, {foreignKey: "userId"});

    //incidentLog
    models.users.hasMany(models.incidentLog, {foreignKey: "incident_assignedUser"});
    models.users.hasMany(models.incidentLog, {foreignKey: "incident_createdBy"});
    models.incidentStatus.hasMany(models.incidentLog, {foreignKey: "incidentStatusId"});
    models.incidentType.hasMany(models.incidentLog, {foreignKey: "incident_typeId"});
    models.incidentUrgency.hasMany(models.incidentLog, {foreignKey: "incidentUrgencyId"});
    models.locations.hasMany(models.incidentLog, {foreignKey: "incident_location"});
    models.teams.hasMany(models.incidentLog, {foreignKey: "incident_assignedTeam"});
    models.resolvedList.hasMany(models.incidentLog, {foreignKey: "resolvedId"});
    models.incidentLog.belongsTo(models.users, {as: 'assignedUser', foreignKey: "incident_assignedUser"});
    models.incidentLog.belongsTo(models.users, {as: 'createdBy', foreignKey: "incident_createdBy"});
    models.incidentLog.belongsTo(models.incidentStatus, {foreignKey: "incidentStatusId"});
    models.incidentLog.belongsTo(models.incidentType, {foreignKey: "incident_typeId"});
    models.incidentLog.belongsTo(models.incidentUrgency, {foreignKey: "incidentUrgencyId"});
    models.incidentLog.belongsTo(models.locations, {foreignKey: "incident_location"});
    models.incidentLog.belongsTo(models.teams, {foreignKey: "incident_assignedTeam"});
    models.incidentLog.belongsTo(models.resolvedList, {foreignKey: "resolvedId"});

    //auditLog_incidents
    models.users.hasMany(models.auditLog_incidents, {foreignKey: "auditLog_incidents_userId"});
    models.incidentLog.hasMany(models.auditLog_incidents, {foreignKey: "auditLog_incidents_incidentId"});
    models.auditLog_incidents.belongsTo(models.users, {foreignKey: "auditLog_incidents_userId"});
    models.auditLog_incidents.belongsTo(models.incidentLog, {foreignKey: "auditLog_incidents_incidentId"});

    //auditLog_approvals
    models.users.hasMany(models.auditLog_approvals, {foreignKey: "auditLog_approvals_userId"});
    models.auditLog_approvals.belongsTo(models.users, {foreignKey: "auditLog_approvals_userId"});

    //softwareAssets
    models.softwareStatus.hasMany(models.softwareAssets, {foreignKey: "softwareStatusId"});
    models.vendors.hasMany(models.softwareAssets, {foreignKey: "vendorId"});
    models.softwareAssets.belongsTo(models.softwareStatus, {foreignKey: "softwareStatusId"});
    models.softwareAssets.belongsTo(models.vendors, {foreignKey: "vendorId"});

    //licenseKeys
    models.softwareAssets.hasMany(models.licenseKeys, {foreignKey: "softwareId"});
    models.users.hasMany(models.licenseKeys, {foreignKey: "userId"});
    models.licenseKeys.belongsTo(models.softwareAssets, {foreignKey: "softwareId"});
    models.licenseKeys.belongsTo(models.users, {foreignKey: "userId"});

    //ticketLog
    models.users.hasMany(models.ticketLog, {foreignKey: "assigned_user"});
    models.users.hasMany(models.ticketLog, {foreignKey: "created_by"});
    models.assetList.hasMany(models.ticketLog, {foreignKey: "assetId"});
    models.issueCategory.hasMany(models.ticketLog, {foreignKey: "issueCategoryId"});
    models.issueType.hasMany(models.ticketLog, {foreignKey: "issueId"});
    models.locations.hasMany(models.ticketLog, {foreignKey: "locationId"});
    models.priorityList.hasMany(models.ticketLog, {foreignKey: "priorityId"});
    models.requestStatus.hasMany(models.ticketLog, {foreignKey: "requestStatusId"});
    models.resolvedList.hasMany(models.ticketLog, {foreignKey: "resolvedId"});
    models.softwareAssets.hasMany(models.ticketLog, {foreignKey: "softwareId"});
    models.teams.hasMany(models.ticketLog, {foreignKey: "teamId"});
    models.ticketLog.belongsTo(models.users, {as: 'assignedUser', foreignKey: "assigned_user"});
    models.ticketLog.belongsTo(models.users, {as: 'createdBy', foreignKey: "created_by"});
    models.ticketLog.belongsTo(models.assetList, {foreignKey: "assetId"});
    models.ticketLog.belongsTo(models.issueCategory, {foreignKey: "issueCategoryId"});
    models.ticketLog.belongsTo(models.issueType, {foreignKey: "issueId"});
    models.ticketLog.belongsTo(models.locations, {foreignKey: "locationId"});
    models.ticketLog.belongsTo(models.priorityList, {foreignKey: "priorityId"});
    models.ticketLog.belongsTo(models.requestStatus, {foreignKey: "requestStatusId"});
    models.ticketLog.belongsTo(models.resolvedList, {foreignKey: "resolvedId"});
    models.ticketLog.belongsTo(models.softwareAssets, {foreignKey: "softwareId"});
    models.ticketLog.belongsTo(models.teams, {foreignKey: "teamId"});

    //auditLog_tickets
    models.users.hasMany(models.auditLog_tickets, {foreignKey: "auditLog_tickets_userId"});
    models.ticketLog.hasMany(models.auditLog_tickets, {foreignKey: "auditLog_tickets_ticketId"});
    models.auditLog_tickets.belongsTo(models.users, {foreignKey: "auditLog_tickets_userId"});
    models.auditLog_tickets.belongsTo(models.ticketLog, {foreignKey: "auditLog_tickets_ticketId"});

    //workLog
    models.ticketLog.hasMany(models.workLog, {foreignKey: "ticketId"});
    models.users.hasMany(models.workLog, {foreignKey: "userId"});
    models.workLog.belongsTo(models.ticketLog, {foreignKey: "ticketId"});
    models.workLog.belongsTo(models.users, {foreignKey: "userId"});

    //taskList
    models.users.hasMany(models.taskList, {foreignKey: "task_approver"});
    models.users.hasMany(models.taskList, {foreignKey: "task_owner"});
    models.requestStatus.hasMany(models.taskList, {foreignKey: "requestStatusId"});
    models.locations.hasMany(models.taskList, {foreignKey: "shippingLocationId"});
    models.shippingMethods.hasMany(models.taskList, {foreignKey: "shippingMethodId"});
    models.ticketLog.hasMany(models.taskList, {foreignKey: "ticketId"});
    models.taskList.belongsTo(models.users, {foreignKey: "task_approver"});
    models.taskList.belongsTo(models.users, {foreignKey: "task_owner"});
    models.taskList.belongsTo(models.requestStatus, {foreignKey: "requestStatusId"});
    models.taskList.belongsTo(models.locations, {foreignKey: "shippingLocationId"});
    models.taskList.belongsTo(models.shippingMethods, {foreignKey: "shippingMethodId"});
    models.taskList.belongsTo(models.ticketLog, {foreignKey: "ticketId"});

    //auditLog_tasks
    models.users.hasMany(models.auditLog_tasks, {foreignKey: "auditLog_tasks_userId"});
    models.taskList.hasMany(models.auditLog_tasks, {foreignKey: "auditLog_tasks_taskId"});
    models.auditLog_tasks.belongsTo(models.users, {foreignKey: "auditLog_tasks_userId"});
    models.auditLog_tasks.belongsTo(models.taskList, {foreignKey: "auditLog_tasks_taskId"});

    //incidentResponseLog
    models.incidentLog.hasMany(models.incidentResponseLog, {foreignKey: "incidentId"});
    models.users.hasMany(models.incidentResponseLog, {foreignKey: "incidentResponseLog_user"});
    models.incidentResponseLog.belongsTo(models.incidentLog, {foreignKey: "incidentId"});
    models.incidentResponseLog.belongsTo(models.users, {foreignKey: "incidentResponseLog_user"});

    //software_install_status
    models.installStatusList.hasMany(models.software_install_status, {foreignKey: "installStatusId"});
    models.softwareAssets.hasMany(models.software_install_status, {foreignKey: "softwareId"});
    models.users.hasMany(models.software_install_status, {foreignKey: "userId"});
    models.software_install_status.belongsTo(models.installStatusList, {foreignKey: "installStatusId"});
    models.software_install_status.belongsTo(models.softwareAssets, {foreignKey: "softwareId"});
    models.software_install_status.belongsTo(models.users, {foreignKey: "userId"});

    //changeRequests
    models.changeRequestType.hasMany(models.changeRequests, {foreignKey: "changeRequestTypeId"});
    models.users.hasMany(models.changeRequests, {foreignKey: "changeRequest_owner"});
    models.users.hasMany(models.changeRequests, {foreignKey: "changeRequest_approver"});
    models.changeRequestStatus.hasMany(models.changeRequests, {foreignKey: "changeRequestStatusId"});
    models.changeRequests.belongsTo(models.changeRequestType, {foreignKey: "changeRequestTypeId"});
    models.changeRequests.belongsTo(models.users, {foreignKey: "changeRequest_owner"});
    models.changeRequests.belongsTo(models.users, {foreignKey: "changeRequest_approver"});
    models.changeRequests.belongsTo(models.changeRequestStatus, {foreignKey: "changeRequestStatusId"});

    //auditLog_changeRequests
    models.users.hasMany(models.auditLog_changeRequests, {foreignKey: "auditLog_changeRequests_userId"});
    models.changeRequests.hasMany(models.auditLog_changeRequests, {foreignKey: "auditLog_changeRequests_requestId"});
    models.auditLog_changeRequests.belongsTo(models.users, {foreignKey: "auditLog_changeRequests_userId"});
    models.auditLog_changeRequests.belongsTo(models.changeRequests, {foreignKey: "auditLog_changeRequests_requestId"});

    //issueType
    models.issueCategory.hasMany(models.issueType, {foreignKey: "issueCategoryId"});
    models.issueType.belongsTo(models.issueCategory, {foreignKey: "issueCategoryId"});

    //incidentType
    models.teams.hasMany(models.incidentType, {foreignKey: "incidentType_responsibleTeam"});
    models.incidentType.belongsTo(models.teams, {foreignKey: "incidentType_responsibleTeam"});

    //incidentUrgency
    models.slaList.hasMany(models.incidentUrgency, {foreignKey: "incidentUrgency_SLA"});
    models.incidentUrgency.belongsTo(models.slaList, {foreignKey: "incidentUrgency_SLA"});

  }
}
