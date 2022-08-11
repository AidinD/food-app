import { Meal, MealDTO, MealForm, MealResponse, MealUpdateDTO } from "./Meal";

export const MapFromMealResponseToMeal = (mealResponse: MealResponse): Meal => {
    return {
        id: mealResponse.id,
        name: mealResponse.name,
        description: mealResponse.description,
        tags: mealResponse.tags,
        recipe: mealResponse.online_url,
        image: mealResponse.image_url,
        timesMade: mealResponse.times_made,
        lastMade: mealResponse.last_made,
        rating: mealResponse.rating,
    };
};

export const MapFromMealToMealUpdateDTO = (
    meal: Meal,
    user: number
): MealUpdateDTO => {
    return {
        name: meal.name,
        description: meal.description,
        rating: meal.rating,
        tag_ids: meal.tags.map((tag) => tag.id),
        online_url: meal.recipe,
        image_url: meal.image,
        user: user,
        times_made: meal.timesMade,
        last_made: new Date(meal.lastMade).toISOString().split("T")[0],
    };
};

export const MapFromMealFormToMealDTO = (
    meal: MealForm,
    user: number
): MealDTO => {
    return {
        name: meal.name,
        description: meal.description,
        rating: meal.rating,
        tag_ids: meal.tag_values ? meal.tag_values.map((tag) => tag.value) : [],
        online_url: meal.recipe,
        image_url: meal.image,
        user: user,
    };
};
