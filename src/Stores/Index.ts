import { MealStore } from "./MealStore";

export default class RootStore {
    mealStore: MealStore;

    constructor() {
        this.mealStore = new MealStore(this);
    }
}