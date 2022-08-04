import { Skeleton } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { breedsService } from "../../query/breeds.service";
import GridCats from "../Breeds/GridCats/GridCats";
import styles from "./GalleryShow.module.scss";

const GalleryShow = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // const queryStringSeach = queryString.parse(useLocation().search);
    const handleClick = () => {};
    const [order, setOrder] = useState<string>("");
    const [breed, setBreed] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [limit, setLimit] = useState<string>("5");
    // const test = searchParams.get("breed");
    // const limit = searchParams.get("limit");
    // const order = searchParams.get("order");
    const { data, isLoading } = useQuery<any>(
        ["fetch breeds"],
        breedsService.getAllCats
    );
    const breedsArr =
        !isLoading &&
        data.map((obj: any) => ({ value: obj.id, nameBreed: obj.name }));
    !isLoading && breedsArr.unshift({ value: "", nameBreed: "None" });

    const gallery = useMutation(["fetch Gallery"], breedsService.getBreedsById);

    useEffect(() => {
        gallery.mutateAsync({
            order: order,
            limit: limit,
            breedId: breed,
            type: type
        });
    }, [order, limit, breed, type]);

    return (
        <>
            <div className={styles.root}>
                <div className={styles.wrapperSelect}>
                    <div className={styles.wrapperColumn}>
                        <div>
                            <label htmlFor="">Order</label>
                            <select
                                value={order}
                                className={styles.selectMenu}
                                onChange={(e) => setOrder(e.target.value)}
                            >
                                <option value="" selected>
                                    Random
                                </option>
                                <option value="DESC">Desc</option>
                                <option value="ASC">Asc</option>
                            </select>
                        </div>
                        {!isLoading ? (
                            <div>
                                <label htmlFor="">Breed</label>
                                <select
                                    value={breed}
                                    className={styles.selectMenu}
                                    onChange={(e) => {
                                        setBreed(e.target.value);
                                    }}
                                >
                                    {breedsArr.map((data: any, key: number) => [
                                        <option value={data.value} key={key}>
                                            {data.nameBreed}
                                        </option>
                                    ])}
                                </select>
                            </div>
                        ) : (
                            <Skeleton
                                variant="rectangular"
                                height={35}
                                width={230}
                            />
                        )}
                    </div>
                    <div className={styles.wrapperColumn}>
                        <div>
                            <label htmlFor="">Type</label>
                            <select
                                value={type}
                                className={styles.selectMenu}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="" selected>
                                    All
                                </option>
                                <option value="png">Static</option>
                                <option value="gif">Animated</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="">Limit</label>
                            <select
                                value={limit}
                                className={styles.selectMenu}
                                onChange={(e) => setLimit(e.target.value)}
                            >
                                <option value="5" selected>
                                    5 items per page
                                </option>
                                <option value="10">10 items per page</option>
                                <option value="15">15 items per page</option>
                                <option value="20">20 items per page</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <GridCats
                cats={gallery.data}
                gallery={true}
                isLoading={gallery.isLoading}
            />
        </>
    );
};

export default GalleryShow;
