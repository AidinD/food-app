import { Meal, MealResponse } from "./Meal";

export const MapFromMealResponseToMeal = (mealResponse: MealResponse): Meal => {
    return {
        id: mealResponse.id,
        name: mealResponse.name,
        description: mealResponse.description,
        tags: mealResponse.tags,
        recipe: mealResponse.online_url,
        image: mealResponse.image_url,
        lastMade: mealResponse.last_made,
    };
};
