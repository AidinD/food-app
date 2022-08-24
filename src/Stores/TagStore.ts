import { makeAutoObservable, observable, action } from "mobx";
import { Tag } from "../Types/Meal";
import RootStore from "./RootStore";
import { UiStore } from "./UiStore";
import configData from "../Config/config.json";
import { ResponseJson } from "../Types/Shared";
import { showNotification } from "../Utils/Notification";
import { UserStore } from "./UserStore";

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
            setTextFilter: action,
        });
    }

    get allTags() {
        return this.tags;
    }

    get filteredTags() {
        return this.tagsFiltered;
    }

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

        console.log("tagfilter", tagFilter);

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
}
