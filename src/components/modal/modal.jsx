import ModalOverlay from "../modal-overlay/modal-overlay";
import {useEffect} from "react";
import {createPortal} from "react-dom";

import styles from "./modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

const modalRoot = document.getElementById("root-modal");

export const Modal = ({children, title, handleModalClose}) => {

    const opacity = useSelector(state => state.ingredientDetails.modalOpacity);

    const handleCloseOnEscape = (e) => {
        if (e.key === "Escape") {
            handleModalClose()
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", handleCloseOnEscape)

        return () => {
            document.removeEventListener("keydown", handleCloseOnEscape);
        }
        // eslint-disable-next-line
    }, []);


    return createPortal((
        <div style={{opacity}}>
            <ModalOverlay handleModalClose={handleModalClose}/>
            <div className={`${styles.modal} pl-10 pr-10`}>
                <h2 className={`${styles.title} text text_type_main-large mt-10 pt-3 mb-3`}>{title}</h2>
                {children}
                <button className={styles.closeButton} onClick={handleModalClose} type={"button"} name={"closeButton"}>
                    <CloseIcon type={"primary"}></CloseIcon>
                </button>
            </div>
        </div>
    ), modalRoot)
}

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any,
    handleModalClose: PropTypes.func,
}

export default Modal;