import styles from "./app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {DndMockup} from "../dnd-mockup/dnd-mockup";

function App() {

    return (
        <div className={styles.app}>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <BurgerIngredients/>
                    {/*<DndMockup />*/}
                    <BurgerConstructor/>
                </main>
            </DndProvider>
        </div>
    );
}

export default App;