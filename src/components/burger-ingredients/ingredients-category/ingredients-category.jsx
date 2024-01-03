import React from "react";
import PropTypes from "prop-types";

import styles from "./ingredients-category.module.css"
import {ingredientPropType} from "../../../utils/prop-types"
import Card from "../card/card";

export default function IngredientsCategory({ingredients, categoryName, className, refTitle}) {

    return (
        <>
            <h2 className={`${className} text text_type_main-medium`} ref={refTitle}>
                {categoryName}
            </h2>
            <ul className={`${styles.cards} mt-6 mb-10 pl-4`}>
                {ingredients.map(itemData => (<Card ingredientData={itemData} key={itemData._id}/>))}
            </ul>
        </>
    )
}

IngredientsCategory.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    categoryName: PropTypes.string.isRequired,
    className: PropTypes.string,
};
