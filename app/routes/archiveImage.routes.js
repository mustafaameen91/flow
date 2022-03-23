module.exports = (app) => {
   const archiveImage = require("../controllers/archiveImage.controllers.js");

   app.post("/api/addArchiveImage", archiveImage.create);

   app.post("/api/addArchiveImages", archiveImage.createManyImages);

   app.get("/api/archiveImages", archiveImage.findAll);

   app.get("/api/archiveImage/:id", archiveImage.findOne);

   app.put("/api/archiveImage/:id", archiveImage.update);

   app.delete("/api/archiveImage/:id", archiveImage.delete);

   app.delete("/api/archiveImages", archiveImage.deleteAll);
};
