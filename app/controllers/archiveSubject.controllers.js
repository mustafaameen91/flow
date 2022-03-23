const ArchiveSubject = require("../models/archiveSubject.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const archiveSubject = new ArchiveSubject({
      subjectName: req.body.subjectName,
   });

   ArchiveSubject.create(archiveSubject, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ArchiveSubject.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ArchiveSubject.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.update = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   ArchiveSubject.updateById(
      req.params.id,
      new ArchiveSubject(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ArchiveSubject.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `ArchiveSubject was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ArchiveSubject.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({
            message: `All ArchiveSubjects were deleted successfully!`,
         });
   });
};
