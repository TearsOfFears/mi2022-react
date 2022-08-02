import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button/Button";
import styles from "./../Breeds.module.scss";

interface ICat {
    cats: Array<object>;
    isLoading: boolean;
}

const GridCats: FC<ICat> = ({ cats, isLoading }) => {
    const navigate = useNavigate();
    console.log(cats);
    
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
                                            <div className={styles.hoverItem}>
                                                <Button
                                                    customStyle={false}
                                                    onClick={() =>
                                                        navigate(
                                                            `/breeds/${item.breeds[0].id}`
                                                        )
                                                    }
                                                >
                                                    {item.breeds[0].name}
                                                </Button>
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
