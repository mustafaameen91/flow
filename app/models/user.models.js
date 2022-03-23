const sql = require("./db.js");

const User = function (user) {
   this.userName = user.userName;
   this.password = user.password;
   this.roleId = user.roleId;
   this.sectionId = user.sectionId;
};

User.create = (newUser, result) => {
   sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
   });
};

User.getAll = (result) => {
   sql.query("SELECT * FROM user", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("user: ", res);
      result(null, res);
   });
};

User.findById = (userId, result) => {
   sql.query(`SELECT * FROM user WHERE idUser = ${userId}`, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      if (res.length) {
         console.log("found user: ", res[0]);
         result(null, res[0]);
         return;
      }

      result({ kind: "not_found" }, null);
   });
};

User.updateById = (id, user, result) => {
   sql.query("UPDATE user SET ? WHERE idUser = ?", [user, id], (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
   });
};

User.loginUser = (userName, password, result) => {
   sql.query(
      `SELECT * FROM user JOIN section ON section.idSection = user.sectionId WHERE userName = "${userName}" AND password = "${password}" `,
      (err, res) => {
         if (err) {
            result(err, null);
            return;
         }

         if (res.length == 0) {
            result({ kind: "not_found" }, null);
            return;
         } else result(null, res[0]);
      }
   );
};

User.remove = (id, result) => {
   sql.query("DELETE FROM user WHERE idUser = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted user with id: ", id);
      result(null, res);
   });
};

module.exports = User;
