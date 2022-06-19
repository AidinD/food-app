import { makeAutoObservable, observable, action } from "mobx";
import { User, UserDTO } from "../Types/User";
import RootStore from "./RootStore";
import { UiStore } from "./UiStore";
import configData from "../Config/config.json";
import { ResponseJson } from "../Types/Shared";

export class UserStore {
    rootStore: RootStore;
    uiStore: UiStore;

    currentUser: User | undefined = undefined;
    usernameInput: string = "";
    shareInput: string = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.uiStore = rootStore.uiStore;

        this.getUserFromLocalStorage();

        makeAutoObservable(this, {
            // Observables
            usernameInput: observable,
            currentUser: observable,
            shareInput: observable,

            // Computed

            // Actions
            setCurrentUser: action,
            setShareInput: action,
            saveCurrentUserToLocalStorage: action,
            setUsernameInput: action,
            isLoggedIn: action,
            startLoginFlow: action,
        });
    }

    setUsernameInput(userInput: string) {
        this.usernameInput = userInput;
    }

    setShareInput(shareInput: string) {
        this.shareInput = shareInput;
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
                this.rootStore.routerStore.goToMealOverview();
            } else if (dataJson.status === 204) {
                throw new Error("User does not exist");
            }
        } catch (error) {
            console.log("error", error);
            alert(error);
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
                alert("User successfully created");
            } else throw new Error(dataJson.data.message);
        } catch (error) {
            alert(error);
        } finally {
            this.uiStore.setIsLoading(false);
        }
    };

    login = (user: User) => {
        this.setCurrentUser(user);
        this.saveCurrentUserToLocalStorage();
    };

    setCurrentUser = (user: User | undefined) => {
        this.currentUser = user;
    };

    saveCurrentUserToLocalStorage = () => {
        if (this.currentUser) {
            localStorage.setItem("user", JSON.stringify(this.currentUser));
        }
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

    isLoggedIn = (): boolean => {
        return this.currentUser !== undefined;
    };
}
