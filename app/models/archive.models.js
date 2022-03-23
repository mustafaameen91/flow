const sql = require("./db.js");

const Archive = function (archive) {
   this.from = archive.from;
   this.to = archive.to;
   this.archiveDate = archive.archiveDate;
   this.archiveSubjectId = archive.archiveSubjectId;
   this.archiveNumber = archive.archiveNumber;
   this.subjectDescription = archive.subjectDescription;
   this.note = archive.note;
   this.sectionId = archive.sectionId;
   this.archiveTypeId = archive.archiveTypeId;
   this.incomeDate = archive.incomeDate;
   this.incomeNumber = archive.incomeNumber;
   this.yearStudyId = archive.yearStudyId;
};

Archive.create = (newArchive, result) => {
   sql.query("INSERT INTO Archive SET ?", newArchive, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created archive: ", { id: res.insertId, ...newArchive });
      result(null, { id: res.insertId, ...newArchive });
   });
};

//SELECT * ,(select json_arrayagg(json_object('imagePath', ArchiveImage.imagePath,'idArchiveImage' , ArchiveImage.archiveId))) AS images from Archive JOIN ArchiveImage ON Archive.idArchive = ArchiveImage.archiveId GROUP BY Archive.idArchive

Archive.getAll = (result) => {
   sql.query(
      "SELECT * ,(select json_arrayagg(json_object('imagePath', ArchiveImage.imagePath,'idArchiveImage' , ArchiveImage.archiveId))) AS images from Archive JOIN ArchiveImage JOIN ArchiveSubject JOIN ArchiveType ON Archive.idArchive = ArchiveImage.archiveId AND ArchiveSubject.idArchiveSubject = Archive.archiveSubjectId AND ArchiveType.idArchiveType = Archive.archiveTypeId GROUP BY Archive.idArchive",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("archive: ", res[0]);
         result(null, res);
      }
   );
};

Archive.getCount = (result) => {
   sql.query(
      "SELECT * ,COUNT(idArchive) AS archiveCount FROM `Archive` GROUP BY archiveTypeId",
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
         }

         console.log("archive: ", res[0]);
         result(null, res);
      }
   );
};

Archive.findBySearch = (search, result) => {
   sql.query(
      `SELECT *, DATE_FORMAT(Archive.incomeDate,'%d/%m/%Y') AS incomeDateFormatted , DATE_FORMAT(Archive.archiveDate,'%d/%m/%Y') AS archiveDateFormatted ,DATE_FORMAT(Archive.incomeDate,'%d/%m/%Y') AS incomeDateFormatted  ,DATE_FORMAT(Archive.createdAt,'%d/%m/%Y') AS createdAtFormatted  ,(select json_arrayagg(json_object('imagePath', ArchiveImage.imagePath,'idArchiveImage' , ArchiveImage.archiveId)) from ArchiveImage WHERE ArchiveImage.archiveId = Archive.idArchive) AS images from Archive  JOIN ArchiveSubject JOIN ArchiveType ON  ArchiveSubject.idArchiveSubject = Archive.archiveSubjectId AND ArchiveType.idArchiveType = Archive.archiveTypeId WHERE 1=1 ${search} GROUP BY Archive.idArchive`,
      (err, res) => {
         console.log(search);
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("found archive: ", res);
         result(null, res);
      }
   );
};

Archive.findById = (archiveId, result) => {
   sql.query(
      `SELECT * FROM Archive WHERE idArchive = ${archiveId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found archive: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      }
   );
};

Archive.updateById = (id, archive, result) => {
   sql.query(
      "UPDATE Archive SET ? WHERE idArchive = ?",
      [archive, id],
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

         console.log("updated archive: ", { id: id, ...archive });
         result(null, { id: id, ...archive });
      }
   );
};

Archive.remove = (id, result) => {
   sql.query("DELETE FROM Archive WHERE idArchive = ?", id, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      if (res.affectedRows == 0) {
         result({ kind: "not_found" }, null);
         return;
      }

      console.log("deleted archive with id: ", id);
      result(null, res);
   });
};

module.exports = Archive;
