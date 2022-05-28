export type Meal = {
    id: number;
    name: string;
    description: string;
    tags: Tag[];
    recipe: Recipe;
    lastMade: Date;
    image: string;
}

export type Tag = {
    id: number;
    name: string;
}

export type Recipe = {
    id: number;
    ingredients: Ingredient[];
    description: string;
}

export type Ingredient = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
}