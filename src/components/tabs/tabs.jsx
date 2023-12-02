import React, {useState} from "react";
import styles from "./tabs.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs() {
    const [current, setCurrent] = useState('Булки')
    return (
        <div className={`${styles.tabs}`}>
            <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
    )
}