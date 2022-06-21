import { makeAutoObservable, observable, computed, action } from "mobx";
import { Meal } from "../Types/Meal";
import RootStore from "./RootStore";

export class MealStore {
    rootStore: RootStore;
    meals: Meal[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            // Observables
            meals: observable,

            // Computed
            allMeals: computed,

            // Actions
            addMeal: action,
        });
    }

    get allMeals() {
        return this.meals;
    }

    addMeal = (meal: Meal) => {
        this.meals.push(meal);
    };
}
