import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchIngredients} from "../../services/burger-ingredients-slice";

import styles from "./burger-ingredients.module.css"
import Tabs from "./tabs/tabs"
import IngredientsCategory from "./ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import {ingredientDetailsClosed} from "../../services/ingredient-details-slice";
import {Fallback} from "../fallback/Fallback";


export default function BurgerIngredients() {

    const dispatch = useDispatch();
    const {ingredients, status, error} = useSelector(state => state.ingredients)
    const activeTab = useSelector(state => state.ingredients.activeTab)

    const modalIsOpen = useSelector(state => state.ingredientDetails.isOpen)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchIngredients())
        }
    }, [status, dispatch]);

    return (
        <section className={styles.section} id={"burgerIngredients"}>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
            <Tabs activeTab={activeTab}/>
            <div className={`${styles.ingredientsContainer}`}>
                <Fallback
                    isLoading={status === "loading"}
                    isSuccess={status === "success"}
                    error={error}
                >
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
                </Fallback>
            </div>
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
