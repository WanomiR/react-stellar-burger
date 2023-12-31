import React, {useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchIngredients} from "../../services/ingredientsSlice";

import styles from "./burger-ingredients.module.css"
import {ingredientPropType} from "../../utils/prop-types"
import Tabs from "../tabs/tabs"
import IngredientsCategory from "../ingredients-category/ingredients-category";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";


export default function BurgerIngredients({openModal, closeModal, modalState}) {

    const dispatch = useDispatch();

    const ingredients = useSelector(state => state.ingredients.ingredients);
    const ingredientsStatus = useSelector(state => state.ingredients.status);

    useEffect(() => {
        if (ingredientsStatus === "idle") {
            dispatch(fetchIngredients())
        }
    }, [ingredientsStatus, dispatch]);

    let content

    if (ingredientsStatus === "loading") {
        content = <span>Loading...</span>
    } else if (ingredientsStatus === "failed") {
        content = <span>Failed :(</span>
    } else if (ingredientsStatus === "succeeded") {
        const buns = ingredients.filter(item => item.type === "bun")
        const mains = ingredients.filter(item => item.type === "main")
        const sauces = ingredients.filter(item => item.type === "sauce")

        content = (
            <>
                <IngredientsCategory ingredients={buns} categoryName={"Булки"} className={"mt-10"} openDetails={openModal}/>
                <IngredientsCategory ingredients={sauces} categoryName={"Соусы"} openDetails={openModal} />
                <IngredientsCategory ingredients={mains} categoryName={"Начинки"} openDetails={openModal} />
            </>
        )

    }

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
            <Tabs />
            <div className={`${styles.ingredientsContainer} `}>{content}</div>
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