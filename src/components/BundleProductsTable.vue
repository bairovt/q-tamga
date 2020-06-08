<template>
  <div>
    <q-table
      title="Товары"
      :data="products"
      :columns="columns"
      :visible-columns="visibleColumns"
      row-key="_key"
      separator="cell"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      @row-click="rowClick"
      :pagination.sync="pagination"
    >
      <template v-slot:top>
        <div class="q-table__title">Товары</div>
        <q-space />

        <q-space />
        <q-btn-dropdown
          :disabled="!selected.length"
          color="info"
          :label="`Действия (${selected.length})`"
        >
          <q-list>
            <q-item
              class="bg-blue-grey-2"
              clickable
              v-close-popup
              @click="shiftToSkladDialog = true"
            >
              <q-item-section avatar>
                <q-icon color="info" name="store" />
              </q-item-section>
              <q-item-section>
                <q-item-label>На склад</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-table>

    <ShiftToSkladDialog
      v-if="shiftToSkladDialog"
      :dialog="shiftToSkladDialog"
      :selected="selected"
      @close-dialog="shiftToSkladDialog = false"
    ></ShiftToSkladDialog>
  </div>
</template>

<script>
import ShiftToSkladDialog from 'components/ShiftToSkladDialog';

export default {
  name: 'BundleProductsTable',
  components: {
    ShiftToSkladDialog
  },
  data() {
    return {
      product: null,
      selected: [],
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      },
      shiftToSkladDialog: false,
      visibleColumns: [
        'tnved',
        'name',
        'pack',
        'measure',
        'seats',
        'qty',
        'wnetto',
        'wbrutto',
        'its',
        'priceNetto'
      ],
      columns: [
        { name: '_key', label: '_key', field: '_key' },
        {
          name: 'tnved',
          required: true,
          align: 'left',
          label: 'ТНВЭД',
          field: 'tnved',
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Наименование товара',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'pack',
          label: 'Тип упаковки',
          align: 'center',
          field: 'pack'
        },
        {
          name: 'measure',
          label: 'Ед. изм',
          align: 'center',
          field: 'measure'
        },
        {
          name: 'seats',
          label: 'Кол. мест',
          align: 'center',
          field: 'seats'
        },
        { name: 'qty', label: 'Кол. шт', align: 'center', field: 'qty' },
        {
          name: 'wnetto',
          label: 'Вес нетто',
          align: 'center',
          field: 'wnetto'
        },
        {
          name: 'wbrutto',
          label: 'Вес брутто',
          align: 'center',
          field: 'wbrutto'
        },
        {
          name: 'its',
          label: 'ИТС',
          align: 'center',
          field: 'its',
          format: val => '$' + val.toFixed(2),
          sortable: true
        },
        {
          name: 'priceNetto',
          label: 'Цена нетто',
          align: 'center',
          field: row => {
            const price = (row.wnetto * row.its) / row.qty || 0; // NaN is false
            return Math.ceil(price * 100) / 100; // round to higher
          },
          format: val => '$' + val.toFixed(2),
          sortable: true
        }
      ]
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    selectedKeys() {
      return this.selected.map(item => item._key);
    }
  },
  methods: {
    getSelectedString() {
      return this.selected.length === 0
        ? ''
        : `${this.selected.length} из ${this.products.length} выбрано`;
    },
    rowClick(event, row) {
      this.product = { ...row };
      this.productDialog = true;
    }
  }
};
</script>
