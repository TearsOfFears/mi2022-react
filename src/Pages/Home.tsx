import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import UserList from "../Components/UserList";
import { IUser } from "../types/types";

interface HomeProps {
    height?: string;
    width?: string;
    onClick: () => void;
}

const Home: FC<HomeProps> = ({ width, height }) => {
    const [users, setUser] = useState<IUser[]>([]);
    useEffect(() => {
        axios
            .get<IUser[]>("https://jsonplaceholder.typicode.com/users")
            .then((res) => setUser(res.data));
    }, []);

    return (
        <div>
            <UserList users={users} />
        </div>
    );
};

export default Home;
