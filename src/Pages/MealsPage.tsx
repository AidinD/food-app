import { Button, Col, Form, Modal, PageHeader, Row } from "antd";
import { observer } from "mobx-react-lite";
import { Meal } from "../Types/Meal";
import { useEffect } from "react";
import { useStore } from "../Stores/StoreProvider";
import styles from "./MealsPage.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import AddMealForm from "../Components/AddMealForm";
import MealRow from "../Components/MealRow";

interface IMealPageProps {}

const MealsPage = (props: IMealPageProps) => {
    const { uiStore } = useStore();
    const { mealStore } = useStore();
    const [form] = Form.useForm();

    useEffect(() => {
        mealStore.loadMeals();
    }, []);

    const mealList = () => {
        return mealStore.allMeals.map((meal: Meal) => {
            return (
                <Col className="meal-item" key={meal.id}>
                    <MealRow meal={meal} />
                </Col>
            );
        });
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
        </>
    );
};

export default observer(MealsPage);
