import { makeAutoObservable } from "mobx"
import { useRouterStore } from "mobx-state-router";
import RootStore from "./Index";

export class RouterStoreWrapper {
    rootStore: RootStore;
    routerStore = useRouterStore();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            // Observables

            // Computed

            // Actions
        });
    }

    goToMealOverview(options?: {
        [key: string]: any;
    }) {
        this.routerStore.goTo("mealOverview", options);
    }
}