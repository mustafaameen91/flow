module.exports = (app) => {
   const archiveSubject = require("../controllers/archiveSubject.controllers.js");

   app.post("/api/addArchiveSubject", archiveSubject.create);

   app.get("/api/archiveSubjects", archiveSubject.findAll);

   app.get("/api/archiveSubject/:id", archiveSubject.findOne);

   app.put("/api/archiveSubject/:id", archiveSubject.update);

   app.delete("/api/archiveSubject/:id", archiveSubject.delete);

   app.delete("/api/archiveSubjects", archiveSubject.deleteAll);
};
