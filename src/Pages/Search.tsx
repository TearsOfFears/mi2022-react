import { useMutation, useQueries } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import GridCats from "../Components/Breeds/GridCats/GridCats";
import Controls from "../Components/Controls/Controls";
import { SideBlockLayout } from "../Layouts/SideBlockLayout";
import { breedsService } from "../query/breeds.service";
import queryString from "query-string";
const Search = () => {
    const [params, setParams] = useSearchParams();
    const queryStringSeach = queryString.parse(useLocation().search);
    const text = queryStringSeach.q;
    const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const {
        data: search,
        mutate,
        isLoading
    } = useMutation(["search"], breedsService.searchBreed);

    useEffect(() => {
        if (text && text?.length > 0) {
            mutate(text);
        } else {
            navigate("/");
        }
    }, [text]);

    let test = [];
    if (!isLoading && Array.isArray(search)) {
        test = search.map((data: any, key: number) => {
            return data.reference_image_id;
        });
    }

    const testQ = useQueries({
        queries: test?.map((id: any) => {
            return {
                queryKey: ["image", id],
                queryFn: () => breedsService.getImageById(id)
            };
        })
    });
    const arrLoading = testQ.map((obj) => obj.isLoading).every(val => val===false);
    const arrRender = testQ.map((obj) => obj.data);
    console.log(arrLoading);

    return (
        <SideBlockLayout>
            <>
                <Controls gallery={true} />
                <GridCats
                    cats={arrRender}
                    isLoading={!arrLoading}
                    isNav={true}
                    // imageLoaded={imageLoaded}
                    // setImageLoaded={setImageLoaded}
                />
            </>
        </SideBlockLayout>
    );
};

export default Search;
