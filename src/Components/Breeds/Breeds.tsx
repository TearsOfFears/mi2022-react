import { Grid, Input, Paper } from "@mui/material";
import React from "react";
import { SideBlockLayout } from "../../Layouts/SideBlockLayout";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Breeds.module.scss";
import { ReactComponent as BackArrow } from "./../../assets/icons/backArrow.svg";
import { Button } from "../Button/Button";
import { theme } from "../../theme";
import Controls from "../Controls/Controls";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

interface Breeds {
    name: string;
}
interface GetBreedProps {
    data: Breeds[];
}
const Breeds = () => {
    const handleClick = () => {};
    const fetchCats = async () => {
        return await axios
            .get<GetBreedProps>("https://api.thecatapi.com/v1/breeds")
            .then((res: AxiosResponse) => {
                return res.data;
            });
    };
    const cats = useQuery<Breeds[] | any>(["fetch breeds"], () => fetchCats());
    return (
        <SideBlockLayout>
            <Paper className={styles.root}>
                <Controls breeds={true} />
                <div className={styles.grid}>
                    {!cats.isLoading ? (
                        cats.data.map((data: any, key: number) => {
                            return (
                                <div className={styles.item}>
                                    <img src={data.image?.url} alt="" />
                                    <h1>{key}</h1>
                                </div>
                            );
                        })
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </Paper>
        </SideBlockLayout>
    );
};

export default Breeds;
