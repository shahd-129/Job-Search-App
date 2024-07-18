import { mongoose } from "mongoose";

const appSchema = new mongoose.Schema({
  
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userTechSkills: { type: [String], required: true },
  userSoftSkills: { type: [String], required: true },
  userResume: { type: String, required: true }
});

const App = mongoose.model("app", appSchema);

export default App;
