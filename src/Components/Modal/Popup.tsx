import React, { FC, useEffect, useRef } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import styles from "./Modal.module.scss";
import { ReactComponent as Close } from "./../../assets/icons/Close.svg";
interface Modal {
    modal?: boolean;
    setModal?: any;
}
const Popup: FC<Modal> = ({ modal, setModal }) => {
    const close = useRef<HTMLDivElement>(null);
    console.log(close.current);

    // const handleOutsideClick = (e: MouseEvent) => {
    //     window.onclick = (event: MouseEvent) => {
    //         const target = event.target as HTMLBodyElement;
    //         if (!target?.contains(close.current)) {
    //             setModal(!modal)
    //         }
    //     };
    // };
    // useEffect(() => {
    //     document.body.addEventListener('click',handleOutsideClick);
    // }, [])

    return (
        <div ref={close} className={modal ? `${styles.show}` : styles.root}>
            <ButtonIcon onClick={() => setModal(!modal)}>
                <Close />
            </ButtonIcon>
            <div>Modal</div>
        </div>
    );
};

export default Popup;
