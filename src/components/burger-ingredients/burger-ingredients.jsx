import React, {useMemo} from "react";

import styles from "./burger-ingredients.module.css"
import {ingredientPropType} from "../../utils/prop-types"
import Tabs from "../tabs/tabs"
import IngredientsCategory from "../ingredients-category/ingredients-category";
import PropTypes from "prop-types";


export default function BurgerIngredients({data, openModal, children}) {
    const buns = useMemo(() => data.filter(item => item.type === "bun"), [data]);
    const mains = useMemo(() => data.filter(item => item.type === "main"), [data]);
    const sauces = useMemo(() => data.filter(item => item.type === "sauce"), [data]);

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
            <Tabs />
            <div className={`${styles.ingredientsContainer} `}>
                <IngredientsCategory ingredients={buns} categoryName={"Булки"} className={"mt-10"} openDetails={openModal}/>
                <IngredientsCategory ingredients={sauces} categoryName={"Соусы"} openDetails={openModal} />
                <IngredientsCategory ingredients={mains} categoryName={"Начинки"} openDetails={openModal} />
            </div>
            {children}
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    openModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.elementType,
        PropTypes.bool,
        PropTypes.object,
    ])
};