import { Grid, Paper } from "@mui/material";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Navigation from "../Components/Navigation/Navigation";
import NavMenu from "../Components/NavMenu/NavMenu";
import SideBlock from "../Components/SideBlock/SideBlock";
import styles from "./Layouts.module.scss"
export const SideBlockLayout: FC<{ children: React.ReactElement }> = ({
    children
}) => {
    return (
        <Grid xs={12} lg={5} item paddingRight="30px">
            <NavMenu />
            <Paper className={styles.SideBlock}>{children}</Paper>
        </Grid>
    );
};
