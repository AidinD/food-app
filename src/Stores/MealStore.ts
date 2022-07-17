import { makeAutoObservable, observable, computed, action } from "mobx";
import { Meal, MealResponse } from "../Types/Meal";
import RootStore from "./RootStore";
import { UiStore } from "./UiStore";
import configData from "../Config/config.json";
import { ResponseJson } from "../Types/Shared";
import { showNotification } from "../Utils/Notification";
import { MapFromMealResponseToMeal } from "../Types/MealMapper";

export class MealStore {
    rootStore: RootStore;
    uiStore: UiStore;

    meals: Meal[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.uiStore = rootStore.uiStore;

        makeAutoObservable(this, {
            // Observables
            meals: observable,

            // Computed
            allMeals: computed,

            // Actions
            addMeal: action,
            loadMeals: action,
        });
    }

    get allMeals() {
        return this.meals;
    }

    addMeal = (meal: Meal) => {
        this.meals.push(meal);
    };

    loadMeals = async () => {
        this.uiStore.setIsLoading(true);

        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "meals",
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                this.meals = (dataJson.data as MealResponse[]).map(
                    (mealResponse) => MapFromMealResponseToMeal(mealResponse)
                );
            } else throw new Error(dataJson.data.message);
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
        } finally {
            this.uiStore.setIsLoading(false);
        }
    };
}
