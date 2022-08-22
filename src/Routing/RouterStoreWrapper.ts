import { action, computed, makeAutoObservable, observable } from "mobx";
import { useRouterStore } from "mobx-state-router";
import RootStore from "../Stores/RootStore";

export class RouterStoreWrapper {
    rootStore: RootStore;
    routerStore = useRouterStore();

    pageName: string = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

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

    setPageName = (name: string) => {
        this.pageName = name;
    };

    goToLogin(options?: { [key: string]: any }) {
        console.log("goToLogin");
        this.routerStore.goTo("login", options);
        this.rootStore.uiStore.setShowSideBar(false);
    }

    goToHomePage(options?: { [key: string]: any }) {
        this.routerStore.goTo("homePage", options);
        this.routerStore.goTo("home", options);
        this.rootStore.uiStore.setShowSideBar(true);
    }

    goToMealsPage(options?: { [key: string]: any }) {
        console.log("goToMealsPage");
        this.routerStore.goTo("mealsPage", options);
        this.rootStore.uiStore.setShowSideBar(true);
    }

    goToTagsPage(options?: { [key: string]: any }) {
        console.log("goToTagsPage");
        this.routerStore.goTo("tagsPage", options);
        this.rootStore.uiStore.setShowSideBar(true);
    }
}
