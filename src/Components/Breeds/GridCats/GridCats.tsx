import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button/Button";
import styles from "./../Breeds.module.scss";
import { ReactComponent as Like } from "./../../../assets/icons/fav.svg";
import { ReactComponent as ActiveFav } from "./../../../assets/icons/activeFav.svg";
import ButtonIcon from "../../ButtonIcon/ButtonIcon";
import cx from "classnames";
import { useMutation } from "@tanstack/react-query";
import { breedsService } from "../../../query/breeds.service";
import { useRefresh } from "../../../hooks/useRefresh";
import Loader from "../../Loader";
import { CSSTransition } from "react-transition-group";
import { Skeleton } from "@mui/material";
interface ICat {
    cats: Array<object> | any;
    isLoading: boolean;
    isNav?: boolean;
    gallery?: boolean;
    imageLoaded?: boolean;
    setImageLoaded?: any;
    activeFav?: boolean;
}

const GridCats: FC<ICat> = ({
    cats,
    isLoading,
    imageLoaded,
    setImageLoaded,
    gallery,
    activeFav,
    isNav
}) => {
    const refresh = useRefresh();
    const deleteFavourite = useMutation(breedsService.deleteFav, {
        onSuccess() {
            refresh("get Favourite");
        }
    });
    const makeFav = useMutation(["make Fav"], breedsService.makeFavourite, {
        onSuccess() {
            refresh("get Favourite");
        }
    });
    const handleFav = async (id?: string) => {
        const data = {
            image_id: id
        };
        await makeFav.mutateAsync({ data: data });
    };
    const navigate = useNavigate();
    const calcCats = () => {
        var indents = [];
        let subarray = [];
        let size = 5;

        for (let i = 0; i < Math.ceil(cats.length / size); i++) {
            subarray[i] = cats.slice(i * size, i * size + size);
        }

        for (let index = 0; index < Math.ceil(subarray.length); index++) {
            indents.push(
                <div className={styles.grid}>
                    {subarray.map((data, key) => {
                        if (key === index) {
                            return data.map((item: any) => {
                                return (
                                    <div
                                        key={key}
                                        className={
                                            key % 2 === 0
                                                ? styles.item
                                                : styles.itemReverse
                                        }
                                    >
                                        {isNav && (
                                            <div
                                                key={key}
                                                className={
                                                    gallery
                                                        ? styles.galleryHoverItem
                                                        : styles.hoverItem
                                                }
                                            >
                                                {gallery ? (
                                                    activeFav ? (
                                                        <ButtonIcon
                                                            onClick={() =>
                                                                handleFav(
                                                                    item?.id
                                                                )
                                                            }
                                                        >
                                                            <Like />
                                                        </ButtonIcon>
                                                    ) : (
                                                        <ButtonIcon
                                                            onClick={async () => {
                                                                await deleteFavourite.mutateAsync(
                                                                    item?.id
                                                                );
                                                            }}
                                                            activeFav={true}
                                                        >
                                                            <ActiveFav />
                                                        </ButtonIcon>
                                                    )
                                                ) : (
                                                    <Button
                                                        customStyle={false}
                                                        disabled={
                                                            !item?.breeds[0]
                                                                ?.name
                                                        }
                                                        onClick={() =>
                                                            navigate(
                                                                `/breeds/${item?.breeds[0]?.id}`
                                                            )
                                                        }
                                                    >
                                                        {item?.breeds[0]
                                                            ?.name ||
                                                            "undefined"}
                                                    </Button>
                                                )}
                                            </div>
                                        )}

                                        <img
                                            key={key}
                                            src={item.image?.url || item?.url}
                                            className={cx(styles.smooth, {
                                                [styles.loaded]: imageLoaded,
                                                [styles.none]: !imageLoaded
                                            })}
                                            onLoad={() => setImageLoaded(true)}
                                            alt=""
                                        />
                                    </div>
                                );
                            });
                        }
                    })}
                </div>
            );
        }
        return indents;
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <CSSTransition
                    in={!isLoading}
                    timeout={500}
                    classNames={{
                        enter: styles.enter,
                        enterActive: styles.enterActive,
                        exit: styles.exitActive
                    }}
                    mountOnEnter
                    unmountOnExit
                >
                    <>
                        {" "}
                        {Array.isArray(cats) && cats.length === 0 ? (
                            <div
                                style={{
                                    background: "#F8F8F7",
                                    padding: "15px",
                                    borderRadius: "10px",
                                    width:"100%",
                                    marginTop:"15px",
                                    color:"#8C8C8C",
                                    fontSize:"16px"
                                }}
                            >
                                No item found
                            </div>
                        ) : (
                            Array.isArray(cats) && calcCats()
                        )}
                    </>
                </CSSTransition>
            )}
        </>
    );
};

export default GridCats;
