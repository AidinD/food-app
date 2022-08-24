import { Button, Card, Empty, Popconfirm, Rate, Tag } from "antd";
import { Tag as MealTag } from "../../Types/Meal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./MealItemCard.scss";
import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../Stores/StoreProvider";

interface ITagItemProps {
    tag: MealTag;
}

const TagItemCard = (props: ITagItemProps) => {
    const { Meta } = Card;
    const { tagStore, uiStore } = useStore();

    const getCardDescription = () => {
        return (
            <div>
                <div>{props.tag.name}</div>
            </div>
        );
    };

    const preventEventPropagation = (event?: React.MouseEvent<HTMLElement>) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
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
                        onClick={() => {}}
                    />,
                    <Popconfirm
                        title="Are you sure you want to delete this?"
                        okText="Delete"
                        cancelText="Cancel"
                        placement="bottomLeft"
                        onConfirm={() => {}}
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
