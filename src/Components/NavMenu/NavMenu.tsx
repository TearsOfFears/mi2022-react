import { IconButton, Input, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./NavMenu.module.scss";
import { ReactComponent as SearchIcon } from "./../../assets/icons/search.svg";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { ReactComponent as Fav } from "./../../assets/icons/fav.svg";
import { ReactComponent as Like } from "./../../assets/icons/like.svg";
import { ReactComponent as Dislike } from "./../../assets/icons/dislike.svg";
const NavMenu = () => {
    const [text, setText] = useState<string>("");

    return (
        <div className={styles.root}>
            <TextField
                placeholder="Search for breeds by name"
                className={
                    text?.length > 0 ? styles.activeBorder : styles.textField
                }
                variant="standard"
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setText(e.target.value)
                }
                InputProps={{
                    endAdornment: (
                        <InputAdornment
                            position="end"
                            className={styles.InputAdornment}
                        >
                            <button className={styles.iconButton}>
                                <SearchIcon />
                            </button>
                        </InputAdornment>
                    ),
                    disableUnderline: true
                }}
            />
            <div className={styles.wrapperIcons}>
                <ButtonIcon>
                    <Like />
                </ButtonIcon>
                <ButtonIcon>
                    <Fav />
                </ButtonIcon>
                <ButtonIcon>
                    <Dislike />
                </ButtonIcon>
            </div>
        </div>
    );
};

export default NavMenu;
