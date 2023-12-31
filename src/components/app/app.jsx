import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import styles from "./app.module.css";
import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {

    return (
        <div className={styles.app}>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            </DndProvider>
        </div>
    );
}

export default App;