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
   this.isRead = 0;
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

Archive.createMulti = (newArchives, result) => {
   sql.query(
      "INSERT INTO Archive (Archive.from , Archive.to, archiveDate , archiveSubjectId , archiveNumber , subjectDescription , note , sectionId , archiveTypeId, incomeDate, incomeNumber,yearStudyId,isRead) VALUES ?",
      [
         newArchives.map((archive) => [
            archive.from,
            archive.to,
            archive.archiveDate,
            archive.archiveSubjectId,
            archive.archiveNumber,
            archive.subjectDescription,
            archive.note,
            archive.sectionId,
            archive.archiveTypeId,
            archive.incomeDate,
            archive.incomeNumber,
            archive.yearStudyId,
            false,
         ]),
      ],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log(res);
         let archives = [];
         for (let i = 0; i < res.affectedRows; i++) {
            let data = {
               idArchive: res.insertId + i,
               from: newArchives[i].from,
               to: newArchives[i].to,
               archiveDate: newArchives[i].archiveDate,
               archiveSubjectId: newArchives[i].archiveSubjectId,
               archiveNumber: newArchives[i].archiveNumber,
               subjectDescription: newArchives[i].archiveDescription,
               note: newArchives[i].note,
               sectionId: newArchives[i].sectionId,
               archiveTypeId: newArchives[i].archiveTypeId,
               yearStudyId: newArchives[i].yearStudyId,
               incomeDate: newArchives[i].incomeDate,
               incomeNumber: newArchives[i].incomeNumber,
            };
            archives.push(data);
         }

         console.log(archives);

         console.log("created archive: ", archives);
         result(null, archives);
      },
   );
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
      },
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
      },
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
      },
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
      },
   );
};

Archive.updateByIdForRead = (id, isRead, result) => {
   sql.query(
      `UPDATE Archive SET isRead = ? WHERE idArchive = ?`,
      [isRead, id],
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

         console.log("updated archive: ", { id: id });
         result(null, { id: id });
      },
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
      },
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
