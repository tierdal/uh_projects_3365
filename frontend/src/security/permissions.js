import Roles from './roles';
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      iamAdmin: {
        id: 'iamAdmin',
        allowedRoles: [
          roles.admin,
        ],
      },
      iamUser: {
        id: 'iamUser',
        allowedRoles: [
          roles.user,
        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
