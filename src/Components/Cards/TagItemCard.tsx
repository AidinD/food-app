import { Button, Card, Popconfirm } from "antd";
import { Tag as MealTag } from "../../Types/Meal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./TagItemCard.scss";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../Stores/StoreProvider";

interface ITagItemProps {
    tag: MealTag;
}

const TagItemCard = (props: ITagItemProps) => {
    const { Meta } = Card;
    const { tagStore, uiStore, mealStore } = useStore();

    const getCardDescription = () => {
        return (
            <>
                <div
                    className="circleDiv"
                    style={{
                        backgroundColor: props.tag.color,
                    }}
                ></div>
                <div className="tagDescription">{props.tag.color}</div>
            </>
        );
    };

    const countAmountOfMealsUsingTag = () => {
        return mealStore.filterMealsByTag(props.tag);
    };

    const preventEventPropagation = (event?: React.MouseEvent<HTMLElement>) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const handleEditTagClick = (event?: React.MouseEvent<HTMLElement>) => {
        preventEventPropagation();

        tagStore.setSelectedTag(props.tag);
        uiStore.setShowEditTagModal(true);
    };

    const handleDeleteTagClick = (event?: React.MouseEvent<HTMLElement>) => {
        preventEventPropagation(event);

        tagStore.deleteTag(props.tag);
    };

    const tagItemCard = () => {
        return (
            <Card
                className="tag-card"
                size="small"
                hoverable
                onClick={() => {}}
                actions={[
                    <Button
                        className="action-button"
                        size="large"
                        icon={<EditOutlined />}
                        onClick={handleEditTagClick}
                    />,
                    <Popconfirm
                        title={
                            <>
                                <p>"Are you sure you want to delete this?"</p>
                                <p>
                                    {mealStore.mealsUsingTag} meals are using
                                    this tag.
                                </p>
                            </>
                        }
                        okText="Delete"
                        cancelText="Cancel"
                        placement="bottomLeft"
                        onConfirm={handleDeleteTagClick}
                        onCancel={preventEventPropagation}
                    >
                        <Button
                            className="action-button"
                            size="large"
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                countAmountOfMealsUsingTag();
                                preventEventPropagation();
                            }}
                        />
                    </Popconfirm>,
                ]}
            >
                <Meta
                    className="tagMeta"
                    title={props.tag.name}
                    description={getCardDescription()}
                />
            </Card>
        );
    };

    return tagItemCard();
};

export default observer(TagItemCard);
