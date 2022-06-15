import { runInAction } from "mobx";
import {
    browserHistory,
    createRouterState,
    HistoryAdapter,
    RouterStore,
} from "mobx-state-router";

const notFound = createRouterState("notFound");

export const routes = [
    {
        name: "home",
        pattern: "/",
    },
    {
        name: "mealOverview",
        pattern: "/mealoverview/",
    },
    {
        name: "meal",
        pattern: "/meal/:id",
    },
    {
        name: "notFound",
        pattern: "/not-found",
    },
];

export function initRouter() {
    return runInAction(() => {
        const routerStore = new RouterStore(routes, notFound);

        // Observe history changes
        const historyAdapter = new HistoryAdapter(routerStore, browserHistory);
        historyAdapter.observeRouterStateChanges();

        return routerStore;
    });
}
