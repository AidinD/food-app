export type ResponseJson = {
    data: any | any[];
    status: number;
};

export type RouteNames =
    | ""
    | "Overview"
    | "Planner"
    | "ShoppingList"
    | "Layout"
    | "Meals"
    | "Ingredients"
    | "Tags"
    | "Categories"
    | "Login";

export type Color = {
    hex: string;
};
