import styles from "./modal-overlay.module.css"
import {forwardRef, useEffect} from "react";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const rootNode = document.getElementById("root")
rootNode.insertAdjacentHTML("afterend", "<div id='root-modal'></div>")

const modalRoot = document.getElementById("root-modal");

const ModalOverlay = forwardRef(({children, handleClose}, ref) => {

    useEffect(() => {
        const overlayElement = ref.current;

        overlayElement.addEventListener("click", handleClose)
        document.addEventListener("keydown", handleClose)

        return () => {
            overlayElement.removeEventListener("click", handleClose);
            document.removeEventListener("keydown", handleClose);
        }
    }, []);

    return createPortal((
        <div className={styles.overlay} ref={ref}>
            <div className={`${styles.modal} pl-10 pr-10`}>
                {children}
                <button className={styles.closeButton} onClick={handleClose} type={"button"} name={"closeButton"}>
                    <CloseIcon type={"primary"}></CloseIcon>
                </button>
            </div>
        </div>
    ), modalRoot);
})

export default ModalOverlay;

