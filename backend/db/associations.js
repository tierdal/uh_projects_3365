module.exports = {
  associate: models => {
    models.users.belongsTo(models.departments)
    models.users.belongsTo(models.roles)
    models.users.belongsTo(models.status)
  }
}
