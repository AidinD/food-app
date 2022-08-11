import { Button, Card, Empty, Rate, Tag } from "antd";
import { Meal, Tag as MealTag } from "../Types/Meal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./MealItemCard.scss";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../Stores/StoreProvider";

interface IMealRowProps {
    meal: Meal;
}

const MealItemCard = (props: IMealRowProps) => {
    const { Meta } = Card;
    const { mealStore, uiStore } = useStore();

    const getCardDescription = () => {
        return (
            <div>
                <Rate
                    className="mealRating"
                    disabled
                    allowHalf
                    value={props.meal.rating}
                />
                <div>{props.meal.description}</div>
                <div className="tags-container">
                    {props.meal.tags.map((tag: MealTag) => (
                        <Tag key={tag.id} color={tag.color}>
                            {tag.name}
                        </Tag>
                    ))}
                </div>
            </div>
        );
    };

    const handleViewMealClick = (event: React.MouseEvent<HTMLElement>) => {
        mealStore.setSelectedMeal(props.meal);
        uiStore.setShowViewMealModal(true);
    };

    const handleEditMealClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();

        mealStore.setSelectedMeal(props.meal);
        uiStore.setShowEditMealModal(true);
    };

    const handleDeleteMealClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();

        mealStore.deleteMeal(props.meal);
    };

    const mealItemCard = () => {
        return (
            <Card
                className="meal-card"
                size="small"
                hoverable
                onClick={handleViewMealClick}
                cover={
                    props.meal.image ? (
                        <img alt="meal thumbnail" src={props.meal.image} />
                    ) : (
                        <Empty description={false} />
                    )
                }
                actions={[
                    <Button
                        className="action-button"
                        size="large"
                        icon={<EditOutlined />}
                        onClick={handleEditMealClick}
                    />,
                    <Button
                        className="action-button"
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={handleDeleteMealClick}
                    />,
                ]}
            >
                <Meta
                    className="mealMeta"
                    title={props.meal.name}
                    description={getCardDescription()}
                />
            </Card>
        );
    };

    return mealItemCard();
};

export default observer(MealItemCard);
