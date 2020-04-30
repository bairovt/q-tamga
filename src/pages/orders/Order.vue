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
          <router-link :to="`/clients/${order.client._key}`">{{
            order.client.name
          }}</router-link>
        </p>
      </div>
    </div>

    <q-form ref="newProductForm" @submit="addProduct">
      <ProductForm v-bind:product="newProduct"></ProductForm>

      <div class="row">
        <div class="col-3 col-md-2">
          <q-btn
            type="submit"
            color="primary"
            :disabled="addProductDisabled"
            label="Добавить"
          />
        </div>
      </div>
    </q-form>

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

    <q-dialog v-if="theProduct" v-model="productDialog" maximized>
      <!-- <q-card style="width: 700px; max-width: 900vw;"> -->
      <q-card style="max-width: 900px;">
        <q-card-section>
          <div class="text-h6">Изменить товар</div>
        </q-card-section>

        <q-card-section class="q-pa-none">
          <q-form ref="updateProductForm" @submit="updateProduct">
            <ProductForm
              v-bind:product="theProduct"
              ref="productFormInDialog"
            ></ProductForm>
            <div class="row">
              <q-space />
              <q-btn color="primary" label="Сохранить" type="submit" />
              <q-space />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Отмена" v-close-popup />
          <q-space />
          <q-btn flat label="Удалить" @click.stop="deleteProduct()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky v-if="order" position="top-right" :offset="[18, 18]">
      <q-fab icon="keyboard_arrow_down" direction="down" color="secondary">
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
import ProductForm from "components/products/ProductForm";

export default {
  name: "PageOrder",
  components: { ProductForm },
  data() {
    return {
      order: null,
      newProduct: {
        tnved: "",
        name: "",
        packType: "",
        measure: "",
        seats: 0,
        qty: 0,
        wnetto: 0,
        wbrutto: 0,
        cvi: 0
      },
      newProductInitital: undefined,
      productDialog: false,
      theProduct: null,
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
    addProductDisabled() {
      if (
        this.newProduct.tnved &&
        this.newProduct.name &&
        this.newProduct.measure
      )
        return false;
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
          this.newProduct = { ...this.newProductInitital };
          this.$refs.newProductForm.reset();
        })
        .catch(console.error);
    },
    updateProduct() {
      this.$axios
        .put(`/api/products/${this.theProduct._key}`, {
          updateProductDto: this.theProduct
        })
        .then(resp => {
          const idx = this.products.findIndex(
            el => el._key === this.theProduct._key
          );
          // this.products[idx] = this.theProduct; // is not reactive due to reactivity model of Vue
          this.$set(this.products, idx, this.theProduct);
          this.productDialog = false;
        })
        .catch(console.error);
    },
    deleteProduct() {
      if (confirm(`Подтвердить удаление товара?`)) {
        this.$axios
          .delete(`/api/products/${this.theProduct._key}`)
          .then(resp => {
            const idx = this.products.findIndex(
              el => el._key === this.theProduct._key
            );
            this.products.splice(idx, 1);
            this.productDialog = false;
          })
          .catch(console.error);
      }
    },
    rowClick(event, row) {
      this.theProduct = { ...row };
      this.productDialog = true;
    }
  },
  created() {
    this.getOrder();
    this.newProductInitital = { ...this.newProduct };
  }
};
</script>
