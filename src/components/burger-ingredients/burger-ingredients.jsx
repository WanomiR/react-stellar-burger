import React, {useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchIngredients} from "../../services/ingredientsSlice";

import styles from "./burger-ingredients.module.css"
import Tabs from "../tabs/tabs"
import IngredientsCategory from "../ingredients-category/ingredients-category";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";


export default function BurgerIngredients({openModal, closeModal, modalState}) {

    const dispatch = useDispatch();
    const { ingredients, status, error } = useSelector(state => state.ingredients)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchIngredients())
        }
    }, [status, dispatch]);

    let content

    if (status === "loading") {
        content = <span>Loading...</span>
    } else if (status === "failed") {
        content = <span>Failed :( Error message: {error}</span>
    } else if (status === "success") {
        content = (
            <>
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "bun")}
                    categoryName={"Булки"} className={"mt-10"} openDetails={openModal}
                />
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "sauce")}
                    categoryName={"Соусы"} openDetails={openModal}
                />
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "main")}
                    categoryName={"Начинки"} openDetails={openModal}
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
                modalState.isOpen &&
                <Modal handleModalClose={closeModal} title={"Детали ингрединета"}>
                    <IngredientDetails ingredientData={modalState.data}/>
                </Modal>
            }
        </section>
    )
}

BurgerIngredients.propTypes = {
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    modalState: PropTypes.object.isRequired,
};