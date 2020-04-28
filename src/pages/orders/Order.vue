<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказы" to="/orders" />
      <q-breadcrumbs-el :label="$route.params.key" />
    </q-breadcrumbs>

    <div class="row" v-if="order">
      <div class="col-12 col-sm-8">
        <div text-weigth-thing>Заказчик:</div>
        <p>
          <router-link :to="`/clients/${order.client._key}`">{{order.client.name}}</router-link>
        </p>
      </div>
    </div>

    <ProductForm v-bind:product="newProduct"></ProductForm>

    <div class="row">
      <div class="col-3 col-md-2">
        <q-btn color="primary" :disabled="addRowDisabled" label="Добавить" @click="addProduct" />
      </div>
    </div>

    <q-table
      title="Товары"
      :data="products"
      :columns="columns"
      :visible-columns="visibleСolumns"
      row-key="_key"
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
        <q-btn v-if="selected.length" class="q-ml-sm" label="Действие" />
      </template>
    </q-table>

    <q-dialog v-if="product" v-model="updateProductDialog">
      <q-card style="width: 700px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">Изменить товар</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="product.name" @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" label="Сохранить" v-close-popup />
          <q-space />
          <q-btn flat label="Отмена" v-close-popup />
          <q-space />
          <q-btn flat label="Удалить" @click.stop="deleteProduct" />
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
import { setNull } from "../../utils/setAll";
import ProductForm from "components/products/ProductForm";

export default {
  name: "PageOrder",
  components: { ProductForm },
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
      updateProductDialog: false,
      product: null,
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
        { name: "_key", label: "_key", field: "_key" },
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
      products: []
    };
  },
  computed: {
    addRowDisabled() {
      if (this.newProduct.tnved && this.newProduct.name) return false;
      else return true;
    },
    selectedKeys() {
      return this.selected.map(item => item.key);
    }
  },
  methods: {
    getOrder() {
      this.$axios
        .get(`/api/orders/${this.$route.params.key}`)
        .then(resp => {
          this.order = resp.data.order;
          this.products = resp.data.products;
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
        : `${this.selected.length} из ${this.products.length} выбрано`;
    },
    addProduct() {
      this.newProduct.order_id = this.order._id;
      this.$axios
        .post(`/api/products`, { createProductDto: this.newProduct })
        .then(resp => {
          this.newProduct._key = resp.data.product._key;
          this.products.unshift(Object.assign({}, this.newProduct));
          setNull(this.newProduct);
        })
        .catch(console.error);
    },
    deleteProduct() {
      if (confirm(`Подтвердить удаление товара?`)) {
        this.$axios
          .delete(`/api/products/${this.product._key}`)
          .then(resp => {
            const idx = this.products.findIndex(
              el => el._key === resp.data._key
            );
            this.products.splice(idx, 1);
            this.updateProductDialog = false;
          })
          .catch(console.error);
      }
    },
    rowClick(event, row) {
      this.product = row;
      this.updateProductDialog = true;
    }
  },
  created() {
    this.getOrder();
  }
};
</script>