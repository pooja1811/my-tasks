import axios from "../../../axios";
import toast from "../../../plugins/mini-toastr";

export const actions = {
  async checkUserDetails({ commit }, details) {
    try {
      let userDetails = await axios.post("/api/users", details);
      commit("setUserDetails", userDetails);
    } catch (error) {
      toast.error("Error in login");
    }
  },
};
