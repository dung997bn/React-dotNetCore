import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed } from "mobx";
import { IProfile, IPhoto } from "../models/profile";
import agent from "../api/agent";

export default class ProfileStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable profile: IProfile | null = null
    @observable loadingProfile = true;
    @observable uploadingPhoto = false;
    @observable loading = false;

    @computed get isCurrentUser() {
        if (this.rootStore.userStore.user && this.profile) {
            return this.rootStore.userStore.user.UserName === this.profile.UserName
        } else {
            return false;
        }
    }

    @action loadProfile = async (UserName: string) => {
        try {
            const profile = await agent.Profiles.get(UserName);
            runInAction(() => {
                this.profile = profile
                this.loadingProfile = false
            })
        } catch (error) {
            runInAction(() => {
                this.loadingProfile = false
            })
            console.log(error);

        }
    }

    @action uploadPhoto = async (file: Blob) => {
        this.uploadingPhoto = true;
        try {
            const photo = await agent.Profiles.uploadPhoto(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.Photos.push(photo);
                    if (photo.IsMain && this.rootStore.userStore.user) {
                        this.rootStore.userStore.user.Image = photo.Url
                        this.profile.Image = photo.Url
                    }
                }

            })
        } catch (error) {
            runInAction(() => {
                this.uploadingPhoto = false
            })
            console.log(error);
        }
    }

    @action setMainPhoto = async (photo: IPhoto) => {
        this.loading = true
        try {
            await agent.Profiles.setMainPhoto(photo.Id);
            runInAction(() => {
                this.rootStore.userStore.user!.Image = photo.Url;
                this.profile!.Photos.find(a => a.IsMain)!.IsMain = false;
                this.profile!.Photos.find(a => a.Id === photo.Id)!.IsMain = true;
                this.profile!.Image = photo.Url;
                this.loading = false
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false
            })
            console.log(error);
        }
    }

    @action deletePhoto = async (photo: IPhoto) => {
        this.loading = true
        try {
            await agent.Profiles.deletePhoto(photo.Id)
            runInAction(() => {
                this.profile!.Photos = this.profile!.Photos.filter(a => a.Id !== photo.Id);
                this.loading = false
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false
            })
            console.log(error);
        }
    }
}