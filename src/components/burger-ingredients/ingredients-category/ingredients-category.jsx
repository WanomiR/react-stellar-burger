import React, {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import PropTypes from "prop-types";

import styles from "./ingredients-category.module.css"
import {ingredientPropType} from "../../../utils/prop-types"
import Card from "../card/card";
import {useDispatch} from "react-redux";
import {activeTabSet} from "../../../services/burger-ingredients-slice";

export default function IngredientsCategory({ingredients, categoryName, className}) {

    const dispatch = useDispatch();

    const {ref, inView, entry} = useInView({
        root: document.querySelector("#burgerIngredients"),
        threshold: 1,
        onChange: (inView, entry) => {
            if (inView) dispatch(activeTabSet(categoryName));
        }
    })

    return (
        <div >
            <h2 className={`${className} text text_type_main-medium`} ref={ref}>
                {categoryName}
            </h2>
            <ul className={`${styles.cards} mt-6 mb-10 pl-4`}>
                {ingredients.map(itemData => (<Card ingredientData={itemData} key={itemData._id}/>))}
            </ul>
        </div>
    )
}

IngredientsCategory.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
    categoryName: PropTypes.string.isRequired,
    className: PropTypes.string,
};
