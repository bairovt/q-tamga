// import Store from '../store';
import MainLayout from 'layouts/MainLayout.vue';
import Clients from 'pages/clients/Clients.vue';
import CreateClient from 'pages/clients/CreateClient.vue';
import UpdateClient from 'pages/clients/UpdateClient.vue';
import Client from 'pages/clients/Client.vue';
import Orders from 'pages/orders/Orders.vue';
import CreateOrder from 'pages/orders/CreateOrder.vue';
import UpdateOrder from 'pages/orders/UpdateOrder.vue';
import Order from 'pages/orders/Order.vue';
import Products from 'pages/products/Products.vue';
import Nomens from 'pages/nomenclature/Nomens.vue';
import Sklads from 'pages/sklads/Sklads.vue';
import Sklad from 'pages/sklads/Sklad.vue';
import Bundles from 'pages/bundles/Bundles.vue';
import Bundle from 'pages/bundles/Bundle.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue')
  },
  {
    path: '/clients',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Clients
      },
      {
        path: 'create',
        component: CreateClient
      },
      {
        path: ':key/update',
        component: UpdateClient
      },
      {
        path: ':key',
        component: Client
      }
    ]
  },
  {
    path: '/orders',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Orders
      },
      {
        path: 'create',
        component: CreateOrder
      },
      {
        path: ':key/update',
        component: UpdateOrder
      },
      {
        path: ':key',
        component: Order
      }
    ]
  },
  {
    path: '/bundles',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Bundles
      },
      {
        path: ':key',
        component: Bundle
      }
    ]
  },
  {
    path: '/products',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Products
      }
    ]
  },
  {
    path: '/nomenclature',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Nomens
      }
    ]
  },
  {
    path: '/sklads',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Sklads
      },
      {
        path: ':key',
        component: Sklad
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
