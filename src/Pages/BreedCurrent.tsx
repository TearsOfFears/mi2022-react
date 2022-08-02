import { Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Controls from "../Components/Controls/Controls";
import { SideBlockLayout } from "../Layouts/SideBlockLayout";
import { breedsService } from "./../query/breeds.service";
import Carousel from "react-material-ui-carousel";
import BreedCurrentShow from "../Components/BreedCurrent/BreedCurrentShow";
// interface Breeds {
//     name: object;
// }
const BreedCurrent = () => {
    return (
        <SideBlockLayout>
            <>
                <Controls breedsCurrent={true} />
                <BreedCurrentShow />
            </>
        </SideBlockLayout>
    );
};
export default BreedCurrent;
