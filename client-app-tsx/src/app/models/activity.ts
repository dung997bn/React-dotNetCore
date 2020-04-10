export interface IActivity {
    Id: string,
    Title: string,
    Description: string,
    Category: string,
    Date: string,
    City: string,
    Venue: string,
    IsGoing: boolean,
    IsHost: boolean,
    UserActivities: IAttendee[],
    Comments: IComment[]
}
export interface IComment {
    Id: string,
    Body: string,
    UserName: string,
    DisplayName: string,
    Image: string,
    CreateAt: Date
}

export interface IAttendee {
    UserName: string,
    DisplayName: string,
    Image: string,
    IsHost: boolean
}