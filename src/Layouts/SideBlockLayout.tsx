import { Grid } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import NavMenu from "../Components/NavMenu/NavMenu";
import SideBlock from "../Components/SideBlock/SideBlock";

export const SideBlockLayout:FC<{children:React.ReactElement}> = ({children}) => {
    return (
        <Grid xs={6} item paddingRight="30px" >
            <NavMenu />
                {children}
        </Grid>
    );
};
