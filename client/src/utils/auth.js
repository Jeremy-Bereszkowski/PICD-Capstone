class Auth {

  getClearance = (user) => {
    for (var key in user) {
      if (typeof user[key] === 'object') {
        for (var key1 in user[key]) {
          return user[key][key1].toLowerCase()
        }
      }
    }

    return "USER"
  }

  getUID = (user) => {
    return user.email;
  }
}

export default new Auth();
