import { Grid, Input, Paper } from "@mui/material";
import React from "react";
import { SideBlockLayout } from "../../Layouts/SideBlockLayout";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Vote.module.scss";
import { ReactComponent as BackArrow } from "./../../assets/icons/backArrow.svg";
import { Button } from "../Button/Button";
import { theme } from "../../theme";


const Vote = () => {
    const handleClick = () => {};

    return (
        <SideBlockLayout>
            <Paper className={styles.root}>
                <div className={styles.wrapperButton}>
                    <ButtonIcon
                        size={40}
                        radius={10}
                        bgColor={theme.palette.primary.light}
                    >
                        <BackArrow />
                    </ButtonIcon>
                    <Button
                        fontWeight={600}
                        onClick={handleClick}
                        customStyle={true}
                    >
                        VOTING
                    </Button>
                </div>
            </Paper>
        </SideBlockLayout>
    );
};

export default Vote;
