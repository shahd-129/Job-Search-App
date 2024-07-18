import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // cb(null, `${Date.now()}${(file.originalname)}`);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Resume must be a PDF"), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: { fileSize: 1024 * 1024 * 5 }
});
