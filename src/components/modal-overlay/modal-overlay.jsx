import styles from "./modal-overlay.module.css"
import {forwardRef, useEffect} from "react";
import {createPortal} from "react-dom";

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
        <>
            <div className={styles.overlay} ref={ref}>
                {children}
            </div>
        </>
    ), modalRoot);
})

export default ModalOverlay;

