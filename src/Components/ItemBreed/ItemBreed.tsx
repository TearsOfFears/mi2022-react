import React, { FC } from "react";
import styles from "./ItemBreed.module.scss";
interface ICat {
    weight: string;
    life_span: string;
    temperament: string;
    name: string;
    origin: string;
    image: string;
}
const ItemBreed: FC<ICat> = ({
    weight,
    life_span,
    temperament,
    name,
    origin,
    image
}) => {
    return <div>ItemBreed</div>;
};

export default ItemBreed;
