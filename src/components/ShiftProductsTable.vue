<template>
  <div>
    <q-table
      title="Товары"
      :data="products"
      :columns="columns"
      :visible-columns="visibleColumns"
      row-key="_key"
      separator="cell"
      :pagination.sync="pagination"
    >
      <template v-slot:top>
        <div class="q-table__title">Товары</div>
        <q-space />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="tnved" :props="props">
            {{ props.row.tnved }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="pack" :props="props">
            {{ props.row.pack }}
          </q-td>
          <q-td key="measure" :props="props">
            {{ props.row.measure }}
          </q-td>
          <q-td key="seats" :props="props">
            {{ props.row.seats }}
            <q-popup-edit v-model="props.row.seats" buttons>
              <q-input
                type="number"
                v-model="props.row.seats"
                dense
                autofocus
              />
            </q-popup-edit>
          </q-td>
          <q-td key="qty" :props="props">
            {{ props.row.qty }}
            <q-popup-edit v-model="props.row.qty" buttons>
              <q-input type="number" v-model="props.row.qty" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="wnetto" :props="props">
            {{ props.row.wnetto }}
          </q-td>
          <q-td key="wbrutto" :props="props">
            {{ props.row.wbrutto }}
          </q-td>
          <q-td key="its" :props="props"> ${{ props.row.its }} </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'ShiftProductsTable',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  components: {},
  data() {
    return {
      // products: this.products,
      product: null,
      selected: [],
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      },
      shiftToBundleDialog: false,
      visibleColumns: [
        'tnved',
        'name',
        'pack',
        'measure',
        'seats',
        'qty',
        'wnetto',
        'wbrutto',
        'its'
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
  }
};
</script>
