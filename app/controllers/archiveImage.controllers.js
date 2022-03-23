const ArchiveImage = require("../models/archiveImage.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const archiveImage = new ArchiveImage({
      imagePath: req.body.imagePath,
      archiveId: req.body.archiveId,
   });

   ArchiveImage.create(archiveImage, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.createManyImages = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   ArchiveImage.createMany(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   ArchiveImage.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   ArchiveImage.findById(req.params.id, (err, data) => {
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

   ArchiveImage.updateById(
      req.params.id,
      new ArchiveImage(req.body),
      (err, data) => {
         if (err) res.status(err.code).send(err);
         else res.send(data);
      }
   );
};

exports.delete = (req, res) => {
   ArchiveImage.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `ArchiveImage was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   ArchiveImage.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else
         res.send({ message: `All ArchiveImages were deleted successfully!` });
   });
};
