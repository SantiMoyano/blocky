import { combineReducers } from "@reduxjs/toolkit";
import registerSlice from "../redux/auth/registerSlice";
import loginSlice from "../redux/auth/loginSlice";
import projectSlices from "../redux/projects/projectSlices";
import projectSlice from "../redux/projects/projectSlice";
import epicsSlice from "../redux/epics/epicsSlice";
import epicDetailSlice from "../redux/epics/epicDetailSlice";
import tasksSlice from "../redux/tasks/tasksSlice";
import taskDetailSlice from "../redux/tasks/taskDetailSlice";
import subtasksSlice from "../redux/subtasks/subtasksSlice";
import createProjectSlice from "../redux/projects/createProjectSlice";
import createEpicSlice from "../redux/epics/createEpicSlice";
import categoriesSlice from "../redux/categories/categoriesSlice";
import createTaskSlice from "../redux/tasks/createTaskSlice";
import createSubtaskSlice from "../redux/subtasks/createSubtaskSlice";
import updateSubtaskSlice from "../redux/subtasks/updateSubtaskSlice";
import updateTaskSlice from "../redux/tasks/updateTaskSlice";
import updateEpicSlice from "../redux/epics/updateEpicSlice";
import updateProjectSlice from "../redux/projects/updateProjectSlice";
import deleteSubtaskSlice from "../redux/subtasks/deleteSubtaskSlice";

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
  tasks: tasksSlice,
  task: taskDetailSlice,
  createTask: createTaskSlice,
  updateTask: updateTaskSlice,
  subtasks: subtasksSlice,
  createSubtask: createSubtaskSlice,
  updateSubtask: updateSubtaskSlice,
  deleteSubtask: deleteSubtaskSlice,
  categories: categoriesSlice,
});

export default rootSlices;
