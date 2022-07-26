import { Box, Grid, Paper } from "@mui/material";
import React, { FC } from "react";
import GirlHome from "./../../assets/img/girl-and-pet 1.svg";
import styles from "./Sideblock.module.scss"
const SideBlock: FC = () => {
    return (
        <Grid item  justifyContent="center" className={styles.root }>
            <Paper className={styles.wrapper }/>
            <img src={GirlHome} />
        </Grid>
    );
};

export default SideBlock;
