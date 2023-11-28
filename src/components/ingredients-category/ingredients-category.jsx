import React from "react";
import styles from "./ingredients-category.module.css"
import {ingredientsCategoryPropTypes} from "../../utils/prop-types"
import Card from "../card/card";

export default function IngredientsCategory({ingredients, categoryName, className}) {
    return (
        <>
            <h2 className={`${className} text text_type_main-medium`}>{categoryName}</h2>
            <ul className={`${styles.cards} mt-6 mb-10 pl-4`}>
                {ingredients.map(itemData => (<Card data={itemData} key={itemData._id}/>))}
            </ul>
        </>
    )
}

IngredientsCategory.propTypes = ingredientsCategoryPropTypes;
