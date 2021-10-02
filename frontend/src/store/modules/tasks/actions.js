// import axios from "../../../axios";
import toast from "../../../plugins/mini-toastr";

export const actions = {
  async getAllTasks({ commit }, userId) {
    try {
      console.log("in tasks userId", userId);
      //   const data = await axios.get(`/api/tasks/all/${userId}`);
      let data = [
        { id: 1, name: "task-1", priority: 1, date: "2021-09-20" },
        { id: 2, name: "task-2", priority: 2, date: "2021-09-21" },
        { id: 3, name: "task-3", priority: 3, date: "2021-09-22" },
        { id: 4, name: "task-4", priority: 1, date: "2021-09-23" },
        { id: 5, name: "task-5", priority: 2, date: "2021-09-24" },
        { id: 6, name: "task-6", priority: 3, date: "2021-09-25" },
        { id: 7, name: "task-7", priority: 1, date: "2021-09-26" },
        { id: 8, name: "task-8", priority: 2, date: "2021-09-27" },
        { id: 9, name: "task-9", priority: 3, date: "2021-10-01" },
        { id: 10, name: "task-10", priority: 1, date: "2021-10-02" },
        { id: 11, name: "task-11", priority: 2, date: "2021-10-03" },
        { id: 12, name: "task-12", priority: 3, date: "2021-10-04" },
        { id: 13, name: "task-13", priority: 1, date: "2021-10-05" },
        { id: 14, name: "task-14", priority: 2, date: "2021-10-06" },
        { id: 15, name: "task-15", priority: 3, date: "2021-10-07" },
        { id: 16, name: "task-16", priority: 1, date: "2021-10-08" },
        { id: 17, name: "task-17", priority: 2, date: "2021-10-09" },
        { id: 18, name: "task-18", priority: 3, date: "2021-10-10" },
        { id: 19, name: "task-19", priority: 1, date: "2021-10-11" },
        { id: 20, name: "task-20", priority: 2, date: "2021-10-12" },
        { id: 21, name: "task-21", priority: 3, date: "2021-10-13" },
      ];
      //   let data = [];
      commit("setAllTasks", data);
    } catch (error) {
      toast.error("Error in fetching Task");
    }
  },

  async getSelectedTaskDetails({ commit }, taskId) {
    try {
      console.log("getSelectedTaskDetails taskId", taskId);
      // const data = await axios.get(`/api/tasks/${taskId}`);
      let data = [{ id: 1, name: "task-1", priority: 1, date: "2021-09-20" }];
      commit("setSelectedTaskDetails", data[0]);
    } catch (error) {
      toast.error("Error in fetching Card");
    }
  },

  async addTask({ dispatch, commit }, { taskData, userId }) {
    try {
      console.log("taskData addTask", taskData);
      //   await axios.post("/api/tasks", taskData);
      toast.success("Task added successfully");
      commit("setSelectedTaskDetails", {});
      dispatch("getAllTasks", userId);
    } catch (error) {
      toast.error("Error in adding task");
    }
  },

  async editTask({ dispatch, commit }, { taskData, userId }) {
    try {
      let { id } = taskData;
      console.log("id editTask", id);
      delete taskData.id;
      //   await axios.put(`/api/tasks/${id}`, taskData);
      toast.success("Task updated successfully");
      commit("setSelectedTaskDetails", {});
      dispatch("getAllTasks", userId);
    } catch (error) {
      toast.error("Error in updating task");
    }
  },

  async removeTask({ dispatch }, { taskId, userId }) {
    try {
      console.log("taskId removeTask", taskId);
      //   await axios.delete(`/api/tasks/${taskId}`);
      toast.success("Task removed successfully");
      dispatch("getAllTasks", userId);
    } catch (error) {
      toast.error("Error in Removing task");
    }
  },
};
