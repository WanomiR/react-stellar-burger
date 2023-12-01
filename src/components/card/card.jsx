import React from "react";
import styles from "./card.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {cardPropTypes} from "../../utils/prop-types"

export default function Card({data, openDetails}) {


    const onClick = () => {
        openDetails(data);
    }

    return (
        <li>
            <article className={`${styles.card}`} onClick={onClick}>
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

Card.propTypes = cardPropTypes;
