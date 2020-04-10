import Store from "../store";
import MainLayout from "layouts/MainLayout.vue"
import Clients from "pages/Clients.vue"
import ClientsCreate from "pages/ClientsCreate.vue"
import Orders from "pages/Orders.vue"
import Bundles from "pages/Bundles.vue"
import Products from "pages/Products.vue"

const routes = [{
    path: "/",
    component: MainLayout,
    children: [{
      path: "",
      component: () => import("pages/Index.vue")
    }]
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    // beforeEnter: (to, from, next) => {  
    //   if (Store.state.user) {
    //     alert(Store.state.user.name)
    //     // Store.dispatch('logOut');
    //   }
    //   next();
    // }
  },
  {
    path: "/clients",
    component: MainLayout,
    children: [{
      path: "",
      component: Clients
    }, {
      path: "create",
      component: ClientsCreate
    }]
  },
  {
    path: "/orders",
    component: MainLayout,
    children: [{
      path: "",
      component: Orders
    }]
  },
  {
    path: "/bundles",
    component: MainLayout,
    children: [{
      path: "",
      component: Bundles
    }]
  },
  {
    path: "/products",
    component: MainLayout,
    children: [{
      path: "",
      component: Products
    }]
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
