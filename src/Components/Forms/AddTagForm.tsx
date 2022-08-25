import { Form, Input } from "antd";
import { useEffect } from "react";
import { useStore } from "../../Stores/StoreProvider";
import { TagDTO } from "../../Types/Meal";
import { observer } from "mobx-react-lite";
import { Colorpicker } from "antd-colorpicker";
import { Color } from "../../Types/Shared";

interface IAddTagProps {
    form: any; // TODO what type is this??
}

const AddTagForm = (props: IAddTagProps) => {
    const { tagStore, uiStore } = useStore();

    useEffect(() => {
        props.form.resetFields();
    }, [props.form, uiStore.showAddTagModal]); // Is this the best way?

    const onAddTag = async (values: TagDTO) => {
        if (await tagStore.addTag(values)) {
            props.form.resetFields();
        }
    };

    return (
        <Form
            name="addtag"
            form={props.form}
            onFinish={onAddTag}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ color: "#f44336" }}
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

export default observer(AddTagForm);
