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

        for (let i = 0; i < 10; i++) {
            this.addMeal({
                id: i,
                name: "Meal" + i,
                description: "Description" + i,
                tags: [
                    { id: 1, name: "Tag 1", color: "red" },
                    { id: 2, name: "Tag 2", color: "blue" },
                    { id: 3, name: "Tag 3", color: "green" },
                ],
                recipe: "Recipe 1",
                image: i === 3 ? "https://loremflickr.com/320/340/food" : "",
                lastMade: new Date(),
            });
        }
    }

    get allMeals() {
        return this.meals;
    }

    addMeal = (meal: Meal) => {
        this.meals.push(meal);
    };
}
