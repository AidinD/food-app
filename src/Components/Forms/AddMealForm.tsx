import { Form, Input, Rate, Select } from "antd";
import React, { useEffect } from "react";
import { useStore } from "../../Stores/StoreProvider";
import TextArea from "antd/lib/input/TextArea";
import { MealForm, Tag } from "../../Types/Meal";
import { observer } from "mobx-react-lite";

interface IAddMealProps {
    form: any; // TODO what type is this??
}

const AddMealForm = (props: IAddMealProps) => {
    const { mealStore, tagStore, uiStore } = useStore();

    useEffect(() => {
        props.form.resetFields();
    }, [props.form, uiStore.showAddMealModal]); // Is this the best way?

    const onAddMeal = async (values: MealForm) => {
        values = { ...values };

        if (await mealStore.addMeal(values)) {
            props.form.resetFields();
        }
    };

    const getTagsFromStore = () => {
        return tagStore.allTags;
    };

    return (
        <Form
            name="addmeal"
            form={props.form}
            onFinish={onAddMeal}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ rating: 3 }}
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
            <Form.Item name="tag_values" label="Tags">
                <Select
                    mode="multiple"
                    allowClear
                    labelInValue
                    options={getTagsFromStore().map((tag: Tag) => {
                        return { value: tag.id, label: tag.name };
                    })}
                ></Select>
            </Form.Item>
        </Form>
    );
};

export default observer(AddMealForm);
