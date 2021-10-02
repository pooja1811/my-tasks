<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" class="mt-5">
        <v-img
          :src="require('../assets/my-tasks.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to My Tasks</h1>
      </v-col>
    </v-row>
    <v-form v-model="valid" ref="form">
      <v-card max-width="374" class="mx-auto">
        <v-row class="text-center">
          <v-col>
            <span class="display-6 font-weight-bold mb-4">
              SIGN IN OR SIGN UP
            </span>
          </v-col>
        </v-row>
        <v-card-text>
          <v-text-field
            v-model="emailId"
            color="blue-grey lighten-2"
            label="Email Id"
            :rules="[validateEmailId]"
            required
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions no-gutters justify-end>
          <div class="mx-auto mb-2">
            <v-btn color="info" :disabled="!valid" @click="submit">
              Log In
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Login",

  data() {
    return {
      emailId: "",
      valid: false,
    };
  },

  computed: {},

  created() {},

  methods: {
    ...mapActions("users", ["checkUserDetails"]),
    ...mapMutations("users", ["setUserDetails"]),

    validateEmailId() {
      const re =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      return re.test(String(this.emailId).toLowerCase());
    },

    async submit() {
      await this.checkUserDetails(this.emailId);
      this.$router.push({
        name: "Tasks",
      });
    },
  },
};
</script>
