import Store from "../store";

const routes = [{
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
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
    path: "/products",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/Products.vue")
    }]
  },
  {
    path: "/orders",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/Orders.vue")
    }]
  },
  {
    path: "/bundles",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/Bundles.vue")
    }]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
