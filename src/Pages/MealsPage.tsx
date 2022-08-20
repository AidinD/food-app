import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Layout,
    Modal,
    PageHeader,
    Row,
    Select,
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
import ViewMeal from "../Components/ViewMeal";
import EditMealForm from "../Components/EditMealForm";
import { Content, Footer, Header } from "antd/lib/layout/layout";

interface IMealPageProps {}

const MealsPage = (props: IMealPageProps) => {
    const { uiStore } = useStore();
    const { mealStore } = useStore();
    const [form] = Form.useForm();

    useEffect(() => {
        mealStore.loadTags();
        mealStore.loadMeals();
    }, [mealStore]);

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

    return (
        <Layout className={styles.layout}>
            <Header className={styles.layoutHeader}>
                <PageHeader
                    className={styles.pageHeader}
                    backIcon={false}
                    title="Meal Overview"
                />
            </Header>
            <Content className={styles.content}>
                <Row
                    className={styles.searchBarRow}
                    gutter={[16, 16]}
                    justify="center"
                >
                    <Col flex="1 0 25%" className={styles.column}>
                        <Input
                            placeholder="Search"
                            allowClear
                            suffix={
                                <SearchOutlined style={{ color: "grey" }} />
                            }
                            onChange={handleTextFilter}
                        />
                    </Col>
                    <Col flex="1 0 25%" className={styles.column}>
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
                </Row>
                <Divider style={{ paddingBottom: "20px" }} />
                <Row gutter={[16, 16]}>{mealList()}</Row>
            </Content>
            <Footer className={styles.footer}>
                <div className="floating-button">
                    <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={() => uiStore.setShowAddMealModal(true)}
                    />
                </div>
            </Footer>

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
                <AddMealForm form={form} />
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
                okText="Save"
                onOk={form.submit}
                onCancel={() => {
                    form.resetFields();
                    uiStore.setShowEditMealModal(false);
                }}
            >
                <EditMealForm form={form} meal={mealStore.selectedMeal!} />
            </Modal>
        </Layout>
    );
};

export default observer(MealsPage);
