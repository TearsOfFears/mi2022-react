import React, {
    FC,
    ReactEventHandler,
    useEffect,
    useMemo,
    useState
} from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Controls.module.scss";
import { ReactComponent as BackArrow } from "./../../assets/icons/backArrow.svg";
import { ReactComponent as SortDesc } from "./../../assets/icons/sortAsc.svg";
import { ReactComponent as SortAsc } from "./../../assets/icons/sortDesc.svg";
import { Button } from "../Button/Button";
import { theme } from "../../theme";
import { useLocation, useSearchParams } from "react-router-dom";
import { MenuItem, Select, Skeleton } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { breedsService } from "../../query/breeds.service";
import { useRefresh } from "../../hooks/useRefresh";

interface ControlsProps {
    voting?: boolean;
    breeds?: boolean;
    gallery?: boolean;
    breedsCurrent?: boolean;
}

interface Breeds {
    name: string;
}

interface GetBreedProps {
    data: Breeds[];
}

const Controls: FC<ControlsProps> = ({
    voting,
    breeds,
    gallery,
    breedsCurrent
}) => {
    const handleClick = () => {};

    const [breed, setBreed] = useState<string>("");
    const [limit, setLimit] = useState<number>(5);

    const [order, setOrder] = useState<string>("");
    const search = useLocation().search;
    const [searchParams, setSearchParams] = useSearchParams();

    const { data, isLoading } = useQuery<Breeds[] | any>(
        ["fetch breeds"],
        breedsService.getAllCats
    );

    const breedsArr =
        !isLoading &&
        data.map((obj: any) => ({ value: obj.id, nameBreed: obj.name }));

    useEffect(() => {
        searchParams.set("breed", breed);
        searchParams.set("limit", String(limit));
        searchParams.set("order", order);
        setSearchParams(searchParams);
    }, [breed, limit, order]);

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
            {breedsCurrent && (
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
                            {breedsArr.map((data: any, key: number) => [
                                <option value={data.value} key={key}>
                                    {data.nameBreed}
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
                    <ButtonIcon
                        controls={true}
                        active={searchParams.get("order") === "DESC"}
                        onClick={() => setOrder("DESC")}
                    >
                        <SortAsc />
                    </ButtonIcon>
                    <ButtonIcon
                        controls={true}
                        active={searchParams.get("order") === "ASC"}
                        onClick={() => setOrder("ASC")}
                    >
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
