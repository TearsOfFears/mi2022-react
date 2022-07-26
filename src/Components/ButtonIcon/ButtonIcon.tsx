import React, { FC, Component } from "react";
import styles from "./ButtonIcon.module.scss";
interface ButtonIconProps {
    icon?: Component;
    children: string[] | JSX.Element;
    size?: number;
    radius?: number;
    onClick?: () => void;
    bgColor?: string;
    controls?: boolean;
    active?: boolean;
    activeFav?: boolean;
    mr?: string;
}
const ButtonIcon: FC<ButtonIconProps> = ({
    children,
    onClick,
    controls,
    size,
    radius,
    bgColor,
    active,
    activeFav,
    mr
}) => {
    return (
        <button
            className={`${styles.button} ${controls && styles.buttonControls} ${
                active && styles.active
            } ${activeFav && styles.activeFav}`}
            onClick={onClick}
            style={{
                width: size,
                height: size,
                borderRadius: radius,
                background: bgColor,
                margin: mr
            }}
        >
            {children}
        </button>
    );
};

export default ButtonIcon;
