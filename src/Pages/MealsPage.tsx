import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    PageHeader,
    Row,
    Select,
    Tag as TagAnt,
} from "antd";
import { observer } from "mobx-react-lite";
import { Meal, Tag } from "../Types/Meal";
import { useEffect } from "react";
import { useStore } from "../Stores/StoreProvider";
import styles from "./MealsPage.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import AddMealForm from "../Components/AddMealForm";
import MealItemCard from "../Components/MealItemCard";
import { SearchOutlined } from "@ant-design/icons";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import ViewMeal from "../Components/ViewMeal";
import EditMealForm from "../Components/EditMealForm";

interface IMealPageProps {}

const MealsPage = (props: IMealPageProps) => {
    const { uiStore } = useStore();
    const { mealStore } = useStore();
    const [form] = Form.useForm();

    useEffect(() => {
        mealStore.loadTags();
        mealStore.loadMeals();
    }, []);

    const mealList = () => {
        return mealStore.filteredMeals.map((meal: Meal) => {
            return (
                <Col className="meal-item" key={meal.id}>
                    <MealItemCard meal={meal} />
                </Col>
            );
        });
    };

    const handleTextFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        mealStore.setTextFilter(value);
        mealStore.filterMeals();
    };

    const handleTagFilter = (value: any) => {
        mealStore.setTagFilter(value);
        mealStore.filterMeals();
    };

    const tagRender = (props: CustomTagProps) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            e.stopPropagation();
        };

        return (
            <TagAnt
                closable={closable}
                onClose={onClose}
                onMouseDown={onPreventMouseDown}
                color={value}
                style={{ marginRight: "3px" }}
            >
                {label}
            </TagAnt>
        );
    };

    return (
        <>
            <div className={styles.container}>
                <Row className="title-row" justify="center">
                    <PageHeader
                        className="site-page-header"
                        backIcon={false}
                        title="Meal Overview"
                    />
                </Row>
                <Row className={styles.searchBarRow} justify="center">
                    <Divider />
                    <Col span={4}>
                        <Input
                            placeholder="Search"
                            allowClear
                            suffix={
                                <SearchOutlined style={{ color: "grey" }} />
                            }
                            onChange={handleTextFilter}
                        />
                    </Col>
                    <Col span={4}>
                        <Select
                            mode="multiple"
                            maxTagCount="responsive"
                            placeholder="Tag"
                            allowClear
                            style={{
                                width: "100%",
                                textAlign: "left",
                            }}
                            onChange={handleTagFilter}
                            options={mealStore.tags.map((tag: Tag) => {
                                return {
                                    value: tag.id,
                                    label: tag.name,
                                };
                            })}
                        ></Select>
                    </Col>
                    <Divider />
                </Row>
                <Row gutter={[16, 16]} justify="center">
                    {mealList()}
                </Row>
            </div>
            <div className="floating-button">
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => uiStore.setShowAddMealModal(true)}
                />
            </div>
            <Modal
                title="Add meal"
                visible={uiStore.showAddMealModal}
                onOk={form.submit}
                onCancel={() => {
                    form.resetFields();
                    uiStore.setShowAddMealModal(false);
                }}
                okText="Add"
            >
                <AddMealForm form={form} onAddMeal={() => {}} />
            </Modal>
            <Modal
                visible={uiStore.showViewMealModal}
                footer={false}
                onOk={() => uiStore.setShowViewMealModal(false)}
                onCancel={() => uiStore.setShowViewMealModal(false)}
            >
                <ViewMeal meal={mealStore.selectedMeal!} />
            </Modal>
            <Modal
                title="Edit meal"
                visible={uiStore.showEditMealModal}
                onOk={() => uiStore.setShowEditMealModal(false)}
                onCancel={() => uiStore.setShowEditMealModal(false)}
            >
                <EditMealForm
                    form={form}
                    meal={mealStore.selectedMeal!}
                    onEditMeal={() => {}}
                />
            </Modal>
        </>
    );
};

export default observer(MealsPage);
