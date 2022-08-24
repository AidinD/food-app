import { action, computed, makeAutoObservable, observable } from "mobx";
import { useRouterStore } from "mobx-state-router";
import RootStore from "../Stores/RootStore";
import { RouteNames } from "../Types/Shared";

export class RouterStoreWrapper {
    rootStore: RootStore;
    routerStore = useRouterStore();

    pageName: RouteNames = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.pageName = this.currentRoute?.name as RouteNames;

        makeAutoObservable(this, {
            // Observables
            pageName: observable,
            // Computed
            currentRoute: computed,
            // Actions
            setPageName: action,
        });
    }

    get currentRoute() {
        return this.routerStore.getCurrentRoute();
    }

    setPageName = (name: RouteNames) => {
        this.pageName = name;
    };

    goToLogin(options?: { [key: string]: any }) {
        console.log("goToLogin");
        this.routerStore.goTo("login", options);
        this.rootStore.uiStore.setShowSideBar(false);
    }

    goToHomePage(options?: { [key: string]: any }) {
        this.routerStore.goTo("home", options);
        this.routerStore.goTo("home", options);
        this.rootStore.uiStore.setShowSideBar(true);
    }

    goToMealsPage(options?: { [key: string]: any }) {
        console.log("goToMealsPage");
        this.routerStore.goTo("meals", options);
        this.rootStore.uiStore.setShowSideBar(true);
    }

    goToTagsPage(options?: { [key: string]: any }) {
        console.log("goToTagsPage");
        this.routerStore.goTo("tags", options);
        this.rootStore.uiStore.setShowSideBar(true);
    }
}
