import { Button, Form, Input, PageHeader, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from '../Stores/StoreProvider';
import { UserOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

interface IAppProps {
}

const LoginPage = (props: IAppProps) => {
    const { userStore } = useStore();

    useEffect(() => {
    }, [])

    const onLogin = () => {
        userStore.startLoginFlow();
    }

    const onUserInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        userStore.setUserInput(event.target.value);
    }

    return (
        <div className='container'>
            <Row justify='center' align='middle' className='title-row'>
                <PageHeader
                    className="site-page-header"
                    backIcon={false}
                    title="Login page"
                />
            </Row>
            <Row justify='center' align='middle' className='form-row'>
                <Form
                    name='login'
                    onFinish={onLogin}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
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
                    <Form.Item
                        name="loginButton">
                        <Button type='primary' onClick={onLogin}> Login </Button>
                    </Form.Item>
                </Form>
            </Row>
        </div>
    )
};

export default observer(LoginPage);