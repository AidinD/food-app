import { Form, Input, Rate, Select } from "antd";
import React from "react";
import { useStore } from "../Stores/StoreProvider";
import { UserDTO } from "../Types/User";
import TextArea from "antd/lib/input/TextArea";
import { Meal } from "../Types/Meal";

interface IAddMealProps {
    form: any; // TODO what type is this??
    onAddMeal: (user: UserDTO) => void;
}

const AddMealForm = (props: IAddMealProps) => {
    const { mealStore } = useStore();

    const onAddMeal = (values: Meal) => {
        mealStore.addMeal(values);
    };

    const getTagsFromStore = () => {
        return tagsMock();
    };

    const tagsMock = () => {
        return [
            { label: "test1", value: "1" },
            { label: "test2", value: "2" },
            { label: "test3", value: "3" },
        ];
    };

    return (
        <Form
            name="addmeal"
            form={props.form}
            onFinish={onAddMeal}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
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
                    options={getTagsFromStore()}
                ></Select>
            </Form.Item>
        </Form>
    );
};

export default AddMealForm;
