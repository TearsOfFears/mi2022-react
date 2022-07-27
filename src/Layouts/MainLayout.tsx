import { Grid } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import SideBlock from "../Components/SideBlock/SideBlock";


export const MainLayout:FC<{children:React.ReactElement}> = ({children}) => {
    return (
        <Grid
            flexDirection="row"
            justifyContent="flex-end"
            container
            marginTop={"35px"}
        >
            <Navigation />
          {children}
        </Grid>
    );
};
