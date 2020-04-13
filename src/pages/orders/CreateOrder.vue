<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказы" to="/orders" />
      <q-breadcrumbs-el label="Создать" />
    </q-breadcrumbs>

    <div class="row" v-if="client">
      <div class="col-6">
        <q-input disabled filled v-model="client.name" label="Заказчик" />
      </div>
    </div>

    <q-table
      title="Товары"
      :data="tableData"
      :columns="columns"
      :visible-columns="visibleСolumns"
      row-key="key"
      separator="cell"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
    >
      <template v-slot:top>
        <div class="q-table__title">Товары</div>
        <q-space />
        <q-btn color="primary" :disabled="addRowDisabled" label="Добавить" @click="addRow" />
        <q-space />
        <q-btn
          class="q-ml-sm"
          :disabled="!selected.length"
          label="Удалить"
          @click="removeSelectedRows"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  name: "PageCreateOrder",
  data() {
    return {
      client: null,
      order: null,
      selected: [],
      visibleСolumns: [
        "tnved",
        "name",
        "packType",
        "measure",
        "seats",
        "qty",
        "wnetto",
        "wbrutto",
        "cvi",
        "priceNetto"
      ],
      columns: [
        { name: "key", label: "key", field: "key" },
        {
          name: "tnved",
          required: true,
          align: "left",
          label: "ТНВЭД",
          field: "tnved",
          sortable: true
        },
        {
          name: "name",
          required: true,
          label: "Наименование товара",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "packType",
          label: "Тип упаковки",
          align: "center",
          field: "packType"
        },
        {
          name: "measure",
          label: "Ед. изм",
          align: "center",
          field: "measure"
        },
        {
          name: "seats",
          label: "Кол-во мест",
          align: "center",
          field: "seats"
        },
        { name: "qty", label: "Кол-во шт", align: "center", field: "qty" },
        {
          name: "wnetto",
          label: "Вес нетто",
          align: "center",
          field: "wnetto"
        },
        {
          name: "wbrutto",
          label: "Вес брутто",
          align: "center",
          field: "wbrutto"
        },
        {
          name: "cvi",
          label: "итс",
          align: "right",
          field: "cvi",
          format: val => "$" + val,
          sortable: true
        },
        {
          name: "priceNetto",
          label: "Цена нетто",
          align: "right",
          field: row => {
            const price = (row.wnetto * row.cvi) / row.qty;
            return isNaN(price) ? 0 : price;
          },
          format: val => "$" + val,
          sortable: true
        }
      ],
      tableData: [
        {
          key: 1,
          tnved: "9401530000",
          name: "МЕБЕЛЬ ДЛЯ СИДЕНИЯ ИЗ РОТАНГА (ДИВАН)",
          packType: "44", // Мешок полиэтиленовый
          measure: "шт",
          seats: 1,
          qty: 1,
          wnetto: 31,
          wbrutto: 32,
          cvi: 4.5
        },
        {
          key: 2,
          tnved: "9401530000",
          name: "МЕБЕЛЬ ДЛЯ СИДЕНИЯ ИЗ РОТАНГА (КРЕСЛО)",
          packType: "44", // Мешок полиэтиленовый
          measure: "шт",
          seats: 1,
          qty: 2,
          wnetto: 14,
          wbrutto: 15,
          cvi: 4.5
        }
      ]
    };
  },
  computed: {
    addRowDisabled() {
      if (this.tableData.length === 0) return false;
      return this.tableData[0].tnved === "" || this.tableData[0].name === "";
    },
    selectedKeys() {
      return this.selected.map(item => item.key);
    }
  },
  methods: {
    createOrder() {
      this.$axios
        .post("/api/orders", { createOrdertDto: this.order })
        .then(resp => {
          this.$router.back();
        })
        .catch(console.error);
    },
    onReset() {
      this.$router.back();
    },
    getClient() {
      this.$axios
        .get(`/api/clients/${this.$route.query.client_key}`)
        .then(resp => {
          this.client = resp.data.client;
        })
        .catch(console.error);
    },
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} из ${this.tableData.length} выбрано`;
    },
    addRow() {
      this.tableData.unshift({
        key: 0,
        tnved: "0000",
        name: "",
        packType: "", // Мешок полиэтиленовый
        measure: "",
        seats: 0,
        qty: 0,
        wnetto: 0,
        wbrutto: 0,
        cvi: 0
      });
    },
    removeSelectedRows() {
      // todo: remove from db
      this.tableData = this.tableData.filter(row => {
        return !this.selectedKeys.includes(row.key);
      });
      this.selected = [];
    }
  },
  created() {
    this.getClient();
  }
};
</script>
