const sql = require("./db.js");

const Section = function (section) {
   this.sectionName = section.sectionName;
};

Section.create = (newSection, result) => {
   sql.query("INSERT INTO section SET ?", newSection, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created section: ", { id: res.insertId, ...newSection });
      result(null, { id: res.insertId, ...newSection });
   });
};

Section.getAll = (result) => {
   sql.query("SELECT * FROM section", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("section: ", res);
      result(null, res);
   });
};

Section.findById = (sectionId, result) => {
   sql.query(
      `SELECT * FROM section WHERE idSection = ${sectionId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found section: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Section.updateById = (id, section, result) => {
   sql.query(
      "UPDATE section SET ? WHERE idSection = ?",
      [section, id],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
         }

         console.log("updated section: ", { id: id, ...section });
         result(null, { id: id, ...section });
      }
   );
};

Section.remove = (id, result) => {
   sql.query("DELETE FROM section WHERE idSection = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted section with id: ", id);
      result(null, res);
   });
};

module.exports = Section;
