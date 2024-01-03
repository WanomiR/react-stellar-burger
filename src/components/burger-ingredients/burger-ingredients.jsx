import React, {useEffect, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {fetchIngredients} from "../../services/burger-ingredients-slice";

import styles from "./burger-ingredients.module.css"
import Tabs from "./tabs/tabs"
import IngredientsCategory from "./ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import {ingredientDetailsClosed} from "../../services/ingredient-details-slice";


export default function BurgerIngredients() {

    const dispatch = useDispatch();
    const {ingredients, status, error} = useSelector(state => state.ingredients)

    const modalIsOpen = useSelector(state => state.ingredientDetails.isOpen)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchIngredients())
        }
    }, [status, dispatch]);

    const bunsTitleRef = useRef();
    const saucesTitleRef = useRef();
    const mainsTitleRef = useRef();

    const handleTabSelection = (e) => {
        console.log(e.target.getBoundingClientRect().top)
    }

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
            <div>
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "bun")}
                    categoryName={"Булки"} className={"mt-10"}
                    titleRef={bunsTitleRef}
                    handleTabSelection={handleTabSelection}
                />
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "sauce")}
                    categoryName={"Соусы"}
                    titleRef={saucesTitleRef}
                    handleTabSelection={handleTabSelection}
                />
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "main")}
                    categoryName={"Начинки"}
                    titleRef={mainsTitleRef}
                    handleTabSelection={handleTabSelection}
                />
            </div>
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
