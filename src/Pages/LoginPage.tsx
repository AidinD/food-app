import { Button, Form, Input, Modal, PageHeader, Row } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { useStore } from "../Stores/StoreProvider";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import "./LoginPage.css";

interface IAppProps {}

const LoginPage = (props: IAppProps) => {
    const { userStore } = useStore();
    const { uiStore } = useStore();

    useEffect(() => {}, []);

    const onLogin = () => {
        userStore.startLoginFlow();
    };

    const onSignup = () => {};

    const onUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.setUserInput(event.target.value);
    };

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
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                        initialValue={userStore.userInput}
                    >
                        <Input
                            size="large"
                            placeholder="Username"
                            allowClear={true}
                            value={userStore.userInput}
                            onChange={onUserInputChange}
                            prefix={<UserOutlined />}
                        />
                    </Form.Item>
                    <Form.Item name="loginButton" className="login-button">
                        <Button type="primary" onClick={onLogin}>
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
                onOk={onSignup}
                onCancel={() => {
                    uiStore.setShowSignUpModal(false);
                }}
            ></Modal>
        </div>
    );
};

export default observer(LoginPage);
