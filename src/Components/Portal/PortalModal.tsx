import React, { Children, FC } from "react";
import ReactDOM from "react-dom";
import Vote from "./../../assets/img/vote-table.svg";
import Breeds from "./../../assets/img/pet-breeds.svg";
import Gallery from "./../../assets/img/images-search.svg";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import styles from "./Portal.module.scss";
import ButtonIcon from "./../ButtonIcon/ButtonIcon";
import { ReactComponent as CloseBurger } from "./../../assets/icons/CloseBurger.svg";
interface PortalModal {
    openBurger: boolean;
    toggleBurger: () => void;
    children: any;
}
const PortalModal: FC<PortalModal> = ({
    openBurger,
    toggleBurger,
    children
}) => {
    return ReactDOM.createPortal(
        <CSSTransition
            in={openBurger}
            timeout={500}
            transitionLeaveTimeout={3000000}
            classNames={{
                enter: styles.enter,
                enterActive: styles.enterActive,
                enterDone: styles.enterActive,
                exitActive: styles.exitActive,
                exitDone: styles.exitDone,
                exit: styles.exitDone
            }}
            mountOnEnter
            unmountOnExit
        >
            <div>
                <ButtonIcon onClick={toggleBurger}>
                    <CloseBurger />
                </ButtonIcon>
                <div>{children}</div>
            </div>
        </CSSTransition>,

        document.body
    );
};

export default PortalModal;
