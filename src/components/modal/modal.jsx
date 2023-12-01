import styles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export default function Modal({handleClose, children}) {

    return (
        <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
            <button className={styles.closeButton} onClick={handleClose} type={"button"} name={"closeButton"}>
                <CloseIcon type={"primary"}></CloseIcon>
            </button>
            {children}
        </div>
    )
}