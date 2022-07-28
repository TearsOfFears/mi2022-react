import React, { FC, useEffect, useMemo, useState } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Controls.module.scss";
import { ReactComponent as BackArrow } from "./../../assets/icons/backArrow.svg";
import { ReactComponent as SortDesc } from "./../../assets/icons/sortAsc.svg";
import { ReactComponent as SortAsc } from "./../../assets/icons/sortDesc.svg";
import { Button } from "../Button/Button";
import { theme } from "../../theme";
import { useLocation } from "react-router-dom";
import { MenuItem, Select, Skeleton } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

interface ControlsProps {
    voting?: boolean;
    breeds?: boolean;
    gallery?: boolean;
}

interface Breeds {
    name: string;
}

interface GetBreedProps {
    data: Breeds[];
}

const Controls: FC<ControlsProps> = ({ voting, breeds, gallery }) => {
    const handleClick = () => {};
    // const [data, setData] = useState<Breeds[] | any[]>([]);
    const [breed, setBreed] = useState<string>("All breeds");
    const [limit, setLimit] = useState<number>(5);

    const [asc, setAsc] = useState<boolean>(false);
    const [desc, setDesc] = useState<boolean>(false);

    const fetchBreeds = async () => {
        return await axios
            .get<GetBreedProps>("https://api.thecatapi.com/v1/breeds")
            .then((res: AxiosResponse) => {
                return res.data;
            });
    };
    const { data, isLoading } = useQuery<Breeds[] | any>(["fetch breeds"], () =>
        fetchBreeds()
    );

    const breedsArr = !isLoading && data.map((obj: any) => obj.name);
    // breedsArr.unshift("All breeds");

    
    return (
        <>
            {voting && (
                <div className={styles.rootVoting}>
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
            )}
            {breeds && (
                <div className={styles.rootBreeds}>
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
                        breeds
                    </Button>
                    {!isLoading ? (
                        <select
                            value={breed}
                            className={styles.selectMenu}
                            onChange={(e) => setBreed(e.target.value)}
                        >
                            {breedsArr.map((data: string, key: number) => [
                                <option value={data} key={key}>
                                    {data}
                                </option>
                            ])}
                        </select>
                    ) : (
                        <Skeleton
                            variant="rectangular"
                            height={35}
                            width={230}
                        />
                    )}

                    <select
                        value={limit}
                        className={styles.selectMenu}
                        onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value="5" selected>
                            Limit: 5
                        </option>
                        <option value="10">Limit: 10</option>
                        <option value="15">Limit: 15</option>
                        <option value="20">Limit: 20</option>
                    </select>
                    <ButtonIcon controls={true}>
                        <SortAsc />
                    </ButtonIcon>
                    <ButtonIcon controls={true}>
                        <SortDesc />
                    </ButtonIcon>
                </div>
            )}
            {gallery && (
                <div className={styles.rootGallery}>
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
                        breeds
                    </Button>
                </div>
            )}
        </>
    );
};

export default Controls;
