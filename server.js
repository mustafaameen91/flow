const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(fileUpload());

function generateRandomName(length, patientId) {
   var result = "";
   var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result +=
         characters.charAt(Math.floor(Math.random() * charactersLength)) +
         patientId;
   }
   return result;
}

app.post("/api/uploadArchive", function (req, res) {
   if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
   }

   let uploadedFiles = [];

   if (req.files.files.length > 1) {
      req.files.files.forEach((file, index) => {
         let uploadedFile = file;
         let photoName = generateRandomName(5, index + 1);
         var filename = uploadedFile.name;
         var ext = filename.substr(filename.lastIndexOf(".") + 1);
         let imagePath = `${__dirname}/app/archive/${photoName}.${ext}`;
         uploadedFiles.push(
            new Promise((resolve) => {
               uploadedFile.mv(imagePath, function (err) {
                  if (err) return res.status(500).send(err);
                  resolve({ imagePath: `archive/${photoName}.${ext}` });
               });
            })
         );
      });

      Promise.all(uploadedFiles).then((images) => {
         res.send({ images: images });
      });
   } else {
      let uploadedFile = req.files.files;
      let photoName = generateRandomName(5, 20);
      var filename = uploadedFile.name;
      var ext = filename.substr(filename.lastIndexOf(".") + 1);
      let imagePath = `${__dirname}/app/archive/${photoName}.${ext}`;
      uploadedFile.mv(imagePath, function (err) {
         if (err) return res.status(500).send(err);
         res.send({ imagePath: `archive/${photoName}.${ext}` });
      });
   }
});

app.get("/api/archive/:file", function (request, response) {
   let file = request.params.file;
   var extension = file.split(".").pop();
   var tempFile = `./app/archive/${file}`;

   fs.readFile(tempFile, function (err, data) {
      switch (extension) {
         case "jpg":
            contentType = "image/jpg";
            isImage = 1;
            break;
         case "png":
            contentType = "image/png";
            isImage = 1;
            break;
         case "jpeg":
            contentType = "image/jpeg";
            isImage = 1;
            break;
      }
      response.contentType(contentType);
      response.send(data);
   });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/archive.routes.js")(app);
require("./app/routes/archiveImage.routes.js")(app);
require("./app/routes/archiveSubject.routes.js")(app);
require("./app/routes/archiveType.routes.js")(app);
require("./app/routes/role.routes.js")(app);
require("./app/routes/yearStudy.routes.js")(app);
require("./app/routes/section.routes.js")(app);

app.listen(4100, () => {
   console.log("app listening on port 4100");
});
