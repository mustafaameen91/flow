module.exports = (app) => {
   const archive = require("../controllers/archive.controllers.js");

   app.post("/api/addArchive", archive.create);

   app.get("/api/archives", archive.findAll);

   app.get("/api/archivesCount", archive.findCount);

   app.get("/api/archive/:id", archive.findOne);

   app.get("/api/searchArchive", archive.searchArchive);

   app.put("/api/archive/:id", archive.update);

   app.delete("/api/archive/:id", archive.delete);

   app.delete("/api/archives", archive.deleteAll);
};
