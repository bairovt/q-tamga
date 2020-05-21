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
              @click="export2CsvDialog = true"
            >
              <q-item-section avatar>
                <q-icon color="info" name="archive" />
              </q-item-section>
              <q-item-section>
                <q-item-label>В CSV формат</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              class="bg-orange-2"
              clickable
              v-close-popup
              @click="deleteProducts"
            >
              <q-item-section avatar>
                <q-icon color="warning" name="delete_forever" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Удалить</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </template>
    </q-table>

    <Export2CsvDialog
      v-if="export2CsvDialog"
      :dialog="export2CsvDialog"
      :products="products"
      :visibleColumns="visibleColumns"
      @close-dialog="export2CsvDialog = false"
    ></Export2CsvDialog>

    <q-dialog v-if="product" v-model="productDialog" maximized>
      <!-- <q-card style="width: 700px; max-width: 900vw;"> -->
      <q-card style="max-width: 900px;">
        <q-card-section class="q-pa-sm">
          <div class="text-h6">
            Изменить товар <small>{{ product._key }}</small>
          </div>
        </q-card-section>

        <q-card-section class="q-pl-none q-pr-none q-mt-none q-pt-none">
          <q-form ref="updateProductForm" @submit="updateProduct">
            <NomenCrudFields
              :nomen="product"
              :disableFields="['name', 'tnved', 'measure']"
            ></NomenCrudFields>
            <ProductFields
              ref="productFormInDialog"
              :product="product"
              :comment="true"
            ></ProductFields>
            <div class="row">
              <q-btn
                class="row q-ml-sm"
                color="primary"
                label="Сохранить"
                type="submit"
              />
              <q-space />
              <q-btn
                flat
                label="Удалить"
                color="warning"
                @click.stop="deleteProduct()"
              />
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-space />
          <q-btn flat label="Отмена" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import NomenCrudFields from 'components/NomenCrudFields';
import ProductFields from 'components/ProductFields';
import Export2CsvDialog from 'components/Export2CsvDialog';
import NomenDialog from 'components/NomenDialog';

export default {
  name: 'ProductsTable',
  components: {
    NomenCrudFields,
    ProductFields,
    Export2CsvDialog
  },
  data() {
    return {
      productDialog: false,
      export2CsvDialog: false,
      product: null,
      selected: [],
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      },
      visibleColumns: [
        'tnved',
        'name',
        'packType',
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
          name: 'packType',
          label: 'Тип упаковки',
          align: 'center',
          field: 'packType'
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
      return this.$store.state.orderProducts;
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
    updateProduct() {
      this.$axios
        .put(`/api/products/${this.product._key}`, {
          updateProductDto: this.product
        })
        .then(resp => {
          const idx = this.products.findIndex(
            el => el._key === this.product._key
          );
          this.$store.commit('setItemOrderProducts', {
            idx,
            product: this.product
          });
          this.productDialog = false;
        })
        .catch(console.error);
    },
    deleteProduct() {
      if (confirm(`Подтвердить удаление товара?`)) {
        this.$axios
          .delete(`/api/products/${this.product._key}`)
          .then(resp => {
            const idx = this.products.findIndex(
              el => el._key === this.product._key
            );
            this.products.splice(idx, 1);
            this.productDialog = false;
          })
          .catch(console.error);
      }
    },
    deleteProducts() {
      if (+prompt('Подтвердить кол-во удаления:') === this.selected.length) {
        this.$axios
          .delete('/api/products', {
            data: {
              productKeys: this.selectedKeys
            }
          })
          .then(resp => {
            this.$router.go(0);
          })
          .catch(console.error);
      }
    },
    rowClick(event, row) {
      this.product = { ...row };
      this.productDialog = true;
    }
  }
};
</script>
