import { Grid, Input, Paper } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { SideBlockLayout } from "../../Layouts/SideBlockLayout";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./Breeds.module.scss";
import { ReactComponent as BackArrow } from "./../../assets/icons/backArrow.svg";
import { Button } from "../Button/Button";
import { theme } from "../../theme";
import Controls from "../Controls/Controls";
import axios, { AxiosResponse } from "axios";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import GridCats from "./GridCats/GridCats";
import { breedsService } from "../../query/breeds.service";
import { useLocation, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useRefresh } from "../../hooks/useRefresh";
interface Breeds {
    name: string;
}
interface GetBreedProps {
    data: Breeds[];
}
const Breeds = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryStringSeach = queryString.parse(useLocation().search);
    const handleClick = () => {};
    const refresh = useRefresh();
    // const cats = useQuery<Breeds[] | any>(
    //     ["fetch cats"],
    //     breedsService.getAllCats
    // );
    const test = searchParams.get("breed");
    const limit = searchParams.get("limit");
    const order = searchParams.get("order");

    const breedChange = useMutation(breedsService.getBreedsById);
    useEffect(() => {
        breedChange.mutateAsync({
            breedId: searchParams.get("breed"),
            limit: searchParams.get("limit"),
            order: searchParams.get("order")
        });
    }, [test, limit, order]);

    return (
        <SideBlockLayout>
            <>
                <Controls breeds={true} />
                <GridCats
                    cats={breedChange.data}
                    isLoading={breedChange.isLoading}
                />
            </>
        </SideBlockLayout>
    );
};

export default Breeds;
