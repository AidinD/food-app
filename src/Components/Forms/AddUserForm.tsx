import { Form, Input } from "antd";
import React from "react";
import { useStore } from "../../Stores/StoreProvider";
import { UserAddOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { UserDTO } from "../../Types/User";

interface IAddUserProps {
    form: any; // TODO what type is this??
    onSignup: (user: UserDTO) => void;
}

const AddUserForm = (props: IAddUserProps) => {
    const { userStore } = useStore();

    const onUsernameInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        userStore.setUsernameInput(event.target.value);
    };

    return (
        <Form
            name="signup"
            form={props.form}
            onFinish={props.onSignup}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
                initialValue={userStore.usernameInput}
            >
                <Input
                    name="name"
                    size="large"
                    placeholder="Name"
                    allowClear={true}
                    value={userStore.usernameInput}
                    onChange={onUsernameInputChange}
                    prefix={<UserAddOutlined style={{ color: "grey" }} />}
                />
            </Form.Item>
        </Form>
    );
};

export default observer(AddUserForm);
