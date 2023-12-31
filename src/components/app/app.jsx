import {useState} from "react";
import styles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {

    const [orderDetailsModalState, setOrderDetailsModalState] = useState({isOpen: false});


    const closeOrderDetails = () => {
        setOrderDetailsModalState({isOpen: false});
    }

    const openOrderDetails = () => {
        setOrderDetailsModalState({isOpen: true})
    }

    return (<div className={styles.app}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients/>
                <BurgerConstructor
                    openModal={openOrderDetails}
                    closeModal={closeOrderDetails}
                    modalState={orderDetailsModalState}
                />
            </main>
        </div>);
}

export default App;