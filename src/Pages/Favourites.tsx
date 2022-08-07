import { useQuery } from "@tanstack/react-query";
import React from "react";
import GridCats from "../Components/Breeds/GridCats/GridCats";
import Controls from "../Components/Controls/Controls";
import { SideBlockLayout } from "../Layouts/SideBlockLayout";
import { breedsService } from "../query/breeds.service";

const Favourites = () => {
    const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
    const { data, isLoading } = useQuery(
        ["get Favourite"],
        breedsService.getFavourites,
        {
            onSuccess() {
                setImageLoaded(false);
            }
        }
    );

    return (
        <SideBlockLayout>
            <>
                <Controls nav={true} favourite={true} />
                <GridCats
                    cats={data}
                    isLoading={isLoading}
                    gallery={true}
                    isNav={true}
                    activeFav={false}
                    imageLoaded={imageLoaded}
                    setImageLoaded={setImageLoaded}
                />
            </>
        </SideBlockLayout>
    );
};

export default Favourites;
