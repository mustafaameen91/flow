const sql = require("./db.js");

const YearStudy = function (yearStudy) {
   this.year = yearStudy.year;
   this.currentYear = yearStudy.currentYear;
};

YearStudy.create = (newYearStudy, result) => {
   sql.query("INSERT INTO YearStudy SET ?", newYearStudy, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created yearStudy: ", { id: res.insertId, ...newYearStudy });
      result(null, { id: res.insertId, ...newYearStudy });
   });
};

YearStudy.getAll = (result) => {
   sql.query("SELECT * FROM YearStudy", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("yearStudy: ", res);
      result(null, res);
   });
};

YearStudy.findById = (yearStudyId, result) => {
   sql.query(
      `SELECT * FROM YearStudy WHERE idYearStudy = ${yearStudyId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found yearStudy: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

YearStudy.updateById = (id, yearStudy, result) => {
   sql.query(
      "UPDATE YearStudy SET ? WHERE idYearStudy = ?",
      [yearStudy, id],
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

         console.log("updated yearStudy: ", { id: id, ...yearStudy });
         result(null, { id: id, ...yearStudy });
      }
   );
};

YearStudy.remove = (id, result) => {
   sql.query("DELETE FROM YearStudy WHERE idYearStudy = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted yearStudy with id: ", id);
      result(null, res);
   });
};

module.exports = YearStudy;
