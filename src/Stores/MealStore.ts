import { makeAutoObservable, runInAction, reaction, observable, computed, action } from "mobx"
import { Meal } from "../Types/Meal";
import RootStore from "./Index";

export class MealStore {
    rootStore: RootStore;
    meals: Meal[] = [];
    isLoading: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            // Observables
            meals: observable,
            isLoading: observable,

            // Computed
            allMeals: computed,

            // Actions
            addMeal: action,
        });

        this.addFakeMeals();
    }

    get allMeals() {
        return this.meals;
    }

    addMeal(meal: Meal) {
        this.meals.push(meal);
    }

    addFakeMeals() {
        this.addMeal({
            id: 1,
            name: "Meal 1",
            description: "Description 1",
            tags: [{
                id: 1,
                name: "Tag 1"
            }],
            recipe: {
                id: 1,
                ingredients: [],
                description: "Description 1",
            },
            lastMade: new Date(),
            image: "image"
        });

        this.addMeal({
            id: 2,
            name: "Meal 2",
            description: "Description 2",
            tags: [{
                id: 2,
                name: "Tag 2"
            }],
            recipe: {
                id: 2,
                ingredients: [],
                description: "Description 2",
            },
            lastMade: new Date(),
            image: "image"
        });
    }
}