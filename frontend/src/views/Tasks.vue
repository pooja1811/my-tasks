<template>
  <div>
    <v-row class="ml-4 mr-4">
      <v-col cols="11">
        <div class="mt-5 mb-5 display-1">
          <span class="headTextColor mr-1 font-weight-bold"> Tasks List </span>
        </div>
      </v-col>
      <v-col cols="1">
        <div class="d-flex mt-5 mb-5 mr-5 justify-center">
          <v-btn
            rounded
            large
            color="secondary"
            dark
            @click="(selectedTask = null), (showAddEditModel = true)"
          >
            Add a Task
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="ml-4 mr-4">
      <v-col cols="12" v-if="sortedTasksList.length === 0">
        <div>
          <v-alert
            color="primary"
            dark
            icon="mdi-alert-circle"
            border="left"
            prominent
          >
            No tasks for you. Please add a Task.
          </v-alert>
        </div>
      </v-col>

      <v-col cols="12" v-else>
        <v-simple-table fixed-header height="70vh" width="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" id="task_name_header">Task Name</th>
                <th class="text-left" id="task_id_priority_header">Priority</th>
                <th class="text-left" id="task_id_date_header">Date</th>
                <th class="text-left" id="task_id_date_header">Category</th>
                <th class="text-left" id="task_actions_header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in sortedTasksList" :key="task.id">
                <td>{{ task.name }}</td>
                <td>{{ priority[task.priority] }}</td>
                <td>{{ task.date }}</td>
                <td>
                  <v-chip
                    class="ma-2"
                    :color="task.category.color"
                    text-color="white"
                  >
                    {{ task.category.text }}
                  </v-chip>
                </td>
                <td>
                  <v-icon color="teal darken-2" @click="editTask(task)">
                    mdi-circle-edit-outline
                  </v-icon>
                  <v-icon
                    color="red darken-2"
                    class="ml-2"
                    @click="(showDeleteDialog = true), (taskToBeDeleted = task)"
                  >
                    mdi-delete
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <delete-confirmation
      v-if="showDeleteDialog"
      module="tasks"
      @submit="deleteTask"
      @cancel="(showDeleteDialog = false), (taskToBeDeleted = null)"
    />
    <add-edit-task
      v-if="showAddEditModel"
      :selectedTaskId="selectedTask"
      @close-model="(selectedTask = null), (showAddEditModel = false)"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import DeleteConfirmation from "../components/common/DeleteConfirmation.vue";
import AddEditTask from "../components/tasks/AddEditTask.vue";

export default {
  name: "Tasks",

  components: {
    DeleteConfirmation,
    AddEditTask,
  },

  data() {
    return {
      showAddEditModel: false,
      selectedTask: null,
      changeModel: 0,
      showDeleteDialog: false,
      taskToBeDeleted: null,
      priority: {
        1: "High",
        2: "Medium",
        3: "Low",
      },
    };
  },

  computed: {
    ...mapState("users", ["userDetails"]),
    ...mapGetters("tasks", ["sortedTasksList"]),
  },

  created() {
    this.getAllTasks(this.userDetails.$loki);
  },

  methods: {
    ...mapActions("tasks", ["getAllTasks", "removeTask"]),
    editTask(taskDetails) {
      this.showAddEditModel = true;
      this.selectedTask = taskDetails.$loki;
    },

    async deleteTask() {
      await this.removeTask({
        taskId: this.taskToBeDeleted.$loki,
        userId: this.userDetails.$loki,
      });
      this.taskToBeDeleted = null;
      this.showDeleteDialog = false;
    },
  },
};
</script>
