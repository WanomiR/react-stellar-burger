import {useState} from "react";
import PropTypes from "prop-types";

import styles from "./navigation-item.module.css";

export default function NavigationItem({ Icon, itemName, className}) {

    const [isActive, setIsActive] = useState(false)

    const clickHandler = () => setIsActive(!isActive)

    const type = isActive ? "primary" : "secondary"
    const textInactive = isActive ? null : "text_color_inactive"

    return (
        <li className={`${className}`}>
            {/* eslint-disable-next-line */}
            <a className={styles.link} href={"#"} onClick={clickHandler}>
                <Icon type={type}/><span className={`ml-2 text_type_main-default ${textInactive}`}>{itemName}</span>
            </a>
        </li>
    )
}

NavigationItem.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    itemName: PropTypes.string.isRequired,
    className: PropTypes.string
};