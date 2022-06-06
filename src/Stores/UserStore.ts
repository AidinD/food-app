import { makeAutoObservable, observable, action } from "mobx"
import { User } from "../Types/User";
import RootStore from "./Index";
export class UserStore {
    rootStore: RootStore;

    currentUser: User | undefined = undefined;
    userInput: string = "";

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        this.getUserFromLocalStorage();

        makeAutoObservable(this, {
            // Observables
            userInput: observable,

            // Computed

            // Actions
            setCurrentUser: action,
            saveCurrentUserToLocalStorage: action,
            setUserInput: action,
        });
    }

    setUserInput(userInput: string) {
        this.userInput = userInput;
    }

    startLoginFlow() {
        console.log("TryLogin");

        // See if userInput exists as user in database
        let user: User = this.fetchUserIfExists(this.userInput)

        if (user.id < 0) {
            // User does not exist
            alert("User does not exist");
        }
        else {
            this.login(user);
        }

        // Change page
        this.rootStore.routerStore.goToMealOverview();
    }

    login(user: User) {
        this.setCurrentUser(user);
        this.saveCurrentUserToLocalStorage();
    }

    fetchUserIfExists(userInput: string): User {
        // Mocked, for now. Replace with API call
        let user: User = {
            id: 1,
            name: userInput,
            share: []
        }

        if (userInput !== "Daniel") {
            user = {
                id: -1,
                name: "empty",
                share: []
            }
        }
        return user;
    }

    setCurrentUser(user: User | undefined) {
        this.currentUser = user;
    }

    saveCurrentUserToLocalStorage() {
        if (this.currentUser) {
            localStorage.setItem("user", JSON.stringify(this.currentUser));
        }
    }

    getUserFromLocalStorage = () => {
        const user = localStorage.getItem("user");
        if (user) {
            const storedUser = JSON.parse(user);
            this.setCurrentUser(storedUser);
            this.setUserInput(storedUser.name);
        } else {
            this.setCurrentUser(undefined);
        }
    }
}