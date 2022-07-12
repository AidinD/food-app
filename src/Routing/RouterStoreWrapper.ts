import { makeAutoObservable } from "mobx";
import { useRouterStore } from "mobx-state-router";
import RootStore from "../Stores/RootStore";

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

    goToLogin(options?: { [key: string]: any }) {
        this.routerStore.goTo("home", options);
    }

    goToMealsPage(options?: { [key: string]: any }) {
        this.routerStore.goTo("mealsPage", options);
    }
}
