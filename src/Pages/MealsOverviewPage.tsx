import { Button, Form, Input, PageHeader, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Meal } from '../Types/Meal';
import { UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useStore } from '../Stores/StoreProvider';

interface IMealsOverviewProps {
}

const MealsOverviewPage = (props: IMealsOverviewProps) => {
    const { mealStore } = useStore();

    useEffect(() => {
    }, [])

    const mealList = () => {
        return mealStore.allMeals.map((meal: Meal) => {
            return <div key={meal.id}>{meal.name}</div>
        });
    }

    const addMeal = () => {
        mealStore.addMeal({
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
        <div className='container'>
            <Row className='title-row'>
                <PageHeader
                    className="site-page-header"
                    backIcon={false}
                    title="Meals Overview"
                />
            </Row>

            <Button type='primary' onClick={addMeal}> Add Meal </Button>
            {mealList()}
        </div>
    )
};

export default observer(MealsOverviewPage);