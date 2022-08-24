import { Button, Col, Divider, Form, Modal, Row } from "antd";
import { observer } from "mobx-react-lite";
import { Meal } from "../Types/Meal";
import { useEffect } from "react";
import { useStore } from "../Stores/StoreProvider";
import styles from "./MealsPage.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import AddMealForm from "../Components/Forms/AddMealForm";
import MealItemCard from "../Components/Cards/MealItemCard";
import ViewMeal from "../Components/ViewMeal";
import EditMealForm from "../Components/Forms/EditMealForm";
import { Content, Footer } from "antd/lib/layout/layout";
import SearchBar from "../Components/SearchBar";

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

    return (
        <>
            <Content className={styles.content}>
                <SearchBar />
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
