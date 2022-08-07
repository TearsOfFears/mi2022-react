import { IconButton, Input, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./NavMenu.module.scss";
import { ReactComponent as SearchIcon } from "./../../assets/icons/search.svg";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { ReactComponent as Fav } from "./../../assets/icons/fav.svg";
import { ReactComponent as Like } from "./../../assets/icons/like.svg";
import { ReactComponent as Dislike } from "./../../assets/icons/dislike.svg";
import { useLocation, useNavigate } from "react-router-dom";
const NavMenu = () => {
    const [text, setText] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = () => {
        navigate(`/search?q=${text}`);
    };
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
                            <button className={styles.iconButton} onClick={()=>handleSearch()}>
                                <SearchIcon />
                            </button>
                        </InputAdornment>
                    ),
                    disableUnderline: true
                }}
            />
            <div className={styles.wrapperIcons}>
                <ButtonIcon
                    onClick={() => navigate("/likes")}
                    active={location.pathname === "/likes"}
                >
                    <Like />
                </ButtonIcon>
                <ButtonIcon
                    onClick={() => navigate("/favourites")}
                    active={location.pathname === "/favourites"}
                >
                    <Fav />
                </ButtonIcon>
                <ButtonIcon
                    onClick={() => navigate("/dislikes")}
                    active={location.pathname === "/dislikes"}
                >
                    <Dislike />
                </ButtonIcon>
            </div>
        </div>
    );
};

export default NavMenu;
