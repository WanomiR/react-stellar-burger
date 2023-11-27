import styles from "./burger-ingredients.module.css"
import {data} from "../../utils/data";
import {Tab, CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components"
import React, { useState } from "react";

const Tabs = () => {
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

const Card = ({data}) => {
    return (
        <li>
            <article className={`${styles.card}`}>
                <img src={data.image} alt={`Изображение: ${data.name}`} className={`${styles.image} ml-4 mr-4`}/>
                <div className={`${styles.price} mt-2 mb-2`}>
                    <p className={"text text_type_digits-default mr-3"}>{data.price}</p><CurrencyIcon type={"primary"}/>
                </div>
                <p className={`${styles.name} text text_type_main-default`}>{data.name}</p>
                <Counter count={1} size={"default"} extraCalss={styles.counter} />
            </article>
        </li>
    )
}

const Cards = ({ children }) => {
    return (
        <ul className={`${styles.cards} mt-6 mb-10 pl-4`}>{children}</ul>
    )
}

export default function BurgerIngredients() {
    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
            <Tabs />
            <div className={styles.ingredientsContainer}>
                <h2 className={"text text_type_main-medium mt-10"}>Булки</h2>
                <Cards>
                    {data.filter(item => item.type === "bun")
                        .map(itemData => (
                                <React.Fragment key={itemData._id}>
                                    <Card data={itemData} />
                                </React.Fragment>))}
                </Cards>
                <h2 className={"text text_type_main-medium"}>Соусы</h2>
                <Cards>
                    {data.filter(item => item.type === "sauce")
                        .map(itemData => (
                                <React.Fragment key={itemData._id}>
                                    <Card data={itemData} />
                                </React.Fragment>))}
                </Cards>
                <h2 className={"text text_type_main-medium"}>Начинки</h2>
                <Cards>
                    {data.filter(item => item.type === "main")
                        .map(itemData => (
                                <React.Fragment key={itemData._id}>
                                    <Card data={itemData} />
                                </React.Fragment>
                            ))}
                </Cards>
            </div>
        </section>
    )
}