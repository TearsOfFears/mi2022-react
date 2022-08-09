import { IconButton, Input, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./NavMenu.module.scss";
import { ReactComponent as SearchIcon } from "./../../assets/icons/search.svg";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { ReactComponent as Fav } from "./../../assets/icons/fav.svg";
import { ReactComponent as Like } from "./../../assets/icons/like.svg";
import { ReactComponent as Dislike } from "./../../assets/icons/dislike.svg";
import { ReactComponent as Burger } from "./../../assets/icons/Burger.svg";
import { ReactComponent as CloseBurger } from "./../../assets/icons/CloseBurger.svg";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import classNames from "classnames";
const NavMenu = () => {
    const [params, setParams] = useSearchParams();
    const [text, setText] = useState<string | any>("");
    const [openBurger, setOpenBurger] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const textQuery = params.get("q");

    const handleSearch = () => {
        navigate(`/search?q=${text}`);
    };
    useEffect(() => {
        setText(textQuery);
    }, [textQuery]);
    const toggleBurger = () => {
        setOpenBurger(!openBurger);
    };
    console.log();

    return (
        <div className={styles.root}>
            {window.innerWidth < 768 && (
                <>
                    <ButtonIcon onClick={toggleBurger}>
                        <Burger />
                    </ButtonIcon>
                    <div
                        className={classNames(styles.hide, {
                            [styles.open]: openBurger
                        })}
                    >
                        <ButtonIcon onClick={toggleBurger}>
                            <CloseBurger />
                        </ButtonIcon>
                    </div>
                </>
            )}

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
                            <button
                                className={styles.iconButton}
                                onClick={() => handleSearch()}
                            >
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
                    activeFav={location.pathname === "/likes"}
                >
                    <Like />
                </ButtonIcon>
                <ButtonIcon
                    onClick={() => navigate("/favourites")}
                    activeFav={location.pathname === "/favourites"}
                >
                    <Fav />
                </ButtonIcon>
                <ButtonIcon
                    onClick={() => navigate("/dislikes")}
                    activeFav={location.pathname === "/dislikes"}
                >
                    <Dislike />
                </ButtonIcon>
            </div>
        </div>
    );
};

export default NavMenu;
