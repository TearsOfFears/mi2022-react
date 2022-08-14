import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import Logo from "./../../assets/img/Logo.svg";
import { IUser } from "../../types/types";
import { Container } from "@mui/system";
import Vote from "./../../assets/img/vote-table.svg";
import Breeds from "./../../assets/img/pet-breeds.svg";
import Gallery from "./../../assets/img/images-search.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./Navigation.module.scss";
import { Button } from "../Button/Button";

import classNames from "classnames";
const Navigation: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const arrRender = [
        {
            text: "VOTING",
            link: "/vote",
            img: Vote,
            styles: styles.first
        },
        {
            text: "BREEDS",
            link: "/breeds",
            img: Breeds,
            styles: styles.second
        },
        {
            text: "GALLERY",
            link: "/gallery",
            img: Gallery,
            styles: styles.third
        }
    ];
    const handleNavigate = (link: string) => {
        navigate(link);
    };

    return (
        <Grid
            item
            xl={4}
            style={
                window.innerWidth < 1536 ? { width: "100%" } : { width: "auto" }
            }
        >
            <Grid
                container
                flexDirection="column"
                className={classNames(styles.root, {
                    [styles.hide]: location.pathname !== "/"
                })}
            >
                <div className={styles.fixed}>
                    <div className={styles.wrapperNav}>
                        <div>
                            <img src={Logo} />
                        </div>
                        <div>
                            <div className={styles.wrapperText}>
                                <Typography variant="h1">Hi intern!</Typography>
                                <Typography variant="h3">
                                    Welcome to MI 2022 Front-end test
                                </Typography>
                            </div>
                            <Typography>
                                Lets start using The Cat API
                            </Typography>
                            <ul>
                                {arrRender.map((data, key) => (
                                    <li key={key}>
                                        <div className={data.styles}>
                                            <img src={data.img} />
                                        </div>
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
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

export default Navigation;
