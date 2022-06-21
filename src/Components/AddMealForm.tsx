import { Form, Input, Select } from "antd";
import React from "react";
import { useStore } from "../Stores/StoreProvider";
import { UserDTO } from "../Types/User";
import TextArea from "antd/lib/input/TextArea";
import { MealDTO } from "../Types/Meal";

interface IAddMealProps {
    form: any; // TODO what type is this??
    onAddMeal: (user: UserDTO) => void;
}

const AddMealForm = (props: IAddMealProps) => {
    const { mealStore } = useStore();

    const onAddMeal = (values: MealDTO) => {
        console.log("add meal values: ", values);

        //TODO add meal to database
        //TODO add new tags to database
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
                name="mealname"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Meal must have name",
                    },
                ]}
            >
                <Input
                    name="mealname"
                    placeholder="Meal name"
                    allowClear={true}
                />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <TextArea
                    name="description"
                    placeholder="Description"
                    allowClear={true}
                />
            </Form.Item>
            <Form.Item name="recipeurl" label="Recipe URL">
                <Input
                    name="recipeurl"
                    placeholder="Recipe URL"
                    allowClear={true}
                />
            </Form.Item>
            <Form.Item name="imageurl" label="Image URL">
                <Input
                    name="imageurl"
                    placeholder="Image URL"
                    allowClear={true}
                />
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
