module.exports = {
  associate: models => {
    models.departments.hasMany(models.users,{foreignKey: "department_id"})
    models.roles.hasMany(models.users,{foreignKey: "role_id"})
    models.status.hasMany(models.users,{foreignKey: "status_id"})
    models.users.belongsTo(models.departments, { as: "Department", foreignKey: "department_id"});
    models.users.belongsTo(models.roles, { as: "Role", foreignKey: "role_id"});
    models.users.belongsTo(models.status, { as: "Status", foreignKey: "status_id"});
  }
}
