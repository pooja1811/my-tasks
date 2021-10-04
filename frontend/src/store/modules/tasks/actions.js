import axios from "../../../axios";
import toast from "../../../plugins/mini-toastr";

export const actions = {
  async getAllTasks({ commit }, userId) {
    try {
      const data = await axios.get(`/api/tasks/all/${userId}`);
      commit("setAllTasks", data);
    } catch (error) {
      toast.error("Error in fetching Task");
    }
  },

  async getSelectedTaskDetails({ commit }, taskId) {
    try {
      const data = await axios.get(`/api/tasks/${taskId}`);
      commit("setSelectedTaskDetails", data[0]);
    } catch (error) {
      toast.error("Error in fetching Card");
    }
  },

  async addTask({ dispatch, commit }, { taskData, userId }) {
    try {
      await axios.post("/api/tasks", taskData);
      toast.success("Task added successfully");
      commit("setSelectedTaskDetails", {});
      dispatch("getAllTasks", userId);
    } catch (error) {
      toast.error("Error in adding task");
    }
  },

  async editTask({ dispatch, commit }, { taskData, userId }) {
    try {
      let taskId = taskData.$loki;
      delete taskData.$loki;
      await axios.put(`/api/tasks/${taskId}`, taskData);
      toast.success("Task updated successfully");
      commit("setSelectedTaskDetails", {});
      dispatch("getAllTasks", userId);
    } catch (error) {
      toast.error("Error in updating task");
    }
  },

  async removeTask({ dispatch }, { taskId, userId }) {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      toast.success("Task removed successfully");
      dispatch("getAllTasks", userId);
    } catch (error) {
      toast.error("Error in Removing task");
    }
  },
};
