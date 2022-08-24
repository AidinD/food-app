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

    showAddTagModal: boolean = false;
    showEditTagModal: boolean = false;

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
            showAddTagModal: observable,
            showEditTagModal: observable,

            // Computed

            // Actions
            setIsLoading: action,
            setShowSideBar: action,
            setShowSignUpModal: action,
            setShowAddMealModal: action,
            setShowViewMealModal: action,
            setShowEditMealModal: action,
            setShowAddTagModal: action,
            setShowEditTagModal: action,
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

    setShowAddTagModal = (showAddTagModal: boolean) => {
        this.showAddTagModal = showAddTagModal;
    };

    setShowEditTagModal = (showEditTagModal: boolean) => {
        this.showEditTagModal = showEditTagModal;
    };
}
