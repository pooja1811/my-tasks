import common from "../../../common/util.js";

export const mutations = {
  setAllTasks(state, taskDetails) {
    state.myTasks = taskDetails;
  },

  setSelectedTaskDetails(state, taskDetails) {
    state.taskDetails = {
      ...taskDetails,
      category: common.categorizeTask(taskDetails.date),
    };
  },
};
