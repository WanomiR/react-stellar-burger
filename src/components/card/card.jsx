import React from "react";
import styles from "./card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../utils/prop-types"
import {useDispatch} from "react-redux";
import {detailsOpened} from "../../services/ingredientDetailsSlice";

export default function Card({ingredientData}) {

    const dispatch = useDispatch();

    const onClick = () => dispatch(detailsOpened(ingredientData))


    return (
        <li>
            <article className={`${styles.card}`} onClick={onClick}>
                <img src={ingredientData.image} alt={`Изображение: ${ingredientData.name}`}
                     className={`${styles.image} ml-4 mr-4`}/>
                <div className={`${styles.price} mt-2 mb-2`}>
                    <p className={"text text_type_digits-default mr-3"}>{ingredientData.price}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <p className={`${styles.name} text text_type_main-default`}>{ingredientData.name}</p>
                <Counter count={1} size={"default"} extraCalss={styles.counter}/>
            </article>
        </li>
    )
}

Card.propTypes = {
    ingredientData: ingredientPropType.isRequired,
}
