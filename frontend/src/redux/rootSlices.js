import { combineReducers } from "@reduxjs/toolkit";
import registerSlice from "./auth/registerSlice";
import loginSlice from "./auth/loginSlice";
import projectSlices from "./projects/projectSlices";
import projectSlice from "./projects/projectSlice";
import epicsSlice from "./epics/epicsSlice";
import epicDetailSlice from "./epics/epicDetailSlice";
import tasksSlice from "./tasks/tasksSlice";
import taskDetailSlice from "./tasks/taskDetailSlice";
import subtasksSlice from "./subtasks/subtasksSlice";
import createProjectSlice from "./projects/createProjectSlice";
import createEpicSlice from "./epics/createEpicSlice";
import categoriesSlice from "./categories/categoriesSlice";

const rootSlices = combineReducers({
  register: registerSlice,
  login: loginSlice,
  projects: projectSlices,
  project: projectSlice,
  createProject: createProjectSlice,
  epics: epicsSlice,
  epic: epicDetailSlice,
  createEpic: createEpicSlice,
  tasks: tasksSlice,
  task: taskDetailSlice,
  subtasks: subtasksSlice,
  categories: categoriesSlice,
});

export default rootSlices;
