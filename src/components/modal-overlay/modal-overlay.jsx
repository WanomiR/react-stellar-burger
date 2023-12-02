import styles from "./modal-overlay.module.css"
import PropTypes from "prop-types";



const ModalOverlay = ({handleModalClose}) => {
    return <div className={styles.overlay} onClick={handleModalClose}/>
}

export default ModalOverlay;

ModalOverlay.propTypes = {
   handleModalClose: PropTypes.func.isRequired,
};