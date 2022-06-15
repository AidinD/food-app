import { Form, Input } from "antd";
import React from "react";
import { useStore } from "../Stores/StoreProvider";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";

interface IAddUserProps {
    onSignup: () => void;
}

const AddUserForm = (props: IAddUserProps) => {
    const { userStore } = useStore();

    const onUsernameInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        userStore.setUsernameInput(event.target.value);
    };

    const onShareInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.setShareInput(event.target.value);
    };

    return (
        <Form
            name="signup"
            onFinish={props.onSignup}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
        >
            <Form.Item
                name="username"
                label="Username"
                rules={[
                    {
                        required: true,
                        message: "Please input your username!",
                    },
                ]}
                initialValue={userStore.usernameInput}
            >
                <Input
                    size="large"
                    placeholder="Username"
                    allowClear={true}
                    value={userStore.usernameInput}
                    onChange={onUsernameInputChange}
                    prefix={<UserAddOutlined style={{ color: "grey" }} />}
                />
            </Form.Item>
            <Form.Item name="share" label="Share">
                <Input
                    size="large"
                    placeholder="Share with (comma separated)"
                    allowClear={true}
                    value={userStore.shareInput}
                    onChange={onShareInputChange}
                    prefix={<UsergroupAddOutlined style={{ color: "grey" }} />}
                />
            </Form.Item>
        </Form>
    );
};

export default observer(AddUserForm);
