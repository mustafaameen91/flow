const Archive = require("../models/archive.models.js");

exports.create = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   const archive = new Archive({
      from: req.body.from,
      to: req.body.to,
      archiveDate: req.body.archiveDate,
      archiveSubjectId: req.body.archiveSubjectId,
      archiveNumber: req.body.archiveNumber,
      subjectDescription: req.body.subjectDescription,
      note: req.body.note,
      sectionId: req.body.sectionId,
      archiveTypeId: req.body.archiveTypeId,
      incomeDate: req.body.incomeDate,
      incomeNumber: req.body.incomeNumber,
      yearStudyId: req.body.yearStudyId,
      isRead: 0,
   });

   Archive.create(archive, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.createMultiArchive = (req, res) => {
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Archive.createMulti(req.body, (err, data) => {
      if (err) res.status(err.code).send(err);
      else {
         res.send(data);
      }
   });
};

exports.findCount = (req, res) => {
   Archive.getCount((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findAll = (req, res) => {
   Archive.getAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.findOne = (req, res) => {
   Archive.findById(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.searchArchive = (req, res) => {
   let search = "";

   if (req.query.numberSearch) {
      search += ` AND archiveNumber = ${req.query.numberSearch}`;
   }

   if (req.query.yearStudyId) {
      search += ` AND yearStudyId = ${req.query.yearStudyId * 1}`;
   }

   if (req.query.subjectSearch) {
      search += ` AND archiveSubjectId = ${req.query.subjectSearch * 1}`;
   }

   if (req.query.sectionId) {
      search += ` AND sectionId = ${req.query.sectionId * 1}`;
   }

   if (req.query.subjectDescription) {
      search += ` AND subjectDescription LIKE '%${req.query.subjectDescription}%'`;
   }

   if (req.query.archiveTypeId) {
      search += ` AND archiveTypeId = ${req.query.archiveTypeId * 1}`;
   }

   if (req.query.archiveTypeId == 3) {
      search += ` OR from = ${req.query.sectionId} OR to = ${req.query.sectionId}`;
   }

   if (req.query.dates) {
      if (req.query.dates.length > 0) {
         console.log(JSON.parse(req.query.dates));
         let date = JSON.parse(req.query.dates);
         var startDate = new Date(date[0]);
         var endDate = new Date(date[1]);

         search.archiveDate = {
            gte: startDate.toISOString(),
            lte: endDate.toISOString(),
         };
      }
   }

   Archive.findBySearch(search, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.updateIsRead = (req, res) => {
   console.log(req.body);
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!",
      });
   }

   Archive.updateByIdForRead(req.params.id, req.body.isRead, (err, data) => {
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

   Archive.updateById(req.params.id, new Archive(req.body), (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send(data);
   });
};

exports.delete = (req, res) => {
   Archive.remove(req.params.id, (err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `Archive was deleted successfully!` });
   });
};

exports.deleteAll = (req, res) => {
   Archive.removeAll((err, data) => {
      if (err) res.status(err.code).send(err);
      else res.send({ message: `All Archives were deleted successfully!` });
   });
};
