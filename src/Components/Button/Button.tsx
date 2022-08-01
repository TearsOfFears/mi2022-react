import React, { FC } from "react";
import style from "./Button.module.scss";
interface ButtonProps {
    children: string[] | string;
    onClick?: () => void;
    active?: boolean;
    bgColor?: string;
    color?: string;
    fontWeight?: number;
    padding?: number;
    width?: string;
    customStyle?: boolean;
}

export const Button: FC<ButtonProps> = ({
    children,
    onClick,
    customStyle,
    active,
    width
}) => {
    return (
        <button
            className={
                active
                    ? style.active
                    : customStyle
                    ? `${style.secondButton} ${style.button}`
                    : `${style.button} ${style.withOutHover}`
            }
            onClick={onClick}
        >
            {children}
        </button>
    );
};
