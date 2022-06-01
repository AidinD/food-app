import { UserStore } from "./UserStore";
import { MealStore } from "./MealStore";

export default class RootStore {
    userStore: UserStore;
    mealStore: MealStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.mealStore = new MealStore(this);
    }
}