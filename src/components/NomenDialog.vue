<template>
  <q-dialog v-model="thisDialog" maximized>
    <q-card style="max-width: 900px;">
      <q-card-section>
        <div class="text-h6">
          <span v-if="action === 'create'">Создать</span>
          <span v-else>Изменить</span> Номенклатуру
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <NomenCrudFields :nomen="nomen"></NomenCrudFields>
          <div class="row">
            <q-btn color="primary" label="Сохранить" type="submit" />
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
import NomenCrudFields from './NomenCrudFields';

export default {
  name: 'NomenDialog',
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    nomen: { type: Object },
    action: {
      validator: function(value) {
        return ['create', 'update'].indexOf(value) !== -1;
      }
    }
  },
  components: { NomenCrudFields },
  data() {
    return {
      nomenInitial: null
    };
  },
  computed: {
    thisDialog: {
      get() {
        return this.dialog;
      },
      set() {
        this.$emit('close-dialog');
      }
    }
  },
  methods: {
    onSubmit() {
      if (this.action === 'create') {
        this.axios
          .post(`/api/nomenclature`, {
            nomen
          })
          .then(resp => {
            this.nomen = resp.data.nomen;
          })
          .catch(console.error);
      } else if (this.action === 'update') {
        this.axios
          .put(`/api/nomenclature`, {
            nomen
          })
          .then(resp => {
            this.nomen = resp.data.nomen;
          })
          .catch(console.error);
      }
    }
  },
  mounted() {
    this.nomenInitial = { ...this.nomen };
  }
};
</script>
