import React, { FC } from 'react';
import { IUser } from '../types/types';
import UserItem from './UserItem';
interface UserListProps{
    users:IUser[]
}
const UserList:FC<UserListProps> = ({users}) => {
    return (
        <div>
            {users.map((data,key)=>
                <UserItem user={data} key={key} />
            )}
        </div>
    );
};

export default UserList;