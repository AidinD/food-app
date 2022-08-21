import { makeAutoObservable, observable, action, computed } from "mobx";
import { User, UserDTO } from "../Types/User";
import RootStore from "./RootStore";
import { UiStore } from "./UiStore";
import configData from "../Config/config.json";
import { ResponseJson } from "../Types/Shared";
import { showNotification } from "../Utils/Notification";
import { RouterStoreWrapper } from "../Routing/RouterStoreWrapper";

export class UserStore {
    rootStore: RootStore;
    uiStore: UiStore;
    routerStore: RouterStoreWrapper;

    currentUser: User | undefined = undefined;
    usernameInput: string = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.uiStore = rootStore.uiStore;
        this.routerStore = rootStore.routerStore;

        this.getUserFromLocalStorage();

        makeAutoObservable(this, {
            // Observables
            usernameInput: observable,
            currentUser: observable,

            // Computed
            isLoggedIn: computed,

            // Actions
            setCurrentUser: action,
            saveCurrentUserToLocalStorage: action,
            setUsernameInput: action,
            startLoginFlow: action,
        });
    }

    get isLoggedIn(): boolean {
        return this.currentUser !== undefined;
    }

    setUsernameInput(userInput: string) {
        this.usernameInput = userInput;
    }

    startLoginFlow = async (name: string) => {
        this.uiStore.setIsLoading(true);

        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "user/" + name,
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (dataJson.status === 200) {
                this.login(dataJson.data as User);
                this.rootStore.routerStore.goToHomePage();
            } else if (dataJson.status === 204) {
                throw new Error("User does not exist");
            }
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
        } finally {
            this.uiStore.setIsLoading(false);
        }
    };

    startSignUpFlow = async (user: UserDTO) => {
        this.uiStore.setIsLoading(true);

        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "user",
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                this.uiStore.setShowSignUpModal(false);
                showNotification("User successfully created", "", "success", 3);
            } else throw new Error(dataJson.data.message);
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
        } finally {
            this.uiStore.setIsLoading(false);
        }
    };

    login = (user: User) => {
        this.setCurrentUser(user);
        this.saveCurrentUserToLocalStorage(user);
    };

    logout = () => {
        this.setCurrentUser(undefined);
        this.saveCurrentUserToLocalStorage({} as User);
        this.routerStore.goToLogin();
    };

    setCurrentUser = (user: User | undefined) => {
        this.currentUser = user;
    };

    saveCurrentUserToLocalStorage = (user: User) => {
        localStorage.setItem("user", JSON.stringify(user));
    };

    getUserFromLocalStorage = () => {
        const user = localStorage.getItem("user");
        if (user) {
            const storedUser = JSON.parse(user);
            this.setCurrentUser(storedUser);
            this.setUsernameInput(storedUser.name);
        } else {
            this.setCurrentUser(undefined);
        }
    };
}
