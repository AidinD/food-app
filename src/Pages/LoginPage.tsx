import { Button, PageHeader } from 'antd';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from '../Stores/StoreProvider';
import { Meal } from '../Types/Meal';

interface IAppProps {
}

const LoginPage = (props: IAppProps) => {
    const { mealStore } = useStore();

    const mealList = () => {
        return mealStore?.allMeals.map((meal: Meal) => {
            return <div key={meal.id}>{meal.name}</div>
        });
    }

    const addMeal = () => {
        mealStore?.addMeal({
            id: mealStore?.allMeals.length + 1,
            name: 'New Meal',
            description: 'New Description',
            tags: [],
            recipe: {
                id: 1,
                ingredients: [],
                description: ''
            },
            lastMade: new Date(),
            image: '',
        });
    }

    return (
        <div>
            <PageHeader
                className="site-page-header"
                backIcon={false}
                title="Login page"
            />
            <Button type='primary' onClick={addMeal}> Add Meal </Button>
            {mealList()}
        </div>
    )
};

export default observer(LoginPage);