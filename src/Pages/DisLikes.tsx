import { useQuery } from "@tanstack/react-query";
import React from "react";
import GridCats from "../Components/Breeds/GridCats/GridCats";
import Controls from "../Components/Controls/Controls";
import { SideBlockLayout } from "../Layouts/SideBlockLayout";
import { breedsService } from "../query/breeds.service";

const DisLikes = () => {
    const [imageLoaded, setImageLoaded] = React.useState<boolean>(false);
    const getDislikes = useQuery(["get Dislikes"], breedsService.getVotes, {
        onSuccess() {
            setImageLoaded(false);
        }
    });

    return (
        <SideBlockLayout>
            <>
                <Controls nav={true} dislikes={true} />
                <GridCats
                    cats={
                        !getDislikes.isLoading &&
                        getDislikes.data.filter(
                            (data: any) => data.value === -1
                        )
                    }
                    isLoading={getDislikes.isLoading}
                    gallery={true}
                    imageLoaded={imageLoaded}
                    setImageLoaded={setImageLoaded}
                />
            </>
        </SideBlockLayout>
    );
};

export default DisLikes;
