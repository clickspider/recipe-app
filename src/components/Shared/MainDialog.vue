<template>
  <v-row justify="center">
    <v-dialog v-model="dialog.isActive" persistent max-width="600px">
      <form-edit v-if="dialog.mode === 'edit'" />
      <form-create v-if="dialog.mode === 'create'" />
      <card-confirm v-if="dialog.mode === 'deleteRecipe'" />
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import FormEdit from "../Recipe/Forms/FormEdit.vue";
import FormCreate from "../Recipe/Forms/FormCreate.vue";
import CardConfirm from "../Recipe/Cards/CardConfirm.vue";

export default {
  name: "Dialog",
  components: {
    FormEdit,
    FormCreate,
    CardConfirm
  },
  computed: {
    ...mapGetters(["dialog"])
  }
};
</script>

<style lang="scss">
.right-2 {
  right: 55px !important;
}
</style>
