import React from "react";
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";

import styles from "./card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropType} from "../../../utils/prop-types"
import {ingredientDetailsOpened, modalOpacitySet} from "../../../services/ingredient-details-slice";

export default function Card({ingredientData}) {
    const dispatch = useDispatch();

    const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: ingredientData,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    });

    const handleOpenModal = () => {
        dispatch(modalOpacitySet(0))
        dispatch(ingredientDetailsOpened(ingredientData));
    }

    const opacity = isDrag ? 0.3 : 1

    return (
        <li>
            <article className={`${styles.card}`} ref={dragRef} style={{opacity}}
                     onClick={handleOpenModal}
            >
                <img src={ingredientData.image} alt={`Изображение: ${ingredientData.name}`}
                     className={`${styles.image} ml-4 mr-4`}/>
                <div className={`${styles.price} mt-2 mb-2`}>
                    <p className={"text text_type_digits-default mr-3"}>{ingredientData.price}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <p className={`${styles.name} text text_type_main-default`}>{ingredientData.name}</p>
                {!!ingredientData.count &&
                    <Counter count={ingredientData.count} size={"default"} extraClass={styles.counter}/>
                }
            </article>
        </li>
    )
}

Card.propTypes = {
    ingredientData: ingredientPropType.isRequired,
}
