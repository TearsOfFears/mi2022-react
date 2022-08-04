import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button/Button";
import styles from "./../Breeds.module.scss";
import { ReactComponent as Like } from "./../../../assets/icons/fav.svg";
import ButtonIcon from "../../ButtonIcon/ButtonIcon";
interface ICat {
    cats: Array<object>;
    isLoading: boolean;
    gallery?: boolean;
}

const GridCats: FC<ICat> = ({ cats, isLoading, gallery }) => {
    console.log(cats);

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
                    {!isLoading ? (
                        subarray.map((data, key) => {
                            if (key === index) {
                                return data.map((item: any) => {
                                    return (
                                        <div
                                            className={
                                                key % 2 === 0
                                                    ? styles.item
                                                    : styles.itemReverse
                                            }
                                        >
                                            <div
                                                className={
                                                    gallery
                                                        ? styles.galleryHoverItem
                                                        : styles.hoverItem
                                                }
                                            >
                                                {" "}
                                                {gallery ? (
                                                    <ButtonIcon>
                                                        <Like />
                                                    </ButtonIcon>
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
                                            <img
                                                src={
                                                    item.image?.url || item?.url
                                                }
                                                alt=""
                                            />
                                        </div>
                                    );
                                });
                            }
                        })
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            );
        }

        return indents;
    };

    return <>{!isLoading && Array.isArray(cats) && calcCats()}</>;
};

export default GridCats;
