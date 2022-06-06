import React from 'react';
import LoginPage from '../Pages/LoginPage';
import MealOverviewPage from '../Pages/MealOverviewPage';

export const viewMap = {
    home: <LoginPage />,
    mealOverview: <MealOverviewPage />,
    //notFound: <NotFoundPage />,
};