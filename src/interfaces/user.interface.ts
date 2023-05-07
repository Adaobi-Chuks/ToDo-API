interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
}

type IUserOpt = Omit<IUser, 'id'>;

export {
    IUser,
    IUserOpt
};