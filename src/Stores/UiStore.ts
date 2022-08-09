import { makeAutoObservable, observable, action } from "mobx";
import RootStore from "./RootStore";

export class UiStore {
    rootStore: RootStore;

    isLoading: boolean = false;

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
            showSignUpModal: observable,
            showAddMealModal: observable,
            showViewMealModal: observable,
            showEditMealModal: observable,

            // Computed

            // Actions
            setIsLoading: action,
            setShowSignUpModal: action,
            setShowAddMealModal: action,
            setShowViewMealModal: action,
            setShowEditMealModal: action,
        });
    }

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
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
