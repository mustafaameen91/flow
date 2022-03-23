module.exports = (app) => {
   const yearStudy = require("../controllers/yearStudy.controllers.js");

   app.post("/api/addYearStudy", yearStudy.create);

   app.get("/api/yearStudies", yearStudy.findAll);

   app.get("/api/yearStudy/:id", yearStudy.findOne);

   app.put("/api/yearStudy/:id", yearStudy.update);

   app.delete("/api/yearStudy/:id", yearStudy.delete);

   app.delete("/api/yearStudies", yearStudy.deleteAll);
};
