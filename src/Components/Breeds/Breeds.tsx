import { Grid, Input, Paper } from "@mui/material";
import React from "react";
import { SideBlockLayout } from "../../Layouts/SideBlockLayout";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Breeds.module.scss";
import { ReactComponent as BackArrow } from "./../../assets/icons/backArrow.svg";
import { Button } from "../Button/Button";
import { theme } from "../../theme";
const Breeds = () => {
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
                        bgColor={theme.palette.primary.light}
                        color={theme.palette.primary.main}
                        width="150px"
                    >
                        Breeds
                    </Button>
                </div>
            </Paper>
        </SideBlockLayout>
    );
};

export default Breeds;
