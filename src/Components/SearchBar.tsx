import { Col, Input, Row, Select } from "antd";
import { observer } from "mobx-react-lite";
import { SearchOutlined } from "@ant-design/icons";
import { useStore } from "../Stores/StoreProvider";
import { Tag } from "../Types/Meal";
import "./SearchBar.scss";
import { useEffect } from "react";
import { RouteNames } from "../Types/Shared";

interface ISearchBarProps {
    route: RouteNames;
}

const SearchBar = (props: ISearchBarProps) => {
    const { mealStore, tagStore } = useStore();

    useEffect(() => {
        mealStore.clearFilters();
        tagStore.clearFilters();
    }, [mealStore, tagStore]);

    const handleTextFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        switch (props.route) {
            case "Meals":
                mealStore.setTextFilter(value);
                mealStore.filterMeals();
                break;
            case "Tags":
                tagStore.setTextFilter(value);
                tagStore.filterTags();
                break;
            default:
                break;
        }
    };

    const handleTagFilter = (value: any) => {
        switch (props.route) {
            case "Meals":
                mealStore.setTagFilter(value);
                mealStore.filterMeals();
                break;
            case "Tags":
                tagStore.setTagFilter(value);
                tagStore.filterTags();
                break;
            default:
                break;
        }
    };

    return (
        <Row className="searchBarRow" gutter={[16, 16]}>
            <Col className="searchBarColumn">
                <Input
                    placeholder="Search"
                    allowClear
                    suffix={<SearchOutlined style={{ color: "grey" }} />}
                    onChange={handleTextFilter}
                />
            </Col>
            {props.route === "Meals" ? (
                <Col className="searchBarColumn">
                    <Select
                        mode="multiple"
                        maxTagCount="responsive"
                        placeholder="Tag"
                        allowClear
                        onChange={handleTagFilter}
                        options={tagStore.tags.map((tag: Tag) => {
                            return {
                                value: tag.id,
                                label: tag.name,
                            };
                        })}
                    ></Select>
                </Col>
            ) : null}
        </Row>
    );
};

export default observer(SearchBar);
