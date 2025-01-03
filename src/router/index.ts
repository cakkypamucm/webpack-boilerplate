import { createRouter, createWebHistory } from "vue-router";
import supportedBrowsersRE from "src/helpers/supported-browsers-regexp";
import RouteIndex from "src/pages/index.vue";

const createRoute = (path: string) => () => import(/* webpackChunkName: "[request]" */ `src/pages/${path}.vue`);
const isBrowserSupported = () => supportedBrowsersRE.test(navigator.userAgent);
const routeNames = {
    index: "index",
    browserIsNotSupported: "browser-is-not-supported"
};

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: routeNames.index,
            component: RouteIndex
        },
        {
            path: "/browser-is-not-supported",
            name: routeNames.browserIsNotSupported,
            component: createRoute("browser-is-not-supported"),
            beforeEnter: () => (isBrowserSupported() ? { name: routeNames.index, replace: true } : true)
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: createRoute("not-found")
        }
    ]
});

router.beforeEach((to) => {
    return !isBrowserSupported() && to.name !== routeNames.browserIsNotSupported
        ? { name: routeNames.browserIsNotSupported, replace: true }
        : true;
});

export default router;
