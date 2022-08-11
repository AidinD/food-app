export type Meal = {
    id: number;
    name: string;
    description: string;
    tags: Tag[];
    recipe: string;
    timesMade: number;
    lastMade: Date;
    image: string;
    rating: number;
};

export type MealForm = {
    name: string;
    description: string;
    tag_values: { label: string; value: number }[];
    recipe: string;
    lastMade: Date;
    image: string;
    rating: number;
};

export type MealDTO = {
    name: string;
    description: string;
    rating: number;
    tag_ids: number[];
    online_url: string;
    image_url: string;
    user: number;
};

export type MealUpdateDTO = {
    name: string;
    description: string;
    rating: number;
    tag_ids: number[];
    online_url: string;
    image_url: string;
    times_made: number;
    last_made: string;
    user: number;
};

export type MealResponse = {
    id: number;
    name: string;
    description: string;
    tags: Tag[];
    online_url: string;
    image_url: string;
    rating: number;
    times_made: number;
    last_made: Date;
    user: number;
    updated_at: Date;
    created_at: Date;
};

export type Tag = {
    id: number;
    name: string;
    color: string;
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
