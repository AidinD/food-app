import { Button, Card, Empty, Popconfirm, Rate, Tag } from "antd";
import { Meal, Tag as MealTag } from "../../Types/Meal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./MealItemCard.scss";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../Stores/StoreProvider";

interface IMealItemProps {
    meal: Meal;
}

const MealItemCard = (props: IMealItemProps) => {
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

    const preventEventPropagation = (event?: React.MouseEvent<HTMLElement>) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleViewMealClick = (event: React.MouseEvent<HTMLElement>) => {
        mealStore.setSelectedMeal(props.meal);
        uiStore.setShowViewMealModal(true);
    };

    const handleEditMealClick = (event: React.MouseEvent<HTMLElement>) => {
        preventEventPropagation(event);

        mealStore.setSelectedMeal(props.meal);
        uiStore.setShowEditMealModal(true);
    };

    const handleDeleteMealClick = (event?: React.MouseEvent<HTMLElement>) => {
        preventEventPropagation(event);
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
                    <Popconfirm
                        title="Are you sure you want to delete this?"
                        okText="Delete"
                        cancelText="Cancel"
                        placement="bottomLeft"
                        onConfirm={handleDeleteMealClick}
                        onCancel={preventEventPropagation}
                    >
                        <Button
                            className="action-button"
                            size="large"
                            icon={<DeleteOutlined />}
                            onClick={preventEventPropagation}
                        />
                    </Popconfirm>,
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
