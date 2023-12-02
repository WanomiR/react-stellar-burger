import {useState, useEffect} from "react";
import styles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import OrderDetails from "../order-details/odrder-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {getIngredients} from "../../utils/burger-api";
import Modal from "../modal/modal";


function App() {
    const [dataState, setDataState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });


    const [
        orderDetailsModalState,
        setOrderDetailsModalState
    ] = useState({isOpen: false});
    const [
        ingredientDetailsModalState,
        setIngredientDetailsModalState
    ] = useState({isOpen: false, data: {}});

    useEffect(() => {
        getIngredientsData();
        // eslint-disable-next-line
    }, []);


    const getIngredientsData = async () => {
        setDataState({...dataState, isLoading: true, hasError: false});
        try {
            const ingredients = await getIngredients();
            setDataState({...dataState, isLoading: false, hasError: false, data: ingredients.data});
        } catch (error) {
            setDataState({...dataState, isLoading: false, hasError: true});
            console.log(error);
        }
    }

    const closeOrderDetails = () => {
        setOrderDetailsModalState({isOpen: false});
    }

    const closeIngredientDetails = () => {
        setIngredientDetailsModalState({isOpen: false, data: {}});
    }

    const openOrderDetails = () => {
        setOrderDetailsModalState({isOpen: true})
    }

    const openIngredientDetails = (ingredientData) => {
        setIngredientDetailsModalState({isOpen: true, data: {...ingredientData}});
    }

    const {isLoading, hasError, data} = dataState;

    return (
        <div className={styles.app}>
            <AppHeader/>
            {isLoading && "Загрузка..."}
            {hasError && "Ошибка :("}
            {
                !isLoading &&
                !hasError &&
                data.length &&
                <main className={styles.main}>
                    <BurgerIngredients data={data} openModal={openIngredientDetails}>
                        {
                            ingredientDetailsModalState.isOpen &&
                            <Modal handleModalClose={closeIngredientDetails} title={"Детали ингрединета"}>
                                <IngredientDetails ingredientData={ingredientDetailsModalState.data}/>
                            </Modal>
                        }
                    </BurgerIngredients>
                    <BurgerConstructor data={data} openModal={openOrderDetails}>
                        {
                            orderDetailsModalState.isOpen &&
                            <Modal handleModalClose={closeOrderDetails}>
                                <OrderDetails/>
                            </Modal>
                        }
                    </BurgerConstructor>
                </main>
            }
        </div>
    );
}

export default App;