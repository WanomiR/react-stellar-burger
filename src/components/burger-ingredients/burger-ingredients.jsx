import React, { useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
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

    const [activeTab, setActiveTab] = useState("Булки");

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchIngredients())
        }
    }, [status, dispatch]);

    const refTitleBuns = useRef();
    const refTitleSauces = useRef();
    const refTitleMains = useRef();

    const getBoundingDistance = ref => {
        return Math.abs(ref.current?.getBoundingClientRect().top - 283)
    }

    const handleActiveTab = () => {

        const distances = {
            "Булки": getBoundingDistance(refTitleBuns),
            "Соусы": getBoundingDistance(refTitleSauces),
            "Начинки": getBoundingDistance(refTitleMains)
        }

        const closestTitle = Object.keys(distances)
            .reduce((k, m) => distances[m] < distances[k] ? m : k)

        setActiveTab(closestTitle)
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
            <>
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "bun")}
                    categoryName={"Булки"} className={"mt-10"} refTitle={refTitleBuns}
                />
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "sauce")}
                    categoryName={"Соусы"} refTitle={refTitleSauces}
                />
                <IngredientsCategory
                    ingredients={ingredients.filter(item => item.type === "main")}
                    categoryName={"Начинки"} refTitle={refTitleMains}
                />
            </>
        )
    }

    return (
        <section className={styles.section}>
            <h1 className={"text text_type_main-large mt-10 mb-5"}>Соберите бургер</h1>
            <Tabs activeTab={activeTab}/>
            <div className={`${styles.ingredientsContainer}`} onScroll={() => handleActiveTab()}>
                {content}
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
