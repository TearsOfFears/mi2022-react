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
import { CSSTransition } from "react-transition-group";
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
    const arrRender = [
        {
            text: "VOTING",
            link: "/vote",
            styles: styles.first
        },
        {
            text: "BREEDS",
            link: "/breeds",
            styles: styles.second
        },
        {
            text: "GALLERY",
            link: "/gallery",
            styles: styles.third
        }
    ];
    const handleNavigate = (link: string) => {
        navigate(link);
    };
    return (
        <div className={styles.root}>
            {window.innerWidth < 600 && (
                <>
                    <TextField
                        placeholder="Search for breeds by name"
                        className={
                            text?.length > 0
                                ? styles.activeBorder
                                : styles.textField
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
                    <CSSTransition
                        in={openBurger}
                        timeout={500}
                        transitionLeaveTimeout={3000000}
                        classNames={{
                            enter: styles.enter,
                            enterActive: styles.enterActive,
                            enterDone: styles.enterActive,
                            exitActive: styles.exitActive,
                            exitDone: styles.exitDone,
                            exit: styles.exitDone
                        }}
                        mountOnEnter
                        unmountOnExit
                    >
                        <div>
                            <ButtonIcon onClick={toggleBurger}>
                                <CloseBurger />
                            </ButtonIcon>
                            <ul>
                                {arrRender.map((data, key) => (
                                    <li key={key}>
                                        <Button
                                            active={
                                                data.link === location.pathname
                                            }
                                            onClick={() =>
                                                handleNavigate(data.link)
                                            }
                                        >
                                            {data.text}{" "}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CSSTransition>
                </>
            )}
            <div className={styles.wrapperIcons}>
                {window.innerWidth < 900 && (
                    <ButtonIcon onClick={toggleBurger}>
                        <Burger />
                    </ButtonIcon>
                )}

                {window.innerWidth > 600 && window.innerWidth < 900 && (
                    <>
                        <CSSTransition
                            in={openBurger}
                            timeout={500}
                            transitionLeaveTimeout={3000000}
                            classNames={{
                                enter: styles.enter,
                                enterActive: styles.enterActive,
                                enterDone: styles.enterActive,
                                exitActive: styles.exitActive,
                                exitDone: styles.exitDone,
                                exit: styles.exitDone
                            }}
                            mountOnEnter
                            unmountOnExit
                        >
                            <div>
                                <ButtonIcon onClick={toggleBurger}>
                                    <CloseBurger />
                                </ButtonIcon>
                                <ul>
                                    {arrRender.map((data, key) => (
                                        <li key={key}>
                                            <Button
                                                active={
                                                    data.link ===
                                                    location.pathname
                                                }
                                                onClick={() =>
                                                    handleNavigate(data.link)
                                                }
                                            >
                                                {data.text}{" "}
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CSSTransition>
                        <TextField
                            placeholder="Search for breeds by name"
                            className={
                                text?.length > 0
                                    ? styles.activeBorder
                                    : styles.textField
                            }
                            variant="standard"
                            value={text}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setText(e.target.value)}
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
                    </>
                )}
                <div className={styles.icons}>
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
        </div>
    );
};

export default NavMenu;
