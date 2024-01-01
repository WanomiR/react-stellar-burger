import React, {useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchIngredients} from "../../services/ingredientsSlice";

import styles from "./burger-ingredients.module.css"
import Tabs from "../tabs/tabs"
import IngredientsCategory from "../ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ingredientDetailsClosed} from "../../services/ingredientDetailsSlice";


export default function BurgerIngredients() {

    const dispatch = useDispatch();
    const {ingredients, status, error} = useSelector(state => state.ingredients)

    const modalIsOpen = useSelector(state => state.ingredientDetails.isOpen)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchIngredients())
        }
    }, [status, dispatch]);



    let content

    if (status === "loading") {
        content =
            <p className={"text text_type_main-default pt-15 pb-30"}>Подождите, идет загрузка...</p>
    } else if (status === "failed") {
        content = (<>
            <p className={"text text_type_main-default pt-15 pb-2"}>Произошла ошибка:</p>
            <p className={"text text_type_main-default text_color_inactive pb-30"}>{error}</p>
        </>)
    } else if (status === "success") {
        content = (
            <>
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "bun")}
                    categoryName={"Булки"} className={"mt-10"}
                />
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "sauce")}
                    categoryName={"Соусы"}
                />
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "main")}
                    categoryName={"Начинки"}
                />
            </>
        )
    }

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
            <Tabs />
            <div className={`${styles.ingredientsContainer}`}>{content}</div>
            {
                modalIsOpen &&
                <Modal title={"Детали ингрединета"}
                       handleModalClose={() => dispatch(ingredientDetailsClosed())}
                >
                    <IngredientDetails/>
                </Modal>
            }
        </section>
    )
};
