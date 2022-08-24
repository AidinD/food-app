import { Button, Form, Input, Layout, Modal, PageHeader, Row } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { useStore } from "../Stores/StoreProvider";
import { UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import styles from "./LoginPage.module.scss";
import AddUserForm from "../Components/Forms/AddUserForm";
import { UserDTO } from "../Types/User";
import { Content, Header } from "antd/lib/layout/layout";

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
        <Layout id={styles.container}>
            <Header className={styles.loginHeader}>
                <PageHeader
                    className={styles.loginPageHeader}
                    backIcon={false}
                    title="Login page"
                />
            </Header>
            <Content className={styles.loginContent}>
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
                    <Form.Item
                        name="loginButton"
                        className={styles.loginButton}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                    <Form.Item
                        name="signUpButton"
                        className={styles.signUpButton}
                    >
                        <Button
                            type="link"
                            onClick={() => uiStore.setShowSignUpModal(true)}
                        >
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
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
        </Layout>
    );
};

export default observer(LoginPage);
