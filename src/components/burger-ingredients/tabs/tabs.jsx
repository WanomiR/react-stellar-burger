import React from "react";
import PropTypes from "prop-types";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./tabs.module.css";

export default function Tabs({activeTab}) {

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

Tabs.propTypes = {
    activeTab: PropTypes.string.isRequired,
}