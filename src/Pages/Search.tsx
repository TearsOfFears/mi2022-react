import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import GridCats from "../Components/Breeds/GridCats/GridCats";
import Controls from "../Components/Controls/Controls";
import { SideBlockLayout } from "../Layouts/SideBlockLayout";
import { breedsService } from "../query/breeds.service";

const Search = () => {
    const [params, setParams] = useSearchParams();
    const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
    const {data,isLoading,mutateAsync} = useMutation(["get Search"], breedsService.searchBreed, {
        onSuccess() {
            setImageLoaded(false);
        }
    });
    const text = params.get("q");
    useEffect(() => {
        if (text && text?.length > 0) {
            mutateAsync(text)
        }
    }, [text]);
console.log(data);

    return (
        <SideBlockLayout>
            <>  
            <Controls gallery={true}/>
                <GridCats
                    cats={data}
                    isLoading={isLoading}
                  
                    // imageLoaded={imageLoaded}
                    // setImageLoaded={setImageLoaded}
                />
            </>
        </SideBlockLayout>
    );
};

export default Search;
