import {useState, useEffect, forwardRef, useRef} from "react";
import styles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/odrder-details";



function App({dataUrl}) {
    const [dataState, setDataState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    const [modalState, setModalState] = useState({isOpen: true})
    const modalRef = useRef()

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
            setModalState({isOpen: false});
        }
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
                <ModalOverlay handleClose={handleModalClose} ref={modalRef}>
                    <Modal handleClose={handleModalClose}>
                        <OrderDetails/>
                    </Modal>
                </ModalOverlay>
            }
        </div>
    );
}

export default App;
