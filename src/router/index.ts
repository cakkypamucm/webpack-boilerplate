import { createRouter, createWebHistory } from "vue-router";
import supportedBrowsersRE from "@/utils/supported-browsers-regexp";

const createRoute = (path: string) => async () => import(/* webpackChunkName: "[request]" */ `@/pages/${path}.vue`);
const isBrowserSupported = () => supportedBrowsersRE.test(navigator.userAgent);
const routeNames = {
    main: "main",
    browserIsNotSupported: "browser-is-not-supported"
};

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: routeNames.main,
            component: createRoute("main")
        },
        {
            path: "/browser-is-not-supported",
            name: routeNames.browserIsNotSupported,
            component: createRoute("browser-is-not-supported"),
            beforeEnter: () => (isBrowserSupported() ? { name: routeNames.main, replace: true } : true)
        },
        {
            path: "/:pathMatch(.*)*",
            name: "not-found",
            component: createRoute("not-found")
        }
    ]
});

// eslint-disable-next-line sonarjs/function-return-type
router.beforeEach((to) => {
    return !isBrowserSupported() && to.name !== routeNames.browserIsNotSupported
        ? { name: routeNames.browserIsNotSupported, replace: true }
        : true;
});

export default router;
