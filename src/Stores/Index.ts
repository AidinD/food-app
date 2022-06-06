import { UserStore } from "./UserStore";
import { MealStore } from "./MealStore";
import { RouterStoreWrapper } from "./RouterStoreWrapper";

export default class RootStore {
    routerStore: RouterStoreWrapper;
    userStore: UserStore;
    mealStore: MealStore;

    constructor() {
        this.routerStore = new RouterStoreWrapper(this);
        this.userStore = new UserStore(this);
        this.mealStore = new MealStore(this);
    }
}