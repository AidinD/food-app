import {
    makeAutoObservable,
    observable,
    computed,
    action,
    runInAction,
} from "mobx";
import { Meal, MealResponse } from "../Types/Meal";
import RootStore from "./RootStore";
import { UiStore } from "./UiStore";
import configData from "../Config/config.json";
import { ResponseJson } from "../Types/Shared";
import { showNotification } from "../Utils/Notification";
import {
    MapFromMealResponseToMeal,
    MapFromMealToMealDTO,
} from "../Types/MealMapper";
import { UserStore } from "./UserStore";

export class MealStore {
    rootStore: RootStore;
    uiStore: UiStore;
    userStore: UserStore;

    meals: Meal[] = [];
    mealsFiltered: Meal[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.uiStore = rootStore.uiStore;
        this.userStore = rootStore.userStore;

        makeAutoObservable(this, {
            // Observables
            meals: observable,
            mealsFiltered: observable,

            // Computed

            // Actions
            setFilteredMeals: action,
            addMeal: action,
            loadMeals: action,
        });
    }

    get allMeals() {
        return this.meals;
    }

    get filteredMeals() {
        return this.mealsFiltered;
    }

    setFilteredMeals = (meals: Meal[]) => {
        this.mealsFiltered = meals.sort((a, b) => a.name.localeCompare(b.name));
    };

    textFilterMeals = (filter: string) => {
        this.setFilteredMeals([
            ...this.meals.filter((meal) => {
                return meal.name.toLowerCase().includes(filter.toLowerCase());
            }),
        ]);
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
                runInAction(() => {
                    this.meals = (dataJson.data as MealResponse[]).map(
                        (mealResponse) =>
                            MapFromMealResponseToMeal(mealResponse)
                    );
                });
            } else throw new Error(dataJson.data.message);
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
        } finally {
            this.uiStore.setIsLoading(false);
            this.setFilteredMeals([...this.meals]);
        }
    };

    addMeal = async (meal: Meal): Promise<boolean> => {
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(
                MapFromMealToMealDTO(meal, this.userStore.currentUser!.id)
            ),
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "meal",
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                showNotification(
                    "Success",
                    "Meal was successfully added",
                    "success",
                    3
                );
                this.uiStore.setShowAddMealModal(false);
                return Promise.resolve(true);
            } else throw new Error(dataJson.data.message);
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
            return Promise.resolve(false);
        } finally {
            this.uiStore.setIsLoading(false);
            this.loadMeals();
        }
    };
}
