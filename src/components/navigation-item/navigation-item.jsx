import {useState} from "react";
import styles from "./navigation-item.module.css";
import {navigationItemPropTypes} from "../../utils/prop-types";

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

NavigationItem.propTypes = navigationItemPropTypes;