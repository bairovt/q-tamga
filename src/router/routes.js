import Store from "../store";
import MainLayout from "layouts/MainLayout.vue"
import Clients from "pages/clients/Clients.vue"
import CreateClient from "pages/clients/CreateClient.vue"
import UpdateClient from "pages/clients/UpdateClient.vue"
import Client from "pages/clients/Client.vue"
import Orders from "pages/orders/Orders.vue"
import CreateOrder from "pages/orders/CreateOrder.vue"
import Bundles from "pages/bundles/Bundles.vue"
import Products from "pages/products/Products.vue"
import Stores from "pages/stores/Stores.vue"

const routes = [{
  path: "/",
  component: MainLayout,
  children: [{
    path: "",
    component: () => import("pages/Index.vue")
  }]
}, {
  path: "/login",
  component: () => import("layouts/LoginLayout.vue"),
  // beforeEnter: (to, from, next) => {  
  //   if (Store.state.user) {
  //     alert(Store.state.user.name)
  //     // Store.dispatch('logOut');
  //   }
  //   next();
  // }
}, {
  path: "/clients",
  component: MainLayout,
  children: [{
    path: "",
    component: Clients
  }, {
    path: "create",
    component: CreateClient
  }, {
    path: ":key/update",
    component: UpdateClient
  }, {
    path: ":key",
    component: Client
  }]
}, {
  path: "/orders",
  component: MainLayout,
  children: [{
    path: "",
    component: Orders
  }, {
    path: "create",
    component: CreateOrder
  }]
}, {
  path: "/bundles",
  component: MainLayout,
  children: [{
    path: "",
    component: Bundles
  }]
}, {
  path: "/products",
  component: MainLayout,
  children: [{
    path: "",
    component: Products
  }]
}, {
  path: "/stores",
  component: MainLayout,
  children: [{
    path: "",
    component: Stores
  }]
}];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
