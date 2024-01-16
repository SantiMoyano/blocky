import { combineReducers } from "@reduxjs/toolkit";
import registerSlice from "./auth/registerSlice";
import loginSlice from "./auth/loginSlice";
import projectSlices from "./projects/projectSlices";
import projectSlice from "./projects/projectSlice";
import epicsSlice from "./epics/epicsSlice";
import epicDetailSlice from "./epics/epicDetailSlice";
import tasksSlice from "./tasks/tasksSlice";
import taskDetailSlice from "./tasks/taskDetailSlice";

const rootSlices = combineReducers({
  register: registerSlice,
  login: loginSlice,
  projects: projectSlices,
  project: projectSlice,
  epics: epicsSlice,
  epic: epicDetailSlice,
  tasks: tasksSlice,
  task: taskDetailSlice,
});

export default rootSlices;
