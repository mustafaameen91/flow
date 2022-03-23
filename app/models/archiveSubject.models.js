const sql = require("./db.js");

const ArchiveSubject = function (archiveSubject) {
   this.subjectName = archiveSubject.subjectName;
};

ArchiveSubject.create = (newArchiveSubject, result) => {
   sql.query(
      "INSERT INTO ArchiveSubject SET ?",
      newArchiveSubject,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created archiveSubject: ", {
            id: res.insertId,
            ...newArchiveSubject,
         });
         result(null, { id: res.insertId, ...newArchiveSubject });
      }
   );
};

ArchiveSubject.getAll = (result) => {
   sql.query(
      "SELECT DATE_FORMAT(createdAt,'%d/%m/%Y') AS createdAt , idArchiveSubject , subjectName FROM ArchiveSubject",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("archiveSubject: ", res);
         result(null, res);
      }
   );
};

ArchiveSubject.findById = (archiveSubjectId, result) => {
   sql.query(
      `SELECT * FROM ArchiveSubject WHERE idArchiveSubject = ${archiveSubjectId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found archiveSubject: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ArchiveSubject.updateById = (id, archiveSubject, result) => {
   sql.query(
      "UPDATE ArchiveSubject SET ? WHERE idArchiveSubject = ?",
      [archiveSubject, id],
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

         console.log("updated archiveSubject: ", { id: id, ...archiveSubject });
         result(null, { id: id, ...archiveSubject });
      }
   );
};

ArchiveSubject.remove = (id, result) => {
   sql.query(
      "DELETE FROM ArchiveSubject WHERE idArchiveSubject = ?",
      id,
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

         console.log("deleted archiveSubject with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ArchiveSubject;
