import categoriesSlice from "../redux/categories/categoriesSlice";
import { combineReducers } from "@reduxjs/toolkit";
import createEpicSlice from "../redux/epics/createEpicSlice";
import createFeatureSlice from "../redux/features/createFeatureSlice";
import createProjectSlice from "../redux/projects/createProjectSlice";
import createTaskSlice from "../redux/tasks/createTaskSlice";
import deleteTaskSlice from "../redux/tasks/deleteTaskSlice";
import epicDetailSlice from "../redux/epics/epicDetailSlice";
import epicsSlice from "../redux/epics/epicsSlice";
import featureDetailSlice from "../redux/features/featureDetailSlice";
import featuresSlice from "../redux/features/featuresSlice";
import loginSlice from "../redux/auth/loginSlice";
import projectSlice from "../redux/projects/projectSlice";
import projectSlices from "../redux/projects/projectSlices";
import registerSlice from "../redux/auth/registerSlice";
import tasksSlice from "../redux/tasks/tasksSlice";
import updateEpicSlice from "../redux/epics/updateEpicSlice";
import updateFeatureSlice from "../redux/features/updateFeatureSlice";
import updateProjectSlice from "../redux/projects/updateProjectSlice";
import updateTaskSlice from "../redux/tasks/updateTaskSlice";

const rootSlices = combineReducers({
  register: registerSlice,
  login: loginSlice,
  projects: projectSlices,
  project: projectSlice,
  createProject: createProjectSlice,
  updateProject: updateProjectSlice,
  epics: epicsSlice,
  epic: epicDetailSlice,
  createEpic: createEpicSlice,
  updateEpic: updateEpicSlice,
  features: featuresSlice,
  feature: featureDetailSlice,
  createFeature: createFeatureSlice,
  updateFeature: updateFeatureSlice,
  tasks: tasksSlice,
  createTask: createTaskSlice,
  updateTask: updateTaskSlice,
  deleteTask: deleteTaskSlice,
  categories: categoriesSlice,
});

export default rootSlices;
