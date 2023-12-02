import React from "react";
import styles from "./ingredients-category.module.css"
import {ingredientPropType} from "../../utils/prop-types"
import Card from "../card/card";
import PropTypes from "prop-types";

export default function IngredientsCategory({ingredients, categoryName, className, openDetails}) {
    return (
        <>
            <h2 className={`${className} text text_type_main-medium`}>{categoryName}</h2>
            <ul className={`${styles.cards} mt-6 mb-10 pl-4`}>
                {ingredients.map(itemData => (<Card data={itemData} key={itemData._id} openDetails={openDetails}/>))}
            </ul>
        </>
    )
}

IngredientsCategory.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    categoryName: PropTypes.string.isRequired,
    className: PropTypes.string,
    openDetails: PropTypes.func.isRequired
};
