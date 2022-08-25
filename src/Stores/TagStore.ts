import { makeAutoObservable, observable, action } from "mobx";
import { Tag, TagDTO } from "../Types/Meal";
import RootStore from "./RootStore";
import { UiStore } from "./UiStore";
import configData from "../Config/config.json";
import { ResponseJson } from "../Types/Shared";
import { showNotification } from "../Utils/Notification";
import { UserStore } from "./UserStore";
import { AddUserToTagDTO } from "../Types/MealMapper";

export class TagStore {
    rootStore: RootStore;
    uiStore: UiStore;
    userStore: UserStore;

    tags: Tag[] = [];
    tagsFiltered: Tag[] = [];
    selectedTag: Tag | undefined = undefined;

    textFilter: string = "";
    tagFilter: number[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.uiStore = rootStore.uiStore;
        this.userStore = rootStore.userStore;

        makeAutoObservable(this, {
            // Observables
            tags: observable,
            tagsFiltered: observable,
            selectedTag: observable,
            textFilter: observable,
            tagFilter: observable,

            // Computed

            // Actions
            loadTags: action,
            setTags: action,
            setSelectedTag: action,
            setTextFilter: action,
            setTagFilter: action,
        });
    }

    get allTags() {
        return this.tags;
    }

    get filteredTags() {
        return this.tagsFiltered;
    }

    setSelectedTag = (tag: Tag) => {
        this.selectedTag = tag;
    };

    setFilteredTags = (tags: Tag[]) => {
        this.tagsFiltered = tags.sort((a, b) => a.name.localeCompare(b.name));
    };

    setTags = (tags: Tag[]) => {
        this.tags = tags.sort((a, b) => a.name.localeCompare(b.name));
    };

    setTextFilter = (text: string) => {
        this.textFilter = text;
    };

    setTagFilter = (tagIds: number[]) => {
        this.tagFilter = tagIds;
    };

    clearFilters = () => {
        this.setTextFilter("");
        this.setTagFilter([]);
    };

    filterTags = () => {
        const tagFilter: Tag[] = this.tags.filter((tag) => {
            return this.tagFilter.every((tagId) => {
                return tag.id === tagId;
            });
        });

        const textFilter = tagFilter.filter((tag) => {
            return tag.name
                .toLowerCase()
                .includes(this.textFilter.toLowerCase());
        });

        this.setFilteredTags([...textFilter]);
    };

    loadTags = async () => {
        this.uiStore.setIsLoading(true);

        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "tags",
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                this.setTags(dataJson.data as Tag[]);
            } else throw new Error(dataJson.data.message);
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
        } finally {
            this.uiStore.setIsLoading(false);
            this.filterTags();
        }
    };

    addTag = async (tag: TagDTO): Promise<boolean> => {
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(
                AddUserToTagDTO(tag, this.userStore.currentUser!.id)
            ),
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "tag",
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                showNotification(
                    "Success",
                    "Tag was successfully added",
                    "success",
                    3
                );
                this.uiStore.setShowAddTagModal(false);
                return Promise.resolve(true);
            } else throw new Error(dataJson.data.message);
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
            return Promise.resolve(false);
        } finally {
            this.uiStore.setIsLoading(false);
            this.loadTags();
        }
    };

    updateTag = async (tag: Tag): Promise<boolean> => {
        const requestOptions = {
            method: "PUT",
            body: JSON.stringify(tag),
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "tag/" + tag.id,
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                showNotification(
                    "Success",
                    "Tag was successfully updated",
                    "success",
                    3
                );
                this.uiStore.setShowEditTagModal(false);
                return Promise.resolve(true);
            } else throw new Error(dataJson.data.message);
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
            return Promise.resolve(false);
        } finally {
            this.uiStore.setIsLoading(false);
            this.loadTags();
        }
    };

    deleteTag = async (tag: Tag): Promise<boolean> => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };

        try {
            const response = await fetch(
                configData.SERVER_URL + "tag/" + tag.id,
                requestOptions
            );
            const dataJson: ResponseJson = await response.json();
            if (response.status === 200) {
                showNotification(
                    "Success",
                    "Tag was successfully deleted",
                    "success",
                    3
                );
                return Promise.resolve(true);
            } else throw new Error(dataJson.data.message);
        } catch (error: any) {
            showNotification(error.toString(), "", "error", 0);
            return Promise.resolve(false);
        } finally {
            this.uiStore.setIsLoading(false);
            this.loadTags();
        }
    };
}
