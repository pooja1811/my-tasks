export default {
  categorizeTask(taskDate) {
    let todayDate = new Date().toISOString().slice(0, 10);
    if (taskDate == todayDate) {
      return { color: "primary", text: "Today's task" };
    }
    if (taskDate < todayDate) {
      return { color: "red", text: "Overdue" };
    }
    return { color: "orange", text: "Upcoming" };
  },
};
