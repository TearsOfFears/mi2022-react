import { Grid } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import SideBlock from "../Components/SideBlock/SideBlock";
import styles from "./Layouts.module.scss";
export const MainLayout: FC<{ children: React.ReactElement }> = ({
    children
}) => {
    return (
        <Grid container className={styles.Mainlayout}>
            <Navigation />
            {children}
        </Grid>
    );
};
