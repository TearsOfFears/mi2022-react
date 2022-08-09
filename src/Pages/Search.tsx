import { useMutation, useQueries } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import GridCats from "../Components/Breeds/GridCats/GridCats";
import Controls from "../Components/Controls/Controls";
import { SideBlockLayout } from "../Layouts/SideBlockLayout";
import { breedsService } from "../query/breeds.service";
import queryString from "query-string";
import { Typography } from "@mui/material";
const Search = () => {
    const [params, setParams] = useSearchParams();
    const queryStringSeach = queryString.parse(useLocation().search);
    const text = queryStringSeach.q;
    const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
    // const [arr, setArr] = React.useState<any>([]);
    const navigate = useNavigate();
    const {
        data: search,
        mutate,
        isSuccess,
        isLoading
    } = useMutation(["search"], breedsService.searchBreed);

    useEffect(() => {
        if (text && text?.length > 0) {
            mutate(text);
        } else {
            navigate("/");
        }
    }, [text]);
    let arr = [];
    if (!isLoading && Array.isArray(search)) {
        arr = search.map((data: any, key: number) => {
            return data.reference_image_id;
        });
    }
    const testQ = useQueries({
        queries: (isLoading ? [...Array(5)] : arr).map((id: any) => {
            return {
                queryKey: ["image", id],
                queryFn: () => breedsService.getImageById(id)
            };
        })
    });

    const arrLoading = testQ.some((result) => result.isLoading);
    const arrRender = testQ.map((obj) => obj.data);

    return (
        <SideBlockLayout>
            <>
                <Controls nav={true} searchP={true} />

                <Typography
                    mt="15px"
                    style={{ fontSize: "23px", color: " #8c8c8c" }}
                >
                    Search results for:{" "}
                    <span style={{ fontWeight: "600", color: " #1d1d1d" }}>
                        {text}
                    </span>
                </Typography>

                <GridCats
                    cats={arrRender}
                    isLoading={arrLoading}
                    isNav={true}
                    // imageLoaded={imageLoaded}
                    // setImageLoaded={setImageLoaded}
                />
            </>
        </SideBlockLayout>
    );
};

export default Search;
