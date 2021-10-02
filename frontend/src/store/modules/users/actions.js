// import axios from "../../../axios";
import toast from "../../../plugins/mini-toastr";

export const actions = {
  async checkUserDetails({ commit }, userDetails) {
    try {
      // await axios.post("/api/users", userDetails);
      // toast.success("User Added successfully");
      commit("setUserDetails", userDetails);
    } catch (error) {
      toast.error("Error in fetching workflows");
    }
  },
};
