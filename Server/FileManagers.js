const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = path.parse(file.originalname).name;
    const fileName = uniqueSuffix + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
module.exports.storage = storage;
module.exports.upload = upload;
