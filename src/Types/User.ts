export type User = {
    id: number;
    name: string;
    share: string; // User[]; // TODO - make this a User[] (maybe)
};

export type UserDTO = {
    name: string;
    share: string; //User[];
};
