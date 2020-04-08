export interface IProfile {
    DisplayName: string,
    UserName: string,
    Image: string,
    Bio: string,
    Photos: IPhoto[]
}

export interface IPhoto {
    Id: string,
    Url: string,
    IsMain: boolean
}