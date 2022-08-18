import { makeAutoObservable, observable, action } from "mobx";
import RootStore from "./RootStore";

export class UiStore {
    rootStore: RootStore;

    isLoading: boolean = false;

    showSideBar: boolean = false;

    // Modals
    showSignUpModal: boolean = false;
    showAddMealModal: boolean = false;
    showViewMealModal: boolean = false;
    showEditMealModal: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            // Observables
            isLoading: observable,
            showSideBar: observable,
            showSignUpModal: observable,
            showAddMealModal: observable,
            showViewMealModal: observable,
            showEditMealModal: observable,

            // Computed

            // Actions
            setIsLoading: action,
            setShowSideBar: action,
            setShowSignUpModal: action,
            setShowAddMealModal: action,
            setShowViewMealModal: action,
            setShowEditMealModal: action,
        });
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };

    setShowSideBar = (showSideBar: boolean) => {
        this.showSideBar = showSideBar;
    };

    setShowSignUpModal = (showSignUpModal: boolean) => {
        this.showSignUpModal = showSignUpModal;
    };

    setShowAddMealModal = (showAddMealModal: boolean) => {
        this.showAddMealModal = showAddMealModal;
    };

    setShowViewMealModal = (showViewMealModal: boolean) => {
        this.showViewMealModal = showViewMealModal;
    };

    setShowEditMealModal = (showEditMealModal: boolean) => {
        this.showEditMealModal = showEditMealModal;
    };
}
