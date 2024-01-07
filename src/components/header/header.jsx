import {
    Logo, BurgerIcon, ListIcon, ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./header.module.css"
import NavigationItem from "./navigation-item/navigation-item";

export default function AppHeader() {
    return (
        <header className={`${styles.header} p-4`}>
            <nav className={styles.navigation}>
                <ul className={styles.list}>
                    <div className={styles.container}>
                        <NavigationItem Icon={BurgerIcon} itemName={"Конструктор"} className={"pt-4 pb-4 pr-5"}/>
                        <NavigationItem Icon={ListIcon} itemName={"Лента заказов"} className={"ml-2 p-4 pl-5"}/>
                    </div>
                    <NavigationItem Icon={ProfileIcon} itemName={"Личный кабинет"} className={"pt-4 pb-4"}/>
                </ul>
                {/* eslint-disable-next-line */}
                <a className={styles.logo} href={"#"}><Logo/></a>
            </nav>
        </header>
    )
}