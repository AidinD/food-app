import { makeAutoObservable, observable, action } from "mobx";
import RootStore from "./RootStore";

export class UiStore {
    rootStore: RootStore;

    showSignUpModal: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            // Observables
            showSignUpModal: observable,

            // Computed

            // Actions
            setShowSignUpModal: action,
        });
    }

    setShowSignUpModal = (showSignUpModal: boolean) => {
        this.showSignUpModal = showSignUpModal;
    };
}
