import { makeAutoObservable, observable, action } from "mobx";
import RootStore from "./RootStore";

export class UiStore {
    rootStore: RootStore;

    isLoading: boolean = false;
    showSignUpModal: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            // Observables
            isLoading: observable,
            showSignUpModal: observable,

            // Computed

            // Actions
            setIsLoading: action,
            setShowSignUpModal: action,
        });
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };

    setShowSignUpModal = (showSignUpModal: boolean) => {
        this.showSignUpModal = showSignUpModal;
    };
}
