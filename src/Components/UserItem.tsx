import { Button } from '@mui/material';
import React, { FC } from 'react';
import { IUser } from '../types/types';

interface UserItemProps {
   user:IUser
}

const UserItem:FC<UserItemProps> = ({user}) => {
    const handleClick  = (e:React.MouseEvent)=>{
        e.preventDefault()
    }
    return (
        <div style={{border:"1px solid black"}}>
            <h4>{user.id}</h4>
            <h2>{user.name}</h2>
            <h2>{user.username}</h2>
            <h3>{user.email}</h3>
            <Button onClick={handleClick} variant={'contained'}>Click</Button>
        </div>
    );
};

export default UserItem;