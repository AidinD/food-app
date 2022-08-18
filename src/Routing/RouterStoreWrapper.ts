import { computed, makeAutoObservable } from "mobx";
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
            currentRoute: computed,
            // Actions
        });
    }

    get currentRoute() {
        return this.routerStore.getCurrentRoute();
    }

    goToLogin(options?: { [key: string]: any }) {
        console.log("goToLogin");
        this.routerStore.goTo("home", options);
        this.rootStore.uiStore.setShowSideBar(false);
    }

    goToMealsPage(options?: { [key: string]: any }) {
        console.log("goToMealsPage");
        this.routerStore.goTo("mealsPage", options);
        this.rootStore.uiStore.setShowSideBar(true);
    }
}
