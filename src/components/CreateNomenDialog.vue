<template>
  <q-dialog
    :value="dialog"
    @input="$root.$emit('close-create-nomen-dialog')"
    maximized
  >
    <q-card style="max-width: 900px;">
      <q-card-section>
        <div class="text-h6">
          Создать номенклатуру
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <NomenCrudFields v-if="nomen" :nomen="nomen"></NomenCrudFields>
          <div class="row">
            <q-btn label="Создать" color="primary" type="submit" />
            <q-space />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-space />
        <q-btn flat label="Отмена" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import NomenCrudFields from 'components/NomenCrudFields';

export default {
  name: 'CreateNomenDialog',
  components: { NomenCrudFields },
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      nomen: {
        ...this.$store.state.initialNomen
      }
    };
  },
  computed: {
    nomenSearch() {
      return this.$store.state.nomenSearch;
    }
  },
  watch: {
    nomenSearch() {
      this.nomen.name = this.nomenSearch;
    }
  },
  methods: {
    onSubmit() {
      this.$axios
        .post(`/api/nomenclature`, {
          createNomenDto: this.nomen
        })
        .then(resp => {
          this.$store.commit('setSharedNomen', resp.data.nomen);
          this.$root.$emit('close-create-nomen-dialog');
        })
        .catch(console.error);
    }
  }
};
</script>
