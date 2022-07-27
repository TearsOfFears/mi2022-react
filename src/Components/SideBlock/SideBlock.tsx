import { Box, Grid, Paper } from "@mui/material";
import React, { FC } from "react";
import GirlHome from "./../../assets/img/girl-and-pet 1.svg";
import styles from "./Sideblock.module.scss";
const SideBlock: FC = () => {
    return (
        <Grid
            item
            xs={6}
            justifyContent="flex-end"
            marginRight={0}
            paddingRight={0}
            className={styles.root}
        >
            <div className={styles.mainWrapper}>
                <Paper className={styles.wrapper} />
                <img src={GirlHome} />
            </div>
        </Grid>
    );
};

export default SideBlock;
