import React from "react";
import Controls from "../Components/Controls/Controls";
import GalleryShow from "../Components/Gallery/GalleryShow";
import { SideBlockLayout } from "../Layouts/SideBlockLayout";

const Gallery = () => {
    return (
        <SideBlockLayout>
            <>
                <Controls gallery={true} />
                <GalleryShow/>
            </>
        </SideBlockLayout>
    );
};

export default Gallery;
