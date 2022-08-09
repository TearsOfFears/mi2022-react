import { Grid, Input, Paper } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { SideBlockLayout } from "../../Layouts/SideBlockLayout";
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
    const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
    const handleClick = () => {};
    const refresh = useRefresh();
    const test = searchParams.get("breed");
    const limit = searchParams.get("limit");
    const order = searchParams.get("order");

    const breedChange = useMutation(breedsService.getBreedsById, {
        onSuccess() {
            setImageLoaded(false);
        }
    });
    useEffect(() => {
        breedChange.mutateAsync({
            breedId: searchParams.get("breed"),
            limit: searchParams.get("limit"),
            order: searchParams.get("order")
        });
    }, [test, limit, order]);
    console.log(breedChange.isLoading);
    
    return (
        <SideBlockLayout>
            <>
                <Controls breeds={true} />
                <GridCats
                    cats={breedChange.data}
                    isLoading={breedChange.isLoading}
                    isNav={true}
                    imageLoaded={imageLoaded}
                    setImageLoaded={setImageLoaded}
                />
            </>
        </SideBlockLayout>
    );
};

export default Breeds;
