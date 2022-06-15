import { makeAutoObservable, observable, action } from "mobx";
import { User } from "../Types/User";
import RootStore from "./RootStore";

export class UserStore {
    rootStore: RootStore;

    currentUser: User | undefined = undefined;
    usernameInput: string = "";
    shareInput: string = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

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

    startLoginFlow = () => {
        console.log("TryLogin");

        // See if userInput exists as user in database
        let user: User = this.fetchUserIfExists(this.usernameInput);

        if (user.id < 0) {
            // User does not exist
            alert("User does not exist");
            return;
        }

        this.login(user);
        this.rootStore.routerStore.goToMealOverview();
    };

    login = (user: User) => {
        this.setCurrentUser(user);
        this.saveCurrentUserToLocalStorage();
    };

    fetchUserIfExists = (userInput: string): User => {
        // Mocked, for now. Replace with API call
        let user: User = {
            id: 1,
            name: userInput,
            share: [],
        };

        // return 200 or 204 or 404 here if no user found
        // Internet is indescisive

        if (userInput !== "Daniel") {
            user = {
                id: -1,
                name: "empty",
                share: [],
            };
        }
        return user;
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
