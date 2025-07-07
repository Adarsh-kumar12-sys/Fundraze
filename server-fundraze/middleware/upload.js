const multer = require("multer");
const os = require("os");
const path = require("path");

// Save files temporarily on disk
const storage = multer.diskStorage({
  destination: os.tmpdir(), // or './uploads' if you want a permanent location
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
