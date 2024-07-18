import Company from "../../DB/Models/Company/Company.model.js";
import Job from "../../DB/Models/Job/job.model.js";
import { catchAysncErrorr } from "../../Utils/ErrorHandling.js";


// to create company api
export const addCompany = catchAysncErrorr(async (req, res) => {
  const {
    companyName,
    description,
    industry,
    companyEmail,
    address,
    numberOfEmployees,
    companyHR,
  } = req.body;

  const createCompany = await Company.create({
    companyName,
    description,
    industry,
    companyEmail,
    address,
    numberOfEmployees,
    companyHR,
  });
  res.json({ message: "Company Created Successfully", createCompany });
});

// to update company
export const updateCompany = catchAysncErrorr(async (req, res) => {
  const { companyName, companyEmail, numberOfEmployees } = req.body;
  const update = await Company.updateOne({
    companyName,
    companyEmail,
    numberOfEmployees,
  });
  res.json({ message: "Updated Successfully", update });
});

// to delete company
export const deleteCompany = catchAysncErrorr(async (req, res) => {
  const companyDelete = await Company.deleteOne();
  res.json({ message: "Account Deleted Successfully", companyDelete });
});

// to search company
export const searchCompany = catchAysncErrorr(async (req, res) => {
  const { companyName } = req.query;
  const company = await Company.findOne({ companyName });

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }
  res.json({ message: "Company found successfully", company });
});

// to get company data by id and token
export const getSpecificJob = catchAysncErrorr(async (req, res) => {
  const { companyId } = req.params;

  const company = await Company.findById(companyId);

  if (!company) {
    return res.status(404).json({ message: "Company not found" });
  }

  const jobs = await Job.find({ addedBy: company._id });

  res.json({ message: "Company data fetched successfully", company, jobs });
});

