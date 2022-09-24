import React from "react";
import LoginPage from "../Pages/LoginPage";
import MealsPage from "../Pages/MealsPage";
import PlannerPage from "../Pages/PlannerPage";
import TagsPage from "../Pages/TagsPage";

export const viewMap = {
    login: <LoginPage />,
    //home: <OverviewPage />,
    planner: <PlannerPage />,
    //shoppingListPage: <ShoppingListPage />,
    //layoutPage: <LayoutPage />,
    meals: <MealsPage />,
    //ingredientsPage: <IngredientsPage />,
    tags: <TagsPage />,
    //categoriesPage: <CategoriesPage />,
    //notFound: <NotFoundPage />,
};
