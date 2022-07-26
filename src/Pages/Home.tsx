import { Grid } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import SideBlock from "../Components/SideBlock/SideBlock";
import { IUser } from "../types/types";

interface HomeProps {
    height?: string;
    width?: string;
    // onClick: () => void;
}

const Home: FC<HomeProps> = () => {
    // const [users, setUser] = useState<IUser[]>([]);
    // useEffect(() => {
    //     axios
    //         .get<IUser[]>("https://jsonplaceholder.typicode.com/users")
    //         .then((res) => setUser(res.data));
    // }, []);

    return (
        <>
            <Grid flexDirection="row" justifyContent="flex-end" container marginTop={"60px"}>
                <Navigation />
                <SideBlock />
            </Grid>
        </>
    );
};

export default Home;
