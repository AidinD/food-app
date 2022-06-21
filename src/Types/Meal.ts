export type Meal = {
    id: number;
    name: string;
    description: string;
    tags: string[];
    recipe: string;
    lastMade: Date;
    image: string;
};

export type MealDTO = {
    name: string;
    description: string;
    tags: string[];
    recipe: string;
    image: string;
};

export type Recipe = {
    id: number;
    ingredients: Ingredient[];
    description: string;
};

export type Ingredient = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
};
