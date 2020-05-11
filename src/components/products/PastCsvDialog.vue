<template>
  <q-dialog v-model="thisDialog" maximized>
    <q-card style="max-width: 900px;">
      <q-card-section>
        <div class="text-h6">Вставить товары</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="pastCsv">
          <div class="row">
            <q-checkbox
              v-model="fromSpec"
              label="2 пустые колонки после Наименования"
            />
          </div>
          <div class="row">
            <div class="col-12">
              <q-input
                type="textarea"
                ref="cvsInput"
                outlined
                v-model="csv"
                label="Вставить CVS"
                required
                :rules="[
                  val =>
                    (val.length && val.length >= 30) || 'минимум 30 символов'
                ]"
              />
            </div>
          </div>
          <div class="row">
            <q-btn color="primary" label="Вставить" type="submit" />
            <q-space />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <!-- <q-btn type="submit" color="primary" label="Вставить" /> -->
        <q-space />
        <q-btn flat label="Отмена" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'PastCsvDialog',
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    order_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      csv: '',
      fromSpec: true
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
    pastCsv() {
      this.$axios
        .post(`/api/products/csv`, {
          fromSpec: this.fromSpec,
          order_id: this.order_id,
          csv: this.csv
        })
        .then(resp => {
          this.$router.go(0);
        })
        .catch(console.error);
    }
  }
};
</script>
