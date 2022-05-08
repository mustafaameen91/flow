const sql = require("./db.js");

const ArchiveImage = function (archiveImage) {
   this.imagePath = archiveImage.imagePath;
   this.archiveId = archiveImage.archiveId;
};

ArchiveImage.create = (newArchiveImage, result) => {
   sql.query("INSERT INTO ArchiveImage SET ?", newArchiveImage, (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
      }

      console.log("created archiveImage: ", {
         id: res.insertId,
         ...newArchiveImage,
      });
      result(null, { id: res.insertId, ...newArchiveImage });
   });
};

ArchiveImage.createMany = async (newArchiveImages, result) => {
   console.log(newArchiveImages);
   sql.query(
      "INSERT INTO archiveImage (imagePath ,archiveId) VALUES ?",
      [newArchiveImages.map((image) => [image.imagePath, image.archiveId])],
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created archiveImage result: ", {
            id: res.insertId,
         });
         result(null, { id: res.insertId });
      },
   );
};

ArchiveImage.getAll = (result) => {
   sql.query("SELECT * FROM ArchiveImage", (err, res) => {
      if (err) {
         console.log("error: ", err);
         result(null, err);
         return;
      }

      console.log("archiveImage: ", res);
      result(null, res);
   });
};

ArchiveImage.findById = (archiveImageId, result) => {
   sql.query(
      `SELECT * FROM ArchiveImage WHERE idArchiveImage = ${archiveImageId}`,
      (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         if (res.length) {
            console.log("found archiveImage: ", res[0]);
            result(null, res[0]);
            return;
         }

         result({ kind: "not_found" }, null);
      },
   );
};

ArchiveImage.updateById = (id, archiveImage, result) => {
   sql.query(
      "UPDATE ArchiveImage SET ? WHERE idArchiveImage = ?",
      [archiveImage, id],
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

         console.log("updated archiveImage: ", { id: id, ...archiveImage });
         result(null, { id: id, ...archiveImage });
      },
   );
};

ArchiveImage.remove = (id, result) => {
   sql.query(
      "DELETE FROM ArchiveImage WHERE idArchiveImage = ?",
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

         console.log("deleted archiveImage with id: ", id);
         result(null, res);
      },
   );
};

module.exports = ArchiveImage;
