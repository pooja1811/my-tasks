<template>
  <v-dialog :value="true" width="1000" persistent>
    <v-form v-model="valid" ref="form">
      <v-card color="#f7fafc">
        <v-card-title class="title">
          {{ selectedTaskId ? "Edit Task" : "Add Task" }}
          <v-chip
            v-if="selectedTaskId"
            class="ma-2"
            :color="taskDetails.category.color"
            text-color="white"
          >
            {{ taskDetails.category.text }}
          </v-chip>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="taskDetails.name"
            color="blue-grey lighten-2"
            label="Title"
            :rules="[(v) => (v || '').length > 0 || 'This field is required']"
            required
          />

          <v-row>
            <v-col cols="12" md="6">
              <v-select
                v-model="taskDetails.priority"
                color="blue-grey lighten-2"
                :items="priority"
                item-text="name"
                item-value="value"
                label="Priority"
                :rules="[(v) => !!v || 'This field is required']"
                clearable
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="taskDetails.date"
                    label="Select deadline"
                    prepend-icon="mdi-calendar"
                    :rules="[
                      (v) => (v || '').length > 0 || 'This field is required',
                    ]"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="taskDetails.date"
                  :min="nowDate"
                  class="mt-4"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions no-gutters justify-end>
          <div class="pt-2 pb-2 pl-2 pr-2">
            <v-btn color="info" :disabled="!valid" @click="submit">
              Submit
            </v-btn>

            <v-btn
              class="ml-2"
              color="secondary"
              @click="setSelectedTaskDetails({}), $emit('close-model')"
            >
              Cancel
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "AddEditTAsk",

  props: {
    selectedTaskId: { type: Number, default: null },
  },

  data() {
    return {
      valid: false,
      menu: false,
      nowDate: new Date().toISOString().slice(0, 10),
      priority: [
        { name: "High", value: 1 },
        { name: "Medium", value: 2 },
        { name: "Low", value: 3 },
      ],
    };
  },

  computed: {
    ...mapState("users", ["userDetails"]),
    ...mapState("tasks", ["taskDetails"]),
  },

  created() {
    if (this.selectedTaskId) {
      this.getSelectedTaskDetails(this.selectedTaskId);
    }
  },

  methods: {
    ...mapActions("tasks", ["getSelectedTaskDetails", "editTask", "addTask"]),
    ...mapMutations("tasks", ["setSelectedTaskDetails"]),

    submit() {
      let taskData = {
        ...this.taskDetails,
        createdBy: this.userDetails.$loki,
      };
      if (this.selectedTaskId) {
        this.editTask({
          userId: this.userDetails.$loki,
          taskData,
        });
      } else {
        this.addTask({
          userId: this.userDetails.$loki,
          taskData,
        });
      }
      this.$emit("close-model");
    },
  },
};
</script>
