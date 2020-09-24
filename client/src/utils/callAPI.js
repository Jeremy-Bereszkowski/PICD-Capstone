import auth from './auth'

class CallAPI {
  login = (cb, email, password, error, sessionCB) => {
    console.log(email, password)

    const encryptEmail = encrypt(email)
    const encryptPass = encrypt(password)

    console.log(encryptEmail, encryptPass)

    postFetch(cb,
        '/auth/login',
        JSON.stringify({
          uname: encryptEmail,
          pword: encryptPass
        }),
        error,
        'Email or Password Incorrect',
        sessionCB
    )
  }

  getUserList = (cb) => {
    fetch(process.env.REACT_APP_API_SERVER_ADDRESS + '/admin/users/')
        .then((response) => { return response.json(); })
        .then((data) => {

          var i
          for (i = 0; i < data.length; i++) {
            console.log(data[i])
            data[i] = {
              clearance: data[i].clearance,
              email: decrypt(data[i].email),
              fname: decrypt(data[i].fname),
              lname: decrypt(data[i].lname),
              user_id: data[i].user_id
            }
          }

          cb(data);
        });
  }

  getUser = (cb, userID) => {
    fetch(process.env.REACT_APP_API_SERVER_ADDRESS + "/admin/users/" + userID)
        .then(res => res.json())
        .then(res => {

          var user = {
            user_id: res.user.user_id,
            fname: decrypt(res.user.fname),
            lname: decrypt(res.user.lname),
            clearance: res.user.clearance,
            email: decrypt(res.user.email)
          }
          cb(user)
        });
  }

  newUser = (cb, fname, lname, clearance, email, pass, error) => {
    fetch(process.env.REACT_APP_API_SERVER_ADDRESS + '/admin/users/new', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        fname: encrypt(fname),
        lname: encrypt(lname),
        clearance: clearance,
        email: encrypt(email),
        password: encrypt(pass),
      })
    }).then((res) => {
      if (res.status === 200) {
        cb()
      } else {
        error()
      }
    }).catch((err) => {
      error()
    })
  }

  updateUser = (cb, user_id, fname, lname, clearance, email, error) => {
    var clearEnum = 1

    if (clearance === "admin") {
      clearEnum = 2
    }

    fetch(process.env.REACT_APP_API_SERVER_ADDRESS + '/admin/users/' + user_id + '/update', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user_id,
        fname: encrypt(fname),
        lname: encrypt(lname),
        clearance: clearEnum,
        email: encrypt(email)
      })
    })
        .then((res) => {
          if (res.status === 200) {
            cb()
          } else {
            error()
          }
        }).catch((err) => {
      error(err)
    })
  }

  updateUserPassword = (cb, user_id, old_password, new_password, error) => {

    if(old_password === "" || new_password === "") {
      error({message: "Password Not Long enough"});
      return false
    }

    fetch(process.env.REACT_APP_API_SERVER_ADDRESS + '/admin/users/' + user_id + '/update/password', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        old_password: encrypt(old_password),
        new_password: encrypt(new_password)
      })
    })
    .then(res => {
      const status = res.status;
      const data = res.json();
      return Promise.all([status, data])
    })
    .then(([status, data]) => {
      if(status !== 200) {
        error(data)
      }else{
        cb(data)
      }
    })
    .catch((err) => {
      error(err)
    })
  }

  newProject = (cb, body) => {
    const uid = auth.getUID()
    var url = process.env.REACT_APP_API_SERVER_ADDRESS + '/project/new/' + uid

    fetch(url, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: body
    }).then((res) => {
      cb(res)
    })
  }

  addProjectUser = (cb, projectId, uid, collabId) => {
    var url = process.env.REACT_APP_API_SERVER_ADDRESS + '/project/' + projectId + '/add-user/' + uid

    fetch(url, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        collabId: collabId
      })
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
    }).then(res => {
      cb(res);
    })
  }

  removeProjectUser = (cb, projectID, uid) => {
    var url = process.env.REACT_APP_API_SERVER_ADDRESS + '/project/' + projectID + '/remove-user/' + uid

    fetch(url)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          cb(data);
        })
  }

  transferProjectOwnership = (cb, projectId, newOwnerId, oldOwnerId) => {
    var url = process.env.REACT_APP_API_SERVER_ADDRESS + '/project/transfer'

    fetch(url, {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        newOwnerId: newOwnerId,
        oldOwnerId: oldOwnerId,
        projectId: projectId,
      })
    })
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then(data => {
          cb(data);
        })
        .catch(e => {

        })
  }

  getProjectUserList = (cb, projectID) => {
    var url = process.env.REACT_APP_API_SERVER_ADDRESS + '/project/' + projectID + '/users'

    fetch(url)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          data.projectUsers.forEach(element => {
            element.fname = decrypt(element.fname)
            element.lname = decrypt(element.lname)
          });

          cb(data);
        })
  }

  deleteProject = (cb, user_id, err) => {
    var url = process.env.REACT_APP_API_SERVER_ADDRESS + '/admin/users/delete/' + user_id

    fetch(url)
        .then((res) => {
          if (res.status === 200) {
            cb()
          }
        })
        .catch((error) => err(error))
  }

  newStage = (cb, user_id, project_id, stage_name, error) => {
    fetch(process.env.REACT_APP_API_SERVER_ADDRESS+'/project/'+project_id+'/stage/new', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        userID: user_id,
        projectID: project_id,
        stageName: stage_name
      })
    }).then(res => {
      const status = res.status;
      const data = res.json();
      return Promise.all([status, data])
    })
    .then(([status, data]) => {
      if(status !== 200) {
        error(data)
      }else{
        cb(data)
      }
    })
    .catch((err) => {
      error(err)
    })
  }
}

function postFetch(cb, endpoint, body, error, errString, sessionCB) {
  fetch(process.env.REACT_APP_API_SERVER_ADDRESS + endpoint, {
    method: 'post',
    headers: {
      'content-type': 'application/json'
    },
    body: body
  })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        throw new Error(errString);
      })
      .then((res) => {
        sessionCB(res)
        cb();
      })
      .catch(err => error(err));
}

function encrypt(toEncode) {
  const crypto = require('crypto'),
      resizedIV = Buffer.allocUnsafe(16),
      iv = crypto
          .createHash("sha256")
          .update(process.env.REACT_APP_IV_KEY)
          .digest();

  iv.copy(resizedIV);

  const key = crypto
      .createHash("sha256")
      .update(process.env.REACT_APP_CIPHER)
      .digest()

  const cipher = crypto.createCipheriv("aes256", key, resizedIV)
  const msg = []

  msg.push(cipher.update(toEncode, "binary", "hex"));
  msg.push(cipher.final("hex"));

  return msg.join("")
}

function decrypt(toDecode) {
  const crypto = require('crypto'),
      resizedIV = Buffer.allocUnsafe(16),
      iv = crypto
          .createHash("sha256")
          .update(process.env.REACT_APP_IV_KEY)
          .digest();

  iv.copy(resizedIV);

  const key = crypto
      .createHash("sha256")
      .update(process.env.REACT_APP_CIPHER)
      .digest()

  const decipher = crypto.createDecipheriv("aes256", key, resizedIV)
  const msg = []

  msg.push(decipher.update(toDecode, "hex", "binary"));
  msg.push(decipher.final("binary"));

  return msg.join("")
}

export default new CallAPI()
