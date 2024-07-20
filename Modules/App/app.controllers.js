import App from "../../DB/Models/App/app.model.js";
import { catchAysncErrorr } from "../../Utils/ErrorHandling.js";

export const uploadeFile = catchAysncErrorr(async (req, res) => {
  const { jobId, userTechSkills, userSoftSkills } = req.body;

  if (!req.file) {
    return res
      .status(400)
      .json({ message: "Resume is required and must be a PDF" });
  }

  const application = new App({
    jobId,
    userId: req.user.userId,
    userTechSkills,
    userSoftSkills,
    userResume: req.file.path,
  });
  await application.save();

  res
    .status(201)
    .json({ message: "Application submitted successfully", application });
  console.log(req.body);
});

export const getApp = catchAysncErrorr(async (req, res) => {
  const { jobId } = req.params;

  const applications = await App.find({ jobId }).populate(
    "userId",
    "name email technicalSkills softSkills"
  );

  res.status(200).json({ applications });
});
