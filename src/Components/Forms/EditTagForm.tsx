import { Form, Input } from "antd";
import { useStore } from "../../Stores/StoreProvider";
import { Tag, TagDTO } from "../../Types/Meal";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Colorpicker } from "antd-colorpicker";
import { Color } from "../../Types/Shared";

interface IEditTagProps {
    form: any; // TODO what type is this??
    tag: Tag;
}

const EditMealForm = (props: IEditTagProps) => {
    const { tagStore, uiStore } = useStore();

    useEffect(() => {
        props.form.resetFields();
    }, [uiStore.showEditTagModal, props.tag, props.form]);

    const onEditTag = async (values: TagDTO) => {
        const updatedTag: Tag = {
            ...props.tag,
            ...values,
        };

        if (await tagStore.updateTag(updatedTag)) {
            props.form.resetFields();
        }
    };

    return (
        <Form
            name="editTag"
            form={props.form}
            onFinish={onEditTag}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ ...props.tag }}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Tag must have name",
                    },
                ]}
            >
                <Input name="name" placeholder="Tag name" allowClear={true} />
            </Form.Item>
            <Form.Item name="color" label="Color">
                <Colorpicker
                    picker="CirclePicker"
                    onColorResult={(color: Color) => color.hex}
                />
            </Form.Item>
        </Form>
    );
};

export default observer(EditMealForm);
