import { makeAutoObservable, observable, action, runInAction } from "mobx";
import { Meal, MealForm, MealResponse, Tag } from "../Types/Meal";
import RootStore from "./RootStore";
import { UiStore } from "./UiStore";
import configData from "../Config/config.json";
import { ResponseJson } from "../Types/Shared";
import { showNotification } from "../Utils/Notification";
import {
    MapFromMealResponseToMeal,
    MapFromMealFormToMealDTO,
    MapFromMealToMealUpdateDTO,
} from "../Types/MealMapper";
import { UserStore } from "./UserStore";

export class MealStore {
    rootStore: RootStore;
    uiStore: UiStore;
    userStore: UserStore;

    meals: Meal[] = [];
    mealsFiltered: Meal[] = [];
    selectedMeal: Meal | undefined = undefined;
    tags: Tag[] = [];

    textFilter: string = "";
    tagFilter: number[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.uiStore = rootStore.uiStore;
        this.userStore = rootStore.userStore;

        makeAutoObservable(this, {
            // Observables
            meals: observable,
            mealsFiltered: observable,
            selectedMeal: observable,
            tags: observable,
            textFilter: observable,
            tagFilter: observable,

            // Computed

            // Actions
            setFilteredMeals: action,
            setSelectedMeal: action,
            setTags: action,
            addMeal: action,
            loadMeals: action,
            loadTags: action,
            setTextFilter: action,
        });
    }

    get allMeals() {
        return this.meals;
    }

    get allTags() {
        return this.tags;
    }

    get filteredMeals() {
        return this.mealsFiltered;
    }

    setFilteredMeals = (meals: Meal[]) => {
        this.mealsFiltered = meals.sort((a, b) => a.name.localeCompare(b.name));
    };

    setSelectedMeal = (meal: Meal | undefined) => {
        this.selectedMeal = meal;
    };

    setTags = (tags: Tag[]) => {
        this.tags = tags;
    };

    setTextFilter = (text: string) => {
        this.textFilter = text;
    };

    setTagFilter = (tagIds: number[]) => {
        this.tagFilter = tagIds;
    };

    filterMeals = () => {
        const tagFilterMeals: Meal[] = this.meals.filter((meal) => {
            return this.tagFilter.every((tagId) => {
                return meal.tags.some((tag) => tag.id === tagId);
            });
        });

        const textFilterMeals = tagFilterMeals.filter((meal) => {
            return meal.name
                .toLowerCase()
                .includes(this.textFilter.toLowerCase());
        });

        this.setFilteredMeals([...textFilterMeals]);
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

    loadTags = async () => {
        this.uiStore.setIsLoading(true);

        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "tags",
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                this.setTags(dataJson.data as Tag[]);
            } else throw new Error(dataJson.data.message);
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
        } finally {
            this.uiStore.setIsLoading(false);
        }
    };

    addMeal = async (meal: MealForm): Promise<boolean> => {
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(
                MapFromMealFormToMealDTO(meal, this.userStore.currentUser!.id)
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

    deleteMeal = async (meal: Meal): Promise<boolean> => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "meal/" + meal.id,
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                showNotification(
                    "Success",
                    "Meal was successfully deleted",
                    "success",
                    3
                );
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

    updateMeal = async (meal: Meal): Promise<boolean> => {
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(
                MapFromMealToMealUpdateDTO(meal, this.userStore.currentUser!.id)
            ),
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "meal/" + meal.id,
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                showNotification(
                    "Success",
                    "Meal was successfully updated",
                    "success",
                    3
                );
                this.uiStore.setShowEditMealModal(false);
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
