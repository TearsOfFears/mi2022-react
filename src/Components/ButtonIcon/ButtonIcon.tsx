import React, { FC, Component } from "react";
import styles from "./ButtonIcon.module.scss";
interface ButtonIconProps {
    icon?: Component;
    children: string[] | JSX.Element;
    size?: number;
    radius?: number;
    onClick?: () => void;
    bgColor?: string;
    controls?:boolean;
}
const ButtonIcon: FC<ButtonIconProps> = ({
    children,
    onClick,
    controls,
    size,
    radius,
    bgColor
}) => {
    return (
        <button
            className={`${styles.button} ${controls && styles.buttonControls }`}
            onClick={onClick}
            style={{
                width: size,
                height: size,
                borderRadius: radius,
                background: bgColor
            }}
        >
            {children}
        </button>
    );
};

export default ButtonIcon;
