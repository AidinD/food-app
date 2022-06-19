import { Button, Form, Input, Modal, PageHeader, Row } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { useStore } from "../Stores/StoreProvider";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import "./LoginPage.scss";
import AddUserForm from "../Components/AddUserForm";
import { UserDTO } from "../Types/User";

interface IAppProps {}

const LoginPage = (props: IAppProps) => {
    const { userStore } = useStore();
    const { uiStore } = useStore();
    const [form] = Form.useForm();

    useEffect(() => {}, []);

    const onLogin = async (value: any) => {
        await userStore.startLoginFlow(value.name);
    };

    const onSignup = async (values: UserDTO) => {
        await userStore.startSignUpFlow(values);
    };

    const onUsernameInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        userStore.setUsernameInput(event.target.value);
    };

    // TODO implement onFinishFailed on all forms
    return (
        <div className="container">
            <Row justify="center" align="middle" className="title-row">
                <PageHeader
                    className="site-page-header"
                    backIcon={false}
                    title="Login page"
                />
            </Row>
            <Row justify="center" align="middle" className="form-row">
                <Form name="login" onFinish={onLogin}>
                    <Form.Item
                        name="name"
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
                            prefix={<UserOutlined style={{ color: "grey" }} />}
                        />
                    </Form.Item>
                    <Form.Item name="loginButton" className="login-button">
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item name="signUpButton">
                        <Button
                            type="link"
                            onClick={() => uiStore.setShowSignUpModal(true)}
                        >
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </Row>
            <Modal
                title="Sign up"
                visible={uiStore.showSignUpModal}
                onOk={form.submit}
                onCancel={() => {
                    uiStore.setShowSignUpModal(false);
                }}
                okText="Sign up"
            >
                <AddUserForm form={form} onSignup={onSignup} />
            </Modal>
        </div>
    );
};

export default observer(LoginPage);
