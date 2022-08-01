import { Grid, Input, Paper } from "@mui/material";
import React from "react";
import { SideBlockLayout } from "../../Layouts/SideBlockLayout";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Vote.module.scss";
import { ReactComponent as BackArrow } from "./../../assets/icons/backArrow.svg";
import { Button } from "../Button/Button";
import { theme } from "../../theme";
import Controls from "../Controls/Controls";


const Vote = () => {
    const handleClick = () => {};

    return (
        <SideBlockLayout>
                <Controls voting={true}/>
        </SideBlockLayout>
    );
};

export default Vote;
