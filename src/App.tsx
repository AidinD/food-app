import "./App.scss";
import { observer } from "mobx-react-lite";
import { RouterView } from "mobx-state-router";
import { useEffect } from "react";
import { viewMap } from "./Routing/ViewMap";
import { useStore } from "./Stores/StoreProvider";

const App = () => {
    const { userStore, routerStore } = useStore();

    useEffect(() => {
        if (!userStore.isLoggedIn()) {
            routerStore.goToLogin();
        }
    }, [userStore, routerStore]);

    return (
        <div className="App">
            <RouterView viewMap={viewMap} />
        </div>
    );
};

export default observer(App);
