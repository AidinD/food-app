import { Meal, MealDTO, MealResponse } from "./Meal";

export const MapFromMealResponseToMeal = (mealResponse: MealResponse): Meal => {
    return {
        id: mealResponse.id,
        name: mealResponse.name,
        description: mealResponse.description,
        tags: mealResponse.tags,
        recipe: mealResponse.online_url,
        image: mealResponse.image_url,
        lastMade: mealResponse.last_made,
        rating: mealResponse.ranking,
    };
};

export const MapFromMealToMealDTO = (meal: Meal, user: number): MealDTO => {
    return {
        name: meal.name,
        description: meal.description,
        rating: meal.rating,
        tags: meal.tags,
        online_url: meal.recipe,
        image_url: meal.image,
        user: user,
    };
};
