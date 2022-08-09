import { Form, Input, Rate, Select } from "antd";
import { useStore } from "../Stores/StoreProvider";
import { UserDTO } from "../Types/User";
import TextArea from "antd/lib/input/TextArea";
import { Meal } from "../Types/Meal";
import { format } from "path";

interface IEditMealProps {
    form: any; // TODO what type is this??
    meal: Meal;
    onEditMeal: (user: UserDTO) => void;
}

const EditMealForm = (props: IEditMealProps) => {
    const { mealStore } = useStore();

    const onEditMeal = async (values: Meal) => {
        if (await mealStore.addMeal(values)) {
            props.form.resetFields();
        }
    };

    const getTagsFromStore = () => {};

    return (
        <Form
            name="addmeal"
            form={props.form}
            onFinish={onEditMeal}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={props.meal}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Meal must have name",
                    },
                ]}
            >
                <Input name="name" placeholder="Meal name" allowClear={true} />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <TextArea
                    name="description"
                    placeholder="Description"
                    allowClear={true}
                />
            </Form.Item>
            <Form.Item name="rating" label="Rating">
                <Rate allowHalf={true} />
            </Form.Item>
            <Form.Item name="recipe" label="Recipe URL">
                <Input
                    name="recipe"
                    placeholder="Recipe URL"
                    allowClear={true}
                />
            </Form.Item>
            <Form.Item name="image" label="Image URL">
                <Input name="image" placeholder="Image URL" allowClear={true} />
            </Form.Item>
            <Form.Item name="tags" label="Tags">
                <Select
                    mode="tags"
                    tokenSeparators={[","]}
                    //options={getTagsFromStore()}
                ></Select>
            </Form.Item>
        </Form>
    );
};

export default EditMealForm;
