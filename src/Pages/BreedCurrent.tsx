import { Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Controls from "../Components/Controls/Controls";
import { SideBlockLayout } from "../Layouts/SideBlockLayout";
import { breedsService } from "./../query/breeds.service";
// interface Breeds {
//     name: object;
// }
const BreedCurrent = () => {
    const { id } = useParams();
    console.log(id);

    const { data,isLoading } = useQuery(["fetch breeds"], () =>
        breedsService.getCurrentCat(id)
    );
    console.log(data);

    return (
        <SideBlockLayout>
            <>
                <Controls breeds={true} />
                {!isLoading && data.name}
            </>
        </SideBlockLayout>
    );
};
export default BreedCurrent;
