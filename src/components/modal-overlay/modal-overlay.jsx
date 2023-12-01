import styles from "./modal-overlay.module.css"
import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

const rootNode = document.getElementById("root")
rootNode.insertAdjacentHTML("afterend", "<div id='root-modal'></div>")

const modalRoot = document.getElementById("root-modal");

export default function ModalOverlay({children, handleClose}) {

    const overlayRef = useRef();

    const closeOnEsc = (e) => {
        if (e.key === "Escape") {
            handleClose();
        }
    }

    useEffect(() => {
        const overlayElement = overlayRef.current;

        overlayElement.addEventListener("click", handleClose)
        document.addEventListener("keydown", closeOnEsc)

        return () => {
            overlayElement.removeEventListener("click", handleClose);
            document.removeEventListener("keydown", closeOnEsc);
        }
    }, [overlayRef]);

    return createPortal((
        <>
            <div className={styles.overlay} ref={overlayRef}>
                {children}
            </div>
        </>
    ), modalRoot);
}
