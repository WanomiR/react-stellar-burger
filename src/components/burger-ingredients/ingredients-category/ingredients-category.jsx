import React from "react";
import {useInView} from "react-intersection-observer";
import PropTypes from "prop-types";

import styles from "./ingredients-category.module.css"
import {ingredientPropType} from "../../../utils/prop-types"
import Card from "../card/card";
import {useDispatch} from "react-redux";
import {activeTabSet} from "../../../services/burger-ingredients-slice";

export default function IngredientsCategory({ingredients, categoryName, className, containerRef}) {

    const dispatch = useDispatch();

    const {ref} = useInView({
        root: containerRef.current,
        threshold: .3,
        onChange: inView => {
            if (inView) dispatch(activeTabSet(categoryName));
        }
    })

    return (
        <div ref={ref}>
            <h2 className={`${className} text text_type_main-medium`}>
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
    containerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element)})
    ])
};


