import {useState, useEffect, forwardRef, useRef} from "react";
import styles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ModalOverlay from "../modal-overlay/modal-overlay";
import OrderDetails from "../order-details/odrder-details";
import IngredientDetails from "../ingredient-details/ingredient-details";



function App({dataUrl}) {
    const [dataState, setDataState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    const [modalState, setModalState] = useState({})
    const modalRef = useRef()

    const [ingredientDetails, setIngredientDetails] = useState()

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
        const canClose = (e.currentTarget.name === "closeButton") || (modalRef.current === e.target) || (e.key === "Escape")
        if (canClose) {
            setModalState({...modalState, isOpen: false});
        }
    }

    const openOrderDetails = () => {
        setModalState({...modalState, isOpen: true, type: "order details"})
    }

    const openIngredientDetails = (data) => {
        setIngredientDetails({...data});
        setModalState({...modalState, isOpen: true, type: "ingredient details"})
    }

    const { isLoading, hasError, data } = dataState;
    const { isOpen, type } = modalState;

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
                    <BurgerIngredients data={data} openDetails={openIngredientDetails}/>
                    <BurgerConstructor data={data} openModal={openOrderDetails}/>
                </main>
            }
            {
                isOpen && type === "order details" &&
                <ModalOverlay handleClose={handleModalClose} ref={modalRef}>
                    <OrderDetails/>
                </ModalOverlay>
            }
            {
                isOpen && type === "ingredient details" &&
                <ModalOverlay handleClose={handleModalClose} ref={modalRef}>
                    <IngredientDetails {...ingredientDetails}/>
                </ModalOverlay>
            }
        </div>
    );
}

export default App;
