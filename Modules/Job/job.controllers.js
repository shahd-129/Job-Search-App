import App from "../../DB/Models/App/app.model.js";
import Company from "../../DB/Models/Company/Company.model.js";
import Job from "../../DB/Models/Job/job.model.js";
import { catchAysncErrorr } from "../../Utils/ErrorHandling.js";



// to create job
export const addJob = catchAysncErrorr(async (req, res) => {
  const {
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
    addedBy,
  } = req.body;
  const createJob = await Job.create({
    jobTitle,
    jobLocation,
    workingTime,
    seniorityLevel,
    jobDescription,
    technicalSkills,
    softSkills,
    addedBy,
  });
  console.log(jobTitle, jobDescription);
  res.json({ message: "job Created Successfully", createJob });
});

// to update job
export const updateJob = catchAysncErrorr(async (req, res) => {
  const { seniorityLevel, workingTime, jobLocation } = req.body;
  const jobupdate = await Job.updateOne({
    seniorityLevel,
    workingTime,
    jobLocation,
  });
  res.json({ message: "Updated Successfully", jobupdate });
});

// to delete job
export const deleteJob = catchAysncErrorr(async (req, res) => {
  const jobDelete = await Job.deleteOne();
  res.json({ message: "Job Deleted Successfully", jobDelete });
});

// to get information about job and allow to user and HR
export const getInformationJob = catchAysncErrorr(async (req, res) => {
  const jobData = await Job.findOne();
  res.json({ message: "Get Job Data Successfully", jobData });
});

// to search companyName about job
export const getSearch = catchAysncErrorr(async (req, res) => {
  const { companyName } = req.query;
  const company = await Company.findOne({ companyName });

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  const jobs = await Job.find({ addedBy: company.companyHR });

  res.json({ message: "Jobs fetched successfully", jobs });
});

// to fillter job search (user , HR)
export const filterJob = catchAysncErrorr( async (req, res) => {
 
    const { workingTime, jobLocation, seniorityLevel, jobTitle, technicalSkills } = req.query;
    const filter = {};

    if (workingTime) filter.workingTime = workingTime;
    if (jobLocation) filter.jobLocation = jobLocation;
    if (seniorityLevel) filter.seniorityLevel = seniorityLevel;
    if (jobTitle) filter.jobTitle = jobTitle;
    if (technicalSkills) filter.technicalSkills = { $in: technicalSkills.split(',') };

    const jobs = await Job.find(filter);

    res.json({ message: 'Jobs fetched successfully', jobs });
  });


  