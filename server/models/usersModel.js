const Users = require('../schemas/usersSchema');

class UsersModel {
  getUsers(req, res) {
    Users.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
}
module.exports = new UsersModel();
