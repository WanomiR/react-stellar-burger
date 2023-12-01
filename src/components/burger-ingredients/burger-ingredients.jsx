import React, {useMemo} from "react";
import PropTypes from "prop-types";

import styles from "./burger-ingredients.module.css"
import {ingredientPropType} from "../../utils/prop-types"
import Tabs from "../tabs/tabs"
import IngredientsCategory from "../ingredients-category/ingredients-category";


export default function BurgerIngredients({data, openDetails}) {
    const buns = useMemo(() => data.filter(item => item.type === "bun"), [data]);
    const mains = useMemo(() => data.filter(item => item.type === "main"), [data]);
    const sauces = useMemo(() => data.filter(item => item.type === "sauce"), [data]);

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
            <Tabs />
            <div className={`${styles.ingredientsContainer} `}>
                <IngredientsCategory ingredients={buns} categoryName={"Булки"} className={"mt-10"} openDetails={openDetails}/>
                <IngredientsCategory ingredients={sauces} categoryName={"Соусы"} openDetails={openDetails} />
                <IngredientsCategory ingredients={mains} categoryName={"Начинки"} openDetails={openDetails} />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
}