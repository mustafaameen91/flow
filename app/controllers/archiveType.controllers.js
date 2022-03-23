const ArchiveType = require("../models/archiveType.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const archiveType = new ArchiveType({
      typeName: req.body.typeName,
   });

   ArchiveType.create(archiveType, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ArchiveType.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ArchiveType.findById(req.params.id, (err, data) => {
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

   ArchiveType.updateById(
      req.params.id,
      new ArchiveType(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ArchiveType.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `ArchiveType was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ArchiveType.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All ArchiveTypes were deleted successfully!` });
   });
};
