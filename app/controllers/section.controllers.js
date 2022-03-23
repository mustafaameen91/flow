const Section = require("../models/section.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const section = new Section({
      sectionName: req.body.sectionName,
      code: req.body.code,
      englishName: req.body.englishName,
   });

   Section.create(section, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   Section.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Section.findById(req.params.id, (err, data) => {
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

   Section.updateById(req.params.id, new Section(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Section.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Section was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Section.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Sections were deleted successfully!` });
   });
};
