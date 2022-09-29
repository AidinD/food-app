import { Form, Input, Rate, Select } from "antd";
import { useStore } from "../../Stores/StoreProvider";
import TextArea from "antd/lib/input/TextArea";
import { Meal, MealForm, Tag } from "../../Types/Meal";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

interface IEditMealProps {
    form: any; // TODO what type is this??
    meal: Meal;
}

const EditMealForm = (props: IEditMealProps) => {
    const { mealStore, tagStore, uiStore } = useStore();

    useEffect(() => {
        props.form.resetFields();
    }, [uiStore.showEditMealModal, props.meal, props.form]);

    const onEditMeal = async (values: MealForm) => {
        const tags = tagStore.allTags.filter((tag) => {
            return values.tag_values.map((tag) => tag.value).includes(tag.id);
        });

        const updatedMeal: Meal = {
            ...props.meal,
            ...values,
            tags,
        };

        if (await mealStore.updateMeal(updatedMeal)) {
            props.form.resetFields();
        }
    };

    const getTagsFromStore = () => {
        return tagStore.allTags;
    };

    return (
        <Form
            name="editmeal"
            form={props.form}
            onFinish={onEditMeal}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
                ...props.meal,
                tag_values: props.meal.tags.map((tag: Tag) => {
                    return { value: tag.id, label: tag.name };
                }),
            }}
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

export default observer(EditMealForm);
