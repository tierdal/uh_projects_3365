module.exports = {
  associate: models => {
    models.departments.hasMany(models.users, {foreignKey: "departmentId"})
    models.roles.hasMany(models.users, {foreignKey: "roleId"})
    models.statuses.hasMany(models.users, {foreignKey: "statusId"})

    models.users.belongsTo(models.departments, {foreignKey: "departmentId"});
    models.users.belongsTo(models.roles, {foreignKey: "roleId"});
    models.users.belongsTo(models.statuses, {foreignKey: "statusId"});
  }
}
