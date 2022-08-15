import { IconButton, Input, InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./NavMenu.module.scss";
import stylesPortal from "./../../Components/Portal/Portal.module.scss";
import { ReactComponent as SearchIcon } from "./../../assets/icons/search.svg";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { ReactComponent as Fav } from "./../../assets/icons/fav.svg";
import { ReactComponent as Like } from "./../../assets/icons/like.svg";
import { ReactComponent as Dislike } from "./../../assets/icons/dislike.svg";
import { ReactComponent as Burger } from "./../../assets/icons/Burger.svg";
import { ReactComponent as CloseBurger } from "./../../assets/icons/CloseBurger.svg";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import classNames from "classnames";
import Vote from "./../../assets/img/vote-table.svg";
import Breeds from "./../../assets/img/pet-breeds.svg";
import Gallery from "./../../assets/img/images-search.svg";
import { CSSTransition } from "react-transition-group";
import PortalModal from "./../Portal/PortalModal";
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
            img: Vote,
            styles: stylesPortal.first
        },
        {
            text: "BREEDS",
            link: "/breeds",
            img: Breeds,
            styles: stylesPortal.second
        },
        {
            text: "GALLERY",
            link: "/gallery",
            img: Gallery,
            styles: stylesPortal.third
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
                    <PortalModal
                        toggleBurger={toggleBurger}
                        openBurger={openBurger}
                    >
                        <ul>
                            {arrRender.map((data, key) => (
                                <li key={key}>
                                    <Button
                                        active={data.link === location.pathname}
                                        onClick={() =>
                                            handleNavigate(data.link)
                                        }
                                    >
                                        {data.text}{" "}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </PortalModal>
                </>
            )}
            <div className={styles.wrapperIcons}>
                <div className={styles.burgerSearch}>
                    {window.innerWidth < 1535 && (
                        <ButtonIcon onClick={toggleBurger} size={60}>
                            <Burger />
                        </ButtonIcon>
                    )}

                    {window.innerWidth > 600 && window.innerWidth < 1536 ? (
                        <>
                            <PortalModal
                                toggleBurger={toggleBurger}
                                openBurger={openBurger}
                            >
                                <ul>
                                    {arrRender.map((data, key) => (
                                        <li key={key}>
                                            <div className={data.styles}>
                                                <img src={data.img} />
                                            </div>
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
                            </PortalModal>
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
                    ) : (
                        window.innerWidth >600 && (
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
                        )
                      
                    )}
                </div>
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
