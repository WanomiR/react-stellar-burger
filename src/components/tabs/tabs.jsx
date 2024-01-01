import React, {useState} from "react";
import styles from "./tabs.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";

export default function Tabs({titleRef}) {

    const activeTab = useSelector(state => state.ingredients.activeTab);

    return (
        <div className={`${styles.tabs}`}>
            <Tab value="Булки" active={activeTab === "Булки"} onClick={() => {}}>
                Булки
            </Tab>
            <Tab value="Соусы" active={activeTab === "Соусы"} onClick={() => {}}>
                Соусы
            </Tab>
            <Tab value="Начинки" active={activeTab === "Начинки"} onClick={() => {}}>
                Начинки
            </Tab>
        </div>
    )
}