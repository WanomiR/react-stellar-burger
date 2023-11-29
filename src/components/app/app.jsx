import {useState, useEffect, lazy} from "react";
import styles from "./app.module.css";
import {data} from "../../utils/data"

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {setupApiStore} from "@reduxjs/toolkit/src/query/tests/helpers";

function App({dataUrl}) {
    const [state, setSate] = useState({
        isLoading: false,
        hasError: false,
        data: []
    });

    useEffect(() => {
        getIngredientsData();
    }, []);

    const getIngredientsData = async () => {
        setSate({...state, isLoading: true, hasError: false});
        try {
            const res = await fetch(dataUrl);
            const result = await res.json();
            setSate({...state, isLoading: false, hasError: false, data: result.data});
        } catch (error) {
            setSate({...state, isLoading: false, hasError: true});
            console.log(error);
        }
    }

    const { isLoading, hasError,data } = state;

    return (
        <div className={styles.app}>
            <AppHeader/>
            {isLoading && "Загрузка..."}
            {hasError && "Ошибка :("}
            {
                !isLoading &&
                !hasError &&
                data.length > 0 &&
                <main className={styles.main}>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </main>
            }
        </div>
    );
}

export default App;
