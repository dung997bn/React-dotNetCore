import { IActivity } from "./../models/activity";
import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable activity: IActivity | null = null;
  @observable editMode: boolean = false;
  @observable submitting: boolean = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.Date) - Date.parse(b.Date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const response = await agent.Activities.list();
      runInAction("loading activities", () => {
        response.forEach((activity: IActivity) => {
          activity.Date = activity.Date.split(".")[0];
          this.activityRegistry.set(activity.Id, activity);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction("loading activities error", () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadActivityDetail = async (Id: string) => {
    let activity = this.getActivity(Id);
    if (activity) this.activity = activity;
    else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(Id);
        runInAction("getting activity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("getting activity error", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  getActivity = (Id: string) => {
    return this.activityRegistry.get(Id);
  };

  @action clearActivity = () => {
    this.activity = null;
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction("creating activity", () => {
        this.activityRegistry.set(activity.Id, activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("creating activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("editting activity", () => {
        this.activityRegistry.set(activity.Id, activity);
        this.activity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("editting activity error", () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    Id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(Id);
      runInAction("deleting activity", () => {
        this.activityRegistry.delete(Id);
        this.submitting = false;
        this.target = "";
      });
    } catch (error) {
      runInAction("deleting activity error", () => {
        this.submitting = false;
        this.target = "";
      });
      console.log(error);
    }
  };

  @action openEditForm = (Id: string) => {
    this.activity = this.activityRegistry.get(Id);
    this.editMode = true;
  };
  @action openCreateForm = () => {
    this.editMode = true;
    this.activity = null;
  };

  @action cancelSelectedActivity = () => {
    this.activity = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectActivity = (Id: string) => {
    this.activity = this.activityRegistry.get(Id);
    this.editMode = false;
  };
}

export default createContext(new ActivityStore());
