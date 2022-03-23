const sql = require("./db.js");

const ArchiveType = function (archiveType) {
   this.typeName = archiveType.typeName;
};

ArchiveType.create = (newArchiveType, result) => {
   sql.query("INSERT INTO ArchiveType SET ?", newArchiveType, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created archiveType: ", {
         id: res.insertId,
         ...newArchiveType,
      });
      result(null, { id: res.insertId, ...newArchiveType });
   });
};

ArchiveType.getAll = (result) => {
   sql.query("SELECT * FROM ArchiveType", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("archiveType: ", res);
      result(null, res);
   });
};

ArchiveType.findById = (archiveTypeId, result) => {
   sql.query(
      `SELECT * FROM ArchiveType WHERE idArchiveType = ${archiveTypeId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found archiveType: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

ArchiveType.updateById = (id, archiveType, result) => {
   sql.query(
      "UPDATE ArchiveType SET ? WHERE idArchiveType = ?",
      [archiveType, id],
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

         console.log("updated archiveType: ", { id: id, ...archiveType });
         result(null, { id: id, ...archiveType });
      }
   );
};

ArchiveType.remove = (id, result) => {
   sql.query(
      "DELETE FROM ArchiveType WHERE idArchiveType = ?",
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

         console.log("deleted archiveType with id: ", id);
         result(null, res);
      }
   );
};

module.exports = ArchiveType;
