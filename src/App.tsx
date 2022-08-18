import "./App.scss";
import { RouterView } from "mobx-state-router";
import { Key, ReactNode, useEffect } from "react";
import { viewMap } from "./Routing/ViewMap";
import { useStore } from "./Stores/StoreProvider";
import { Button, Layout, Menu, MenuProps } from "antd";
import { observer } from "mobx-react-lite";

const App = () => {
    const { userStore, routerStore } = useStore();
    type MenuItem = Required<MenuProps>["items"][number];

    const { Sider } = Layout;

    useEffect(() => {
        if (!userStore.isLoggedIn) {
            routerStore.goToLogin();
        }
    }, [userStore, routerStore]);

    const getItem = (
        label: ReactNode,
        key: Key,
        children?: MenuItem[],
        onClick?: () => void,
        icon?: ReactNode,
        type?: "group"
    ) => {
        return { key, icon, onClick, children, label, type } as MenuItem;
    };

    const items: MenuItem[] = [
        getItem("Overview", "overview", [getItem("Home", "home4")]),
        getItem("Planner", "planner"),
        getItem("Manager", "manager"),
        getItem("Meals", "meals"),
        getItem("Ingredients", "ingredients"),
        getItem("Tags", "tags"),
        getItem("Categories", "categories"),
        getItem("Sign out", "signout"),
    ];

    return (
        <Layout className="App">
            {routerStore.currentRoute?.name !== "home" ? (
                <Sider collapsible>
                    <Button
                        type="primary"
                        //onClick={toggleCollapsed}
                        style={{ marginBottom: 16 }}
                    ></Button>
                    <Menu
                        className="menu"
                        mode="inline"
                        theme="dark"
                        items={items}
                        defaultOpenKeys={["home", "home2"]}
                    ></Menu>
                </Sider>
            ) : null}
            <RouterView viewMap={viewMap} />
        </Layout>
    );
};

export default observer(App);
