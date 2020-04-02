import { IUser } from './../models/user';
import { IActivity, IAttendee } from './../models/activity';
export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.IsGoing = activity.UserActivities.some(a => a.UserName === user.UserName);
    activity.IsHost = activity.UserActivities.some(
        a => a.UserName === user.UserName && a.IsHost
    )
    return activity
}


export const createAttendee = (user: IUser): IAttendee => {
    return {
        DisplayName: user.UserName,
        IsHost: false,
        UserName: user.UserName,
        Image: user.Image!
    }
}