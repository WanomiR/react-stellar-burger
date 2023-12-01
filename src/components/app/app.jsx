import {useState, useEffect} from "react";
import styles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ModalOverlay from "../modal-overlay/modal-overlay";


function App({dataUrl}) {
    const [dataState, setDataState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    const [modalState, setModalState] = useState({isOpen: true})

    useEffect(() => {
        getIngredientsData();
        // eslint-disable-next-line
    }, []);

    const getIngredientsData = async () => {
        setDataState({...dataState, isLoading: true, hasError: false});
        try {
            const res = await fetch(dataUrl);
            const result = await res.json();
            setDataState({...dataState, isLoading: false, hasError: false, data: result.data});
        } catch (error) {
            setDataState({...dataState, isLoading: false, hasError: true});
            console.log(error);
        }
    }

    const handleModalClose = (e) => {
        setModalState({isOpen: false});
    }

    const { isLoading, hasError, data } = dataState;
    const { isOpen } = modalState;

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
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </main>
            }
            {
                isOpen &&
                <ModalOverlay handleClose={handleModalClose}>
                    <p>Some text here</p>
                </ModalOverlay>
            }
        </div>
    );
}

export default App;
