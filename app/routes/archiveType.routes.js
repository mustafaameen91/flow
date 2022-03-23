module.exports = (app) => {
   const archiveType = require("../controllers/archiveType.controllers.js");

   app.post("/api/addArchiveType", archiveType.create);

   app.get("/api/archiveTypes", archiveType.findAll);

   app.get("/api/archiveType/:id", archiveType.findOne);

   app.put("/api/archiveType/:id", archiveType.update);

   app.delete("/api/archiveType/:id", archiveType.delete);

   app.delete("/api/archiveTypes", archiveType.deleteAll);
};
