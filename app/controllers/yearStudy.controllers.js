const YearStudy = require("../models/yearStudy.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const yearStudy = new YearStudy({
      year: req.body.year,
      currentYear: req.body.currentYear,
   });

   YearStudy.create(yearStudy, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findAll = (req, res) => {
   YearStudy.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   YearStudy.findById(req.params.id, (err, data) => {
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

   YearStudy.updateById(req.params.id, new YearStudy(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   YearStudy.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `YearStudy was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   YearStudy.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All YearStudys were deleted successfully!` });
   });
};
