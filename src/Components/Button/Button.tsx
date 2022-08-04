import React, { FC, ReactElement } from "react";
import style from "./Button.module.scss";
interface ButtonProps {
    children: string[] | string;
    onClick?: () => void | any;
    active?: boolean;
    bgColor?: string;
    color?: string;
    fontWeight?: number;
    padding?: number;
    width?: string;
    customStyle?: boolean;
    disabled?: boolean;
    icon?: ReactElement;
}

export const Button: FC<ButtonProps> = ({
    children,
    onClick,
    customStyle,
    active,
    width,
    disabled,
    icon
}) => {
    return (
        <button
            disabled={disabled}
            className={
                active
                    ? style.active
                    : customStyle
                    ? `${style.secondButton} ${style.button}`
                    : `${style.button} ${style.withOutHover}`
            }
            onClick={onClick}
        >
            {icon} {children}
        </button>
    );
};
