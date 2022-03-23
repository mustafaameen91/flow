module.exports = (app) => {
   const section = require("../controllers/section.controllers.js");

   app.post("/api/addSection", section.create);

   app.get("/api/sections", section.findAll);

   app.get("/api/section/:id", section.findOne);

   app.put("/api/section/:id", section.update);

   app.delete("/api/section/:id", section.delete);

   app.delete("/api/sections", section.deleteAll);
};
