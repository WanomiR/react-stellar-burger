import React from "react";
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";

import styles from "./card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../utils/prop-types"
import {ingredientDetailsOpened} from "../../services/ingredientDetailsSlice";

export default function Card({ingredientData}) {
    const dispatch = useDispatch();
    const count = ingredientData.count;

    const [{isDrag}, dragRef] = useDrag({
        type: "default",
        item: ingredientData,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    });

    return (
        <li>
            <article className={`${styles.card}`} ref={dragRef}
                     onClick={() => dispatch(ingredientDetailsOpened(ingredientData))}
            >
                <img src={ingredientData.image} alt={`Изображение: ${ingredientData.name}`}
                     className={`${styles.image} ml-4 mr-4`}/>
                <div className={`${styles.price} mt-2 mb-2`}>
                    <p className={"text text_type_digits-default mr-3"}>{ingredientData.price}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <p className={`${styles.name} text text_type_main-default`}>{ingredientData.name}</p>
                {!!count &&
                    <Counter count={count} size={"default"} extraCalss={styles.counter}/>
                }
            </article>
        </li>
    )
}

Card.propTypes = {
    ingredientData: ingredientPropType.isRequired,
}
