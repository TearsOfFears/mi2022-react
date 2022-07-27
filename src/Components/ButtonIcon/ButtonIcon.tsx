import React, { FC, Component } from "react";
import styles from "./ButtonIcon.module.scss";
interface ButtonIconProps {
    icon?: Component;
    children: string[] | JSX.Element;
    size?: number;
    radius?: number;
    onClick?: () => void;
    bgColor?: string;
}
const ButtonIcon: FC<ButtonIconProps> = ({
    children,
    onClick,
    size,
    radius,
    bgColor
}) => {
    return (
        <button
            className={styles.button}
            style={{
                width: size,
                height: size,
                borderRadius: radius,
                background: bgColor
            }}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonIcon;
