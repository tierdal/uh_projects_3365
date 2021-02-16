//import _values from 'lodash/values';

class Roles {
  static get values() {
    return {
      admin: 'admin',
      user: 'user',
    };
  }

  static labelOf(roleId) {
    if (!this.values[roleId]) {
      return roleId;
    }
  }

  static descriptionOf(roleId) {
    if (!this.values[roleId]) {
      return roleId;
    }
  }

  static get selectOptions() {
    //return _values(this.values).map((value) => ({
   //   id: value,
    //  value: value,
    //  title: this.descriptionOf(value),
    //  label: this.labelOf(value),
   // }));
  }
}

export default Roles;
