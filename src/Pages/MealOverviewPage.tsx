import { Button, Form, Modal, PageHeader, Row } from "antd";
import { observer } from "mobx-react-lite";
import { Meal } from "../Types/Meal";
import { useEffect } from "react";
import { useStore } from "../Stores/StoreProvider";
import "./MealOverviewPage.scss";
import { PlusOutlined } from "@ant-design/icons";
import AddMealForm from "../Components/AddMealForm";

interface IMealOverviewProps {}

const MealOverviewPage = (props: IMealOverviewProps) => {
    const { uiStore } = useStore();
    const { mealStore } = useStore();
    const [form] = Form.useForm();

    useEffect(() => {}, []);

    const mealList = () => {
        return mealStore.allMeals.map((meal: Meal) => {
            return <div key={meal.id}>{meal.name}</div>;
        });
    };

    return (
        <>
            <div className="container">
                <Row className="title-row">
                    <PageHeader
                        className="site-page-header"
                        backIcon={false}
                        title="Meal Overview"
                    />
                </Row>
                {mealList()}
            </div>
            <div className="bottom-container">
                <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => uiStore.setShowAddMealModal(true)}
                />
            </div>
            <Modal
                title="Sign up"
                visible={uiStore.showAddMealModal}
                onOk={form.submit}
                onCancel={() => {
                    uiStore.setShowAddMealModal(false);
                }}
                okText="Sign up"
            >
                <AddMealForm form={form} onAddMeal={() => {}} />
            </Modal>
        </>
    );
};

export default observer(MealOverviewPage);
