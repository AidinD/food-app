import { Col, Divider, Image, Rate, Row, Tag as TagAnt } from "antd";
import Title from "antd/lib/typography/Title";
import { Meal, Tag } from "../Types/Meal";
import "./ViewMeal.scss";

interface IViewMealProps {
    meal: Meal;
}

const AddMealForm = (props: IViewMealProps) => {
    return (
        <Row>
            <Col span={12}>
                <Image src={props.meal.image} />
            </Col>
            <Col offset={1} span={11}>
                <Title id="title" level={2}>
                    {props.meal.name}
                </Title>
                <div id="description">{props.meal.description}</div>
                <div className="viewFooter">
                    <div id="link">
                        {props.meal.recipe.length > 0 ? (
                            <a href={props.meal.recipe}>{props.meal.recipe}</a>
                        ) : null}
                    </div>
                    <div id="tagList">
                        {props.meal.tags.map((tag: Tag) => (
                            <TagAnt key={tag.id} color={tag.color}>
                                {tag.name}
                            </TagAnt>
                        ))}
                        <Divider></Divider>
                        <div id="rate">
                            <Rate
                                disabled
                                allowHalf
                                defaultValue={props.meal.rating}
                            />
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default AddMealForm;
