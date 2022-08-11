import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Controls from "../../Components/Controls/Controls";
import { SideBlockLayout } from "../../Layouts/SideBlockLayout";
import { breedsService } from "./../../query/breeds.service";
import Carousel from "react-material-ui-carousel";
import styles from "./BreedCurrent.module.scss";
const BreedCurrentShow = () => {
    const { id } = useParams();

    const { data: dataBreed, isLoading } = useQuery(
        ["fetch current Breed"],
        () => breedsService.getCurrentCat(id)
    );
    const { data: imgData, isLoading: imgLoading } = useQuery(
        ["fetch current Image for Breed"],
        () => breedsService.getImagesForCurrentCat(id)
    );
    console.log(dataBreed);
    console.log(imgData);
    return (
        <div className={styles.root}>
            <Carousel
                stopAutoPlayOnHover={true}
                swipe={true}
                fullHeightHover={false}
                navButtonsAlwaysInvisible
                indicators={true}
                className={styles.slider}
                indicatorIconButtonProps={{
                    style: {
                        // 1
                        backgroundColor: "#FBE0DC",
                        color: "#FBE0DC", // 3
                        zIndex: "3",
                        width: "10px",
                        height: "10px",
                        margin: "3px"
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        backgroundColor: "#FF868E", // 2
                        color: "#FF868E"
                    }
                }}
                indicatorContainerProps={{
                    style: {
                        position: "absolute",
                        bottom: "5px",
                        backgroundColor: "#FFFFFF",
                        color: "#FFFFFF",
                        zIndex: "2",
                        width: "90px",
                        height: "30px",
                        borderRadius: "20px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }
                }}
            >
                {!imgLoading &&
                    imgData.map((data: any, i: number) => (
                        <div key={i} className={styles.sliderItem}>
                            {" "}
                            <img src={data.url} alt="" />
                        </div>
                    ))}
            </Carousel>
            {!isLoading && (
                <fieldset className={styles.breedDetail}>
                    <legend style={{ margin: "0 auto" }}>
                        <Typography variant="h1">{dataBreed.name}</Typography>
                    </legend>
                    <h2>Family companion cat</h2>
                    <Grid
                        container
                        display="flex"
                        flexDirection="row"
                        alignItems="flexStart"
                        justifyContent="center"
                        columnSpacing={5}
                    >
                        <Grid
                            lg={4}
                            xs={12}
                            item
                            alignItems="flex-start"
                            justifyContent="flex-start"
                            alignContent="flex-start"
                        >
                            <Typography variant="h5">Temperament:</Typography>
                            <Typography>{dataBreed.temperament}</Typography>
                        </Grid>
                        <Grid lg={4} xs={12} item>
                            <ul className={styles.list}>
                                <li>
                                    <Typography variant="h5">
                                        Origin:
                                    </Typography>
                                    <Typography>{dataBreed.origin}</Typography>
                                </li>
                                <li>
                                    <Typography variant="h5">
                                        Weight:
                                    </Typography>
                                    <Typography>
                                        {dataBreed.weight.metric} kgs
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="h5">
                                        Life span:
                                    </Typography>
                                    <Typography>
                                        {" "}
                                        {dataBreed.life_span} years
                                    </Typography>
                                </li>
                            </ul>
                        </Grid>
                    </Grid>
                </fieldset>
            )}
        </div>
    );
};

export default BreedCurrentShow;
