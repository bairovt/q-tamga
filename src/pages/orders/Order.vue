<template>
  <q-page padding class="q-gutter-md">
    <q-breadcrumbs>
      <q-breadcrumbs-el label="Заказы" to="/orders" />
      <q-breadcrumbs-el :label="$route.params.key" />
      <span v-if="order"> {{ order.status | orderStatus }}</span>
      <span v-if="order && order.status === 'TAKEN'">
        {{ takenCnt }}/{{ products.length }}
        <router-link :to="`/sklads/${order.takenOnStore._key}`">
          {{ order.takenOnStore.name }}
        </router-link>
      </span>
    </q-breadcrumbs>

    <div class="row" v-if="order">
      <div class="col-12 col-sm-8">
        <div>
          <span text-caption>Клиент: </span>
          <router-link :to="`/clients/${order.client._key}`">
            {{ order.client.name }}
          </router-link>
        </div>
        <div text-body2>{{ order.info }}</div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-sm-8">
        <q-btn
          dense
          flat
          color="primary"
          @click.stop="$root.$emit('open-create-nomen-dialog')"
        >
          Создать номенклатуру
        </q-btn>
      </div>
    </div>

    <q-form ref="newProductForm" @submit="addProduct">
      <NomenUseFields
        :disableFields="['tnved', 'measure']"
        @set-its="newProduct.its = $event"
      />
      <ProductFields :product="newProduct" :comment="comment"></ProductFields>
      <div class="row">
        <q-btn
          type="submit"
          color="primary"
          :disabled="!addProductEnabled"
          label="Добавить"
        />
        <q-space></q-space>
        <q-checkbox v-model="comment" label="Комментарий"></q-checkbox>
      </div>
    </q-form>

    <ProductsTable v-if="order" :order="order"></ProductsTable>

    <PastCsvDialog
      v-if="order"
      :dialog="pastCsvDialog"
      :order_id="order._id"
      @close-dialog="pastCsvDialog = false"
    />

    <TakeOnSkladDialog
      v-if="order"
      :dialog="takeOnSkladDialog"
      :order="order"
      @close-dialog="takeOnSkladDialog = false"
    />

    <q-page-sticky v-if="order" position="top-right" :offset="[18, 18]">
      <q-fab icon="keyboard_arrow_down" direction="down" color="primary">
        <q-fab-action
          @click="takeOnSkladDialog = true"
          color="secondary"
          label="Принять на склад"
        />
        <!-- icon="edit" -->
        <q-fab-action
          :to="`/orders/${order._key}/update`"
          color="secondary"
          icon="edit"
          label="Изменить"
        />
        <q-fab-action
          icon="add"
          label="CSV"
          color="info"
          @click.stop="pastCsvDialog = true"
        />
        <q-fab-action
          @click="deleteOrder()"
          color="warning"
          icon="delete_forever"
          label="Удалить"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import NomenUseFields from './cmps/NomenUseFields';
import NomenCrudFields from 'components/NomenCrudFields';
import ProductFields from 'components/ProductFields';
import PastCsvDialog from './cmps/PastCsvDialog';
import ProductsTable from 'components/ProductsTable';
import TakeOnSkladDialog from 'components/TakeOnSkladDialog';

export default {
  name: 'PageOrder',
  components: {
    NomenUseFields,
    NomenCrudFields,
    ProductFields,
    PastCsvDialog,
    ProductsTable,
    TakeOnSkladDialog
  },
  data() {
    return {
      order: null,
      newProduct: {
        pack: '',
        seats: 0,
        qty: 0,
        wnetto: 0,
        wbrutto: 0,
        its: 0,
        comment: ''
      },
      comment: false,
      newProductInitital: undefined,
      pastCsvDialog: false,
      takeOnSkladDialog: false
    };
  },
  computed: {
    products() {
      return this.$store.state.orderProducts;
    },
    takenCnt() {
      const taken = this.products.filter(product => product.taken);
      return taken.length;
    },
    nomen() {
      return this.$store.state.sharedNomen;
    },
    addProductEnabled() {
      if (this.nomen.tnved && this.nomen.name && this.nomen.measure) {
        return true;
      } else return false;
    }
  },
  methods: {
    getOrder() {
      this.$axios
        .get(`/api/orders/${this.$route.params.key}`)
        .then(resp => {
          this.order = resp.data.order;
          this.$store.commit('setOrderProducts', resp.data.products);
        })
        .catch(console.error);
    },
    deleteOrder() {
      if (this.products.length) {
        this.$q.notify({
          message: 'Сначала удалите товары из заказа',
          color: 'warning'
        });
      } else if (confirm(`Подтвердить удаление заказа?`)) {
        this.$axios
          .delete(`/api/orders/${this.$route.params.key}`)
          .then(() => {
            this.$router.push('/orders');
          })
          .catch(console.error);
      }
    },
    addProduct() {
      const createProductDto = {
        order_id: this.order._id,
        client_id: this.order.client_id,
        nomen_id: this.nomen._id,
        ...this.newProduct
      };
      this.$axios
        .post(`/api/products`, {
          createProductDto
        })
        .then(resp => {
          this.newProduct._key = resp.data.product._key;
          this.$store.commit('addToOrderProducts', {
            ...this.nomen,
            ...this.newProduct
          });
          this.newProduct = { ...this.newProductInitital };
          this.$refs.newProductForm.reset();
          this.$store.commit('initSharedNomen');
        })
        .catch(console.error);
    }
  },
  created() {
    this.getOrder();
    this.newProductInitital = { ...this.newProduct };
  }
};
</script>
