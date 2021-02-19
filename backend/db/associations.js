module.exports = {
  associate: models => {
    models.departments.hasMany(models.users)
    models.roles.hasMany(models.users)
    models.statuses.hasMany(models.users)

    models.users.belongsTo(models.departments, {foreignKey: "department_id"});
    models.users.belongsTo(models.roles, {foreignKey: "role_id"});
    models.users.belongsTo(models.statuses, {foreignKey: "status_id"});
  }
}
