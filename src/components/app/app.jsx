import {useState} from "react";
import styles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {

    const [orderDetailsModalState, setOrderDetailsModalState] = useState({isOpen: false});
    const [ingredientDetailsModalState, setIngredientDetailsModalState] = useState({isOpen: false, data: {}});


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


    return (<div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients
                    openModal={openIngredientDetails}
                    closeModal={closeIngredientDetails}
                    modalState={ingredientDetailsModalState}
                />
                <BurgerConstructor
                    openModal={openOrderDetails}
                    closeModal={closeOrderDetails}
                    modalState={orderDetailsModalState}
                />
            </main>
        </div>);
}

export default App;