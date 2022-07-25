
export interface IAddress {
    street:number;
    city:string;
    zipcode:string;
}

export interface IUser {
    id:number;
    name:string;
    username:string;
    email:string;
    address:IAddress
}