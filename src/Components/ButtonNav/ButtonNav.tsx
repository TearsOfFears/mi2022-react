import React, { FC } from "react";
import style from "./Button.module.scss";

interface ButtonProps {
    children: string[] | string;
    onClick?: () => void;
    icon?: FC;
    active?: boolean;
}

export const ButtonNav: FC<ButtonProps> = ({ children, onClick, active }) => {
    return (
        <button
            className={active ? style.active : style.button}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
