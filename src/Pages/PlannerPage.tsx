import { Button, Col, Divider, Form, Input, Modal, Row, Select } from "antd";
import { observer } from "mobx-react-lite";
import { Meal, Tag } from "../Types/Meal";
import { useEffect } from "react";
import { useStore } from "../Stores/StoreProvider";
import styles from "./PlannerPage.module.scss";
import {
    PlusOutlined,
    MinusOutlined,
    InteractionOutlined,
} from "@ant-design/icons";
import AddMealForm from "../Components/Forms/AddMealForm";
import MealItemCard from "../Components/Cards/MealItemCard";
import ViewMeal from "../Components/ViewMeal";
import EditMealForm from "../Components/Forms/EditMealForm";
import { Content, Footer } from "antd/lib/layout/layout";

interface IMealPageProps {}

const MealsPage = (props: IMealPageProps) => {
    const { uiStore, mealStore, tagStore } = useStore();
    const [form] = Form.useForm();

    useEffect(() => {
        tagStore.loadTags();
        mealStore.loadMeals();
    }, [mealStore, tagStore]);

    const mealList = () => {
        return mealStore.filteredMeals.map((meal: Meal) => {
            return (
                <Col className="meal-item" key={meal.id}>
                    <MealItemCard meal={meal} />
                </Col>
            );
        });
    };

    const header = () => {
        return (
            <Row className={styles.row} gutter={[16, 16]}>
                <Col className={styles.column}>
                    <Button
                        className={styles.inputButton}
                        type="primary"
                        icon={<MinusOutlined />}
                    ></Button>
                    <Input
                        id={styles.amountInput}
                        readOnly
                        defaultValue={3}
                    ></Input>
                    <Button
                        className={styles.inputButton}
                        type="primary"
                        icon={<PlusOutlined />}
                    ></Button>
                </Col>
                <Col className={styles.column}>
                    <Select
                        className={styles.tagSelect}
                        mode="multiple"
                        maxTagCount="responsive"
                        placeholder="Tag"
                        allowClear
                        options={tagStore.tags.map((tag: Tag) => {
                            return {
                                value: tag.id,
                                label: tag.name,
                            };
                        })}
                    ></Select>
                </Col>
                <Col className={styles.column}>
                    <Button
                        type="primary"
                        icon={<InteractionOutlined />}
                    ></Button>
                </Col>
            </Row>
        );
    };

    return (
        <>
            <Content className={styles.content}>
                {header()}
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
        </>
    );
};

export default observer(MealsPage);
