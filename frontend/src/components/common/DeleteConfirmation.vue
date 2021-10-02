<template>
  <div>
    <v-dialog width="500" persistent :value="true">
      <v-card>
        <v-card-title class="title">
          Are you sure you want to delete {{ module }} ?
        </v-card-title>
        <v-card-actions no-gutters justify-end>
          <div class="pt-2 pb-2 pl-2 pr-2">
            <v-btn color="info" @click="$emit('submit')"> Yes </v-btn>
            <v-btn color="secondary ml-2" @click="$emit('cancel')"> No </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "DeleteConfirmation",
  props: {
    module: { type: String, required: true },
  },
};
</script>
