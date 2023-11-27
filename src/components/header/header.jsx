import styles from "./header.module.css"
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState} from "react";

const NavItem = ({ Icon, children, ...props}) => {
    const [isActive, setIsActive] = useState(false)

    const clickHandler = () => setIsActive(!isActive)

    const type = isActive ? "primary" : "secondary"
    const textInactive = isActive ? null : "text_color_inactive"

    return (
        <li className={`${props.className}`}>
            <a className={styles.link} href={"#"} onClick={clickHandler}>
                <Icon type={type}/><span className={`ml-2 text_type_main-default ${textInactive}`}>{children}</span>
            </a>
        </li>
    )
}

export  default function AppHeader() {
    return (
        <header className={`${styles.header} p-4`}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <div className={styles.container}>
                        <NavItem Icon={BurgerIcon} className={"pt-4 pb-4 pr-5"}>Конструктор</NavItem>
                        <NavItem Icon={ListIcon} className={"ml-2 p-4 pl-5"}>Лента заказов</NavItem>
                    </div>
                    <NavItem Icon={ProfileIcon} className={"pt-4 pb-4"}>Личный кабинет</NavItem>
                </ul>
                <a className={styles.logo}><Logo /></a>
            </nav>
        </header>
    )
}