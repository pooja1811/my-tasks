import common from "../../../common/util.js";

export const getters = {
  sortedTasksList: ({ myTasks }) => {
    return myTasks
      .map((item) => ({ ...item, category: common.categorizeTask(item.date) }))
      .sort((a, b) => a.priority - b.priority);
  },
};
