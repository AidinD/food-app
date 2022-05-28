import { PageHeader } from 'antd';
import * as React from 'react';

interface IAppProps {
}

export const LoginPage = (props: IAppProps) => {
    return (
        <PageHeader
            className="site-page-header"
            backIcon={false}
            title="Login page"
        />
    )
};