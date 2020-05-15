<template>
  <q-dialog v-model="thisDialog" maximized>
    <q-card style="max-width: 900px;">
      <q-card-section>
        <div class="text-h6">CSV формат</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <div class="row">
          <q-checkbox
            v-model="fromSpec"
            label="2 пустые колонки после Наименования"
          />
        </div>
        <div class="row">
          <div class="col-12">
            <q-input type="textarea" v-model="csv" outlined disabled />
          </div>
        </div>
        <div class="row">
          <q-btn color="primary" label="Скопировать" @click="copyToClipboard" />
          <q-space />
          <q-btn
            label="Экспорт CSV"
            color="primary"
            icon="archive"
            @click="export2Csv"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-space />
        <q-btn flat label="Отмена" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { copyToClipboard, exportFile } from 'quasar';

export default {
  name: 'Export2CsvDialog',
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    visibleColumns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      fromSpec: true,
      csv: ''
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
    convert2Csv() {
      let csvText = '';
      this.products.forEach(product => {
        for (const col of this.visibleColumns) {
          if (col !== 'priceNetto') {
            let columnVal = product[col];
            if (col === 'name' && this.fromSpec) {
              columnVal += '\t\t';
            }
            if (columnVal === null || columnVal === undefined) {
              columnVal = '';
            }
            if (col === 'wnetto' || col === 'wbrutto' || col === 'its') {
              columnVal = `${columnVal}`.replace(/\./, ',');
            }
            csvText = csvText + columnVal + '\t';
          }
        }
        csvText = csvText.replace(/\t$/, '\r\n');
      });
      this.csv = csvText;
    },
    copyToClipboard() {
      copyToClipboard(this.csv)
        .then(() => {
          this.$q.notify({
            color: 'info',
            position: 'top',
            message: 'Скопировано в буфер'
          });
        })
        .catch(console.error);
    },
    export2Csv() {
      const status = exportFile('products.csv', this.csv, 'text/csv');
    }
  },
  watch: {
    fromSpec() {
      this.convert2Csv();
    }
  },
  mounted() {
    this.convert2Csv();
  }
};
</script>
