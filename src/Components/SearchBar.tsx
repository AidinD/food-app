import { Col, Input, Row, Select } from "antd";
import { observer } from "mobx-react-lite";
import { SearchOutlined } from "@ant-design/icons";
import { useStore } from "../Stores/StoreProvider";
import { Tag } from "../Types/Meal";
import "./SearchBar.scss";
import { useEffect } from "react";

interface ISearchBarProps {}

const SearchBar = (props: ISearchBarProps) => {
    const { mealStore, tagStore } = useStore();

    useEffect(() => {
        mealStore.clearFilters();
    }, [mealStore]);

    const handleTextFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        mealStore.setTextFilter(value);
        mealStore.filterMeals();
    };

    const handleTagFilter = (value: any) => {
        mealStore.setTagFilter(value);
        mealStore.filterMeals();
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
            <Col className="searchBarColumn">
                <Select
                    mode="multiple"
                    maxTagCount="responsive"
                    placeholder="Tag"
                    allowClear
                    onChange={handleTagFilter}
                    options={tagStore.filteredTags.map((tag: Tag) => {
                        return {
                            value: tag.id,
                            label: tag.name,
                        };
                    })}
                ></Select>
            </Col>
        </Row>
    );
};

export default observer(SearchBar);
