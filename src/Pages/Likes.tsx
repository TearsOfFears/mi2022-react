import { useQuery } from "@tanstack/react-query";
import React from "react";
import GridCats from "../Components/Breeds/GridCats/GridCats";
import Controls from "../Components/Controls/Controls";
import { SideBlockLayout } from "../Layouts/SideBlockLayout";
import { breedsService } from "../query/breeds.service";

const Likes = () => {
    const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
    const getLikes = useQuery(["get Likes"], breedsService.getVotes, {
        onSuccess() {
            setImageLoaded(false);
        }
    });

    return (
        <SideBlockLayout>
            <>
                <Controls nav={true} likes={true} />
                <GridCats
                    cats={
                        !getLikes.isLoading &&
                        getLikes.data.filter((data: any) => data.value === 1)
                    }
                    isLoading={getLikes.isLoading}
                    gallery={true}
                    isNav={false}
                    imageLoaded={imageLoaded}
                    setImageLoaded={setImageLoaded}
                />
            </>
        </SideBlockLayout>
    );
};

export default Likes;
