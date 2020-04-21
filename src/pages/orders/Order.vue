<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказы" to="/orders" />
      <q-breadcrumbs-el :label="$route.params.key" />
    </q-breadcrumbs>

    <div class="row" v-if="order">
      <div class="col-12 col-sm-8">
        <!-- <q-input disabled filled v-model="order.client.name" label="Заказчик" /> -->
        <div text-weigth-thing>Заказчик:</div>
        <p>
          <router-link :to="`/clients/${order.client._key}`">{{order.client.name}}</router-link>
        </p>
      </div>
    </div>

    <div class="row">
      <div class="col-6 col-sm-2" style="padding: 2px;">
        <q-input filled v-model="newProduct.tnved" label="ТНВЭД" />
      </div>
      <div class="col-12 col-sm-8" style="padding: 2px;">
        <q-input filled v-model="newProduct.name" label="Наименование товара" />
      </div>
      <div class="col-6 col-sm-2" style="padding: 2px;">
        <q-select filled v-model="newProduct.packType" label="Упаковка" :options="packTypes" />
      </div>
      <div class="col-3 col-sm-2" style="padding: 2px;">
        <q-select filled v-model="newProduct.measure" label="Ед.изм" :options="units" />
      </div>
      <div class="col-3 col-sm-2" style="padding: 2px;">
        <q-input filled type="number" v-model="newProduct.seats" label="Мест" />
      </div>
      <div class="col-3 col-sm-2" style="padding: 2px;">
        <q-input filled type="number" v-model="newProduct.qty" label="Кол-во" />
      </div>
      <div class="col-3 col-sm-2" style="padding: 2px;">
        <q-input filled type="number" v-model="newProduct.wnetto" label="нетто" />
      </div>
      <div class="col-3 col-sm-2" style="padding: 2px;">
        <q-input filled type="number" v-model="newProduct.wbrutto" label="брутто" />
      </div>
      <div class="col-3 col-sm-2" style="padding: 2px;">
        <q-input filled type="number" v-model="newProduct.cvi" label="ИТС" />
      </div>
    </div>

    <div class="row">
      <div class="col-3 col-md-2">
        <q-btn color="primary" :disabled="addRowDisabled" label="Добавить" @click="addRow" />
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
      @row-click="rowClick"
    >
      <template v-slot:top>
        <div class="q-table__title">Товары</div>
        <q-space />

        <q-space />
        <q-btn v-if="selected.length" class="q-ml-sm" label="Удалить" @click="removeSelectedRows" />
      </template>
    </q-table>

    <q-dialog v-if="row" v-model="editRowDialog" persistent>
      <q-card style="width: 700px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">Изменить данные товара</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="row.name" @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Отмена" v-close-popup />
          <q-space />
          <q-btn flat label="Сохранить" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky v-if="order" position="top-right" :offset="[18, 18]">
      <q-fab icon="keyboard_arrow_down" direction="down" color="primary">
        <q-fab-action
          :to="`/orders/${order._key}/update`"
          color="secondary"
          icon="edit"
          label="Изменить"
        />
        <q-fab-action
          @click="deleteOrder()"
          color="negative"
          icon="delete_forever"
          label="Удалить"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: "PageOrder",
  data() {
    return {
      order: null,
      newProduct: {
        tnved: null,
        name: null,
        packType: null,
        measure: null,
        seats: null,
        qty: null,
        wnetto: null,
        wbrutto: null,
        cvi: null
      },
      editRowDialog: false,
      row: null,
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
          label: "ИТС",
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
    },
    packTypes() {
      return this.$store.state.packTypes;
    },
    units() {
      return this.$store.state.units;
    }
  },
  methods: {
    getOrder() {
      this.$axios
        .get(`/api/orders/${this.$route.params.key}`)
        .then(resp => {
          this.order = resp.data.order;
        })
        .catch(console.error);
    },
    deleteOrder() {
      if (confirm(`Подтвердить удаление заказа?`)) {
        this.$axios
          .delete(`/api/orders/${this.$route.params.key}`)
          .then(() => {
            this.$router.push("/orders");
          })
          .catch(console.error);
      }
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
    },
    rowClick(event, row) {
      this.row = row;
      this.editRowDialog = true;
    }
  },
  created() {
    this.getOrder();
  }
};
</script>