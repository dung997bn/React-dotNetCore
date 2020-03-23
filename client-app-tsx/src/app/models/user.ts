export interface IUser {
  UserName: string;
  DisplayName: string;
  Token: string;
  Image?: string;
}

export interface IUserFormValues {
  Email: string;
  Password: string;
  UserName?: string;
  DisplayName?: string;
}
