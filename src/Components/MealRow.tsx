import { Button, Card, Empty, Tag } from "antd";
import { Meal, Tag as MealTag } from "../Types/Meal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./MealRow.scss";
import { observer } from "mobx-react-lite";

interface IMealRowProps {
    meal: Meal;
}

const MealRow = (props: IMealRowProps) => {
    const { Meta } = Card;

    const getCardDescription = () => {
        return (
            <div>
                <div>{props.meal.description}</div>
                <div className="tags-container">
                    {/* {props.meal.tags.map((tag: MealTag) => (
                        <Tag key={tag.id} color={tag.color}>
                            {tag.name}
                        </Tag>
                    ))} */}
                </div>
            </div>
        );
    };

    const mealRow = () => {
        return (
            <Card
                className="meal-card"
                size="small"
                hoverable
                cover={
                    props.meal.image ? (
                        <img alt="example" src={props.meal.image} />
                    ) : (
                        <Empty description={false} />
                    )
                }
                actions={[
                    <Button
                        className="action-button"
                        size="large"
                        icon={<EditOutlined />}
                    />,
                    <Button
                        className="action-button"
                        size="large"
                        icon={<DeleteOutlined />}
                    />,
                ]}
            >
                <Meta
                    title={props.meal.name}
                    description={getCardDescription()}
                />
            </Card>
        );
    };

    return mealRow();
};

export default observer(MealRow);
